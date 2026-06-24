import { zodResolver } from '@hookform/resolvers/zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js/min';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';
import api from '../api/api';
import useAuthStore from '../store/useAuthStore';

const schema = z.object({
  name: z.string().min(2, 'Имя должно быть не менее 2 символов').max(30, 'Имя должно быть не более 30 символов'),
  phone: z
    .string()
    .min(7)
    .max(15)
    .refine(value => {
      const phone = parsePhoneNumberFromString(value, 'RU');
      return phone?.isValid() ?? false;
    }, 'Введите корректный номер телефона'),
  email: z.email(),
  comment: z.string(),
  agreement: z.literal(true)
});

function ContactForm({ tourId, className }) {
  const { isAuthenticated } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(schema) });

  const containerClass =
    'mx-auto max-w-5xl rounded-3xl border border-white/30 bg-white/20 p-6 shadow-[0_4px_30px_rgba(144,0,53,0.35)] backdrop-blur-md ' +
    (className || '');

  if (!isAuthenticated) {
    return (
      <div className={containerClass} role="region" aria-label="Форма заявки">
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <h3 className='text-4xl font-bold drop-shadow-[0_2px_10px_#900035]'>Оставьте заявку</h3>
          <p className='mt-4 max-w-md text-lg leading-relaxed'>
            Для подачи заявки необходимо войти в аккаунт или зарегистрироваться.
          </p>
          <div className='mt-8 flex flex-wrap justify-center gap-4'>
            <Link
              to='/login'
              className='rounded-full border border-white px-8 py-3 font-medium transition hover:bg-white/20'
            >
              Войти
            </Link>
            <Link
              to='/register'
              className='rounded-full bg-wine px-8 py-3 font-bold text-white shadow-[0_4px_20px_rgba(144,0,53,0.45)] transition hover:bg-wineDark'
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    );
  }

  async function onSubmit(data) {
    try {
      await api.post('/applications/', {
        ...data,
        tour: tourId || null
      });
      reset();
      toast.success('Заявка успешно отправлена');
    } catch {
      toast.error('Ошибка отправки заявки');
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={containerClass}
      aria-label="Форма заявки на тур"
      noValidate
    >
      <div className='grid items-center gap-10 md:grid-cols-2'>
        <div>
          <h3 className='text-3xl font-bold drop-shadow-[0_2px_10px_#900035] sm:text-4xl md:text-5xl'>Оставьте заявку</h3>
          <p className='mt-4 text-base leading-relaxed sm:text-lg'>Подберём идеальный тур в Японию и ответим на все вопросы.</p>
          <div className='mt-8 grid grid-cols-1 gap-4 text-center sm:mt-10 sm:grid-cols-3' aria-hidden="true">
            <div><p className='text-sm'>Бесплатная консультация</p></div>
            <div><p className='text-sm'>Подбор тура за 15 минут</p></div>
            <div><p className='text-sm'>Поддержка 24/7</p></div>
          </div>
        </div>

        <div className='space-y-4 text-black'>
          <div>
            <label htmlFor="cf-name" className='sr-only'>Ваше имя</label>
            <input
              id="cf-name"
              {...register('name', { required: true })}
              placeholder='Ваше имя'
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'cf-name-error' : undefined}
              className={`w-full rounded-xl bg-white/90 px-5 py-4 outline-none ${errors.name && 'border border-red-400'}`}
            />
            <div className='h-4'>
              {errors.name && <p id="cf-name-error" className='text-sm text-red-300' role="alert">{errors.name.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="cf-phone" className='sr-only'>Телефон</label>
            <input
              id="cf-phone"
              {...register('phone', { required: true })}
              type="tel"
              placeholder='Телефон'
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'cf-phone-error' : undefined}
              className={`w-full rounded-xl bg-white/90 px-5 py-4 outline-none ${errors.phone && 'border border-red-400'}`}
            />
            <div className='h-4'>
              {errors.phone && <p id="cf-phone-error" className='text-sm text-red-300' role="alert">Введите корректный номер телефона</p>}
            </div>
          </div>

          <div>
            <label htmlFor="cf-email" className='sr-only'>Email</label>
            <input
              id="cf-email"
              {...register('email', { required: true })}
              type="email"
              placeholder='Email'
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'cf-email-error' : undefined}
              className={`w-full rounded-xl bg-white/90 px-5 py-4 outline-none ${errors.email && 'border border-red-400'}`}
            />
            <div className='h-4'>
              {errors.email && <p id="cf-email-error" className='text-sm text-red-300' role="alert">Введите корректный email</p>}
            </div>
          </div>

          <div>
            <label htmlFor="cf-comment" className='sr-only'>Комментарий</label>
            <textarea
              id="cf-comment"
              {...register('comment')}
              placeholder='Комментарий'
              className='h-24 w-full resize-none rounded-xl bg-white/90 px-5 py-4 outline-none'
            />
          </div>

          <div>
            <label className='flex items-start gap-3 text-sm text-white'>
              <input
                {...register('agreement', { required: true })}
                type='checkbox'
                className='mt-1'
                aria-invalid={!!errors.agreement}
                aria-describedby={errors.agreement ? 'cf-agreement-error' : undefined}
              />
              <span>
                Я согласен на{' '}
                <Link to='/privacy' target='_blank' className='underline hover:text-pink-200'>
                  обработку персональных данных
                </Link>
              </span>
            </label>
            <div className='h-4'>
              {errors.agreement && <p id="cf-agreement-error" className='text-sm text-red-300' role="alert">Подтвердите согласие на обработку данных</p>}
            </div>
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className='w-full rounded-xl bg-wine py-4 font-bold text-white shadow-[0_4px_20px_rgba(144,0,53,0.45)] transition hover:bg-wineDark disabled:opacity-60'
          >
            Отправить заявку
          </button>
        </div>
      </div>
    </form>
  );
}

export default ContactForm;