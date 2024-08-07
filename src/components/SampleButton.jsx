import * as React from 'react';
import Button from '@mui/material/Button';

export default function SampleButton({ count, onClick, message }) {
  return <Button onClick={ onClick } variant="contained">{`You have clicked me ${count} times!`}</Button>;
}
