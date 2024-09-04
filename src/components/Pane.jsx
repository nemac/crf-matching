
import { Stack, styled } from '@mui/material'

export default styled(Stack)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  border: `1px solid ${theme.palette.primary.borderGray }`,
  borderRadius: 10,
}));
