import { useState } from 'react';
import Alert from '@mui/material/Alert';

export default function SuccessBox( {text} ) {
  const [open, setOpen] = useState(true);

  return (
    <Alert severity='success' sx={{ marginBottom: '25px' }}>
      {text}
    </Alert>
  );
}