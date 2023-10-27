/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const Todo = require('../models/todo.model')

mongoose.set('useFindAndModify', false);

const getAllTodo = async (id) => {
  const todo = await Todo.find({$and:[{"idUser": id}, {isDeleted: false}]}).select('_id title time status idUser').exec();
  return todo;
}

const getTodobyId = async (idTodo, idUser) => {
  // eslint-disable-next-line object-shorthand
  const detailTodo = await Todo.findOne({$and:[{ "_id": mongoose.mongo.ObjectId(idTodo)}, {isDeleted: false}, {idUser: idUser}]});
  return detailTodo
}

const createTodo = async (todo) => {
  const newTodo = await Todo.create(todo)
  return newTodo
}

const softDelTodo = async (id, idUser, todo) => {
  const softDelete = await Todo.findByIdAndUpdate({"_id" : id, "idUser" : idUser }, todo);
  return softDelete
}

const updateTodo = async (idTodo, idUser, data) => {
  const updatedTodo = await Todo.findOneAndUpdate({"_id" : idTodo, "idUser" : idUser }, {
    "$set": {
      "title": data.title,
      "time" : data.time
    }
  }).exec();
  return updatedTodo 
};


module.exports = {
  getAllTodo,
  createTodo,
  softDelTodo,
  getTodobyId,
  updateTodo
};
