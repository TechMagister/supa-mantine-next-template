import React from 'react';

import Header from '../components/Header/Header';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';

export default function HomePage() {
  const { user } = useAuth();
  const { profile, fetching } = useProfile();

  return (
    <>
      {user && !fetching
      && profile
      && <Header user={{ name: profile.username, image: profile.avatar_url }} />}
    </>
  );
}
