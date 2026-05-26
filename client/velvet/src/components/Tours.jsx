import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import api from '../api/api';
import TourCard from '../components/TourCard';
import Container from './Container';

const schema = z.object({
  season: z.string(),
  city: z.string(),
  duration: z.string(),
  budget: z.string(),
});

export default function Tours({ isDemo }) {
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });

  const [tours, setTours] = useState([]);

  function onSubmit(data) {
    api
      .get('/tours/', { params: data })
      .then(res => setTours(res.data))
      .catch(() => setTours([]));
  }

  useEffect(() => {
    api
      .get('/tours/', { params: {} })
      .then(res => setTours(res.data))
      .catch(() => setTours([]));
  }, []);

  const mappedTours = useMemo(() => tours.map(tour => <TourCard key={tour.id} tour={tour} />), [tours]);

  return (
    <Container className='py-14'>
      <form onSubmit={handleSubmit(onSubmit)} className='mb-10 grid gap-4 md:grid-cols-5'>
        <select {...register('season')} className='border px-4 py-3'>
          <option value=''>Сезон</option>
          <option value='Весна'>Весна</option>
          <option value='Лето'>Лето</option>
          <option value='Осень'>Осень</option>
          <option value='Зима'>Зима</option>
        </select>

        <input {...register('city')} placeholder='Город' className='border px-4 py-3' />

        <input {...register('duration')} placeholder='До скольки дней' className='border px-4 py-3' />

        <input {...register('budget')} placeholder='Бюджет' className='border px-4 py-3' />

        <button type='submit' className='btn-primary'>
          Найти
        </button>
      </form>

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>{isDemo ? mappedTours.slice(0, 6) : mappedTours}</div>

      {isDemo && (
        <div className='mt-10 text-center'>
          <a
            href='/tours'
            className='rounded-xl border border-black px-10 py-3 font-bold transition hover:bg-wine hover:text-white'
          >
            Смотреть все туры
          </a>
        </div>
      )}
    </Container>
  );
}
