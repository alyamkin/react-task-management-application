import { useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';

export default function SearchBar({ onSearchTasks }) {
  const [searchText, setSearchText] = useState('');

  const debounceSearch = useCallback(debounce(onSearchTasks, 1000), []);

  const handleChangeSearchTask = (e) => {
    const value = e.target.value;
    setSearchText(value);
    debounceSearch(value);
  };

  return (
    <TextField
      value={searchText}
      onChange={handleChangeSearchTask}
      onBlur={() => {
        setSearchText('');
        onSearchTasks('');
      }}
      label="Search by title"
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      fullWidth
    />
  );
}
