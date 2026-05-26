import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import useAuthStore from '../store/useAuthStore';

const logo = '/icons/logo.png';
const userIcon = '/icons/User Male.png';

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();

  const go = path => {
    navigate(path);
    setOpen(false);
  };

  const navClass = path =>
    location.pathname === path ? 'text-[#b0164f] font-bold' : 'hover:text-[#b0164f] transition';

  return (
    <div className='relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
      <button onClick={() => go('/')} className='flex items-center gap-3 font-bold'>
        <img loading="lazy" src={logo} alt='Velvet East' className='h-12 w-12 object-contain' />
        <span className='hidden text-lg text-black sm:block'>Velvet East</span>
      </button>

      <div className='hidden items-center gap-10 text-lg md:flex'>
        <button onClick={() => go('/')} className={navClass('/')}>
          Главная
        </button>
        <button onClick={() => go('/about')} className={navClass('/about')}>
          О Японии
        </button>
        <button onClick={() => go('/tours')} className={navClass('/tours')}>
          Туры
        </button>
        <button onClick={() => go('/contacts')} className={navClass('/contacts')}>
          Контакты
        </button>
      </div>

      <div className='hidden items-center gap-4 md:flex'>
        {isAuthenticated ? (
          <button
            onClick={() => go('/profile')}
            className='flex items-center gap-2 transition hover:text-[#b0164f]'
          >
            {user?.avatar ? (
              <img loading="lazy" src={user.avatar} alt='profile' className='h-7 w-7 rounded-full object-cover' />
            ) : (
              <img loading="lazy" src={userIcon} alt='profile' className='h-7 w-7 object-contain' />
            )}
            <span className='font-medium'>{user?.username}</span>
          </button>
        ) : (
          <>
            <button
              onClick={() => go('/login')}
              className='rounded-full border border-[#b0164f] px-5 py-2 text-[#b0164f] transition hover:bg-[#b0164f] hover:text-white'
            >
              Войти
            </button>
            <button
              onClick={() => go('/register')}
              className='rounded-full bg-[#b0164f] px-5 py-2 text-white transition hover:bg-[#900035]'
            >
              Регистрация
            </button>
          </>
        )}
      </div>

      <button className='md:hidden' onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>

      {open && (
        <div className='absolute left-0 top-20 z-50 flex w-full flex-col items-center gap-6 bg-white py-6 shadow-lg md:hidden'>
          <button onClick={() => go('/')}>Главная</button>
          <button onClick={() => go('/tours')}>Туры</button>
          <button onClick={() => go('/about')}>О Японии</button>
          <button onClick={() => go('/contacts')}>Контакты</button>

          {isAuthenticated ? (
            <button
              onClick={() => go('/profile')}
              className='flex items-center gap-2 font-medium text-[#b0164f]'
            >
              {user?.avatar ? (
                <img loading="lazy" src={user.avatar} alt='profile' className='h-6 w-6 rounded-full object-cover' />
              ) : (
                <img loading="lazy" src={userIcon} alt='profile' className='h-6 w-6 object-contain' />
              )}
              {user?.username}
            </button>
          ) : (
            <>
              <button onClick={() => go('/register')} className='rounded-full border px-5 py-2'>
                Регистрация
              </button>
              <button onClick={() => go('/login')} className='rounded-full bg-[#b0164f] px-5 py-2 text-white'>
                Вход
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
