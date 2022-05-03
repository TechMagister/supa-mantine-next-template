import { useFilter, useSelect } from 'react-supabase';
import { useAuth } from './useAuth';

interface Profile {
    username: string,
    website: string,
    avatar_url: string,
}

export function useProfile() : { profile?: Profile | null, fetching: boolean } {
    const { user } = useAuth();

    if (!user) return { profile: null, fetching: false };

    const filter = useFilter((query) =>
        query
            .eq('id', user?.id)
            .select('username, website, avatar_url')
            .limit(1),
        [user?.id]);
    const [result] = useSelect<Profile>('profiles', { filter });
    return { profile: result.data?.at(0), ...result };
}
