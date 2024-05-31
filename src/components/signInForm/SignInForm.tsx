'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAuthContext } from '@/contexts/AuthContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { emailPattern, maxEmailLength, minPasswordLength } from '@/utils';

type FormValues = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const { logIn, registerUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

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
          label="Email"
          {...register('email', {
            required: 'Email is required',
            validate: {
              maxLength: (v) =>
                v.length <= maxEmailLength ||
                'The email should have at most 50 characters',
              matchPattern: (v) =>
                emailPattern.test(v) || 'Email address must be a valid address',
            },
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
          error={!!errors.email}
          helperText={errors.email?.message && `${errors.email.message}`}
        />
        <TextField
          label="Password"
          type="password"
          {...register('password', {
            required: 'You must specify a password',
            minLength: {
              value: minPasswordLength,
              message: 'Password must have at least 6 characters',
            },
          })}
          aria-invalid={errors.password ? 'true' : 'false'}
          error={!!errors.password}
          helperText={errors.password?.message && `${errors.password.message}`}
        />
        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </Button>
        <Typography textAlign="center">or</Typography>
        <Button onClick={handleSubmit(onSubmitForCreate)}>Create User</Button>
      </Box>
    </Box>
  );
}
