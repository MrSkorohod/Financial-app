import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import NextLink from 'next/link';

const pages = ['Dashboard', 'Account'];

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <AccountBalanceWalletTwoToneIcon sx={{ m: '0 10px' }} />
        <Typography
          variant="h6"
          noWrap
          sx={{
            margin: '0 16px',
          }}
        >
          Financial Wallet
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          {pages.map((page) => (
            <Button
              key={page}
              component={NextLink}
              href={page.toLocaleLowerCase()}
              sx={{ color: 'white', display: 'block' }}
            >
              {page}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
