import { Instagram, Music2, PinIcon, Store, Facebook } from 'lucide-react';

// Custom Spotify icon since lucide-react doesn't have one
const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const socials = [
  {
    platform: 'Instagram',
    icon: <Instagram />,
    href: 'https://www.instagram.com/elementarystateofmind/',
  },
  {
    platform: 'Facebook',
    icon: <Facebook />,
    href: 'https://www.facebook.com/elementarystateofmind/',
  },
  {
    platform: 'TikTok',
    icon: <Music2 />,
    href: 'https://www.tiktok.com/@elementarystateofmindd',
  },
  {
    platform: 'Pinterest',
    icon: <PinIcon />,
    href: 'https://www.pinterest.com/elementarystateofmindd/',
  },
  {
    platform: 'TPT Store',
    icon: <Store />,
    href: 'https://www.teacherspayteachers.com/store/elementary-state-of-mind',
  },
  {
    platform: 'Spotify',
    icon: <SpotifyIcon />,
    href: 'https://open.spotify.com/playlist/5FoJvH0raHXq4MS3tUJEAw?si=7Ww2bw5_Qr6VThmWRFWEmw&nd=1&dlsi=5b61906af5a44045',
  },
];

export default function SocialBento() {
  return (
    <nav className="social-strip" aria-label="Elementary State of Mind social links">
      {socials.map(({ platform, icon, href }) => (
        <a key={platform} href={href} target="_blank" rel="noopener noreferrer">
          <span aria-hidden="true">{icon}</span>{platform}
        </a>
      ))}
    </nav>
  );
}
