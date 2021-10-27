const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * DS-160 User Schema
 */
const UserSchema = new mongoose.Schema({
  batch: {
    type: Number
  },
  fullname: {
    type: String
  },
  username: {
    type: String
  },
  followers: {
    type: Number
  },
  likes: {
    type: Number
  },
  replyCount: {
    type: Number
  },
  quoteCount: {
    type: Number
  },
  tweetsCount: {
    type: Number
  },
  totalPoints: {
    type: Number
  },
  ipaddr: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, { usePushEach: true });

/**
 * Methods
 */
UserSchema.method({});

UserSchema.index({ createdAt: -1 });

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 10 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  smlist({ skip = 0, limit = 10, filters } = {}) {
    return this.find(filters)
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
