import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '@/components/Iconify';
import RHFTextField from '@/components/hook-form/RHFTextField';
import RHFFormProvider from '@/components/hook-form/RHFFormProvider';
import { useDispatch } from '@/redux/store';
import { setEmailVerifiedValue } from '@/redux/api/authSlice';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import { auth } from '@/config/firebase-config';

// ----------------------------------------------------------------------

export default function RegisterForm({setStatus}) {
  const [showPassword, setShowPassword] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email phải là một địa chỉ email hợp lệ').required('Yêu cầu nhập email'),
    password: Yup.string().required('Yêu cầu nhập password'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = methods;
  const dispatch = useDispatch()

  const onSubmit = async (data) => {

    const { email = '', password = '' } = data
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(auth.currentUser);
      await signOut(auth);

      toast.success(`
      Email được gửi đến ${email}
      Nhấn vào link để hoàn tất đăng ký.`)
      dispatch(setEmailVerifiedValue(email))
      setStatus("success");
      reset()
    }
    catch (error) {
      toast.error(`${error}`)
    }
  };

  return (
    <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{mt: 3}}>
        Đăng ký
      </LoadingButton>
    </RHFFormProvider>
  );
}
