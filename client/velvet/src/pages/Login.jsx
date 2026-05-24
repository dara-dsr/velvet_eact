import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import * as z from 'zod';

const schema = z
  .object({
    username: z.string(),
    password: z.string()
  });

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(data) {
    console.log('pk')
    try {
      const res = await api.post('/login/', data);

      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);

      navigate('/profile');
    } catch {
      toast.error('Неверный логин или пароль');
    }
  }

  return (
    <section
      className='flex min-h-[80vh] items-center justify-center bg-cover bg-center px-6'
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url('/images/auth-bg.jpg')"
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md rounded-3xl bg-white p-10 shadow-xl'>
        <h1 className='mb-8 text-center text-3xl font-bold'>Авторизация</h1>

        <div className='mb-4'>
          <input
            {...register('username', { required: true })}
            placeholder='Имя пользователя'
            className='mb-4 w-full rounded-full border px-5 py-3'
          />
          {errors.username && <p className='text-sm text-red-300'>{errors.username.message}</p>}
        </div>

        <div className='mb-4'>
          <input
            {...register('password', { required: true })}
            type='password'
            placeholder='Пароль'
            className='mb-4 w-full rounded-full border px-5 py-3'
          />
          {errors.password && <p className='text-sm text-red-300'>Пароль должен быть минимум 8 символов</p>}
        </div>

        <button type='submit' disabled={isSubmitting} className='btn-primary w-full'>
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
