import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '@/components/Iconify';
import RHFTextField from '@/components/hook-form/RHFTextField';
import RHFFormProvider from '@/components/hook-form/RHFFormProvider';
import { RHFCheckbox } from '@/components/hook-form/RHFCheckbox';
import { useDispatch } from '@/redux/store';
import { authLogin } from '@/redux/api/authSlice';
import { toast } from 'react-toastify';
import { setRefreshToken, setRememberMe, setSession } from '@/utils/jwt';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch()

  const onSubmit = async ({email = '', password = '',remember = ''}) => {
    const formData = {
      email,password
    }
    const result = await dispatch(authLogin(formData))
    if(authLogin.fulfilled.match(result)){
      toast.success('Login success!')
      setRememberMe(remember)
      setRefreshToken(result.payload.token.refreshToken)
      setSession(result.payload.token.accessToken)
      result.payload?.isAdmin ? navigate('/dashboard', { replace: true }) : navigate('/', { replace: true });
    }
    else{
      toast.error('Login Failed!')
    }
  };

  return (
    <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </RHFFormProvider>
  );
}
