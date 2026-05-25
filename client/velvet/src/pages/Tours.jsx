import Container from '../components/Container'
import Tours from '../components/Tours'


export default function ToursPage() {
  return (
    <Container className='py-14 min-h-[80vh]'>
      <h1 className='mb-5 text-center text-5xl font-bold'>Туры в Японию</h1>

      <p className='mb-10 text-center text-lg'>Выберите подходящий сезон, город, длительность и бюджет поездки.</p>

      <Tours />
    </Container>
  );
}
