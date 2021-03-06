'use strict'

const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
    // required: true // or false??
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    // virtuals: true, // ext??
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

const Upload = mongoose.model('Upload', uploadSchema)

module.exports = Upload
