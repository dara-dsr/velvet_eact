import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import ContactForm from '../components/ContactForm';

function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    api
      .get(`/tours/${id}/`)
      .then(res => setTour(res.data))
      .catch(() => setTour(null));
  }, [id]);

  if (!tour) {
    return <p className='py-20 text-center'>Загрузка...</p>;
  }

  return (
    <section className='mx-auto max-w-6xl px-6 py-12'>
      <img src={tour.image} alt={tour.title} className='h-[420px] w-full rounded-3xl object-cover shadow-md' />

      <h1 className='mt-8 text-5xl font-bold'>{tour.title}</h1>

      <div className='mt-8 grid gap-6 md:grid-cols-3'>
        <div className='rounded-2xl p-6 shadow'>Длительность: {tour.duration} дней</div>

        <div className='rounded-2xl p-6 shadow'>Стоимость: {Number(tour.price).toLocaleString()} ₽</div>

        <div className='rounded-2xl p-6 shadow'>Город: {tour.city}</div>
      </div>

      <div className='mt-10 text-lg'>
        <h2 className='mb-4 text-3xl font-bold'>Описание тура</h2>
        <p>{tour.description}</p>
      </div>

      <div className='mt-10 text-lg'>
        <h2 className='mb-4 text-3xl font-bold'>Программа по дням</h2>
        <div className='grid grid-cols-2 gap-8'>
          {tour.program.split('\r\n\r\n').map(day => (
            <div className='rounded-2xl border border-red-500 p-6 shadow-lg'>
              {day.split('\r\n').map(text => (
                <p>{text}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className='mt-10 text-lg'>
        <h2 className='mb-4 text-3xl font-bold'>Включено в стоимость</h2>
        <ul className='list-disc whitespace-pre-line pl-6'>
          {tour.included.split('\r\n').map(item => (
            <li>{item}</li>
          ))}
        </ul>
      </div>

      <section
        className='my-16 rounded-2xl bg-cover bg-center py-10 text-white'
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
