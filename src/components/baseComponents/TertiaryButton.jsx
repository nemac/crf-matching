import { Button } from '@mui/material';

const TertiaryButton = ({ children = 'Action', sx, ...props }) => {
  return (
    <Button
      sx={{
        width: 'auto',
        pt: '8px',
        pb: '8px',
        backgroundColor: '#FFFFFF',
        '&:hover': {
          bgcolor: '#99DDFF',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
export default TertiaryButton;
