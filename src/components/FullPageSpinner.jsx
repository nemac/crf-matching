
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function FullPageSpinner () {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }} 
    >
      <Box>
        <CircularProgress />
      </Box>
    </div>
  )
}

export default FullPageSpinner