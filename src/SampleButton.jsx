import * as React from 'react';
import Button from '@mui/material/Button';

export default function SampleButton(props) {
  const { message } = props
  return <Button variant="contained">{message}</Button>;
}
