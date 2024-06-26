'use client';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import NextLink from 'next/link';
import { AccountCircle } from '@mui/icons-material';
import { useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import I18nText from '../i18nText/I18nText';

const pages = ['Dashboard', 'Account'];

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logOut } = useAuthContext();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
              <I18nText path={`Header.${page}`} />
            </Button>
          ))}
        </Box>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <I18nText path={'Header.Profile'} />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <I18nText path={'Header.MyAcc'} />
          </MenuItem>
          <MenuItem onClick={logOut}>
            <I18nText path={'Header.Logout'} />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
