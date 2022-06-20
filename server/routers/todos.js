const {Router} = require('express');
const {TodoRecord} = require('../records/todo.record');
const {pool} = require('../utils/db');

const TodoRouter = Router();

TodoRouter.get('/', async (req, res) => {
  const todosList = await TodoRecord.listAll();

  res.send(todosList);
})
  .post('/create', async (req, res) => {
    const newTodo = new TodoRecord(req.body);
    await newTodo.insert();

    res.send('Values inserted successfully');
  })
  .delete('/:id', async (req, res) => {
    const todo = await TodoRecord.getOne(req.params.id);
    await todo.delete();
  })
  .put('/update/:id', async (req, res) => {
    const todo = await TodoRecord.getOne(req.params.id);
    await todo.update(req.body.id, req.body.todo);
  });

module.exports = {
  TodoRouter,
};
