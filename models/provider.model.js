import mongoose from 'mongoose'
import httpStatus from 'http-status'
import APIError from '../lib/APIError'

/**
 * Provider Schema
 */
const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    lowercase: false,
    trim: true,
  },
  nit: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  taxes: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        required: true,
      },
    },
  ],
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
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
ProviderSchema.method({})

/**
 * Statics
 */
ProviderSchema.statics = {
  /**
   * Get provider
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Provider, APIError>}
   */
  get(id) {
    return this.findByNit(nit)
      .select('name nit taxes')
      .exec()
      .then((provider) => {
        if (provider) {
          return provider
        }
        const err = new APIError(
          'Provider nit does not exist',
          httpStatus.NOT_FOUND,
        )
        return Promise.reject(err)
      })
  },
  /**
   * List providers by organization
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limipt - Limit number of users to be returned.
   * @returns {Promise<Provider[]>}
   */
  list({ skip = 0, limit = 50, organization } = {}) {
    return this.find({ 'organization.id': organization})
      .select('name nit taxes createdAt updatedAt ')
      .populate('organization')
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
  },
}

/**
 * @typedef Provider
 */
export default mongoose.models.Provider ||
  mongoose.model('Provider', ProviderSchema)
