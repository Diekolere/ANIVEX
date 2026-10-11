import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Heart, MessageCircle, Play, Search, Send, Sparkles, Volume2, VolumeX, X } from 'lucide-react'
import { animeWorlds, referenceVideos, type AnimeKey } from '../data/media'

type CommunityExperienceProps = {
  initialFilter: AnimeKey | 'all' | 'fan-art'
  onClose: () => void
}

type FeedPost = {
  id: string
  creator: string
  title: string
  clip?: (typeof referenceVideos)[number]
  image?: string
  imageAlt?: string
  anime: AnimeKey | 'all'
  series: string
  caption: string
  tags: string[]
  likes: number
  comments: number
  kind?: 'fan-art'
  shape?: 'portrait' | 'landscape' | 'square'
}

const videoPosts: FeedPost[] = referenceVideos.map((clip, index) => ({
  id: clip.id,
  creator: `@${clip.creator}`,
  title: clip.series,
  clip,
  anime: clip.anime,
  series: clip.series,
  caption: clip.caption,
  tags: index < 3 ? ['#DemonSlayer', '#AnimeEdit', '#SuppliedReference']
    : index === 3 ? ['#JujutsuKaisen', '#AnimeEdit', '#SuppliedReference']
      : ['#AttackOnTitan', '#AnimeEdit', '#SuppliedReference'],
  likes: [482, 218, 354, 173, 906][index],
  comments: [31, 18, 26, 12, 74][index],
  shape: 'landscape',
}))

const demoPosts: FeedPost[] = [
  ...videoPosts,
  {
    id: 'gabimaru-edit', creator: '@supplied-artwork', title: "Hell's Paradise / artwork",
    image: '/images/Gabimaru _ Hell\'s Paradise.jpg', imageAlt: 'Gabimaru in a Hell’s Paradise anime edit',
    anime: 'hells-paradise', series: "Hell's Paradise", caption: 'Gabimaru caught between stillness and the next strike.',
    tags: ['#HellsParadise', '#Gabimaru', '#SuppliedArtwork'], likes: 237, comments: 21, shape: 'portrait',
  },
  {
    id: 'island-edit', creator: '@supplied-artwork', title: "Hell's Paradise / edit",
    image: '/images/Hell Paradise _ Anime Mix Edits.jpg', imageAlt: 'Hell’s Paradise character edit in a blue palette',
    anime: 'hells-paradise', series: "Hell's Paradise", caption: 'The island is beautiful right up until it is not.',
    tags: ['#Jigokuraku', '#AnimeEdit', '#SuppliedArtwork'], likes: 189, comments: 14, shape: 'portrait',
  },
  {
    id: 'fan-art-study', creator: '@community-demo', title: 'Fan art / style study',
    image: '/images/anime-fan-art-styles.png', imageAlt: 'Nine anime-style interpretations of the Wikipe-tan mascot',
    anime: 'all', series: 'Fan art', caption: 'A style study from the existing project assets. Artist credit and license are listed in the asset credits.',
    tags: ['#FanArt', '#AnimeIllustration'], likes: 173, comments: 12, kind: 'fan-art', shape: 'square',
  },
  {
    id: 'one-piece-horizon', creator: '@supplied-artwork', title: 'One Piece / supplied image',
    image: '/images/one-piece-wide.jpg', imageAlt: 'The Straw Hat crew looking toward the sea at sunset',
    anime: 'all', series: 'One Piece', caption: 'A horizon built for the next adventure.',
    tags: ['#OnePiece', '#StrawHats', '#SuppliedArtwork'], likes: 391, comments: 28, shape: 'landscape',
  },
  {
    id: 'yumeko-frame', creator: '@supplied-artwork', title: 'Yumeko Jabami / supplied image',
    image: '/images/Yumeko Jabami ♡.jpg', imageAlt: 'Close-up portrait of Yumeko Jabami with red eyes',
    anime: 'all', series: 'Kakegurui', caption: 'A look that raises the stakes without saying a word.',
    tags: ['#Kakegurui', '#YumekoJabami', '#SuppliedArtwork'], likes: 277, comments: 19, shape: 'portrait',
  },
  {
    id: 'extra-image-112', creator: '@local-archive', title: 'Unlabelled image / local archive',
    image: '/images/1125968651606047.jpg', imageAlt: 'Two anime characters in a green forest setting',
    anime: 'all', series: 'Unlabelled archive', caption: 'One of the extra images supplied with the project. Series and source were not listed.',
    tags: ['#LocalArchive', '#AnimeArt'], likes: 98, comments: 7, shape: 'portrait',
  },
  {
    id: 'extra-image-242', creator: '@local-archive', title: 'Unlabelled image / local archive',
    image: '/images/24206916746573637.jpg', imageAlt: 'Close-up of a red-eyed anime character framed by a hand',
    anime: 'all', series: 'Unlabelled archive', caption: 'An intense close-up from the extra local image set.',
    tags: ['#LocalArchive', '#CharacterArt'], likes: 124, comments: 11, shape: 'portrait',
  },
  {
    id: 'extra-image-616', creator: '@local-archive', title: 'Unlabelled image / local archive',
    image: '/images/616289530303345608.jpg', imageAlt: 'A character raised by chains in a purple-lit room',
    anime: 'all', series: 'Unlabelled archive', caption: 'Purple light, hard shadows, and a striking central pose.',
    tags: ['#LocalArchive', '#AnimeArt'], likes: 83, comments: 5, shape: 'portrait',
  },
  {
    id: 'extra-image-714', creator: '@local-archive', title: 'Unlabelled image / local archive',
    image: '/images/714524297180882997.jpg', imageAlt: 'Two anime characters seen from behind against a cloudy sky',
    anime: 'all', series: 'Unlabelled archive', caption: 'A quieter frame from the extra local image set.',
    tags: ['#LocalArchive', '#AnimeArt'], likes: 76, comments: 6, shape: 'landscape',
  },
]

const filters: Array<{ id: AnimeKey | 'all' | 'fan-art'; label: string }> = [
  { id: 'all', label: 'For you' },
  { id: 'demon-slayer', label: 'Demon Slayer' },
  { id: 'attack-on-titan', label: 'Attack on Titan' },
  { id: 'hells-paradise', label: "Hell's Paradise" },
  { id: 'fan-art', label: 'Fan art' },
]

type AccessMode = 'sign-in' | 'create-account'

function AccessPreview({ mode, onClose, onSwitch }: { mode: AccessMode; onClose: () => void; onSwitch: (mode: AccessMode) => void }) {
  const creating = mode === 'create-account'

  return (
    <div className="access-preview" role="dialog" aria-modal="true" aria-labelledby="access-title" onClick={onClose}>
      <section className="access-preview__panel" onClick={(event) => event.stopPropagation()}>
        <button className="access-preview__close" onClick={onClose} type="button" aria-label="Close account preview"><X size={18} /></button>
        <p className="access-preview__eyebrow">ANIVEX / LOCAL PROTOTYPE</p>
        <h2 id="access-title">{creating ? <>Make room<br /><em>for your story.</em></> : <>Return to<br /><em>your universe.</em></>}</h2>
        <p>{creating ? 'A home for edits, theories, and the details you notice on every rewatch.' : 'Your saved worlds and conversations would be waiting here.'}</p>
        <div className="access-preview__boundary"><span /> DEMO SCREEN ONLY <span /></div>
        <button className="access-preview__continue" type="button" onClick={onClose}>Continue as a demo fan <ArrowRight size={16} /></button>
        <p className="access-preview__privacy">This prototype has no account service. It does not request, save, or send credentials or personal details.</p>
        <button className="access-preview__switch" type="button" onClick={() => onSwitch(creating ? 'sign-in' : 'create-account')}>
          {creating ? 'Already part of ANIVEX? Sign in' : 'New to ANIVEX? Create an account'}
        </button>
      </section>
    </div>
  )
}

function VideoViewer({ clip, onClose }: { clip: (typeof referenceVideos)[number]; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(0.8)

  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = volume
  }, [volume])

  return (
    <div className="video-viewer" role="dialog" aria-modal="true" aria-labelledby="video-viewer-title" onClick={onClose}>
      <section className="video-viewer__panel" onClick={(event) => event.stopPropagation()}>
        <header className="video-viewer__header">
          <div><p>{clip.series} / SUPPLIED REFERENCE</p><h2 id="video-viewer-title">{clip.creator}</h2></div>
          <button onClick={onClose} type="button" aria-label="Close video viewer"><X size={20} /></button>
        </header>
        <video ref={videoRef} className="video-viewer__video" controls playsInline preload="metadata" poster={clip.poster} muted={muted}>
          <source src={clip.src} type="video/mp4" />
          Your browser does not support HTML video.
        </video>
        <div className="video-viewer__sound">
          <button type="button" onClick={() => setMuted((current) => !current)}>
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}{muted ? 'Enable original audio' : 'Mute audio'}
          </button>
          <label><Volume2 size={14} /><span>Volume</span><input type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} /></label>
          <span className="video-viewer__duration">{clip.duration} · H.264 / AAC</span>
        </div>
      </section>
    </div>
  )
}

export function CommunityExperience({ initialFilter, onClose }: CommunityExperienceProps) {
  const [filter, setFilter] = useState<AnimeKey | 'all' | 'fan-art'>(initialFilter)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(() => new Set())
  const [openComments, setOpenComments] = useState<Set<string>>(() => new Set())
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [replies, setReplies] = useState<Record<string, string[]>>({})
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeClip, setActiveClip] = useState<(typeof referenceVideos)[number] | null>(null)
  const [accessMode, setAccessMode] = useState<AccessMode | null>(null)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (activeClip) setActiveClip(null)
      else if (accessMode) setAccessMode(null)
      else onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [activeClip, accessMode, onClose])

  const visiblePosts = useMemo(() => demoPosts.filter((post) => {
    const matchesFilter = filter === 'all'
      || (filter === 'fan-art' ? post.kind === 'fan-art' : post.anime === filter)
    const query = search.trim().toLowerCase()
    const matchesSearch = !query || `${post.creator} ${post.series} ${post.caption} ${post.tags.join(' ')}`.toLowerCase().includes(query)
    return matchesFilter && matchesSearch
  }), [filter, search])

  const toggleLike = (id: string) => {
    setLikedPosts((previous) => {
      const next = new Set(previous)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const sendReply = (event: FormEvent<HTMLFormElement>, postId: string) => {
    event.preventDefault()
    const text = drafts[postId]?.trim()
    if (!text) return
    setReplies((previous) => ({ ...previous, [postId]: [...(previous[postId] ?? []), text] }))
    setDrafts((previous) => ({ ...previous, [postId]: '' }))
  }

  return (
    <div className="community-shell" role="dialog" aria-modal="true" aria-labelledby="community-title">
      <header className="community-topbar">
        <button className="community-back" onClick={onClose} type="button"><ArrowLeft size={17} /> <span>Back to ANIVEX</span></button>
        <a className="brand" href="#home" onClick={onClose}><span className="brand__sigil">A</span> ANIVEX</a>
        <div className="community-access-actions">
          <button type="button" onClick={() => setAccessMode('sign-in')}>Sign in</button>
          <button type="button" onClick={() => setAccessMode('create-account')}>Create account <ArrowRight size={13} /></button>
        </div>
        <div className="community-badge"><span /> LOCAL REFERENCE FEED</div>
        <button className="community-close" aria-label="Close community" onClick={onClose} type="button"><X size={19} /></button>
      </header>

      <div className="community-layout">
        <aside className="community-aside">
          <p className="community-aside__overline">THE SIGNAL AFTER THE SCENE</p>
          <h1 id="community-title">Find your<br /><em>fellow travelers.</em></h1>
          <p className="community-aside__copy">Edits, character frames, and the people who know exactly why that moment matters.</p>
          <div className="community-aside__members"><span>DS</span><span>AoT</span><span>JJK</span><span>+3</span></div>
          <p className="community-aside__live"><i /> LOCAL DEMO / NO ACCOUNTS</p>
          <div className="community-aside__prompt"><Sparkles size={15} /><p>What scene still lives in your head?</p><small>QUESTION OF THE DAY</small></div>
          <p className="community-aside__note">Creator names mirror visible marks in supplied clips. These are local demo posts, not verified creator profiles.</p>
        </aside>

        <section className="community-feed" aria-label="Anime edit and artwork feed">
          <div className="feed-toolbar">
            <div className="feed-tabs" role="tablist" aria-label="Filter the community feed">
              {filters.map((item) => (
                <button className={filter === item.id ? 'is-active' : ''} key={item.id} onClick={() => setFilter(item.id)} role="tab" aria-selected={filter === item.id} type="button">{item.label}</button>
              ))}
            </div>
            <button className={`feed-search-button ${searchOpen ? 'is-active' : ''}`} aria-label="Search posts" onClick={() => setSearchOpen((open) => !open)} type="button"><Search size={17} /></button>
          </div>
          {searchOpen && <label className="feed-search"><Search size={15} /><input autoFocus placeholder="Search creator, series, moment..." value={search} onChange={(event) => setSearch(event.target.value)} /><button type="button" onClick={() => setSearch('')} aria-label="Clear search"><X size={14} /></button></label>}

          {visiblePosts.length ? (
            <div className="feed-mosaic">
              {visiblePosts.map((post, index) => {
                const liked = likedPosts.has(post.id)
                const commentsVisible = openComments.has(post.id)
                const kind = post.clip ? 'video' : post.kind ? 'art' : 'still'
                return (
                  <article className={`feed-post feed-post--${kind} feed-post--${post.shape ?? 'portrait'}`} key={post.id}>
                    <div className="feed-post__media">
                      {post.clip ? (
                        <button className="feed-post__thumbnail" type="button" onClick={() => setActiveClip(post.clip!)} aria-label={`Open ${post.series} edit from ${post.creator}`}>
                          <img src={post.clip.poster} alt={`Video frame: ${post.series} edit`} loading={index > 3 ? 'lazy' : 'eager'} />
                          <span className="feed-post__play"><Play size={23} fill="currentColor" /></span>
                          <span className="feed-post__duration">{post.clip.duration}</span>
                        </button>
                      ) : <img src={post.image} alt={post.imageAlt} loading="lazy" />}
                      <span className="feed-post__series">{post.series}</span>
                      <span className="feed-post__demo">{post.id.startsWith('extra-image') ? 'LOCAL ARCHIVE' : 'SUPPLIED DEMO'}</span>
                    </div>
                    <div className="feed-post__body">
                      <div className="feed-post__creator"><span className={`creator-avatar creator-avatar--${index + 1}`}>{post.creator.slice(1, 3).toUpperCase()}</span><strong>{post.creator}</strong><small>{post.title}</small></div>
                      <p className="feed-post__caption">{post.caption}</p>
                      <p className="feed-post__tags">{post.tags.map((tag) => <span key={tag}>{tag} </span>)}</p>
                      <div className="feed-post__actions">
                        <button className={liked ? 'is-liked' : ''} type="button" onClick={() => toggleLike(post.id)} aria-pressed={liked} aria-label={liked ? 'Unlike post' : 'Like post'}><Heart size={17} fill={liked ? 'currentColor' : 'none'} /> {post.likes + (liked ? 1 : 0)}</button>
                        <button type="button" onClick={() => setOpenComments((old) => { const next = new Set(old); if (next.has(post.id)) next.delete(post.id); else next.add(post.id); return next })} aria-expanded={commentsVisible}><MessageCircle size={16} /> {post.comments + (replies[post.id]?.length ?? 0)}</button>
                      </div>
                      {commentsVisible && <div className="feed-post__discussion"><p><b>demo reply</b> That cut hits completely differently every time.</p>{(replies[post.id] ?? []).map((reply, replyIndex) => <p key={`${post.id}-${replyIndex}`}><b>you</b> {reply}</p>)}<form onSubmit={(event) => sendReply(event, post.id)}><input aria-label="Write a comment" placeholder="Add to the conversation..." value={drafts[post.id] ?? ''} onChange={(event) => setDrafts((old) => ({ ...old, [post.id]: event.target.value }))} /><button type="submit" aria-label="Send comment"><Send size={14} /></button></form></div>}
                    </div>
                  </article>
                )
              })}
            </div>
          ) : <p className="feed-empty">No posts match that search yet. Try another series or phrase.</p>}

          <p className="feed-licensing">Reference video rights are not documented. These locally supplied clips remain in this private demo and are not cleared for redistribution.</p>
        </section>

        <aside className="community-rightbar">
          <p className="community-aside__overline">WORLDS IN ORBIT</p>
          {animeWorlds.map((world) => <button className="room-link" key={world.key} onClick={() => setFilter(world.key)} type="button"><span className={`room-link__dot room-link__dot--${world.mood}`} /><span>{world.title}<small>{world.romanizedTitle}</small></span><ArrowRight size={14} /></button>)}
          <button className="room-link room-link--all" onClick={() => setFilter('all')} type="button"><span className="room-link__dot" /><span>All edits<small>Every world together</small></span><ArrowRight size={14} /></button>
          <div className="community-rightbar__footer">A local feed prototype<br />made for anime fans.</div>
        </aside>
      </div>
      {activeClip && <VideoViewer clip={activeClip} onClose={() => setActiveClip(null)} />}
      {accessMode && <AccessPreview mode={accessMode} onClose={() => setAccessMode(null)} onSwitch={setAccessMode} />}
    </div>
  )
}
