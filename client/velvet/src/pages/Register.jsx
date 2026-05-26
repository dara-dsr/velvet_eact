import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
      className='relative flex min-h-[80vh] items-center justify-center bg-cover bg-center px-6'
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url('/photos/zayvka.webp')"
      }}
    >
      <img src="/background/mech.png" alt="" aria-hidden="true" className="absolute left-0 top-1/2 -translate-y-1/2 h-[500px] opacity-[0.25] pointer-events-none select-none" style={{mixBlendMode:'screen'}} />
      <Helmet>
        <title>Регистрация — Velvet East</title>
        <meta name="description" content="Создайте аккаунт Velvet East и подбирайте туры в Японию." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md rounded-3xl bg-white p-10 shadow-xl'
        aria-label="Форма регистрации"
        noValidate
      >
        <h1 className='mb-8 text-center text-3xl font-bold'>Регистрация</h1>

        <div className='mb-4'>
          <label htmlFor="reg-login" className='sr-only'>Логин</label>
          <input
            id="reg-login"
            {...register('login', { required: true })}
            placeholder='Логин'
            autoComplete="username"
            aria-invalid={!!errors.login}
            aria-describedby={errors.login ? 'reg-login-error' : undefined}
            className='w-full rounded-full border px-5 py-3'
          />
          {errors.login && <p id="reg-login-error" className='mt-1 text-sm text-red-500' role="alert">{errors.login.message}</p>}
        </div>

        <div className='mb-4'>
          <label htmlFor="reg-email" className='sr-only'>Email</label>
          <input
            id="reg-email"
            {...register('email', { required: true })}
            type="email"
            placeholder='Email'
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'reg-email-error' : undefined}
            className='w-full rounded-full border px-5 py-3'
          />
          {errors.email && <p id="reg-email-error" className='mt-1 text-sm text-red-500' role="alert">Некорректный email</p>}
        </div>

        <div className='mb-4'>
          <label htmlFor="reg-password" className='sr-only'>Пароль</label>
          <input
            id="reg-password"
            {...register('password', { required: true })}
            type='password'
            placeholder='Пароль'
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'reg-password-error' : undefined}
            className='w-full rounded-full border px-5 py-3'
          />
          {errors.password && <p id="reg-password-error" className='mt-1 text-sm text-red-500' role="alert">Пароль должен быть минимум 8 символов</p>}
        </div>

        <div className='mb-4'>
          <label htmlFor="reg-password-repeat" className='sr-only'>Повтор пароля</label>
          <input
            id="reg-password-repeat"
            {...register('password_repeat', { required: true })}
            type='password'
            placeholder='Повтор пароля'
            autoComplete="new-password"
            aria-invalid={!!errors.password_repeat}
            aria-describedby={errors.password_repeat ? 'reg-repeat-error' : undefined}
            className='w-full rounded-full border px-5 py-3'
          />
          {errors.password_repeat && <p id="reg-repeat-error" className='mt-1 text-sm text-red-500' role="alert">Пароли не совпадают</p>}
        </div>

        <button type='submit' disabled={isSubmitting} className='btn-primary w-full' aria-busy={isSubmitting}>
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
