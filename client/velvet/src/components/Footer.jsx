import { useNavigate } from 'react-router-dom';
import instagram from '../media/img/Instagram.png';
import logo from '../media/img/logo.png';
import telegram from '../media/img/Telegram.png';
import whatsapp from '../media/img/WhatsApp.png';

function Footer() {
  const navigate = useNavigate();

  const customNavigation = path => {
    navigate(path);
  };

  return (
    <footer className='bg-wine pb-10 text-white'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-10 md:flex-row'>
        <button onClick={() => customNavigation('/')} className='flex items-center gap-3'>
          <img src={logo} alt='Velvet East' className='h-14 w-14 object-contain' />
          <div className='text-left'>
            <h2 className='text-2xl font-bold'>Velvet East</h2>
            <p className='text-sm font-normal'>Турагентство</p>
          </div>
        </button>

        <div className='flex gap-8 font-bold'>
          <button onClick={() => customNavigation('/')} className='transition hover:text-pink-200'>
            Главная
          </button>
          <button onClick={() => customNavigation('/tours')} className='transition hover:text-pink-200'>
            Туры
          </button>
          <button onClick={() => customNavigation('/about')} className='transition hover:text-pink-200'>
            О Японии
          </button>
          <button onClick={() => customNavigation('/contacts')} className='transition hover:text-pink-200'>
            Контакты
          </button>
        </div>

        <div className='text-right text-sm'>
          <p>+7 (423) 278-54-91</p>
          <p>velvet.east@mail.ru</p>
          <p>​Алеутская улица, 45, 4 офис</p>
        </div>
      </div>

      <div className='mx-auto flex md:flex-row flex-col gap-6 md:gap-0 max-w-7xl items-center justify-between border-t border-white/30 pt-10'>
        <div className='hidden md:block flex-1' />
        <div className='flex gap-4'>
          <a href='*' target='_blank' rel='noreferrer' className='transition hover:text-pink-200'>
            <img src={telegram} alt='Telegram' className='h-8 w-8 object-contain' />
          </a>
          <a href='*' target='_blank' rel='noreferrer' className='transition hover:text-pink-200'>
            <img src={whatsapp} alt='WhatsApp' className='h-8 w-8 object-contain' />
          </a>
          <a href='*' target='_blank' rel='noreferrer' className='transition hover:text-pink-200'>
            <img src={instagram} alt='Instagram' className='h-8 w-8 object-contain' />
          </a>
        </div>
        <div className='flex flex-1 justify-end'>
          <p className='text-sm'>© 2026 Velvet East. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
