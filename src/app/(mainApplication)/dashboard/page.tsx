'use client';
import useUser from '@/hooks/useUser';
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Button,
} from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import theme from '../../../../theme';
import CreateBox from '@/components/createBox/CreateBox';
import DashboardDialog from '@/components/dashboardDialog/DashboardDialog';
import {
  useDeleteDashboardMutation,
  useGetDashboardsQuery,
} from '@/lib/features/dashboards/dashboards';

export default function Dashboard() {
  const user = useUser().user;
  const [isOpen, setIsOpen] = useState(false);
  const [editingDashboardUid, setEditingDashboardUid] = useState<string>('');
  const { isFetching, data: dashboards } = useGetDashboardsQuery(
    user?.uid || ''
  );
  const [deleteDashboard] = useDeleteDashboardMutation();

  const handleDeleteDashboard = (dashboardUid: string) =>
    deleteDashboard({
      userUid: user?.uid || '',
      dashboardUid,
    });

  const handleModalState = () => {
    setEditingDashboardUid('');
    setIsOpen(!isOpen);
  };

  const openEditDashboard = (uid: string) => {
    setEditingDashboardUid(uid);
    setIsOpen(true);
  };

  return (
    <>
      <Box sx={{ position: 'relative', padding: '20px' }}>
        {isFetching && (
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
          {dashboards?.map((dashboard) => (
            <Box
              key={dashboard.uid}
              sx={{
                opacity: isFetching ? 0.6 : 1,
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
                  onClick={() => handleDeleteDashboard(dashboard.uid)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Button onClick={handleModalState}>
            <CreateBox loading={isFetching} />
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
