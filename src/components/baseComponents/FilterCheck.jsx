import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const FilterCheck = props => {
  const { text, textSx, checked } = props;
  return (
    <FormGroup sx={{ pointerEvents: 'none' }}>
      <FormControlLabel
        sx={{
          width: 'fit-content',
          alignItems: 'center',
          gap: 1,
          margin: 0,
          '& .MuiFormControlLabel-label': {
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '19px',
            color: '#6C788D',
          },
          ...textSx,
        }}
        control={
          <Checkbox
            checked={checked}
            sx={{
              padding: '4px',
              '& .MuiSvgIcon-root': {
                width: 12,
                height: 12,
                border: '1px solid #6C788D',
                borderRadius: '2px',
                backgroundColor: '#FFFFFF',
              },
              '&.Mui-checked .MuiSvgIcon-root': {
                color: '#6C788D',
              },
              color: 'transparent',
            }}
          />
        }
        label={text ?? 'To be filled'}
      />
    </FormGroup>
  );
};
export default FilterCheck;
