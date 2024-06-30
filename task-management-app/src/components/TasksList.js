import Task from './Task';
export default function TasksList({
  tasks,
  searchText,
  onDeleteTask,
  onUpdateTask,
}) {
  return tasks
    .filter((task) =>
      task.title.trim().toLowerCase().includes(searchText.trim().toLowerCase())
    )
    .map((task) => {
      return (
        <Task
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
        />
      );
    });
}
