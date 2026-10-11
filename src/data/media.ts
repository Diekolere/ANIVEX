export type AnimeKey = 'demon-slayer' | 'attack-on-titan' | 'hells-paradise'

export type AnimeWorld = {
  key: AnimeKey
  number: string
  title: string
  romanizedTitle: string
  description: string
  image: string
  imageAlt: string
  mood: string
}

// Local references supplied with the project. The credits file calls out that
// these fan edits are not cleared for public redistribution.
export const referenceVideos = [
  {
    id: 'tanjiro-faceoff',
    src: '/videos/WhatsApp Video 2026-10-11 at 17.13.52.mp4',
    poster: '/images/video-posters/17.13.52.jpg',
    duration: '00:45',
    creator: 'jtg.exe',
    series: 'Demon Slayer',
    anime: 'demon-slayer' as const,
    caption: 'A quiet face-off before the fire breaks loose.',
  },
  {
    id: 'flame-breath',
    src: '/videos/WhatsApp Video 2026-10-11 at 17.14.36.mp4',
    poster: '/images/video-posters/17.14.36.jpg',
    duration: '01:07',
    creator: 'topdestop',
    series: 'Demon Slayer',
    anime: 'demon-slayer' as const,
    caption: 'Flame Breathing, cut to the beat.',
  },
  {
    id: 'demon-awakening',
    src: '/videos/WhatsApp Video 2026-10-11 at 17.15.02.mp4',
    poster: '/images/video-posters/17.15.02.jpg',
    duration: '00:33',
    creator: 'skyeamv',
    series: 'Demon Slayer',
    anime: 'demon-slayer' as const,
    caption: 'An edit built around the moment the eyes change.',
  },
  {
    id: 'cursed-energy',
    src: '/videos/WhatsApp Video 2026-10-11 at 17.33.28.mp4',
    poster: '/images/video-posters/17.33.28.jpg',
    duration: '00:22',
    creator: '_timise_',
    series: 'Jujutsu Kaisen',
    anime: 'all' as const,
    caption: 'Cursed energy, close cuts, and a sudden shift in the frame.',
  },
  {
    id: 'beyond-the-walls',
    src: '/videos/WhatsApp Video 2026-10-11 at 17.34.19.mp4',
    poster: '/images/video-posters/17.34.19.jpg',
    duration: '00:44',
    creator: 'jtg.exe',
    series: 'Attack on Titan',
    anime: 'attack-on-titan' as const,
    caption: 'The look that says everything has changed.',
  },
]

export const animeWorlds: AnimeWorld[] = [
  {
    key: 'demon-slayer',
    number: '01',
    title: 'Demon Slayer',
    romanizedTitle: 'Kimetsu no Yaiba',
    description: 'A kind heart. A drawn blade. A promise carried through the night.',
    image: '/images/Demon Slayer Live 4k Wallpaper _ Kamado Tanjirou UHD wallpaper_.jpg',
    imageAlt: 'Tanjiro Kamado framed by a blade and a spiral of fire',
    mood: 'demon',
  },
  {
    key: 'attack-on-titan',
    number: '02',
    title: 'Attack on Titan',
    romanizedTitle: 'Shingeki no Kyojin',
    description: 'Beyond the walls, every horizon asks what freedom is worth.',
    image: '/images/Titan looming over wall soldiers.jpg',
    imageAlt: 'A Titan towers over soldiers and a broken city wall',
    mood: 'titan',
  },
  {
    key: 'hells-paradise',
    number: '03',
    title: "Hell's Paradise",
    romanizedTitle: 'Jigokuraku',
    description: 'On an island where beauty and danger bloom from the same root.',
    image: '/images/Gabimaru _ Hell\'s Paradise.jpg',
    imageAlt: 'Gabimaru in a dramatic Hell’s Paradise character edit',
    mood: 'paradise',
  },
]
