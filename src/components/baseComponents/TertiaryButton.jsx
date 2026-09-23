import { Button } from '@mui/material';

const TertiaryButton = props => {
  const { children = 'Action', sx, ...rest } = props;
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
      {...rest}
    >
      {children}
    </Button>
  );
};
export default TertiaryButton;
