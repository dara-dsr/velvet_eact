import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import useAuthStore from '../store/useAuthStore';

const logo = '/icons/logo.webp';
const userIcon = '/icons/User Male.webp';

const navLinks = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'О Японии' },
  { to: '/tours', label: 'Туры' },
  { to: '/contacts', label: 'Контакты' },
];

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();

  const navClass = path =>
    location.pathname === path
      ? 'text-[#b0164f] font-bold'
      : 'hover:text-[#b0164f] transition';

  return (
    <header role="banner">
      <nav
        aria-label="Основная навигация"
        className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
      >
        <Link to="/" className="flex items-center gap-3 font-bold" aria-label="Velvet East — на главную">
          <img src={logo} alt="" role="presentation" className="h-12 w-12 object-contain" />
          <span className="hidden text-lg text-black sm:block">Velvet East</span>
        </Link>

        <div className="hidden items-center gap-10 text-lg md:flex">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={navClass(to)}
              aria-current={location.pathname === to ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 transition hover:text-[#b0164f]"
              aria-label={`Профиль пользователя ${user?.username}`}
            >
              {user?.avatar ? (
                <img src={user.avatar} alt="" role="presentation" className="h-7 w-7 rounded-full object-cover" />
              ) : (
                <img src={userIcon} alt="" role="presentation" className="h-7 w-7 object-contain" />
              )}
              <span className="font-medium">{user?.username}</span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-[#b0164f] px-5 py-2 text-[#b0164f] transition hover:bg-[#b0164f] hover:text-white"
              >
                Войти
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-[#b0164f] px-5 py-2 text-white transition hover:bg-[#900035]"
              >
                Регистрация
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(prev => !prev)}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        {open && (
          <div
            id="mobile-menu"
            role="dialog"
            aria-label="Мобильное меню"
            className="absolute left-0 top-20 z-50 flex w-full flex-col items-center gap-6 bg-white py-6 shadow-lg md:hidden"
          >
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                aria-current={location.pathname === to ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}

            {isAuthenticated ? (
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 font-medium text-[#b0164f]"
                aria-label={`Профиль ${user?.username}`}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt="" role="presentation" className="h-6 w-6 rounded-full object-cover" />
                ) : (
                  <img src={userIcon} alt="" role="presentation" className="h-6 w-6 object-contain" />
                )}
                {user?.username}
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-full border px-5 py-2"
                >
                  Регистрация
                </Link>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-[#b0164f] px-5 py-2 text-white"
                >
                  Вход
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
