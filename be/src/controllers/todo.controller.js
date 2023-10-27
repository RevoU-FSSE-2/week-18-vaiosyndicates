/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { todoService } = require('../services');

const getTodo = catchAsync(async (req, res) => {
  const { id } = req.query
  try {
    const todo = await todoService.getAllTodo(id);
    res.status(httpStatus.CREATED).send({ 
      code: httpStatus.CREATED,
      message: 'Success',
      data: todo
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ 
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Failed',
      data: error.message
    });
  }
 
});

const addTodo = catchAsync( async (req, res ) => {
  await todoService.createTodo(req.body)
  // eslint-disable-next-line no-console
  res.status(httpStatus.NO_CONTENT).send({ 
    code: httpStatus.NO_CONTENT,
    message: 'Success'
  });
})

const delTodo = catchAsync( async ( req, res ) => {
  const {id, idUser } = req.body
  // console.log(req)
  try {
    const checkTodo = await todoService.getTodobyId(id, idUser)
    if(checkTodo !== null ){
      const payload = {
        isDeleted: !checkTodo.isDeleted,
        updatedAt: new Date()
      }
      await todoService.softDelTodo(id, checkTodo.idUser, payload)
      res.status(httpStatus.CREATED).send({ 
        code: httpStatus.CREATED,
        message: 'Success'
      });
    } else {
      res.status(httpStatus.NOT_FOUND).send({ 
        code: httpStatus.NOT_FOUND,
        message: 'Todo not found'
      });
    }
    
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ 
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message
    });
  }
})

const editTodo = catchAsync( async (req, res) => {
  const {id, idUser, title, time } = req.body
  try {
    const checkTodo = await todoService.getTodobyId(id, idUser)
    // console.log(checkTodo)
    if(checkTodo !== null ){
      const payload = {
        title: title === '' ? checkTodo.title : title,
        time: time === '' ? checkTodo.time : time,
        updatedAt: new Date()
      }
      await todoService.updateTodo(id, idUser, payload)
      res.status(httpStatus.CREATED).send({ 
        code: httpStatus.CREATED,
        message: 'Success'
      });
    } else {
      res.status(httpStatus.NOT_FOUND).send({ 
        code: httpStatus.NOT_FOUND,
        message: 'Todo not found'
      });
    }
    
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ 
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message
    });
  }
})

module.exports = {
  getTodo,
  addTodo,
  delTodo,
  editTodo
};
