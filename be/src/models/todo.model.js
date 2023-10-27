/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const todoSchema = new mongoose.Schema(
  {
    idUser: String,
    title: String,
    time: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

todoSchema.plugin(toJSON);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

