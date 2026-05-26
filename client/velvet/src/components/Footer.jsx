import { Link } from 'react-router-dom';

const logo = '/icons/logo.webp';
const telegram = '/icons/Telegram.webp';
const whatsapp = '/icons/WhatsApp.webp';
const instagram = '/icons/Instagram.webp';

const navLinks = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'О Японии' },
  { to: '/tours', label: 'Туры' },
  { to: '/contacts', label: 'Контакты' },
];

function Footer() {
  return (
    <footer className="bg-wine pb-10 text-white" aria-label="Подвал сайта">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-10 md:flex-row">
        <Link to="/" className="flex items-center gap-3" aria-label="Velvet East — на главную">
          <img src={logo} alt="" role="presentation" className="h-14 w-14 object-contain" />
          <div className="text-left">
            <p className="text-2xl font-bold">Velvet East</p>
            <p className="text-sm font-normal">Турагентство</p>
          </div>
        </Link>

        <nav aria-label="Навигация в подвале">
          <ul className="flex gap-8 font-bold">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="transition hover:text-pink-200">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="text-right text-sm not-italic">
          <p>
            <a href="tel:+74232785491" className="transition hover:text-pink-200">
              +7 (423) 278-54-91
            </a>
          </p>
          <p>
            <a href="mailto:velvet.east@mail.ru" className="transition hover:text-pink-200">
              velvet.east@mail.ru
            </a>
          </p>
          <p>Алеутская улица, 45, 4 офис</p>
        </address>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/30 pt-10 md:flex-row md:gap-0">
        <div className="hidden flex-1 md:block" />

        <div className="flex gap-4" role="list" aria-label="Социальные сети">
          <a
            href="https://t.me/"
            target="_blank"
            rel="noreferrer noopener"
            className="transition hover:text-pink-200"
            aria-label="Telegram"
            role="listitem"
          >
            <img src={telegram} alt="Telegram" className="h-8 w-8 object-contain" />
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer noopener"
            className="transition hover:text-pink-200"
            aria-label="WhatsApp"
            role="listitem"
          >
            <img src={whatsapp} alt="WhatsApp" className="h-8 w-8 object-contain" />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="transition hover:text-pink-200"
            aria-label="Instagram"
            role="listitem"
          >
            <img src={instagram} alt="Instagram" className="h-8 w-8 object-contain" />
          </a>
        </div>

        <div className="flex flex-1 justify-end">
          <p className="text-sm">© 2026 Velvet East. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
