import { zodResolver } from '@hookform/resolvers/zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import api from '../api/api';

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
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(data) {
    try {
      if (!localStorage.getItem('access')) throw new Error('Missing authorization headers');

      await api.post('/applications/', {
        ...data,
        tour: tourId || null
      });

      toast.success('Заявка успешно отправлена');
    } catch {
      toast.error('Ошибка отправки заявки');
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={
        'mx-auto max-w-5xl rounded-3xl border border-white/30 bg-white/20 p-6 shadow-[0_4px_30px_rgba(144,0,53,0.35)] backdrop-blur-md' +
        className
      }
    >
      <div className='grid items-center gap-10 md:grid-cols-2'>
        <div>
          <h3 className='text-5xl font-bold drop-shadow-[0_2px_10px_#900035]'> Оставьте заявку</h3>
          <p className='mt-4 text-lg leading-relaxed'>Подберём идеальный тур в Японию и ответим на все вопросы.</p>
          <div className='mt-10 grid grid-cols-3 gap-4 text-center'>
            <div>
              <p className='text-sm'>Бесплатная консультация</p>
            </div>
            <div>
              <p className='text-sm'>Подбор тура за 15 минут</p>
            </div>
            <div>
              <p className='text-sm'>Поддержка 24/7</p>
            </div>
          </div>
        </div>

        <div className='space-y-4 text-black'>
          <div>
            <input
              {...register('name', { required: true })}
              placeholder='Ваше имя'
              className={`w-full rounded-xl bg-white/90 px-5 py-4 outline-none ${errors.name && 'border border-red-400'}`}
            />
            <div className='h-4'>{errors.name && <p className='text-sm text-red-300'>{errors.name.message}</p>}</div>
          </div>

          <div>
            <input
              {...register('phone', { required: true })}
              placeholder='Телефон'
              className={`w-full rounded-xl bg-white/90 px-5 py-4 outline-none ${errors.phone && 'border border-red-400'}`}
            />
            <div className='h-4'>
              {errors.phone && <p className='text-sm text-red-300'>Введите корректный номер телефона</p>}
            </div>
          </div>

          <div>
            <input
              {...register('email', { required: true })}
              placeholder='Email'
              className={`w-full rounded-xl bg-white/90 px-5 py-4 outline-none ${errors.email && 'border border-red-400'}`}
            />
            <div className='h-4'>
              {errors.email && <p className='text-sm text-red-300'>Введите корректный email</p>}
            </div>
          </div>

          <textarea
            {...register('comment')}
            placeholder='Комментарий'
            className='h-24 w-full resize-none rounded-xl bg-white/90 px-5 py-4 outline-none'
          />
          <div>
            <label className='flex items-start gap-3 text-sm text-white'>
              <input {...register('agreement', { required: true })} type='checkbox' className='mt-1' />
              <span>Я согласен на обработку персональных данных</span>
            </label>
            <div className='h-4'>
              {errors.agreement && <p className='text-sm text-red-300'>Подтвердите согласие на обработку данных</p>}
            </div>
          </div>

          <button
            type='submit'
            className='w-full rounded-xl bg-wine py-4 font-bold text-white shadow-[0_4px_20px_rgba(144,0,53,0.45)] transition hover:bg-wineDark'
          >
            Отправить заявку
          </button>
        </div>
      </div>
    </form>
  );
}

export default ContactForm;
