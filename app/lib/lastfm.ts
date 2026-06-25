export type NowPlaying = {
    track: string;
    artist: string;
    url: string;
};

type RecentTrackResponse = {
    recenttracks?: {
        track?:
            | {
                  name: string;
                  url: string;
                  artist: { '#text': string };
                  '@attr'?: { nowplaying?: string };
              }
            | Array<{
                  name: string;
                  url: string;
                  artist: { '#text': string };
                  '@attr'?: { nowplaying?: string };
              }>;
    };
};

const API_BASE = 'https://ws.audioscrobbler.com/2.0/';

export async function getNowPlaying(): Promise<NowPlaying | null> {
    const apiKey = process.env.LASTFM_API_KEY;
    const username = process.env.LASTFM_USERNAME;

    if (!apiKey || !username) {
        return null;
    }

    try {
        const url = new URL(API_BASE);
        url.searchParams.set('method', 'user.getRecentTracks');
        url.searchParams.set('user', username);
        url.searchParams.set('api_key', apiKey);
        url.searchParams.set('format', 'json');
        url.searchParams.set('limit', '1');

        const response = await fetch(url.toString(), {
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            return null;
        }

        const data = (await response.json()) as RecentTrackResponse;
        const rawTrack = data.recenttracks?.track;
        const track = Array.isArray(rawTrack) ? rawTrack[0] : rawTrack;

        if (!track || track['@attr']?.nowplaying !== 'true') {
            return null;
        }

        const artist = track.artist?.['#text']?.trim();
        const trackName = track.name?.trim();

        if (!artist || !trackName) {
            return null;
        }

        return {
            artist,
            track: trackName,
            url: track.url || `https://www.last.fm/user/${username}`,
        };
    } catch {
        return null;
    }
}
