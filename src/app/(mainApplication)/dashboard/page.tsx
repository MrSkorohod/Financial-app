import ProtectedRoute from '@/components/ProtectedRoute';
import { Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <Typography>Dashboard Page</Typography>
    </ProtectedRoute>
  );
}
