'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAuthContext } from '@/contexts/AuthContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { emailPattern, maxEmailLength, minPasswordLength } from '@/constants';
import { useAppSelector } from '@/lib/hooks';
import I18nText from '../i18nText/I18nText';
import useI18n from '@/hooks/useI18n';

type FormValues = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const { logIn, registerUser } = useAuthContext();
  const { loading } = useAppSelector((state) => state.auth);

  const emailRequired = useI18n('ErrorMessages.EmailRequired');
  const emailMaxLength = useI18n('ErrorMessages.EmailMaxLength');
  const emailValid = useI18n('ErrorMessages.EmailValid');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormValues> = (data: {
    email: string;
    password: string;
  }) => logIn(data.email, data.password);

  const onSubmitForCreate: SubmitHandler<FormValues> = (data: {
    email: string;
    password: string;
  }) => registerUser(data.email, data.password);

  return (
    <Box
      display="flex"
      justifyContent="center"
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        display="flex"
        flexDirection="column"
        width="250px"
        gap="10px"
        onSubmit={(event) => event.preventDefault()}
      >
        <TextField
          label={I18nText({ path: 'LoginPage.Email' })}
          {...register('email', {
            required: emailRequired,
            validate: {
              maxLength: (v) => v.length <= maxEmailLength || emailMaxLength,
              matchPattern: (v) => emailPattern.test(v) || emailValid,
            },
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
          error={!!errors.email}
          helperText={errors.email?.message && `${errors.email.message}`}
          disabled={loading}
        />
        <TextField
          label={I18nText({ path: 'LoginPage.Password' })}
          type="password"
          {...register('password', {
            required: I18nText({
              path: 'ErrorMessages.PasswordSpecify',
            }),
            minLength: {
              value: minPasswordLength,
              message: I18nText({
                path: 'ErrorMessages.PasswordMinLength',
              }),
            },
          })}
          aria-invalid={errors.password ? 'true' : 'false'}
          error={!!errors.password}
          helperText={errors.password?.message && `${errors.password.message}`}
          disabled={loading}
        />
        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <I18nText path={'LoginPage.Login'} />
        </Button>
        <Typography textAlign="center">
          <I18nText path={'LoginPage.Or'} />
        </Typography>
        <Button
          onClick={handleSubmit(onSubmitForCreate)}
          disabled={loading}
        >
          <I18nText path={'LoginPage.CreateUser'} />
        </Button>
      </Box>
    </Box>
  );
}
