import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import * as z from 'zod';
import api from '../api/api';
import useAuthStore from '../store/useAuthStore';

const schema = z.object({
  login: z.string(),
  password: z.string()
});

function Login() {
  const navigate = useNavigate();
  const initAuth = useAuthStore(state => state.initAuth);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(data) {
    try {
      const res = await api.post('/login/', data);

      Cookies.set('access', res.data.access, { expires: 1 });
      Cookies.set('refresh', res.data.refresh, { expires: 7 });

      await initAuth();
      navigate('/profile');
    } catch {
      toast.error('Неверный логин или пароль');
    }
  }

  return (
    <section
      className='flex min-h-[80vh] items-center justify-center bg-cover bg-center px-6'
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url('/photos/zayvka.webp')"
      }}
    >
      <Helmet>
        <title>Вход — Velvet East</title>
        <meta name="description" content="Войдите в аккаунт Velvet East, чтобы подать заявку на тур в Японию." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md rounded-3xl bg-white p-10 shadow-xl'
        aria-label="Форма входа"
        noValidate
      >
        <h1 className='mb-8 text-center text-3xl font-bold'>Авторизация</h1>

        <div className='mb-4'>
          <label htmlFor="login-username" className='sr-only'>Логин</label>
          <input
            id="login-username"
            {...register('login', { required: true })}
            placeholder='Логин'
            autoComplete="username"
            aria-invalid={!!errors.login}
            aria-describedby={errors.login ? 'login-error' : undefined}
            className='mb-1 w-full rounded-full border px-5 py-3'
          />
          {errors.login && <p id="login-error" className='text-sm text-red-500' role="alert">{errors.login.message}</p>}
        </div>

        <div className='mb-4'>
          <label htmlFor="login-password" className='sr-only'>Пароль</label>
          <input
            id="login-password"
            {...register('password', { required: true })}
            type='password'
            placeholder='Пароль'
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className='mb-1 w-full rounded-full border px-5 py-3'
          />
          {errors.password && <p id="password-error" className='text-sm text-red-500' role="alert">Пароль должен быть минимум 8 символов</p>}
        </div>

        <button type='submit' disabled={isSubmitting} className='btn-primary w-full' aria-busy={isSubmitting}>
          Войти
        </button>

        <p className='mt-5 text-center'>
          Нет аккаунта?{' '}
          <Link to='/register' className='font-bold text-wine'>
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
