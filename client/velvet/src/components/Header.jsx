import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import logo from '../media/img/logo.png';
import search from '../media/img/Search.png';
import user from '../media/img/User Male.png';

function Header() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const customNavigation = path => {
    const token = localStorage.getItem('access');

    // защищённые страницы
    const protectedRoutes = ['/profile'];

    if (protectedRoutes.includes(path) && !token) {
      navigate('/register');
    } else {
      navigate(path);
    }

    setOpen(false);
  };

  const navClass = path =>
    location.pathname === path ? 'text-[#b0164f] font-bold' : 'hover:text-[#b0164f] transition';

  return (
    <div className='relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
      <button onClick={() => customNavigation('/')} className='flex items-center gap-3 font-bold'>
        <img src={logo} alt='Velvet East' className='h-12 w-12 object-contain' />
        <span className='hidden text-lg text-black sm:block'>Velvet East</span>
      </button>

      <div className='hidden items-center gap-10 text-lg md:flex'>
        <button onClick={() => customNavigation('/')} className={navClass('/')}>
          Главная
        </button>
        <button onClick={() => customNavigation('/tours')} className={navClass('/tours')}>
          Туры
        </button>
        <button onClick={() => customNavigation('/about')} className={navClass('/about')}>
          О Японии
        </button>
        <button onClick={() => customNavigation('/contacts')} className={navClass('/contacts')}>
          Контакты
        </button>
      </div>

      <div className='hidden items-center gap-5 md:flex'>
        <button className='transition hover:scale-110'>
          <img src={search} alt='search' className='h-6 w-6 object-contain' />
        </button>
        <button onClick={() => customNavigation('/profile')} className='transition hover:scale-110'>
          <img src={user} alt='profile' className='h-7 w-7 object-contain' />
        </button>
      </div>

      <button className='md:hidden' onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>

      {open && (
        <div className='absolute left-0 top-20 z-50 flex w-full flex-col items-center gap-6 bg-white py-6 shadow-lg md:hidden'>
          <button onClick={() => customNavigation('/')}>Главная</button>
          <button onClick={() => customNavigation('/tours')}>Туры</button>
          <button onClick={() => customNavigation('/about')}>О Японии</button>
          <button onClick={() => customNavigation('/contacts')}>Контакты</button>
          <button onClick={() => customNavigation('/profile')}>Личный кабинет</button>

          <button onClick={() => customNavigation('/register')} className='rounded-full border px-5 py-2'>
            Регистрация
          </button>
          <button onClick={() => customNavigation('/login')} className='rounded-full bg-[#b0164f] px-5 py-2 text-white'>
            Вход
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
