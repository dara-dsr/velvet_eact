import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const places = [
  { img: '/slider/sibua.webp', title: 'Сибуя', desc: 'Знаменитый перекресток и центр молодежной культуры' },
  { img: '/slider/akihabara.webp', title: 'Акихабара', desc: 'Электронный город и центр аниме-культуры' },
  { img: '/slider/ykogama.webp', title: 'Йокогама', desc: 'Крупный портовый город с современной архитектурой' },
  { img: '/slider/hicudziiama.webp', title: 'Парк Хицудзияма', desc: 'Известный парк с цветущими флоксами' },
  { img: '/slider/tohoku.webp', title: 'Тохоку', desc: 'Северный регион с красивой природой' },
  { img: '/slider/kamaryka.webp', title: 'Камакура', desc: 'Исторический город с Великим Буддой' },
  { img: '/slider/fudzi.webp', title: 'Гора Фудзи', desc: 'Священная гора и символ Японии' },
  { img: '/slider/osaka.webp', title: 'Осака', desc: 'Город кухни и развлечений' },
  { img: '/slider/okinava.webp', title: 'Окинава', desc: 'Тропические острова с уникальной культурой' },
];

function PlacesSlider() {
  return (
    <section className='places-slider-section relative overflow-hidden rounded-2xl py-14' aria-label="Популярные места">
      <h2 className='section-title'>Популярные места</h2>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className='places-swiper !pb-12 !px-2'
      >
        {places.map(place => (
          <SwiperSlide key={place.title}>
            <div className='relative md:h-[500px] h-[400px] overflow-hidden rounded-xl shadow-lg'>
              <img
                src={place.img}
                alt={place.title}
                loading='lazy'
                className='h-full w-full object-cover transition-transform duration-500 hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
              <div className='absolute bottom-0 left-0 p-4 text-white'>
                <p className='text-lg font-bold uppercase tracking-wide'>{place.title}</p>
                <p className='mt-1 text-s leading-snug text-white/85'>{place.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default PlacesSlider;
