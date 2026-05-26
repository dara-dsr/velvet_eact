export default function Card({ icon, title, text }) {
  return (
    <div className='rounded-2xl bg-white p-6 text-center shadow-[0_4px_10px_#900035] transition hover:scale-105'>
      <img loading="lazy" src={icon} alt={title} className='mx-auto mb-4 h-12 w-12 object-contain' />
      <h3 className='text-lg font-bold'>{title}</h3>
      <p className='mt-2 text-sm text-gray-600'>{text}</p>
    </div>
  );
}
