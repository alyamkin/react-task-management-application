import { useState, Fragment, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import Header from './components/Header';
import CreateTaskForm from './components/CreateTaskForm';
import TasksList from './components/TasksList';
import { Container } from '@mui/material';
import SearchSortPanel from './components/SearchSortPanel';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    const updatedTasks = tasks.map((task) => {
      if (dayjs().isAfter(dayjs(task.dueDateTime))) {
        return {
          ...task,
          status: 'Overdue',
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  }, [searchText, sortBy]);

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

  const sortTasks = (sort) => {
    setSortBy(sort);
  };

  return (
    <Fragment>
      <Header />
      <Container maxWidth="md">
        <CreateTaskForm onSubmitCreateTaskForm={createTask} />
      </Container>
      <Container maxWidth="sm">
        <SearchSortPanel onSearchTasks={searchTasks} onSortTasks={sortTasks} />
        <TasksList
          tasks={tasks}
          searchText={searchText}
          sortBy={sortBy}
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
        />
      </Container>
    </Fragment>
  );
}

export default App;
