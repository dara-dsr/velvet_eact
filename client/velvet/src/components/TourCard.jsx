import { Link } from 'react-router-dom';

const BACKEND_URL = 'https://velvet-eact-backend.onrender.com';

function TourCard({ tour }) {
  const imgSrc = tour.image?.startsWith('http') ? tour.image : `${BACKEND_URL}${tour.image}`;
  const citiesList = Array.isArray(tour.cities) ? tour.cities : [];

  return (
    <div className='flex flex-col overflow-hidden rounded-2xl shadow-md transition hover:scale-105'>
      <div className='relative h-52 shrink-0'>
        <img src={imgSrc} alt={tour.title} className='h-full w-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
        <div className='absolute left-3 right-3 top-3 flex items-center justify-between gap-2'>
          <span className='rounded-full bg-white px-3 py-1 text-sm font-medium'>{tour.title}</span>
          {tour.season && (
            <span className='rounded-full bg-white/90 px-3 py-1 text-xs text-gray-600'>{tour.season}</span>
          )}
        </div>
      </div>

      <div className='flex flex-1 flex-col gap-3 bg-white p-4'>
        {citiesList.length > 0 && (
          <div className='flex flex-wrap items-center gap-1 text-xs text-gray-500'>
            {citiesList.map((city, i) => (
              <span key={i} className='flex items-center gap-1'>
                {i > 0 && <span className='text-gray-300'>→</span>}
                <span className='rounded-full bg-gray-100 px-2 py-0.5'>{city}</span>
              </span>
            ))}
          </div>
        )}

        <div className='mt-auto flex items-center justify-between'>
          <div className='flex gap-2'>
            <span className='rounded-full bg-gray-100 px-3 py-1 text-sm'>{tour.duration} дней</span>
            <span className='rounded-full bg-gray-100 px-3 py-1 text-sm'>
              от {Number(tour.price).toLocaleString()} ₽
            </span>
          </div>
          <Link
            to={`/tours/${tour.id}`}
            className='rounded-full border border-wine px-4 py-1 text-sm transition hover:bg-wine hover:text-white'
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
