import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/ContactForm';
import Container from '../components/Container';
import { Clock3, Mail, MapPin, MessageCircle, Phone, Plane, Send } from 'lucide-react';

function Contacts() {
  return (
    <Container As='section'>
      <Helmet>
        <title>Контакты — Velvet East</title>
        <meta name="description" content="Свяжитесь с турагентством Velvet East: телефон, email, адрес во Владивостоке. Бесплатная консультация по турам в Японию." />
      </Helmet>
      <div
        className='flex h-[340px] flex-col items-center justify-center rounded-3xl bg-cover bg-center px-6 text-center text-white shadow-lg'
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url("/photos/contacts.webp")`
        }}
      >
        <h1 className='text-5xl font-bold drop-shadow-[0_2px_10px_#900035] md:text-6xl'>Контакты</h1>

        <p className='mt-5 max-w-2xl text-lg leading-relaxed'>
          Мы поможем подобрать идеальное путешествие по Японии: от романтических туров до гастрономических и культурных
          маршрутов.
        </p>
      </div>

      <div className='mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]'>
        <div className='relative space-y-6'>
          <img src="/background/cat.png" alt="" aria-hidden="true" className="absolute -bottom-12 -right-10 h-[400px] opacity-[20] pointer-events-none select-none" />
          <div className='rounded-3xl bg-white p-8 shadow-[0_4px_20px_rgba(144,0,53,0.25)]'>
            <h2 className='mb-8 text-3xl font-bold text-wine'>Связаться с нами</h2>

            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <Phone className='mt-1 text-wine' size={26} />

                <div>
                  <p className='text-lg font-bold'>Телефон</p>

                  <p className='text-gray-600'>+7 (423) 278-54-91</p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <Mail className='mt-1 text-wine' size={26} />

                <div>
                  <p className='text-lg font-bold'>Email</p>

                  <p className='text-gray-600'>velvet.east@mail.ru</p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <MapPin className='mt-1 text-wine' size={26} />

                <div>
                  <p className='text-lg font-bold'>Адрес</p>

                  <p className='text-gray-600'>БЦ SkyCity, Алеутская улица, 45, Владивосток</p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <Clock3 className='mt-1 text-wine' size={26} />

                <div>
                  <p className='text-lg font-bold'>Режим работы</p>

                  <p className='text-gray-600'>Пн–Пт: 10:00–19:00</p>

                  <p className='text-gray-600'>Сб–Вс: по предварительной записи</p>
                </div>
              </div>
            </div>

            <div className='mt-10 flex gap-4'>
              <a
                href='https://t.me/'
                target='_blank'
                rel='noreferrer'
                className='flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 shadow-[0_4px_15px_rgba(144,0,53,0.2)] transition hover:bg-wine hover:text-white'
              >
                <Send size={22} />
              </a>

              <a
                href='https://wa.me/'
                target='_blank'
                rel='noreferrer'
                className='flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 shadow-[0_4px_15px_rgba(144,0,53,0.2)] transition hover:bg-wine hover:text-white'
              >
                <MessageCircle size={22} />
              </a>
            </div>
          </div>

          <div className='rounded-3xl bg-pink-50 p-8 shadow-[0_4px_20px_rgba(144,0,53,0.18)]'>
            <div className='mb-5 flex items-center gap-4'>
              <Plane className='text-wine' size={36} />

              <h3 className='text-2xl font-bold text-wine'>Почему выбирают нас</h3>
            </div>

            <ul className='space-y-4 leading-relaxed text-gray-700'>
              <li>• Авторские маршруты по Японии</li>
              <li>• Индивидуальный подбор туров</li>
              <li>• Поддержка на всех этапах путешествия</li>
              <li>• Помощь с визой и документами</li>
              <li>• Комфортные отели и проверенные гиды</li>
            </ul>
          </div>
        </div>

        <div className='overflow-hidden rounded-3xl shadow-[0_4px_20px_rgba(144,0,53,0.25)]'>
          <iframe
            title='Карта'
            src='https://www.google.com/maps?q=SkyCity+Владивосток+Алеутская+45&z=17&output=embed'
            className='h-full min-h-[620px] w-full'
            loading='lazy'
          ></iframe>
        </div>
      </div>

      <section
        className='my-16 rounded-2xl bg-cover bg-center py-10 text-white'
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.25)), url("/photos/zayvka.webp")`
        }}
      >
        <ContactForm />
      </section>
    </Container>
  );
}

export default Contacts;
