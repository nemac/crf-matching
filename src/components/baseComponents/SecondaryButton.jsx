import { Button } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SecondaryButton = () => {
  return (
    <>
      <Button
        startIcon=<SearchOutlinedIcon />
        sx={{
          width: 'auto',
          height: '40px',
          backgroundColor: '#FFDDBB',
          '&:hover': {
            bgcolor: '#FFC299',
          },
        }}
      >
        Action
      </Button>
    </>
  );
};
export default SecondaryButton;
