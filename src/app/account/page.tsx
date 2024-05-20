'use client';
import { getAccounts } from '@/api/account';
import { Typography } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';

interface Account {}

export default function Account() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const initialized = useRef(false);

  useLayoutEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      getAccounts().then(setAccounts);
    }
  }, []);

  console.log(accounts);
  return <Typography>Account Page</Typography>;
}
