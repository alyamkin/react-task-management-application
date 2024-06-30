import SearchBar from './SearchBar';
import Sort from './Sort';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function SearchSortPanel({ onSearchTasks, onSortTasks }) {
  return (
    <>
      <Typography variant="h6" component="h2" gutterBottom align="center">
        Search and sort
      </Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <SearchBar onSearchTasks={onSearchTasks} />
          <Sort onSortTasks={onSortTasks} />
        </CardContent>
      </Card>
    </>
  );
}
