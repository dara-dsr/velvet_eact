import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import * as z from 'zod';

const schema = z
  .object({
    login: z.string().min(2, 'Логин должен быть не менее 2 символов').max(30, 'Логин должен быть не более 30 символов'),
    email: z.string().email(),
    password: z.string().min(8),
    password_repeat: z.string()
  })
  .refine(data => data.password === data.password_repeat, {
    path: ['password_repeat']
  });

function Register() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      await api.post('/register/', data);
      navigate('/login');
    } catch {
      toast.error('Ошибка регистрации');
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
        <h1 className='mb-8 text-center text-3xl font-bold'>Регистрация</h1>

        <div className='mb-4'>
          <input
            {...register('login', { required: true })}
            placeholder='Логин'
            className='w-full rounded-full border px-5 py-3'
          />
          {errors.login && <p className='text-sm text-red-300'>{errors.login.message}</p>}
        </div>

        <div className='mb-4'>
          <input
            {...register('email', { required: true })}
            placeholder='Email'
            className='w-full rounded-full border px-5 py-3'
          />
          {errors.email && <p className='text-sm text-red-300'>Некорректный email</p>}
        </div>

        <div className='mb-4'>
          <input
            {...register('password', { required: true })}
            type='password'
            placeholder='Пароль'
            className='w-full rounded-full border px-5 py-3'
          />
          {errors.password && <p className='text-sm text-red-300'>Пароль должен быть минимум 8 символов</p>}
        </div>

        <div className='mb-4'>
          <input
            {...register('password_repeat', { required: true })}
            type='password'
            placeholder='Повтор пароля'
            className='w-full rounded-full border px-5 py-3'
          />
          {errors.password_repeat && <p className='text-sm text-red-300'>Пароли не совпадают</p>}
        </div>

        <button type='submit' disabled={isSubmitting} className='btn-primary w-full'>
          Зарегистрироваться
        </button>

        <p className='mt-5 text-center'>
          Уже есть аккаунт?{' '}
          <Link to='/login' className='font-bold text-wine'>
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
