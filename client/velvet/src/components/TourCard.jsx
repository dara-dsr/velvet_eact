import { Link } from 'react-router-dom';

function TourCard({ tour }) {
  return (
    <div className='relative h-80 overflow-hidden rounded-2xl shadow-md transition hover:scale-105'>
      <img src={tour.image} alt={tour.title} className='h-full w-full object-cover' />

      <div className='absolute inset-0 bg-black/10'></div>

      <div className='absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-sm'>{tour.title}</div>

      <div className='absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-sm'>{tour.duration} дней</div>

      <div className='absolute bottom-4 left-24 rounded-full bg-white px-4 py-2 text-sm'>
        от {Number(tour.price).toLocaleString()} ₽
      </div>

      <Link
        to={`/tours/${tour.id}`}
        className='absolute bottom-4 border border-wine right-4 rounded-full bg-white px-4 py-2 text-sm transition hover:bg-wine hover:text-white'
      >
        Подробнее
      </Link>
    </div>
  );
}

export default TourCard;
