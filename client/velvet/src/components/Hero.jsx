function Hero() {
  return (
    <section className='mx-auto max-w-7xl px-6'>
      <div
        className='flex h-[620px] flex-col items-center justify-center rounded-2xl bg-cover bg-center text-center text-white shadow-lg'
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.15), rgba(0,0,0,.15)), url("/photos/header.jpg")`
        }}
      >
        <h1 className='text-6xl font-bold drop-shadow-[0_2px_10px_#900035] md:text-9xl'>Velvet East</h1>

        <p className='mt-4 rounded-full bg-wine/40 px-10 py-2 text-lg'>Турагентство в страну восходящего солнца</p>

        <a href='/tours' className='btn-primary mt-10'>
          Подобрать тур
        </a>
      </div>
    </section>
  );
}

export default Hero;
