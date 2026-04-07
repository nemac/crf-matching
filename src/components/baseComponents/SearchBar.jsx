import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, InputAdornment } from '@mui/material';
const SearchBar = props => {
  const { text, textSx, onChange, loading } = props;
  return (
    <>
      <InputBase
        placeholder={text ?? 'to be fillllled'}
        inputProps={{ 'aria-label': 'search' }}
        endAdornment={
          <InputAdornment position="end">
            {loading ? <CircularProgress size={20} /> : <SearchIcon />}
          </InputAdornment>
        }
        onChange={onChange}
        sx={{
          backgroundColor: '#FFFFFF',
          minWidth: 0,
          flexGrow: 1,
          borderRadius: 3,
          '& .MuiInputAdornment-root': {
            pr: 2,
          },
          '& input': {
            pl: 3,
            pt: 0.5,
          },
          ...textSx,
        }}
      >
        <></>
      </InputBase>
    </>
  );
};
export default SearchBar;
