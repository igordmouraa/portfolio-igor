import { getNowPlaying } from '@/app/lib/lastfm';
import { HeroContent } from './hero-content';

export const HeroSection = async () => {
    const nowPlaying = await getNowPlaying();

    return <HeroContent nowPlaying={nowPlaying} />;
};
