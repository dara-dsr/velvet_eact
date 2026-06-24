import { Helmet } from 'react-helmet-async';
import Container from '../components/Container';
import { facts, cities, seasons, culture, factsList, tips, islandStats, mainIslands } from '../data/about';


function AboutJapan() {
  return (
    <Container As='section' className='py-14'>
      <Helmet>
        <title>О Японии — Velvet East</title>
        <meta name="description" content="Всё о Японии: главные города Токио, Киото, Осака, Нара, Хоккайдо. Сезоны, культура, японская кухня, полезные советы туристу." />
      </Helmet>
      <div
        className='flex h-72 items-center justify-center rounded-2xl bg-cover bg-center px-4 text-center text-white sm:h-96'
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url("/photos/fon_japan.webp")`
        }}
      >
        <h1 className='text-5xl font-bold drop-shadow-[0_2px_10px_#900035] sm:text-6xl md:text-7xl'>О Японии</h1>
      </div>

      <div className='relative grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]'>
        <img src="/background/xram.png" alt="" aria-hidden="true" className="absolute -right-14 top-0 md:h-[420px] h-[320px] opacity-[0.12] pointer-events-none select-none" style={{mixBlendMode:'multiply'}} />
        <div>
          <p className='mb-3 font-bold text-wineDark'>Velvet East</p>

          <h2 className='mb-6 text-4xl font-bold leading-tight text-wine md:text-5xl'>
            Япония — страна контрастов, эстетики и незабываемых маршрутов
          </h2>

          <p className='text-lg leading-relaxed text-gray-700'>
            Здесь старинные храмы соседствуют с неоновыми кварталами, скоростные поезда соединяют древние города, а
            каждый сезон открывает страну по-новому: сакура весной, фестивали летом, красные клёны осенью и снежные
            онсэны зимой.
          </p>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          {facts.map(([name, value]) => (
            <div key={name} className='rounded-2xl bg-white p-5 text-center'>
              <p className='mb-2 font-bold text-wine'>{name}</p>
              <p className='text-lg'>{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='mb-20 grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]'>
        <div className='rounded-3xl bg-white p-8'>
          <h2 className='mb-4 text-4xl font-bold text-wine'>Интерактивная карта</h2>

          <p className='text-lg leading-relaxed text-gray-700'>
            Используйте карту, чтобы посмотреть расположение главных городов, островов и популярных туристических
            направлений: Токио, Киото, Осаки, Нары, Хоккайдо и горы Фудзи.
          </p>
        </div>

        <div className='overflow-hidden rounded-md'>
          <iframe
            title='Интерактивная карта Японии'
            src='https://www.google.com/maps?q=Japan&output=embed'
            className='h-[460px] w-full'
            loading='lazy'
          />
        </div>
      </div>

      <section className='my-14 overflow-hidden rounded-3xl p-8 text-wine lg:p-12' aria-label="Острова Японии">
        <div className='grid items-center gap-10 lg:grid-cols-2'>
          <img loading="lazy" src='/photos/island.jpg' alt='Острова Японии' className='h-[380px] w-full rounded-2xl object-cover shadow-xl lg:h-[440px]' />
          <div>
            <h2 className='mb-4 text-4xl font-bold uppercase tracking-wide'>Острова Японии</h2>
            <p className='mb-8 text-lg leading-relaxed text-black'>
              Япония — архипелаг, состоящий из более чем 6 тысяч островов. Здесь гармонично сочетаются древние традиции и современные технологии, уникальная природа и урбанистические пейзажи.
            </p>
            <div className='mb-5 grid grid-cols-2 gap-4 rounded-2xl bg-pink-50 p-6'>
              {islandStats.map(([num, label]) => (
                <div key={label} className='text-center'>
                  <p className='text-3xl font-bold text-pink-600'>{num}</p>
                  <p className='mt-1 text-xs uppercase tracking-widest text-black bg-pink-50'>{label}</p>
                </div>
              ))}
            </div>
            <div className='rounded-2xl bg-pink-50 px-6 py-5'>
              <p className='mb-4 text-center text-sm font-bold uppercase tracking-widest text-black'>4 главных острова</p>
              <div className='flex flex-wrap justify-center gap-x-8 gap-y-2'>
                {mainIslands.map((island, i) => (
                  <span key={island.title} className='font-bold uppercase tracking-wide'>
                    {i + 1}. {island.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='mb-14 overflow-hidden rounded-3xl px-8 py-10 text-wine' aria-label="Основные острова">
        <h2 className='section-title text-black'>Основные острова</h2>
        <div className='mx-auto mt-8 mb-8 h-1 w-24 rounded-full bg-wine'></div>
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {mainIslands.map(island => (
            <div key={island.title} className='overflow-hidden rounded-2xl bg-pink-50'>
              <img loading="lazy" src={island.image} alt={island.title} className='h-48 w-full object-cover' />
              <div className='p-5'>
                <h3 className='mb-3 text-center text-lg font-bold uppercase tracking-wide text-wine'>{island.title}</h3>
                <p className='text-center text-sm leading-relaxed text-black'>{island.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className='relative mb-10 mt-20 text-center'>
        <img src="/background/sobor.png" alt="" aria-hidden="true" className="absolute md:-left-12 -left-20 top-[250px] -translate-y-1/2 md:h-61 h-[800px] opacity-[0.12] pointer-events-none select-none" style={{mixBlendMode:'multiply'}} />
        <h2 className='section-title'>Главные города</h2>
        <div className='mx-auto mt-4 h-1 w-24 rounded-full bg-wine'></div>

        <p className='mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-gray-700'>
          Каждый город Японии обладает своей атмосферой: от футуристического Токио до традиционного Киото и снежного
          Хоккайдо.
        </p>
      </div>

      <div className='space-y-10'>
        {cities.map((city, index) => (
          <div
            key={city.title}
            className={`grid items-center gap-8 overflow-hidden rounded-3xl bg-white md:grid-cols-2`}
          >
            <div className={`${index % 2 !== 0 ? 'md:order-2' : ''}`}>
              <img loading="lazy" src={city.image} alt={city.title} className='h-[340px] w-full object-cover' />
            </div>

            <div className='p-10'>
              <div className='mb-5 flex items-center gap-3'>
                <h3 className='text-3xl font-bold text-wine'>{city.title}</h3>
              </div>

              <p className='text-lg leading-relaxed text-gray-700'>{city.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='mb-10 mt-20 text-center'>
        <h2 className='section-title'>Сезоны</h2>
        <div className='mx-auto mt-4 h-1 w-24 rounded-full bg-wine'></div>
      </div>

      <div className='grid gap-6 md:grid-cols-4'>
        {seasons.map(([title, text]) => (
          <div key={title} className='rounded-2xl bg-pink-50 p-6'>
            <h3 className='mb-3 text-center text-2xl font-bold text-wine'>{title}</h3>
            <p className='text-center leading-relaxed text-gray-700'>{text}</p>
          </div>
        ))}
      </div>

      <div className='mt-20 grid items-center gap-8 md:grid-cols-2'>
        <div>
          <h2 className='mb-4 text-3xl font-bold text-wine'>Транспорт</h2>
          <p className='text-lg leading-relaxed text-gray-700'>
            Япония известна точными поездами, удобным метро и скоростными Shinkansen. Благодаря развитой системе
            транспорта туристы могут легко перемещаться между Токио, Киото, Осакой, Нарой и другими городами.
          </p>
        </div>

        <div className='overflow-hidden rounded-md'>
          <img loading="lazy" src='/photos/train.webp' alt='Японский поезд' className='h-80 w-full object-cover' />
        </div>
      </div>

      <div className='relative mb-10 mt-20 text-center'>
        <img src="/background/vetv.png" alt="" aria-hidden="true" className="absolute md:-bottom-[200px] bottom-[600px] md:left-[5px] left-[90px] md:w-[1400px] w-[3000px] opacity-45 pointer-events-none select-none" style={{mixBlendMode:'multiply'}} />
        <h2 className='section-title'>Культура и впечатления</h2>
        <div className='mx-auto mt-4 h-1 w-24 rounded-full bg-wine'></div>
      </div>

      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
        {culture.map(item => (
          <div key={item} className='rounded-2xl bg-white p-6 text-center font-bold transition hover:scale-105'>
            {item}
          </div>
        ))}
      </div>

      <div className='mt-20 grid items-center gap-8 md:grid-cols-2'>
        <div className='overflow-hidden rounded-md'>
          <img loading="lazy" src='/photos/food.webp' alt='Японская кухня' className='h-80 w-full object-cover' />
        </div>

        <div>
          <h2 className='mb-4 text-3xl font-bold text-wine'>Японская кухня</h2>
          <p className='text-lg leading-relaxed text-gray-700'>
            Япония — рай для гастрономических путешествий. Здесь можно попробовать суши, рамен, темпуру, такояки,
            матча-десерты и региональные блюда, которые отличаются от города к городу.
          </p>
        </div>
      </div>

      <div className='mb-10 mt-20 text-center'>
        <h2 className='section-title'>Интересные факты</h2>
        <div className='mx-auto mt-4 h-1 w-24 rounded-full bg-wine'></div>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        {factsList.map(fact => (
          <div key={fact} className='rounded-2xl bg-white p-6'>
            <p className='leading-relaxed text-gray-700'>{fact}</p>
          </div>
        ))}
      </div>

      <div className='mb-10 mt-20 text-center'>
        <h2 className='section-title'>Полезно знать туристу</h2>
        <div className='mx-auto mt-4 h-1 w-24 rounded-full bg-wine'></div>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {tips.map(tip => (
          <div key={tip} className='rounded-2xl bg-pink-50 p-6'>
            <p className='leading-relaxed'>{tip}</p>
          </div>
        ))}
      </div>

      <div className=' mt-20 rounded-3xl bg-wine p-8 text-center text-white'>
        <h2 className='mb-4 text-3xl font-bold'>Почему стоит поехать?</h2>
        <p className='mx-auto max-w-3xl text-lg leading-relaxed'>
          Япония подходит для романтических поездок, семейного отдыха, гастрономических туров, культурных маршрутов,
          шопинга, фототуров и спокойного отдыха на природе. Это направление, где каждый день путешествия ощущается как
          отдельная история.
        </p>
      </div>
    </Container>
  );
}

export default AboutJapan;
