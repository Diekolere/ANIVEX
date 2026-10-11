# ANIVEX

ANIVEX is an anime-inspired cinematic universe and local community-feed prototype, built around media supplied with the project.

## Run locally

```sh
npm install
npm run dev
```

## Project checks

```sh
npm run lint
npm run build
npm run preview
```

## Structure

- `src/components/IntroOverlay.tsx` — video-led opening with skip and opt-in sound controls.
- `src/components/LandingHero.tsx` — full-bleed Attack on Titan opening scene, navigation, and playback toggle.
- `src/components/AnimeWorlds.tsx` — distinct anime chapters, pinned desktop scenes, and in-scene controls.
- `src/components/CommunityExperience.tsx` — editorial feed, real-frame video thumbnails, sound-enabled player, demo likes/comments, and account preview screens.
- `src/data/media.ts` — media paths, clip lengths, and scene metadata.
- `public/images/` and `public/videos/` — local media used by the experience.
- `public/ASSET-INVENTORY.md` — filenames, formats, dimensions, durations, and placement notes.
- `public/ASSET-CREDITS.md` — credits and source/rights notes.

The community feed and account previews use local frontend state only; there is no backend and no credential or personal-data collection. The supplied anime edits and artwork have undocumented redistribution permissions, so the media remains in this private prototype. Check the asset credits before sharing or publishing the project.
