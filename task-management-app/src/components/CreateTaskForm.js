import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const styles = {
  field: {
    marginBottom: '20px',
  },
  datePicker: {
    width: '100%',
    marginBottom: '20px',
  },
};

export default function CreateTaskForm({ onSubmitCreateTaskForm }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDateTime, setDueDateTime] = useState(dayjs());
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [dueDateTimeErrorMessage, setDueDateTimeErrorMessage] = useState('');

  // TODO: code duplication. Create custome hook
  const isFormInvalid = () => {
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

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setDueDateTime(dayjs());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormInvalid()) return;

    onSubmitCreateTaskForm(title, description, dueDateTime.format());
    clearForm();
  };

  const onChangeTitle = (e) => {
    const value = e.target.value;
    value.length > 0 ? setTitleError(false) : setTitleError(true);
    setTitle(value);
  };

  const onChangeDescription = (e) => {
    const value = e.target.value;
    value.length > 0 ? setDescriptionError(false) : setDescriptionError(true);
    setDescription(value);
  };

  const onChangeDateTimePicker = (value) => {
    setDueDateTimeErrorMessage('');
    setDueDateTime(dayjs(value));
  };

  return (
    <Accordion sx={{ mb: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Create a new Task
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={onChangeTitle}
            value={title}
            sx={styles.field}
            label="Title"
            variant="outlined"
            fullWidth
            error={titleError}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              sx={styles.datePicker}
              label="Due Date and Time"
              value={dueDateTime}
              onChange={onChangeDateTimePicker}
              disablePast
              slotProps={{
                textField: {
                  helperText: dueDateTimeErrorMessage,
                },
              }}
            />
          </LocalizationProvider>
          <TextField
            onChange={onChangeDescription}
            value={description}
            sx={styles.field}
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            error={descriptionError}
            required
          />
          <Button type="submit" color="primary" variant="contained">
            {' '}
            Create Task
          </Button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
}
