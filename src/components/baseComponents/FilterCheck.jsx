import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const FilterCheck = props => {
  const { text, textSx } = props;
  return (
    <FormGroup>
      <FormControlLabel
        sx={{
          width: 'fit-content',
          borderRadius: 1,
          alignItems: 'center',
          pr: 2,
          backgroundColor: '#FFFFFF',
          '& .MuiFormControlLabel-label': {
            fontSize: 16,
            fontWeight: 400,
            color: '#6C788D',
            mt: 0.3,
          },
          ...textSx,
        }}
        control={<Checkbox />}
        label={text ?? 'To be filled'}
      />
    </FormGroup>
  );
};
export default FilterCheck;
