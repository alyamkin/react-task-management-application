import { useState } from 'react';
import dayjs from 'dayjs';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const styles = {
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: '20px',
  },
};

export default function Task({ task, onDeleteTask, onUpdateTask }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDateTime, setDueDateTime] = useState(dayjs(task.dueDateTime));
  const [status, setStatus] = useState(task.status);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [dueDateTimeErrorMessage, setDueDateTimeErrorMessage] = useState('');
  const [editTask, setEditTask] = useState(false);

  const handleClickDeleteTask = () => {
    onDeleteTask(task.id);
  };

  const handleClickEditTask = () => setEditTask(true);

  const handleClickSaveEditing = () => {
    if (isTaskInvalid()) return;

    if (!isTaskModified()) return;

    onUpdateTask(task.id, title, description, dueDateTime.format(), status);
    setEditTask(false);
  };

  const handleClickCancelEditing = () => {
    setEditTask(false);
    setTitle(task.title);
    setDueDateTime(dayjs(task.dueDateTime));
    setDescription(task.description);
    setStatus(task.status);
    setTitleError(false);
    setDescriptionError(false);
    setDueDateTimeErrorMessage('');
  };

  const handleChangeTitle = (e) => {
    const value = e.target.value;
    value.length > 0 ? setTitleError(false) : setTitleError(true);
    setTitle(value);
  };

  const handleChangeDescription = (e) => {
    const value = e.target.value;
    value.length > 0 ? setDescriptionError(false) : setDescriptionError(true);
    setDescription(value);
  };

  const handleChangeStatus = (e) => setStatus(e.target.value);

  const handleChangeDueDateTime = (value) => {
    setDueDateTime(dayjs(value));
  };

  // TODO: code duplication. Create custome hook
  const isTaskInvalid = () => {
    const invalidTitle = title === '';
    const invalidDescription = description === '';
    const invalidDueDateTime = dayjs(dueDateTime) < dayjs();

    if (invalidTitle) {
      setTitleError(true);
    }

    if (invalidDescription) {
      setDescriptionError(true);
    }

    if (invalidDueDateTime) {
      setDueDateTimeErrorMessage('Please select future date and time');
    }

    return invalidTitle || invalidDescription || invalidDueDateTime;
  };

  const isTaskModified = () => {
    const modifiedTitle = title !== task.title;
    const modifiedDescription = description !== task.description;
    const modifiedDueDateTime = !dueDateTime.isSame(dayjs(task.dueDateTime));
    const modifiedStatus = status !== task.status;

    return (
      modifiedTitle ||
      modifiedDescription ||
      modifiedDueDateTime ||
      modifiedStatus
    );
  };

  const titleContent = editTask ? (
    <TextField
      value={title}
      label="Title"
      size="small"
      variant="outlined"
      fullWidth
      error={titleError}
      required
      onChange={handleChangeTitle}
    ></TextField>
  ) : (
    task.title
  );

  const titleTypographyProps = {
    variant: 'h6',
    sx: editTask ? styles.title : {},
  };

  const subheaderContent = editTask ? (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Due Date and Time"
        value={dueDateTime}
        size="small"
        onChange={handleChangeDueDateTime}
        disablePast
        slotProps={{
          textField: {
            helperText: dueDateTimeErrorMessage,
            size: 'small',
          },
        }}
      />
    </LocalizationProvider>
  ) : (
    `Due: ${dayjs(task.dueDateTime).format('MMMM D, YYYY h:mm A')}`
  );

  const descriptionContent = editTask ? (
    <TextField
      value={description}
      label="Description"
      size="small"
      variant="outlined"
      multiline
      rows={4}
      fullWidth
      error={descriptionError}
      required
      onChange={handleChangeDescription}
    ></TextField>
  ) : (
    <Typography variant="body2" color="text.secondary">
      {task.description}
    </Typography>
  );

  const statusColours = {
    Pending: 'primary.main',
    Completed: 'success.main',
    Overdue: 'error.main',
  };

  const isTaskOverdue = dayjs().isAfter(dayjs(task.dueDateTime));

  const getTaskStatus = () => {
    if (isTaskOverdue) {
      return 'Overdue';
    }

    return task.status;
  };

  const statusContent = editTask ? (
    <FormControl>
      <InputLabel id="status-label">Status</InputLabel>
      <Select
        size="small"
        labelId="status-label"
        id="status-select"
        value={status}
        label="Status"
        onChange={handleChangeStatus}
      >
        <MenuItem value={'Pending'}>Pending</MenuItem>
        <MenuItem value={'Completed'}>Completed</MenuItem>
      </Select>
    </FormControl>
  ) : (
    <Typography
      color={statusColours[getTaskStatus()]}
    >{`Status: ${getTaskStatus()}`}</Typography>
  );

  return (
    <Card>
      <CardHeader
        title={titleContent}
        titleTypographyProps={titleTypographyProps}
        subheader={subheaderContent}
        action={
          <IconButton aria-label="delete task" onClick={handleClickDeleteTask}>
            <DeleteIcon />
          </IconButton>
        }
      ></CardHeader>
      <CardContent>{descriptionContent}</CardContent>
      <CardActions sx={styles.cardActions}>
        <Box>{statusContent}</Box>
        <Box>
          {!editTask && (
            <IconButton
              aria-label="edit task"
              color="primary"
              onClick={handleClickEditTask}
            >
              <EditIcon />
            </IconButton>
          )}
          {editTask && (
            <IconButton
              aria-label="save task changes"
              color="success"
              onClick={handleClickSaveEditing}
            >
              <CheckCircleIcon />
            </IconButton>
          )}
          {editTask && (
            <IconButton
              aria-label="cancel task changes"
              color="error"
              onClick={handleClickCancelEditing}
            >
              <CancelIcon />
            </IconButton>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
