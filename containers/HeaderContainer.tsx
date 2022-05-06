import { useCallback } from 'react';

import { useRouter } from 'next/router';

import Header from '../components/Header/Header';
import { useUser } from '../components/UserProvider';

export default function HeaderContainer() {
  const { user } = useUser();
  const router = useRouter();

  const onLogout = useCallback(() => router.replace('/api/auth/logout'), []);

  return <Header user={user} onLogout={onLogout} />;
}
