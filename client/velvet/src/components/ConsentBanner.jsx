import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'velvet_consent_accepted';

function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* localStorage может быть недоступен — просто скрываем баннер */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role='dialog'
      aria-label='Согласие на обработку данных'
      aria-live='polite'
      className='fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6'
    >
      <div className='mx-auto flex max-w-5xl flex-col items-start gap-4 rounded-2xl bg-white p-5 shadow-[0_4px_30px_rgba(144,0,53,0.35)] ring-1 ring-wine/20 sm:flex-row sm:items-center sm:justify-between sm:p-6'>
        <p className='text-sm leading-relaxed text-gray-700'>
          Мы используем файлы cookie и обрабатываем персональные данные для работы сайта и подбора туров. Продолжая
          пользоваться сайтом, вы соглашаетесь с{' '}
          <Link to='/privacy' className='font-semibold text-wine underline'>
            политикой обработки персональных данных
          </Link>
          .
        </p>

        <button
          onClick={accept}
          className='w-full shrink-0 rounded-full bg-wine px-8 py-3 font-bold text-white transition hover:bg-wineDark sm:w-auto'
        >
          Принять
        </button>
      </div>
    </div>
  );
}

export default ConsentBanner;