
import { Stack, styled } from '@mui/material'

export default styled(Stack)(({ theme }) => ({
  marginRight: '5px',
  marginLeft: '5px',
  padding: '10px',
  border: `1px solid ${theme.palette.primary.borderGray }`,
  borderRadius: '15px',
}));
