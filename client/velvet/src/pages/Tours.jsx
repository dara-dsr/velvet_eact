import { Helmet } from 'react-helmet-async';
import Container from '../components/Container';
import Tours from '../components/Tours';

export default function ToursPage() {
  return (
    <Container className='relative py-14 min-h-[80vh]'>
      
      <Helmet>
        <title>Туры в Японию — Velvet East</title>
        <meta name="description" content="Выберите тур в Японию: фильтрация по сезону, городу, длительности и бюджету. Весна, лето, осень, зима — туры для любого путешественника." />
      </Helmet>

      <div
        className='flex h-[300px] flex-col items-center justify-center rounded-3xl bg-cover bg-center px-6 text-center text-white shadow-lg'
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url("/photos/japan-pattern.webp")` }}
      >
        <h1 className='text-5xl font-bold drop-shadow-[0_2px_10px_#900035] md:text-6xl'>Туры в Японию</h1>
        <p className='mt-5 max-w-2xl text-lg leading-relaxed'>
          Выберите подходящий сезон, город, длительность и бюджет поездки.
        </p>
      </div>

      <div className='py-14'>
        <Tours />
      </div>
    </Container>
  );
}
