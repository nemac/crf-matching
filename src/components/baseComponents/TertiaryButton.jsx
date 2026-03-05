import { Button } from '@mui/material';

const TertiaryButton = () => {
  return (
    <>
      <Button
        sx={{
          width: 'auto',
          height: '37px',
          pt: '8px',
          pb: '8px',
          backgroundColor: '#FFFFFF',
          '&:hover': {
            bgcolor: '#99DDFF',
          },
        }}
      >
        Action
      </Button>
    </>
  );
};
export default TertiaryButton;
