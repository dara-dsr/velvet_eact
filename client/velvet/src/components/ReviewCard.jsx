const userIcon = '/icons/User Male.webp';

function ReviewCard({ image, name, tour, text, date }) {
  return (
    <article
      className='grid grid-cols-2 overflow-hidden rounded-2xl border border-wine shadow-sm'
      aria-label={`Отзыв от ${name}`}
    >
      {image ? (
        <img loading="lazy" src={image} alt={name} className='h-full w-full object-cover' />
      ) : (
        <div className='flex items-center justify-center bg-pink-50' aria-hidden="true">
          <img src={userIcon} alt="" className='h-16 w-16 object-contain opacity-40' />
        </div>
      )}

      <div className='p-5'>
        <h3 className='font-bold'>{name}</h3>
        <p className='mb-3 text-sm'>Тур «{tour}»</p>
        <blockquote className='text-sm'>{text}</blockquote>
        <p className='mt-4 text-xs text-gray-500'>
          <time>{date}</time>
        </p>
      </div>
    </article>
  );
}

export default ReviewCard;
