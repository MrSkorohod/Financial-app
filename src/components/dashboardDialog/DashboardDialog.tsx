import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import I18nText from '../i18nText/I18nText';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import useUser from '@/hooks/useUser';
import {
  createDashboardDataThunk,
  editDashboardDataThunk,
} from '@/lib/actionThunks/dashboardsData';
import { DashboardData } from '@/lib/features/dashboards/dashboardsSlice';
import { useEffect, useMemo } from 'react';

type FormValues = {
  name: string;
  cash: number;
};

export default function DashboardDialog({
  dashboardUid,
  handleOpenState,
  isOpen,
}: {
  dashboardUid: string;
  handleOpenState: () => void;
  isOpen: boolean;
}) {
  const { loading, dashboards } = useAppSelector((state) => state.dashboards);
  const user = useUser().user;
  const dispatch = useAppDispatch();

  const addDashboard = (name: string, cash: number) => {
    dispatch(
      createDashboardDataThunk({
        userUid: user?.uid || '',
        cash,
        name,
      })
    );
  };
  const editDashboard = (uid: string, name: string, cash: number) => {
    dispatch(
      editDashboardDataThunk({
        userUid: user?.uid || '',
        uid,
        cash,
        name,
        dateCreated: new Date(),
      })
    );
  };
  const dashboardData = useMemo(() => {
    return dashboards.filter((item) => item.uid !== dashboardUid).length > 1
      ? dashboards.filter((item) => item.uid === dashboardUid)[0]
      : ({ name: '', cash: 0 } as DashboardData);
  }, [dashboardUid, dashboards]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({});

  const onSubmit: SubmitHandler<FormValues> = (data: {
    name: string;
    cash: number;
  }) => {
    dashboardUid
      ? editDashboard(dashboardUid, data.name, Number(data.cash))
      : addDashboard(data.name, Number(data.cash));
    reset();
    handleClose();
  };

  const handleClose = () => {
    reset();
    handleOpenState();
  };

  useEffect(() => {
    setValue('name', dashboardData?.name);
    setValue('cash', dashboardData?.cash);
  }, [dashboardData, setValue]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
        },
      }}
    >
      <DialogTitle>
        {dashboardUid ? (
          <I18nText
            path={'DashboardPage.EditAccount'}
            option={{ accountName: String(dashboardData.name) }}
          />
        ) : (
          <I18nText path={'DashboardPage.AddAccount'} />
        )}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{
          display: 'flex',
          gap: '16px',
        }}
      >
        <TextField
          label={I18nText({ path: 'DashboardPage.Name' })}
          {...register('name', {
            required: true,
          })}
          aria-invalid={errors.name ? 'true' : 'false'}
          error={!!errors.name}
          helperText={errors.name?.message && `${errors.name.message}`}
          disabled={loading}
        />
        <TextField
          label={I18nText({ path: 'DashboardPage.InitialAmount' })}
          {...register('cash', {
            required: true,
          })}
          aria-invalid={errors.cash ? 'true' : 'false'}
          error={!!errors.cash}
          type="number"
          helperText={errors.cash?.message && `${errors.cash.message}`}
          disabled={loading}
        />
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          <I18nText path={'DashboardPage.Save'} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}
