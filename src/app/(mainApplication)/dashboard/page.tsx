'use client';
import useUser from '@/hooks/useUser';
import {
  getDashboardsDataThunk,
  deleteDashboardDataThunk,
} from '@/lib/actionThunks/dashboardsData';
import { getDashboards } from '@/lib/features/dashboards/dashboardsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Button,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import theme from '../../../../theme';
import CreateBox from '@/components/createBox/CreateBox';
import DashboardDialog from '@/components/dashboardDialog/DashboardDialog';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const user = useUser().user;
  const dashboards = useAppSelector(getDashboards);
  const { loading } = useAppSelector((state) => state.dashboards);
  const [isOpen, setIsOpen] = useState(false);
  const [editingDashboardUid, setEditingDashboardUid] = useState<string>('');

  const handleModalState = () => {
    setEditingDashboardUid('');
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (user?.uid) {
      dispatch(getDashboardsDataThunk({ uid: user.uid }));
    }
  }, [dispatch, user?.uid]);

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

  const openEditDashboard = useCallback((uid: string) => {
    setEditingDashboardUid(uid);
    setIsOpen(true);
  }, []);

  // console.log(dashboards);

  return (
    <>
      <Box sx={{ position: 'relative', padding: '20px' }}>
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
          display="flex"
          flexWrap="wrap"
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
              <Box
                display="flex"
                flexDirection="column"
              >
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="secondary"
                  onClick={() => openEditDashboard(dashboard.uid)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="secondary"
                  onClick={() => deleteDashboard(dashboard.uid)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Button onClick={handleModalState}>
            <CreateBox
              // userUid={user?.uid || ''}
              loading={loading}
            />
          </Button>

          <DashboardDialog
            dashboardUid={editingDashboardUid}
            handleOpenState={handleModalState}
            isOpen={isOpen}
          />
        </Box>
      </Box>
    </>
  );
}
