type CreativePiece = {
  src: string;
  alt: string;
  title: string;
  medium: string;
  /** Intrinsic aspect ratio so the grid can reserve space before load. */
  aspect: string;
  /** Display width (CSS px) from the design; the source images are exactly 2x this. */
  width: number;
};

const creative = {
  intro: 'A selection of creative work: 3D modeling, graphic mail posts and some handmade cards.',
  pieces: [
    {
      src: '/images/creative/flyt.webp',
      alt: 'Flyt — a white game controller with green thumbsticks and its technical drawings',
      title: 'Flyt',
      medium: '3D modeling · product design',
      aspect: '1078 / 752',
      width: 540,
    },
    {
      src: '/images/creative/pastael-cherry.webp',
      alt: 'Pastael cherry edition packing cube with accessories',
      title: 'Pastael — cherry edition',
      medium: 'Graphic mail post',
      aspect: '970 / 720',
      width: 485,
    },
    {
      src: '/images/creative/hanger.webp',
      alt: 'A minimal steel clothes hanger prototype',
      title: 'Hanger',
      medium: 'Product prototype',
      aspect: '440 / 1000',
      width: 220,
    },
    {
      src: '/images/creative/christmas-green.webp',
      alt: 'Handmade Christmas card with lace on green holly paper',
      title: 'Christmas card',
      medium: 'Handmade',
      aspect: '1090 / 804',
      width: 554,
    },
    {
      src: '/images/creative/christmas-red.webp',
      alt: 'Handmade Merry Christmas card with lace border on red paper',
      title: 'Merry Christmas',
      medium: 'Handmade',
      aspect: '801 / 652',
      width: 404,
    },
    {
      src: '/images/creative/christmas-lace.webp',
      alt: 'Handmade Merry Christmas card with ribbon and leaves',
      title: 'Merry Christmas II',
      medium: 'Handmade',
      aspect: '960 / 806',
      width: 480,
    },
    {
      src: '/images/creative/awesome-card.webp',
      alt: 'Hand-drawn card reading “not only for what you do, but for being awesome”',
      title: 'For being awesome',
      medium: 'Handmade · watercolour',
      aspect: '947 / 692',
      width: 475,
    },
  ],
} as const satisfies { intro: string; pieces: readonly CreativePiece[] };

export { creative, type CreativePiece };
