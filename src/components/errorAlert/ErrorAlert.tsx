'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Alert, Snackbar } from '@mui/material';
import I18nText from '../i18nText/I18nText';
import { closeError } from '@/lib/features/auth/authSlice';

export default function ErrorAlert() {
  const { error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeError());
  };

  return (
    error && (
      <Snackbar
        open={!!error}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          <I18nText path={error} />
        </Alert>
      </Snackbar>
    )
  );
}
