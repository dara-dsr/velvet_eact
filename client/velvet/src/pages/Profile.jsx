import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import api from '../api/api';
import Container from '../components/Container';
import { Skeleton } from '../components/Skeleton';
import useAuthStore from '../store/useAuthStore';

const EMPTY_PASSWORD_FORM = { old_password: '', new_password: '', new_password_repeat: '' };

function ReviewForm({ tourId, tourTitle, onDone }) {
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setSaving(true);
    try {
      await api.post('/reviews/create/', { tour: tourId, text });
      toast.success('Отзыв успешно добавлен');
      onDone();
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (err.response?.status === 400) {
        toast.error('Вы уже оставляли отзыв на этот тур');
      } else {
        toast.error(detail || 'Ошибка при добавлении отзыва');
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className='mt-3 space-y-2'>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={`Ваш отзыв о туре «${tourTitle}»`}
        rows={3}
        className='w-full rounded-2xl border px-4 py-2 text-sm outline-none focus:border-wine resize-none'
      />
      <div className='flex gap-2'>
        <button type='submit' disabled={saving || !text.trim()} className='btn-primary text-sm'>
          {saving ? 'Отправка...' : 'Отправить отзыв'}
        </button>
        <button
          type='button'
          onClick={onDone}
          className='rounded-full border px-5 py-2 text-sm transition hover:bg-gray-100'
        >
          Отмена
        </button>
      </div>
    </form>
  );
}

function Profile() {
  const navigate = useNavigate();
  const { user, clearUser, setUser } = useAuthStore();
  const [applications, setApplications] = useState(null);
  const [reviewOpen, setReviewOpen] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ first_name: '', last_name: '', phone: '' });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const fileInputRef = useRef(null);

  const [passwordMode, setPasswordMode] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState(EMPTY_PASSWORD_FORM);
  const [passwordErrors, setPasswordErrors] = useState({});

  function fetchApplications() {
    api
      .get('/profile/')
      .then(res => setApplications(res.data))
      .catch(() => {
        setApplications([]);
        toast.error('Ошибка получения данных с сервера');
      });
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  function logout() {
    clearUser();
    navigate('/');
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  function cancelEdit() {
    setEditMode(false);
    setAvatarFile(null);
    setRemoveAvatar(false);
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
      setAvatarPreview(null);
    }
  }

  function clearAvatarSelection() {
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
      setAvatarPreview(null);
    }
    setAvatarFile(null);
    if (!avatarPreview) setRemoveAvatar(true);
  }

  async function saveProfile(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('first_name', form.first_name);
      formData.append('last_name', form.last_name);
      formData.append('phone', form.phone);
      if (avatarFile) formData.append('avatar', avatarFile);
      else if (removeAvatar) formData.append('remove_avatar', 'true');

      const res = await api.patch('/me/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(res.data);
      setAvatarFile(null);
      setRemoveAvatar(false);
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
        setAvatarPreview(null);
      }
      setEditMode(false);
      toast.success('Профиль обновлён');
    } catch {
      toast.error('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  }

  async function savePassword(e) {
    e.preventDefault();
    setPasswordErrors({});

    if (passwordForm.new_password !== passwordForm.new_password_repeat) {
      setPasswordErrors({ new_password_repeat: 'Пароли не совпадают' });
      return;
    }
    if (passwordForm.new_password.length < 8) {
      setPasswordErrors({ new_password: 'Минимум 8 символов' });
      return;
    }

    setSavingPassword(true);
    try {
      await api.post('/me/password/', passwordForm);
      setPasswordForm(EMPTY_PASSWORD_FORM);
      setPasswordMode(false);
      toast.success('Пароль успешно изменён');
    } catch (err) {
      const data = err.response?.data;
      if (data?.old_password) {
        setPasswordErrors({ old_password: data.old_password[0] || 'Неверный текущий пароль' });
      } else {
        toast.error('Ошибка смены пароля');
      }
    } finally {
      setSavingPassword(false);
    }
  }

  function handleReviewDone(appId) {
    setReviewOpen(null);
    setApplications(prev =>
      prev.map(a => (a.id === appId ? { ...a, has_review: true } : a))
    );
  }

  const inputClass = 'w-full rounded-full border px-5 py-2.5 text-sm outline-none focus:border-wine';

  return (
    <Container As='section' className='relative min-h-[80vh] px-6 py-14'>
      <img src="/background/karp.png" alt="" aria-hidden="true" className="absolute -top-6 -right-10 h-[360px] opacity-[0.1] pointer-events-none select-none" style={{mixBlendMode:'luminosity'}} />
      <Helmet>
        <title>Личный кабинет — Velvet East</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <h1 className='mb-10 text-5xl font-bold'>Личный кабинет</h1>

      <div className='mb-10 rounded-3xl p-8 shadow-md'>
        <div className='mb-6 flex items-center gap-5'>
          <div className='relative'>
            {!user ? (
              <Skeleton className='h-20 w-20 rounded-full' />
            ) : avatarPreview || (user.avatar && !removeAvatar) ? (
              <img
                src={avatarPreview || user.avatar}
                alt='Фото профиля'
                className='h-20 w-20 rounded-full border-2 border-wine object-cover'
              />
            ) : (
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-wine text-2xl font-bold text-white'>
                {user.username[0].toUpperCase()}
              </div>
            )}
            {editMode && (
              <>
                <button
                  type='button'
                  onClick={() => fileInputRef.current.click()}
                  className='absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-wine text-white shadow transition hover:opacity-80'
                  title='Загрузить фото'
                >
                  <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                    <polyline points='17 8 12 3 7 8' />
                    <line x1='12' y1='3' x2='12' y2='15' />
                  </svg>
                </button>
                {(avatarPreview || (user?.avatar && !removeAvatar)) && (
                  <button
                    type='button'
                    onClick={clearAvatarSelection}
                    className='absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-500 text-white shadow transition hover:bg-gray-700'
                    title='Удалить фото'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'>
                      <line x1='18' y1='6' x2='6' y2='18' />
                      <line x1='6' y1='6' x2='18' y2='18' />
                    </svg>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleAvatarChange}
                />
              </>
            )}
          </div>
          <div>
            <p className='flex items-center gap-2 text-lg'>
              Логин: {!user ? <Skeleton className='h-5 w-20' /> : <b>{user.username}</b>}
            </p>
            <p className='flex items-center gap-2 text-lg'>
              Email: {!user ? <Skeleton className='h-5 w-20' /> : <b>{user.email}</b>}
            </p>
          </div>
        </div>

        {!editMode && !passwordMode && (
          <div className='mt-4 space-y-1'>
            <p className='flex items-center gap-2 text-lg'>
              Имя:{' '}
              {!user ? (
                <Skeleton className='h-5 w-24' />
              ) : (
                <b>{user.first_name || <span className='font-normal text-gray-400'>не указано</span>}</b>
              )}
            </p>
            <p className='flex items-center gap-2 text-lg'>
              Фамилия:{' '}
              {!user ? (
                <Skeleton className='h-5 w-24' />
              ) : (
                <b>{user.last_name || <span className='font-normal text-gray-400'>не указана</span>}</b>
              )}
            </p>
            <p className='flex items-center gap-2 text-lg'>
              Телефон:{' '}
              {!user ? (
                <Skeleton className='h-5 w-24' />
              ) : (
                <b>{user.phone || <span className='font-normal text-gray-400'>не указан</span>}</b>
              )}
            </p>
            <div className='pt-6 flex flex-wrap gap-3'>
              <button onClick={() => setEditMode(true)} className='btn-primary'>
                Редактировать профиль
              </button>
              <button
                onClick={() => setPasswordMode(true)}
                className='rounded-full border border-wine px-6 py-2 text-wine transition hover:bg-wine hover:text-white'
              >
                Изменить пароль
              </button>
              <button
                onClick={logout}
                className='rounded-full border px-6 py-2 transition hover:bg-gray-100'
              >
                Выйти
              </button>
            </div>
          </div>
        )}

        {editMode && (
          <form onSubmit={saveProfile} className='mt-4 max-w-sm space-y-3'>
            <div>
              <label className='mb-1 block text-sm text-gray-500'>Имя</label>
              <input
                value={form.first_name}
                onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                placeholder='Имя'
                className={inputClass}
              />
            </div>
            <div>
              <label className='mb-1 block text-sm text-gray-500'>Фамилия</label>
              <input
                value={form.last_name}
                onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                placeholder='Фамилия'
                className={inputClass}
              />
            </div>
            <div>
              <label className='mb-1 block text-sm text-gray-500'>Телефон</label>
              <input
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder='+7 (999) 000-00-00'
                className={inputClass}
              />
            </div>
            <div className='flex gap-3 pt-2'>
              <button type='submit' disabled={saving} className='btn-primary'>
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
              <button
                type='button'
                onClick={cancelEdit}
                className='rounded-full border px-6 py-2 transition hover:bg-gray-100'
              >
                Отмена
              </button>
            </div>
          </form>
        )}

        {passwordMode && (
          <form onSubmit={savePassword} className='mt-4 max-w-sm space-y-3'>
            <div>
              <label className='mb-1 block text-sm text-gray-500'>Текущий пароль</label>
              <input
                type='password'
                value={passwordForm.old_password}
                onChange={e => setPasswordForm(f => ({ ...f, old_password: e.target.value }))}
                placeholder='Текущий пароль'
                className={`${inputClass} ${passwordErrors.old_password ? 'border-red-400' : ''}`}
              />
              {passwordErrors.old_password && (
                <p className='mt-1 text-sm text-red-500'>{passwordErrors.old_password}</p>
              )}
            </div>
            <div>
              <label className='mb-1 block text-sm text-gray-500'>Новый пароль</label>
              <input
                type='password'
                value={passwordForm.new_password}
                onChange={e => setPasswordForm(f => ({ ...f, new_password: e.target.value }))}
                placeholder='Минимум 8 символов'
                className={`${inputClass} ${passwordErrors.new_password ? 'border-red-400' : ''}`}
              />
              {passwordErrors.new_password && (
                <p className='mt-1 text-sm text-red-500'>{passwordErrors.new_password}</p>
              )}
            </div>
            <div>
              <label className='mb-1 block text-sm text-gray-500'>Повтор нового пароля</label>
              <input
                type='password'
                value={passwordForm.new_password_repeat}
                onChange={e => setPasswordForm(f => ({ ...f, new_password_repeat: e.target.value }))}
                placeholder='Повторите новый пароль'
                className={`${inputClass} ${passwordErrors.new_password_repeat ? 'border-red-400' : ''}`}
              />
              {passwordErrors.new_password_repeat && (
                <p className='mt-1 text-sm text-red-500'>{passwordErrors.new_password_repeat}</p>
              )}
            </div>
            <div className='flex gap-3 pt-2'>
              <button type='submit' disabled={savingPassword} className='btn-primary'>
                {savingPassword ? 'Сохранение...' : 'Сохранить пароль'}
              </button>
              <button
                type='button'
                onClick={() => { setPasswordMode(false); setPasswordForm(EMPTY_PASSWORD_FORM); setPasswordErrors({}); }}
                className='rounded-full border px-6 py-2 transition hover:bg-gray-100'
              >
                Отмена
              </button>
            </div>
          </form>
        )}
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

              {app.status === 'Подтверждена' && app.tour && (
                <div className='mt-3'>
                  {app.has_review ? (
                    <span
                      className={`inline-block rounded-full px-4 py-1.5 text-sm ${
                        app.review_status === 'Опубликован'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}
                    >
                      {app.review_status === 'Опубликован'
                        ? 'Отзыв опубликован'
                        : 'Отзыв на модерации'}
                    </span>
                  ) : reviewOpen === app.id ? (
                    <ReviewForm
                      tourId={app.tour}
                      tourTitle={app.tour_title}
                      onDone={() => handleReviewDone(app.id)}
                    />
                  ) : (
                    <button
                      onClick={() => setReviewOpen(app.id)}
                      className='rounded-full border border-wine px-5 py-1.5 text-sm text-wine transition hover:bg-wine hover:text-white'
                    >
                      Оставить отзыв
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
        {applications && applications.length === 0 && <p>Вы пока не оставляли заявки.</p>}
      </div>
    </Container>
  );
}

export default Profile;
