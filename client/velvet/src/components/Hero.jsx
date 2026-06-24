import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section aria-label="Главный баннер" className='mx-auto max-w-7xl'>
      <div
        className='flex h-[480px] flex-col items-center justify-center rounded-2xl bg-cover bg-center px-4 text-center text-white shadow-lg sm:h-[560px] md:h-[620px]'
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.15), rgba(0,0,0,.15)), url("/photos/header.webp")`
        }}
      >
        <h1 className='text-5xl font-bold drop-shadow-[0_2px_10px_#900035] sm:text-7xl md:text-9xl'>Velvet East</h1>

        <p className='mt-4 max-w-[90%] rounded-full bg-wine/40 px-6 py-2 text-base sm:px-10 sm:text-lg'>Турагентство в страну восходящего солнца</p>

        <Link to='/tours' className='btn-primary mt-10'>
          Подобрать тур
        </Link>
      </div>
    </section>
  );
}

export default Hero;
