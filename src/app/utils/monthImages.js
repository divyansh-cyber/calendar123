/**
 * Seasonal Unsplash hero images for each month
 * Using direct Unsplash image URLs with size parameters
 */

const MONTH_IMAGES = [
  {
    // January — Snowy mountains
    url: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1200&h=600&fit=crop&crop=center',
    alt: 'Snow-covered mountain peaks in winter',
    credit: 'Unsplash',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    // February — Cherry blossoms / romantic
    url: 'https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=1200&h=600&fit=crop&crop=center',
    alt: 'Beautiful cherry blossom trees in bloom',
    credit: 'Unsplash',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    // March — Spring flowers
    url: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1200&h=600&fit=crop&crop=center',
    alt: 'Fresh spring flowers blooming in a meadow',
    credit: 'Unsplash',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },
  {
    // April — Rainy / green
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop&crop=center',
    alt: 'Lush green forest canopy in spring',
    credit: 'Unsplash',
    gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
  },
  {
    // May — Tulip fields
    url: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=1200&h=600&fit=crop&crop=center',
    alt: 'Colorful wildflower meadow in late spring',
    credit: 'Unsplash',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
  {
    // June — Beach / Summer
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop&crop=center',
    alt: 'Tropical beach with crystal clear water',
    credit: 'Unsplash',
    gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  },
  {
    // July — Ocean / Summit
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop&crop=center',
    alt: 'Majestic mountain summit above clouds',
    credit: 'Unsplash',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  },
  {
    // August — Monsoon / Waterfalls
    url: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba8673?w=1200&h=600&fit=crop&crop=center',
    alt: 'Dramatic waterfall through lush monsoon greenery',
    credit: 'Unsplash',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    // September — Early autumn
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop&crop=center',
    alt: 'Golden autumn forest pathway',
    credit: 'Unsplash',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  },
  {
    // October — Autumn foliage
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop&crop=center',
    alt: 'Vibrant autumn leaves reflecting in still lake',
    credit: 'Unsplash',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  },
  {
    // November — Late autumn / misty
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&h=600&fit=crop&crop=center',
    alt: 'Misty mountain range at dawn',
    credit: 'Unsplash',
    gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  },
  {
    // December — Winter wonderland
    url: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=1200&h=600&fit=crop&crop=center',
    alt: 'Snow-covered pine trees in winter forest',
    credit: 'Unsplash',
    gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  },
];

export function getMonthImage(month) {
  return MONTH_IMAGES[month];
}

export default MONTH_IMAGES;
