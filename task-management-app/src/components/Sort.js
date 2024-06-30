import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Sort({ onSortTasks }) {
  const [sortBy, setSortBy] = useState('title');

  const handleChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    onSortTasks(value);
  };

  return (
    <FormControl>
      <FormLabel id="radio-buttons-group">Sorting Tasks</FormLabel>
      <RadioGroup
        aria-labelledby="radio-buttons-group"
        name="radio-buttons-group"
        value={sortBy}
        onChange={handleChange}
        row
      >
        <FormControlLabel value="title" control={<Radio />} label="By Title" />
        <FormControlLabel
          value="status"
          control={<Radio />}
          label="By Status"
        />
        <FormControlLabel
          value="dueDateTime"
          control={<Radio />}
          label="By Due Date and Time"
        />
      </RadioGroup>
    </FormControl>
  );
}
