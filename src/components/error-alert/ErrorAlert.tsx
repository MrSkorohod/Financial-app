import { useAppSelector } from '@/lib/hooks';
import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import InternationalizationText from '../internationalizationText/InternationalizationText';

export default function ErrorAlert() {
  const { error, errorMessage } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    error && (
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          <InternationalizationText path={errorMessage} />
        </Alert>
      </Snackbar>
    )
  );
}
