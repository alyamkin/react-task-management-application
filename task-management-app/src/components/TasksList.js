import Task from './Task';
import Typography from '@mui/material/Typography';

export default function TasksList({
  tasks,
  searchText,
  sortBy,
  onDeleteTask,
  onUpdateTask,
}) {
  const filterTasks = (task) =>
    trimToLowerString(task.title).includes(trimToLowerString(searchText));

  const trimToLowerString = (string) => string.trim().toLowerCase();

  const sortTasksByString = (a, b) => {
    if (trimToLowerString(a[sortBy]) < trimToLowerString(b[sortBy])) {
      return -1;
    }
    if (trimToLowerString(a[sortBy]) > trimToLowerString(b[sortBy])) {
      return 1;
    }
    return 0;
  };

  const sortTasksByObject = (a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }
    return 0;
  };

  const sortTasks = (a, b) => {
    if (sortBy === 'dueDateTime') {
      return sortTasksByObject(a, b);
    }

    return sortTasksByString(a, b);
  };

  const createTasksCard = (task) => {
    return (
      <Task
        key={task.id}
        task={task}
        onDeleteTask={onDeleteTask}
        onUpdateTask={onUpdateTask}
      />
    );
  };

  return (
    <>
      {tasks.length > 0 && (
        <Typography variant="h6" component="h2" gutterBottom align="center">
          Tasks List
        </Typography>
      )}
      {[...tasks].sort(sortTasks).filter(filterTasks).map(createTasksCard)}
    </>
  );
}
