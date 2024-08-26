
import { Stack, styled } from '@mui/material'

export default styled(Stack)(({ theme }) => ({
  padding: 10,
  border: `1px solid ${theme.palette.primary.borderGray }`,
  borderRadius: 10
}));
