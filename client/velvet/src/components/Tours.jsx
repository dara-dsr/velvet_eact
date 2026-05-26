import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import api from '../api/api';
import TourCard from '../components/TourCard';

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

  const visibleTours = isDemo ? tours.slice(0, 6) : tours;

  return (
    <div>
      {!isDemo && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mb-10 grid gap-4 md:grid-cols-5'
          role="search"
          aria-label="Фильтр туров"
        >
          <select {...register('season')} className='border px-4 py-3' aria-label="Сезон">
            <option value=''>Сезон</option>
            <option value='Весна'>Весна</option>
            <option value='Лето'>Лето</option>
            <option value='Осень'>Осень</option>
            <option value='Зима'>Зима</option>
          </select>

          <input {...register('city')} placeholder='Город' className='border px-4 py-3' aria-label="Город" />
          <input {...register('duration')} placeholder='До скольки дней' className='border px-4 py-3' aria-label="Максимальная длительность в днях" />
          <input {...register('budget')} placeholder='Бюджет' className='border px-4 py-3' aria-label="Максимальный бюджет" />

          <button type='submit' className='btn-primary'>
            Найти
          </button>
        </form>
      )}

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3' role="list" aria-label="Список туров">
        {visibleTours.map(tour => (
          <div key={tour.id} role="listitem">
            <TourCard tour={tour} />
          </div>
        ))}
      </div>

      {isDemo && (
        <div className='mt-10 text-center'>
          <Link
            to='/tours'
            className='rounded-xl border border-black px-10 py-3 font-bold transition hover:bg-wine hover:text-white'
          >
            Смотреть все туры
          </Link>
        </div>
      )}
    </div>
  );
}
