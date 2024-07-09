import { Box } from '@mui/material';
import theme from '../../../theme';
import I18nText from '../i18nText/I18nText';

export default function CreateBox({ loading }: { loading: boolean }) {
  return (
    <Box
      sx={{
        opacity: loading ? 0.6 : 1,
        border: '2px dashed grey',
        color: 'grey',
        width: '200px',
        minHeight: '50px',
        borderRadius: '8px',
        textAlign: 'center',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          cursor: 'pointer',
        },
      }}
    >
      + <I18nText path={'DashboardPage.AddAccount'} />
    </Box>
  );
}
