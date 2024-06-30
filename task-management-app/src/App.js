import { useState, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import CreateTaskForm from './components/CreateTaskForm';
import TasksList from './components/TasksList';
import { Container } from '@mui/material';
import SearchBar from './components/SearchBar';
import { Box } from '@mui/material';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');

  const createTask = (title, description, dueDateTime) => {
    const task = {
      id: uuidv4(),
      title,
      description,
      dueDateTime,
      status: 'Pending',
    };
    setTasks([...tasks, task]);
  };

  const updateTask = (id, title, description, dueDateTime, status) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          title,
          description,
          dueDateTime,
          status,
        };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const searchTasks = (search) => {
    setSearchText(search);
  };

  return (
    <Fragment>
      <Header />
      <CreateTaskForm onSubmitCreateTaskForm={createTask} />
      <Container maxWidth="sm">
        <SearchBar onSearchTasks={searchTasks} />
      </Container>
      <Container maxWidth="sm">
        <TasksList
          tasks={tasks}
          searchText={searchText}
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
        />
      </Container>
    </Fragment>
  );
}

export default App;
