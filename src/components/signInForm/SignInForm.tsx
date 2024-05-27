'use client';
import { auth } from '@/firebase-config';
import { useAppDispatch } from '@/lib/hooks';
import { Box, Button, TextField, Typography } from '@mui/material';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { login } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignInForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const route = useRouter();

  const createOrLoginUser = async (isNewUser = false) => {
    const loginUser = isNewUser
      ? createUserWithEmailAndPassword(auth, email, password)
      : signInWithEmailAndPassword(auth, email, password);

    await loginUser
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(login(user.uid));
      })
      .then(() => {
        route.replace('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('An error occurred: ', errorCode, errorMessage);
      });
  };

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
        maxWidth="250px"
        gap="10px"
      >
        <TextField
          required
          label="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => createOrLoginUser()}
        >
          Login
        </Button>
        <Typography textAlign="center">or</Typography>
        <Button onClick={() => createOrLoginUser(true)}>Create User</Button>
      </Box>
    </Box>
  );
}
