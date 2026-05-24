import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../api/api';
import Container from '../components/Container';
import { Skeleton } from '../components/Skeleton';

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    api
      .get('/me/')
      .then(res => setUser(res.data))
      .catch(() => {
        navigate('/login');
        toast.error('Ошибка получения данных с сервера');
      });
    api
      .get('/profile/')
      .then(res => setApplications(res.data))
      .catch(() => {
        setApplications([]);
        toast.error('Ошибка получения данных с сервера');
      });
  }, [navigate]);

  function logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  }

  return (
    <Container As='section' className='min-h-[70vh] px-6 py-14'>
      <h1 className='mb-10 text-5xl font-bold'>Личный кабинет</h1>

      <div className='mb-10 rounded-3xl p-8 shadow-md'>
        <p className='flex items-center gap-2 text-lg'>
          Имя пользователя: {!user ? <Skeleton className='h-5 w-20' /> : <b>{user.username}</b>}
        </p>

        <p className='flex items-center gap-2 text-lg'>
          Email: {!user ? <Skeleton className='h-5 w-20' /> : <b>{user.email}</b>}
        </p>

        <button onClick={logout} className='btn-primary mt-6'>
          Выйти
        </button>
      </div>

      <h2 className='mb-6 text-3xl font-bold'>Мои заявки</h2>

      <div className='grid gap-5'>
        {!applications ? (
          <>
            <Skeleton className='h-36 w-full rounded-2xl' />
            <Skeleton className='h-36 w-full rounded-2xl' />
            <Skeleton className='h-36 w-full rounded-2xl' />
          </>
        ) : (
          applications.map(app => (
            <div key={app.id} className='rounded-2xl border-l-4 border-wine p-6 shadow-md'>
              <p>
                Тур: <b>{app.tour_title || 'Не выбран'}</b>
              </p>

              <p>Телефон: {app.phone}</p>

              <p>Email: {app.email}</p>

              <p>
                Статус: <span className='font-bold text-wine'>{app.status}</span>
              </p>
            </div>
          ))
        )}

        {applications && applications.length === 0 && <p>Вы пока не оставляли заявки.</p>}
      </div>
    </Container>
  );
}

export default Profile;
