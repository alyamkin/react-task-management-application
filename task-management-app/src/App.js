import { Fragment } from 'react';
import Header from './components/Header';
import CreateTaskForm from './components/CreateTaskForm';
import { Container } from '@mui/material';
import { Box } from '@mui/material';

const tasks = [];

function App() {
  const createTask = (title, description, dateTime) => {
    console.log(title, description, dateTime);
  };

  return (
    <Fragment>
      <Header />
      <CreateTaskForm onSubmitCreateTaskForm={createTask} />
    </Fragment>
  );
}

export default App;
