import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
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
        sx={{
          backgroundColor: '#FFFFFF',
          minWidth: 320,
          borderRadius: 12,
          '& input::placeholder': {
            p: 2,
          },
        }}
      >
        <></>
      </InputBase>
    </>
  );
};
export default SearchBar;
