
import styles from '../styles';
import { Stack, styled } from '@mui/material'


const Pane = styled(Stack)(({ theme }) => ({
  marginRight: '5px',
  marginLeft: '5px',
  padding: '10px',
  border: `1px solid ${styles.colors.borderGray }`,
  borderRadius: '15px',
}));

export default Pane;

