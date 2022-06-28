import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const TodoForm = (props) => {
  const {handleSubmit, setTodo, todo} = props;
  return (
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
  );
};

export default TodoForm;
