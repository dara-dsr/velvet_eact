import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <main className='flex min-h-[70vh] flex-col items-center justify-center px-5 text-center'>
        <h1 className='mb-5 text-8xl font-black text-[#a80035]'>404</h1>

        <h2 className='mb-4 text-4xl font-bold'>Страница не найдена</h2>

        <p className='mb-8 text-lg'>Возможно, адрес введён неправильно или страница была удалена.</p>

        <button
          onClick={() => navigate('/')}
          className='rounded-full bg-[#c0396d] px-10 py-3 font-bold text-white hover:bg-[#a80035]'
        >
          Вернуться на главную
        </button>
      </main>
    </>
  );
}

export default NotFound;
