import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleCharactersError = (value) => {
    if (value.length < 3 || value.length > 50) {
      throw new Error(
        alert(
          'Todo must have at least 3 characters and less than 50 characters.'
        )
      );
    }
  };

  const addTodo = async () => {
    handleCharactersError(todo);

    try {
      await axios.post('https://todo-mysql-backend.herokuapp.com/create', {
        todo,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllTodos = async () => {
    try {
      await axios
        .get('https://todo-mysql-backend.herokuapp.com/')
        .then((response) => {
          setTodoList(response.data);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateTodo = async (id) => {
    handleCharactersError(newTodo);

    try {
      await axios
        .put(`https://todo-mysql-backend.herokuapp.com/update/${id}`, {
          id,
          todo: newTodo,
        })
        .then((response) => {
          console.log(response.data);
          setTodoList(
            todoList.map((val) =>
              val.id === id ? {id: val.id, todo: val.todo} : val
            )
          );
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios
        .delete(`https://todo-mysql-backend.herokuapp.com/${id}`)
        .then((response) => {
          setTodoList(todoList.filter((val) => val.id !== id));
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo();
    setTodo('');
  };

  useEffect(() => {
    getAllTodos();
  }, [todoList]);

  return (
    <div className='App'>
      <Container fluid className='mt-3'>
        <Row className='justify-content-md-center'>
          <Col xs='12' md='10' lg='8' xl='6'>
            <h1 className='mb-4 text-center'>Todo App</h1>
            <Form onSubmit={handleSubmit}>
              <InputGroup className='mb-3'>
                <FormControl
                  placeholder='Todo...'
                  aria-label='Todo'
                  aria-describedby='basic-addon2'
                  onChange={(event) => {
                    setTodo(event.target.value);
                  }}
                  value={todo}
                />
                <Button
                  variant='outline-primary'
                  id='button-addon2'
                  onClick={handleSubmit}
                >
                  Add Todo
                </Button>
              </InputGroup>
            </Form>
            <ListGroup as='ul'>
              <h4>
                You have {todoList.length}{' '}
                {todoList.length === 1 ? 'todo' : 'todos'}
              </h4>
              {todoList.map((val) => {
                return (
                  <ListGroup.Item
                    className='d-flex justify-content-between align-items-center'
                    as='li'
                    key={val.id}
                  >
                    {val.todo}
                    <div className='d-flex justify-content-center'>
                      <Form
                        onSubmit={(event) => {
                          event.preventDefault();
                          updateTodo(val.id);
                        }}
                      >
                        <InputGroup>
                          <FormControl
                            placeholder='Edit todo'
                            onChange={(event) => {
                              setNewTodo(event.target.value);
                            }}
                          />
                          <Button
                            variant='outline-primary'
                            onClick={() => updateTodo(val.id)}
                          >
                            Update
                          </Button>
                        </InputGroup>
                      </Form>
                      <Button
                        style={{marginLeft: 10}}
                        variant='outline-danger'
                        onClick={() => deleteTodo(val.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
