import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
const SearchBar = props => {
  const { text, textSx, onChange } = props;
  return (
    <>
      <InputBase
        placeholder={text ?? 'to be fillllled'}
        inputProps={{ 'aria-label': 'search' }}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        onChange={onChange}
        sx={{
          backgroundColor: '#FFFFFF',
          minWidth: 320,
          borderRadius: 3,
          '& .MuiInputAdornment-root': {
            pr: 2,
          },
          '& input': {
            pl: 3,
            pt: 0.5,
          },
        }}
      >
        <></>
      </InputBase>
    </>
  );
};
export default SearchBar;
