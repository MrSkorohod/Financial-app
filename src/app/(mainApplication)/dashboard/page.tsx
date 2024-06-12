'use client';
import useUser from '@/hooks/useUser';
import {
  getDashboardsDataThunk,
  createDashboardDataThunk,
  deleteDashboardDataThunk,
} from '@/lib/actionThunks/dashboardsData';
import { getDashboards } from '@/lib/features/dashboards/dashboardsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../../../../theme';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const user = useUser().user;
  const dashboards = useAppSelector(getDashboards);
  const { loading } = useAppSelector((state) => state.dashboards);

  useEffect(() => {
    if (user?.uid) {
      dispatch(getDashboardsDataThunk({ uid: user.uid }));
    }
  }, [dispatch, user?.uid]);

  const addDashboard = () => {
    dispatch(
      createDashboardDataThunk({
        uid: user?.uid || '',
        cash: 0,
        name: 'Test',
      })
    );
  };

  const deleteDashboard = useCallback(
    (uid: string) => {
      dispatch(
        deleteDashboardDataThunk({
          userUid: user?.uid || '',
          dashboardUid: uid,
        })
      );
    },
    [dispatch, user?.uid]
  );

  return (
    <>
      <Box sx={{ position: 'relative', paddingLeft: '20px' }}>
        {loading && (
          <CircularProgress
            size={'64px'}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
            }}
          />
        )}
        <Box
          display={'flex'}
          sx={{
            minHeight: '80px',
            alignItems: 'center',
          }}
        >
          {dashboards.map((dashboard) => (
            <Box
              key={dashboard.uid}
              sx={{
                opacity: loading ? 0.6 : 1,
                width: '200px',
                minHeight: '50px',
                bgcolor: theme.palette.primary.main,
                margin: '0 10px 6px 0',
                borderRadius: '8px',
                padding: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Box>
                <Typography sx={{ color: 'white' }}>
                  {dashboard.name}
                </Typography>
                <Typography sx={{ color: 'white' }}>
                  {dashboard.cash}
                </Typography>
              </Box>

              <IconButton
                aria-label="delete"
                size="small"
                color="secondary"
                onClick={() => deleteDashboard(dashboard.uid)}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>

      <Button
        variant="text"
        color="primary"
        onClick={addDashboard}
      >
        Button
      </Button>
    </>
  );
}
