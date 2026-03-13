import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
const SearchBar = props => {
  const { text, textSx } = props;
  return (
    <>
      {/* <TextField */}
      {/*   sx={{ */}
      {/*     minWidth: 320, */}
      {/*     backgroundColor: '#FFFFFF', */}
      {/*     borderRadius: 12, */}
      {/*   }} */}
      {/*   variant="outlined" */}
      {/*   id="searchbar" */}
      {/*   label={text ?? 'To be filled'} */}
      {/* /> */}
      <InputBase
        placeholder={text ?? 'to be filled'}
        inputProps={{ 'aria-label': 'search' }}
        endAdornment=<InputAdornment posiiton="end">
          <SearchIcon />
        </InputAdornment>
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
