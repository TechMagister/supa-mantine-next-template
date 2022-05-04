import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useUser } from '../components/UserProvider';

interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    (user && (
      <>
        <button type="button" onClick={() => router.replace('/api/auth/logout')}>
          Sign out
        </button>
        <p>user:</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </>
    )) || <></>
  );
};

export default HomePage;
