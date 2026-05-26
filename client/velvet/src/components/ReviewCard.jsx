const userIcon = '/icons/User Male.png';

function ReviewCard({ image, name, tour, text, date }) {
  return (
    <div className='grid grid-cols-2 overflow-hidden rounded-2xl border border-wine shadow-sm'>
      {image ? (
        <img src={image} alt={name} className='h-full w-full object-cover' />
      ) : (
        <div className='flex items-center justify-center bg-pink-50'>
          <img src={userIcon} alt={name} className='h-16 w-16 object-contain opacity-40' />
        </div>
      )}

      <div className='p-5'>
        <h3 className='font-bold'>{name}</h3>
        <p className='mb-3 text-sm'>{tour}</p>
        <p className='text-sm'>{text}</p>
        <p className='mt-4 text-xs text-gray-500'>{date}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
