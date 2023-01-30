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
import { getUser, setAuthtokenCredential, setEmailVerifiedValue } from '@/redux/api/authSlice';
import { toast } from 'react-toastify';
import { setRefreshToken } from '@/utils/jwt';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase-config';
import { useCreateOrUpdateUserMutation } from '@/redux/api/authQuery';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [createOrUpdateUser] = useCreateOrUpdateUserMutation();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email phải là một địa chỉ email hợp lệ').required('Yêu cầu nhập email'),
    password: Yup.string().required('Yêu cầu nhập password'),
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
  const roleBasedRedirect = (role) => {
    if (role === "admin") {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };
  const onSubmit = async ({email = '', password = ''}) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      if(!user.emailVerified) throw new Error(`${user.email} hasn't verified yet!`);
      const idTokenResult = await user.getIdTokenResult();
      const res = await createOrUpdateUser(idTokenResult.token).unwrap();

      if (["deleted", "inactive"].includes(res.status)) {
        throw new Error(`${res.email} hiện đang khoá!`);
      } else {
        dispatch(setRefreshToken(user.refreshToken));
        dispatch(setAuthtokenCredential(idTokenResult.token));
        dispatch(getUser(res));
        dispatch(setEmailVerifiedValue(""));
        roleBasedRedirect(res?.role);
      }
    } catch (error) {
      toast.error('Đăng nhập thất bại!')
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Quên mật khẩu?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Đăng nhập
      </LoadingButton>
    </RHFFormProvider>
  );
}
