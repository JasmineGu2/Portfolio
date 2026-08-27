export interface GalleryRoleBento {
  id: string
  tag: string
  title: string
  description: string
  initial: string
}

export type GalleryKind = 'impact' | 'side' | 'moments'

export interface GalleryTileSpec {
  id: string
  kind: 'info' | 'photo'
  col: string
  row: string
  tag: string
  title: string
  subtitle: string
  initial?: string
  imageSrc?: string
  alt?: string
}

export const GALLERY_INTRO = {
  title: 'Powered by community (and a lot of love)',
  lead: 'A small collection of the people, communities, and projects I\'ve gotten to help shape along the way.',
}

export const GALLERY_PHOTO_COUNT = 35

export const GALLERY_IMPACT_ROLES: GalleryRoleBento[] = [
  {
    id: 'ivey-fellowship',
    tag: 'Product VP',
    title: 'Ivey Product Society',
    description: 'Redesigned a 50-person product bootcamp',
    initial: 'P',
  },
  {
    id: 'rtc',
    tag: 'Community',
    title: 'Rewriting the Code',
    description: 'Hub Leader · women in tech',
    initial: 'R',
  },
  {
    id: 'orientation',
    tag: 'Campus',
    title: 'Orientation Leader',
    description: 'Supporting first years',
    initial: 'O',
  },
  {
    id: 'myac',
    tag: 'Leadership',
    title: 'Youth Action Council',
    description: 'President · grew membership 300%',
    initial: 'Y',
  },
  {
    id: 'social-justice',
    tag: 'Impact',
    title: 'Social Justice Club',
    description: 'President · giving back',
    initial: 'S',
  },
]

export const GALLERY_SIDE_QUESTS: GalleryRoleBento[] = [
  {
    id: 'poker',
    tag: 'Competition',
    title: 'Poker Club',
    description: 'Top 9 finalist',
    initial: 'P',
  },
  {
    id: 'hiphop',
    tag: 'Performance',
    title: 'Hip Hop Western',
    description: 'Dancer',
    initial: 'H',
  },
  {
    id: 'fashion',
    tag: 'Creative',
    title: 'Fashion Lifestyle Society',
    description: 'Stylist & creative director',
    initial: 'F',
  },
]

function roleToTile(role: GalleryRoleBento, col: string, row: string): GalleryTileSpec {
  return {
    id: role.id,
    kind: 'info',
    col,
    row,
    tag: role.tag,
    title: role.title,
    subtitle: role.description,
    initial: role.initial,
  }
}

export const GALLERY_GRID_COLUMNS = 6

/** Compact 6-column mosaic, singles, wides, and 2×2 highlights */
const GALLERY_MOMENT_LAYOUT: Pick<GalleryTileSpec, 'col' | 'row'>[] = [
  { col: '1', row: '1' },
  { col: '2', row: '1' },
  { col: '3', row: '1' },
  { col: '4', row: '1' },
  { col: '5', row: '1' },
  { col: '6', row: '1' },
  { col: '1 / span 2', row: '2 / span 2' },
  { col: '3', row: '2' },
  { col: '4', row: '2' },
  { col: '5 / span 2', row: '2' },
  { col: '3', row: '3' },
  { col: '4', row: '3' },
  { col: '5', row: '3' },
  { col: '6', row: '3' },
  { col: '1', row: '4' },
  { col: '2', row: '4' },
  { col: '3', row: '4' },
  { col: '4', row: '4' },
  { col: '5', row: '4' },
  { col: '6', row: '4' },
  { col: '1 / span 2', row: '5 / span 2' },
  { col: '3', row: '5' },
  { col: '4', row: '5' },
  { col: '5', row: '5' },
  { col: '6', row: '5' },
  { col: '3', row: '6' },
  { col: '4', row: '6' },
  { col: '5 / span 2', row: '6' },
  { col: '1', row: '7' },
  { col: '2', row: '7' },
  { col: '3', row: '7' },
  { col: '4', row: '7' },
  { col: '5', row: '7' },
  { col: '6', row: '7' },
  { col: '1 / span 2', row: '8 / span 2' },
  { col: '3 / span 2', row: '8 / span 2' },
]

function applyGalleryMomentLayout(photos: GalleryTileSpec[]): GalleryTileSpec[] {
  return photos.map((photo, index) => ({
    ...photo,
    ...GALLERY_MOMENT_LAYOUT[index],
  }))
}

export const GALLERY_IMPACT_TILES: GalleryTileSpec[] = [
  roleToTile(GALLERY_IMPACT_ROLES[0], '1 / span 2', '1'),
  roleToTile(GALLERY_IMPACT_ROLES[1], '3', '1'),
  roleToTile(GALLERY_IMPACT_ROLES[2], '4', '1'),
  roleToTile(GALLERY_IMPACT_ROLES[3], '1', '2'),
  roleToTile(GALLERY_IMPACT_ROLES[4], '2 / span 2', '2'),
]

export const GALLERY_SIDE_TILES: GalleryTileSpec[] = [
  roleToTile(GALLERY_SIDE_QUESTS[0], '1', '1'),
  roleToTile(GALLERY_SIDE_QUESTS[1], '2', '1'),
  roleToTile(GALLERY_SIDE_QUESTS[2], '3', '1'),
]

const GALLERY_MOMENT_PHOTOS_RAW: GalleryTileSpec[] = [
  {
    id: 'photo-1',
    kind: 'photo',
    col: '1',
    row: '1',
    tag: 'Moment',
    title: 'Community moment',
    subtitle: 'Gallery capture',
    imageSrc: '/gallery/20250323_124223_A19484 1.JPEG',
    alt: 'Community moment',
  },
  {
    id: 'photo-2',
    kind: 'photo',
    col: '2',
    row: '1',
    tag: 'Moment',
    title: 'Community moment',
    subtitle: 'Gallery capture',
    imageSrc: '/gallery/FDFBF53D-4E00-4881-855B-DD5BBB768CFB 1.JPG',
    alt: 'Community moment',
  },
  {
    id: 'photo-3',
    kind: 'photo',
    col: '3',
    row: '1',
    tag: 'Moment',
    title: 'Community moment',
    subtitle: 'Gallery capture',
    imageSrc: '/gallery/IMG_1426 1.JPEG',
    alt: 'Community moment',
  },
  {
    id: 'photo-4',
    kind: 'photo',
    col: '4',
    row: '1',
    tag: 'Moment',
    title: 'Community moment',
    subtitle: 'Gallery capture',
    imageSrc: '/gallery/IMG_2295 1.JPEG',
    alt: 'Community moment',
  },
  {
    id: 'photo-5',
    kind: 'photo',
    col: '1 / span 2',
    row: '2 / span 2',
    tag: 'Highlight',
    title: 'Community highlight',
    subtitle: 'Wide moment',
    imageSrc: '/gallery/IMG_4673 3 1.JPG',
    alt: 'Community highlight',
  },
  {
    id: 'photo-6',
    kind: 'photo',
    col: '3',
    row: '2',
    tag: 'Moment',
    title: 'Community moment',
    subtitle: 'Gallery capture',
    imageSrc: '/gallery/IMG_4772 1.jpg',
    alt: 'Community moment',
  },
  {
    id: 'photo-7',
    kind: 'photo',
    col: '4',
    row: '2',
    tag: 'Moment',
    title: 'Community moment',
    subtitle: 'Gallery capture',
    imageSrc: '/gallery/IMG_4855 1.JPEG',
    alt: 'Community moment',
  },
  {
    id: 'photo-8',
    kind: 'photo',
    col: '3',
    row: '3',
    tag: 'Moment',
    title: 'Community moment',
    subtitle: 'Gallery capture',
    imageSrc: '/gallery/IMG_6385 1.JPG',
    alt: 'Community moment',
  },
  {
    id: 'photo-9',
    kind: 'photo',
    col: '4',
    row: '3',
    tag: 'Moment',
    title: 'Community moment',
    subtitle: 'Gallery capture',
    imageSrc: '/gallery/IMG_7394 1.jpg',
    alt: 'Community moment',
  },
  {
    id: 'photo-10',
    kind: 'photo',
    col: '1 / span 2',
    row: '4 / span 2',
    tag: 'Highlight',
    title: 'Community highlight',
    subtitle: 'Wide moment',
    imageSrc: '/gallery/IMG_7655 1.JPG',
    alt: 'Community highlight',
  },
  {
    id: 'photo-11',
    kind: 'photo',
    col: '3',
    row: '4',
    tag: 'Moment',
    title: 'Community moment',
    subtitle: 'Gallery capture',
    imageSrc: '/gallery/IMG_8054 1.jpg',
    alt: 'Community moment',
  },
  {
    id: 'photo-12',
    kind: 'photo',
    col: '3 / span 2',
    row: '5',
    tag: 'Highlight',
    title: 'Community highlight',
    subtitle: 'Panorama',
    imageSrc: '/gallery/white-IMG_9600 1.JPG',
    alt: 'Community panorama',
  },
  {
    id: 'photo-13',
    kind: 'photo',
    col: '1',
    row: '6',
    tag: 'Moment',
    title: 'Community moment',
    subtitle: 'Gallery capture',
    imageSrc: '/gallery/IMG_1862 1.PNG',
    alt: 'Community moment',
  },
  {
    id: 'photo-14',
    kind: 'photo',
    col: '2',
    row: '6',
    tag: 'Community',
    title: 'Compass Food Bank',
    subtitle: 'Community impact',
    imageSrc: '/gallery/cfc.png',
    alt: 'Compass Food Bank',
  },
  {
    id: 'photo-16',
    kind: 'photo',
    col: '4',
    row: '6',
    tag: 'Community',
    title: 'Rewriting the Code',
    subtitle: 'Women in tech',
    imageSrc: '/gallery/rtc.png',
    alt: 'Rewriting the Code',
  },
  {
    id: 'photo-17',
    kind: 'photo',
    col: '1',
    row: '7',
    tag: 'Campus',
    title: 'Letters on the lawn',
    subtitle: 'Aerial campus moment',
    imageSrc: '/gallery/moment-aerial-letters.png',
    alt: 'Aerial view of people forming letters on a grassy field',
  },
  {
    id: 'photo-18',
    kind: 'photo',
    col: '2',
    row: '7',
    tag: 'Travel',
    title: 'Japanese garden',
    subtitle: 'Kyoto in spring',
    imageSrc: '/gallery/moment-japan-garden.png',
    alt: 'Person in kimono walking through a Japanese garden',
  },
  {
    id: 'photo-19',
    kind: 'photo',
    col: '3',
    row: '7',
    tag: 'Food',
    title: 'Sushi night',
    subtitle: 'Table-side omakase',
    imageSrc: '/gallery/moment-sushi.png',
    alt: 'Hand holding a piece of sushi with chopsticks',
  },
  {
    id: 'photo-20',
    kind: 'photo',
    col: '4',
    row: '7',
    tag: 'Food',
    title: 'Steamed bao',
    subtitle: 'Night market find',
    imageSrc: '/gallery/moment-steamed-bao.png',
    alt: 'Steamed bao held up at a busy food market',
  },
  {
    id: 'photo-21',
    kind: 'photo',
    col: '1 / span 2',
    row: '8 / span 2',
    tag: 'Highlight',
    title: 'Team photo',
    subtitle: 'Grey fleeces and T-Rex costumes',
    imageSrc: '/gallery/moment-group-fleece.png',
    alt: 'Large group photo in matching grey fleeces with inflatable dinosaur costumes',
  },
  {
    id: 'photo-22',
    kind: 'photo',
    col: '3',
    row: '8',
    tag: 'Night out',
    title: 'Bruno Mars mural',
    subtitle: 'Vegas photo op',
    imageSrc: '/gallery/moment-bruno-mars-mural.png',
    alt: 'Person posing in front of a large Bruno Mars mural',
  },
  {
    id: 'photo-23',
    kind: 'photo',
    col: '4',
    row: '8',
    tag: 'Travel',
    title: 'Yosemite overlook',
    subtitle: 'Valley view',
    imageSrc: '/gallery/moment-yosemite-valley.png',
    alt: 'Person looking out over Yosemite Valley from a scenic overlook',
  },
  {
    id: 'photo-24',
    kind: 'photo',
    col: '3',
    row: '9',
    tag: 'Travel',
    title: 'Temple Bar',
    subtitle: 'Dublin, Ireland',
    imageSrc: '/gallery/moment-temple-bar.png',
    alt: 'Person posing outside The Temple Bar pub in Dublin',
  },
  {
    id: 'photo-25',
    kind: 'photo',
    col: '4',
    row: '9',
    tag: 'Home',
    title: 'Puzzle night',
    subtitle: '1000 pieces in progress',
    imageSrc: '/gallery/moment-jigsaw-puzzle.png',
    alt: 'Person working on a large jigsaw puzzle on a wooden floor',
  },
  {
    id: 'photo-26',
    kind: 'photo',
    col: '1 / span 2',
    row: '10 / span 2',
    tag: 'Highlight',
    title: 'Lagree studio',
    subtitle: 'Neon blue workout',
    imageSrc: '/gallery/moment-lagree-studio.png',
    alt: 'Mirror selfie in a blue-lit Lagree fitness studio',
  },
  {
    id: 'photo-27',
    kind: 'photo',
    col: '3',
    row: '10',
    tag: 'Creative',
    title: 'Inspiration wall',
    subtitle: 'Print collage',
    imageSrc: '/gallery/moment-wall-collage.png',
    alt: 'Wall covered in a collage of art prints and motivational quotes',
  },
  {
    id: 'photo-28',
    kind: 'photo',
    col: '4',
    row: '10',
    tag: 'Travel',
    title: 'Kyoto shrine',
    subtitle: 'Maple tree and kimono',
    imageSrc: '/gallery/moment-kyoto-maple-shrine.png',
    alt: 'Person in floral kimono under a green Japanese maple at a shrine',
  },
  {
    id: 'photo-29',
    kind: 'photo',
    col: '3',
    row: '11',
    tag: 'Travel',
    title: 'Casa Batlló',
    subtitle: 'Barcelona golden hour',
    imageSrc: '/gallery/moment-barcelona-batllo.png',
    alt: 'Person in a red sweater standing in front of Casa Batlló in Barcelona',
  },
  {
    id: 'photo-30',
    kind: 'photo',
    col: '4',
    row: '11',
    tag: 'Work',
    title: 'Tesla at Bubu Fest',
    subtitle: 'Vendor booth moment',
    imageSrc: '/gallery/moment-tesla-bubu-fest.png',
    alt: 'Tesla vendor booth at Bubu Fest with bunny-ear crowns and demo tablets',
  },
  {
    id: 'photo-31',
    kind: 'photo',
    col: '1',
    row: '12',
    tag: 'Friends',
    title: 'Mahjong night',
    subtitle: 'Tiles on the table',
    imageSrc: '/gallery/moment-mahjong.png',
    alt: 'Mahjong tiles spread across a red table during a game',
  },
  {
    id: 'photo-32',
    kind: 'photo',
    col: '2',
    row: '12',
    tag: 'Travel',
    title: 'Snow in hanfu',
    subtitle: 'Winter portrait',
    imageSrc: '/gallery/moment-snow-hanfu.png',
    alt: 'Person in red hanfu kneeling in fresh snow',
  },
  {
    id: 'photo-33',
    kind: 'photo',
    col: '3',
    row: '12',
    tag: 'Travel',
    title: 'Night market',
    subtitle: 'Festival lights',
    imageSrc: '/gallery/moment-night-market.png',
    alt: 'Person at a brightly lit outdoor night market',
  },
  {
    id: 'photo-34',
    kind: 'photo',
    col: '4',
    row: '12',
    tag: 'Travel',
    title: 'Shanghai skyline',
    subtitle: 'Pudong at night',
    imageSrc: '/gallery/moment-shanghai-skyline.png',
    alt: 'Person making a heart shape with hands in front of the Shanghai skyline',
  },
  {
    id: 'photo-35',
    kind: 'photo',
    col: '1 / span 2',
    row: '13',
    tag: 'Highlight',
    title: 'Osaka go-kart',
    subtitle: 'Street kart at night',
    imageSrc: '/gallery/moment-osaka-gokart.png',
    alt: 'Go-kart on Osaka streets at night with Pikachu costume reflected in mirror',
  },
  {
    id: 'photo-36',
    kind: 'photo',
    col: '3 / span 2',
    row: '13',
    tag: 'Highlight',
    title: 'Machu Picchu',
    subtitle: 'Llama on the trail',
    imageSrc: '/gallery/moment-machu-picchu-llama.png',
    alt: 'Person feeding a llama on a grassy hillside at Machu Picchu',
  },
]

export const GALLERY_MOMENT_TILES = applyGalleryMomentLayout(GALLERY_MOMENT_PHOTOS_RAW)

export const GALLERY_PHOTOS = GALLERY_MOMENT_TILES.filter(
  (tile): tile is GalleryTileSpec & { imageSrc: string } =>
    tile.kind === 'photo' && Boolean(tile.imageSrc)
)

export function galleryForKind(kind: GalleryKind): GalleryTileSpec[] {
  if (kind === 'impact') return GALLERY_IMPACT_TILES
  if (kind === 'side') return GALLERY_SIDE_TILES
  return GALLERY_MOMENT_TILES
}

export function galleryZoneLabel(kind: GalleryKind): string {
  if (kind === 'impact') return 'Impact workflow'
  if (kind === 'side') return 'Side quest workflow'
  return 'Moments workflow'
}

export function encodeGallerySrc(src: string): string {
  return src
    .split('/')
    .map((part, idx, arr) => (idx === arr.length - 1 ? encodeURIComponent(part) : part))
    .join('/')
}

export function galleryPaletteIndex(id: string, kind: GalleryKind): number {
  const tiles = galleryForKind(kind)
  const index = tiles.findIndex((tile) => tile.id === id)
  return index >= 0 ? index : 0
}
