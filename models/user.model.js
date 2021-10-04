import mongoose from "mongoose";
import httpStatus from "http-status";
import APIError from "@/lib/APIError";

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    lowercase: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpiration: {
    type: Date,
  },
  role: {
    type: String,
    required: true,
    lowercase: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {string} id - The email of user.
   * @returns {Promise<User, APIError>}
   */
  get(email) {
    return this.findOne({ email })
      .select("name email")
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError(
          "User id does not exist",
          httpStatus.NOT_FOUND
        );
        return Promise.reject(err);
      });
  },
  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limipt - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50, organization } = {}) {
    return this.find({ organization: organization })
      .select("name email createdAt updatedAt ")
      .populate("organization")
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

/**
 * @typedef User
 */
export default mongoose.models.User || mongoose.model("User", UserSchema);
