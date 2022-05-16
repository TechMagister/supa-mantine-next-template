import { useCallback } from 'react';

import { useRouter } from 'next/router';

import Header from '../components/Header/Header';
import routes from '../shared/routes';
import { useUser } from '@supabase/supabase-auth-helpers/react';

export default function HeaderContainer() {
  const { user } = useUser();
  const router = useRouter();

  const onLogout = useCallback(() => router.replace(routes.LOGOUT), []);

  return <Header user={user ? { email: user.email!} : null} onLogout={onLogout} />;
}
