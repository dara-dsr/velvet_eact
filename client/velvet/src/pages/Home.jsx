import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/ContactForm';
import Hero from '../components/Hero';
import ReviewCard from '../components/ReviewCard';
import Card from '../components/Card';
import Container from '../components/Container';
import Tours from '../components/Tours';
import PlacesSlider from '../components/PlacesSlider';
import api from '../api/api';

const DEFAULT_REVIEWS = [
  {
    id: 'd1',
    image: '/avatars/review_1.webp',
    name: 'Павел К.',
    tour: 'Сакура в Японии',
    text: 'Это была лучшая поездка в моей жизни. Организация на высоком уровне.',
    date: 'Апрель 2026'
  },
  {
    id: 'd2',
    image: '/avatars/review_2.webp',
    name: 'Мария В.',
    tour: 'Неоновый Токио',
    text: 'Очень насыщенная программа и внимательные менеджеры.',
    date: 'Март 2026'
  },
  {
    id: 'd3',
    image: '/avatars/review_3.webp',
    name: 'Алиса И.',
    tour: 'Япония Премиум',
    text: 'Понравились отели, экскурсии и сопровождение.',
    date: 'Февраль 2026'
  }
];

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

const benefits = [
  { icon: '/icons/Map.webp', title: 'Авторские маршруты', text: 'по главным городам Японии' },
  { icon: '/icons/Hotel.webp', title: 'Комфортные отели', text: 'и удобная логистика' },
  { icon: '/icons/Support.webp', title: 'Сопровождение', text: 'на всех этапах путешествия' },
  { icon: '/icons/Guide.webp', title: 'Экскурсии', text: 'с русскоязычными гидами' },
  { icon: '/icons/Calendar.webp', title: 'Возможность', text: 'индивидуальной программы' }
];

function Home() {
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);

  useEffect(() => {
    api
      .get('/reviews/')
      .then(res => {
        const apiReviews = res.data.slice(0, 3).map(r => ({
          id: r.id,
          image: r.author_avatar,
          name: r.author_name,
          tour: r.tour_title,
          text: r.text,
          date: formatDate(r.created_at)
        }));
        if (apiReviews.length < 3) {
          setReviews([...apiReviews, ...DEFAULT_REVIEWS.slice(0, 3 - apiReviews.length)]);
        } else {
          setReviews(apiReviews);
        }
      })
      .catch(() => setReviews(DEFAULT_REVIEWS));
  }, []);

  return (
    <Container>
      <Helmet>
        <title>Velvet East — Туры в Японию</title>
        <meta name="description" content="Velvet East — авторские туры в Японию. Токио, Киото, Осака, Нара, Хоккайдо. Русскоязычные гиды, комфортные отели, индивидуальные программы." />
      </Helmet>

      <Hero />

      <section className='relative grid items-center gap-14 py-16 md:grid-cols-2' aria-label="О нас">
        <img src="/background/vetv.png" alt="" aria-hidden="true" className="absolute -bottom-20 -left-20 w-[480px] opacity-25 pointer-events-none select-none" style={{mixBlendMode:'multiply'}} />
        <div>
          <p className='mb-2 text-sm text-wine'>Velvet East</p>

          <h2 className='mb-6 text-4xl'>
            Япония — страна, <br />
            <span className='text-wine'>которая удивляет с первого дня</span>
          </h2>

          <p className='mb-5 text-lg'>
            Япония — это уникальное сочетание древних традиций и технологий будущего. Здесь шумные улицы Токио
            соседствуют с тихими храмами Киото, а цветущая сакура сменяется заснеженными вершинами Фудзи.
          </p>

          <p className='text-lg'>
            Мы создаем туры, которые позволяют почувствовать настоящую Японию: попробовать аутентичную кухню, увидеть
            знаменитые достопримечательности и открыть для себя культуру страны изнутри.
          </p>
        </div>

        <img loading="lazy" src='/photos/japan.webp' alt='Улица японского города' className='rounded-md shadow-md' />
      </section>

      <section className='py-8' aria-label="Преимущества">
        <h2 className='section-title'>Что вас ждёт</h2>
        <div className='grid grid-cols-2 gap-6 md:grid-cols-5'>
          {benefits.map(item => (
            <Card key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className='py-10' aria-label="Об агентстве">
        <div className='grid overflow-hidden rounded-2xl bg-pink-50 shadow-md md:grid-cols-2'>
          <div className='p-8'>
            <p className='text-lg'>
              От ярких огней Осаки до традиционных улочек Киото — каждое путешествие становится историей, которую
              хочется пережить снова.
            </p>

            <p className='mt-5 text-wine'>Откройте для себя Японию вместе с нами.</p>

            <Link to='/tours' className='btn-primary mt-6 inline-block'>
              Подобрать тур
            </Link>
          </div>
          <div className='grid h-full grid-cols-3' aria-hidden="true">
            <img loading="lazy" src='/photos/fact_1.webp' alt='' className='h-72 w-full object-cover' />
            <img loading="lazy" src='/photos/fact_2.webp' alt='' className='h-72 w-full object-cover' />
            <img loading="lazy" src='/photos/fact_3.webp' alt='' className='h-72 w-full object-cover' />
          </div>
        </div>
      </section>

      <section id='popular' className='py-14' aria-label="Популярные туры">
        <h2 className='section-title'>Популярные туры</h2>
        <Tours isDemo />
      </section>

      <PlacesSlider />

      <section className='relative pb-14' aria-label="Отзывы клиентов">
        <img src="/background/vetv-sakura.png" alt="" aria-hidden="true" className="absolute -top-10 -right-14 w-[520px] opacity-25 pointer-events-none select-none" style={{mixBlendMode:'multiply'}} />
        <h2 className='section-title'>Отзывы</h2>
        <div className='grid gap-8 md:grid-cols-3'>
          {reviews.map(item => (
            <ReviewCard key={item.id} image={item.image} name={item.name} tour={item.tour} text={item.text} date={item.date} />
          ))}
        </div>
      </section>

      <section
        className='relative mb-16 rounded-2xl bg-cover bg-center py-10 text-white'
        aria-label="Форма заявки"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.25)), url("/photos/zayvka.webp")`
        }}
      >
        <img src="/background/sakura.png" alt="" aria-hidden="true" className="absolute -bottom-6 -left-10 w-[520px] opacity-50 pointer-events-none select-none" style={{mixBlendMode:'screen'}} />
        <ContactForm />
      </section>
    </Container>
  );
}

export default Home;
