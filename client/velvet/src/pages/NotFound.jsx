import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Страница не найдена — Velvet East</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <main className='relative flex min-h-[70vh] flex-col items-center justify-center px-5 text-center'>
        <img src="/background/fish.png" alt="" aria-hidden="true" className="absolute right-0 bottom-0 h-[500px] opacity-[0.45] pointer-events-none select-none" style={{mixBlendMode:'screen'}} />
        <h1 className='mb-5 text-8xl font-black text-[#a80035]'>404</h1>

        <h2 className='mb-4 text-4xl font-bold'>Страница не найдена</h2>

        <p className='mb-8 text-lg'>Возможно, адрес введён неправильно или страница была удалена.</p>

        <Link
          to='/'
          className='rounded-full bg-[#c0396d] px-10 py-3 font-bold text-white hover:bg-[#a80035]'
        >
          Вернуться на главную
        </Link>
      </main>
    </>
  );
}

export default NotFound;
