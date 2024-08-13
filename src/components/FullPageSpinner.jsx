
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function FullPageSpinner () {
  return (
    <div
      style={{
        height: '100vh',
        marginTop: '48vh',
        justifyContent: 'center',
        verticalAlign: 'middle',
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