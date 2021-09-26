import mongoose from 'mongoose'
import httpStatus from 'http-status'
import APIError from '../lib/APIError'

/**
 * Provider Schema
 */
const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    lowercase: false,
    trim: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
 OrganizationSchema.method({})

/**
 * Statics
 */
 OrganizationSchema.statics = {
  /**
   * Get organization
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Organization, APIError>}
   */
  get(id) {
    return this.finById(nit)
      .select('name nit taxes')
      .exec()
      .then((organization) => {
        if (organization) {
          return organization
        }
        const err = new APIError('Organization nit does not exist', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
  },
  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limipt - Limit number of users to be returned.
   * @returns {Promise<Organization[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .select('name')
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
  },
}

/**
 * @typedef Organization
 */
export default mongoose.models.Organization ||
  mongoose.model('Organization', OrganizationSchema)
