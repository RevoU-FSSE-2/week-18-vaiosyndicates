/* eslint-disable prettier/prettier */
const express = require('express');
const todoController = require('../../controllers/todo.controller');
const auth = require('../../middlewares/auth');
// const passport = require('passport');

const router = express.Router();

// router.get('/', todoController.getTodo);
// router.post('/', todoController.addTodo);
// router.delete('/', todoController.delTodo);

router
  .route('/')
  .post(auth('manageTodos'), todoController.addTodo)
  .get(auth('getTodos'), todoController.getTodo);

router.delete('/', auth('manageTodos'), todoController.delTodo);
router.put('/', auth('manageTodos'), todoController.editTodo);  

module.exports = router;