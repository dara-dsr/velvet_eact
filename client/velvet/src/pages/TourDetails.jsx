import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import ContactForm from '../components/ContactForm';
import ReviewCard from '../components/ReviewCard';

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const PAGE_SIZE = 3;

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    api
      .get(`/tours/${id}/`)
      .then(res => setTour(res.data))
      .catch(() => setTour(null));

    api
      .get(`/tours/${id}/reviews/`)
      .then(res => setReviews(res.data))
      .catch(() => setReviews([]));

    setVisibleCount(PAGE_SIZE);
  }, [id]);

  if (!tour) {
    return <p className='py-20 text-center'>Загрузка...</p>;
  }

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  return (
    <section className='mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12'>
      <img
        src={tour.image}
        alt={tour.title}
        className='h-48 w-full rounded-2xl object-cover shadow-md sm:h-72 md:h-[420px] md:rounded-3xl'
      />

      <h1 className='mt-6 text-3xl font-bold sm:mt-8 sm:text-4xl md:text-5xl'>{tour.title}</h1>

      <div className='mt-6 grid gap-4 grid-cols-1 sm:grid-cols-3 sm:mt-8 sm:gap-6'>
        <div className='rounded-2xl p-5 shadow text-sm sm:text-base'>Длительность: <b>{tour.duration} дней</b></div>
        <div className='rounded-2xl p-5 shadow text-sm sm:text-base'>Стоимость: <b>{Number(tour.price).toLocaleString()} ₽</b></div>
        <div className='rounded-2xl p-5 shadow text-sm sm:text-base'>Сезон: <b>{tour.season}</b></div>
      </div>

      {Array.isArray(tour.cities) && tour.cities.length > 0 && (
        <div className='mt-6 rounded-2xl p-5 shadow'>
          <p className='mb-3 text-sm text-gray-500'>Маршрут</p>
          <div className='flex flex-wrap items-center gap-2'>
            {tour.cities.map((city, i) => (
              <span key={i} className='flex items-center gap-2'>
                {i > 0 && <span className='text-gray-300 text-lg'>→</span>}
                <span className='rounded-full bg-gray-100 px-3 py-1 text-sm font-medium'>{city}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className='mt-8 sm:mt-10'>
        <h2 className='mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl'>Описание тура</h2>
        <p className='text-base leading-relaxed sm:text-lg'>{tour.description}</p>
      </div>

      <div className='mt-8 sm:mt-10'>
        <h2 className='mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl'>Программа по дням</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8'>
          {tour.program.split('\r\n\r\n').map((day, i) => (
            <div key={i} className='rounded-2xl border border-red-500 p-4 shadow-lg sm:p-6'>
              {day.split('\r\n').map((text, j) => (
                <p key={j} className='text-sm sm:text-base'>{text}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className='mt-8 sm:mt-10'>
        <h2 className='mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl'>Включено в стоимость</h2>
        <ul className='list-disc whitespace-pre-line pl-5 text-sm sm:pl-6 sm:text-base'>
          {tour.included.split('\r\n').map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {reviews.length > 0 && (
        <div className='mt-10 sm:mt-14'>
          <h2 className='mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl'>
            Отзывы{' '}
            <span className='text-lg font-normal text-gray-400'>({reviews.length})</span>
          </h2>

          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6'>
            {visibleReviews.map(r => (
              <ReviewCard
                key={r.id}
                image={r.author_avatar}
                name={r.author_name}
                tour={tour.title}
                text={r.text}
                date={formatDate(r.created_at)}
              />
            ))}
          </div>

          {hasMore && (
            <div className='mt-6 text-center sm:mt-8'>
              <button
                onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                className='rounded-full border border-wine px-8 py-2.5 text-wine transition hover:bg-wine hover:text-white'
              >
                Показать ещё ({reviews.length - visibleCount})
              </button>
            </div>
          )}
        </div>
      )}

      <section
        className='my-10 rounded-2xl bg-cover bg-center py-8 text-white sm:my-16 sm:py-10'
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.25)), url("/images/zayvka.jpg")`
        }}
      >
        <ContactForm tourId={tour.id} />
      </section>
    </section>
  );
}

export default TourDetails;
