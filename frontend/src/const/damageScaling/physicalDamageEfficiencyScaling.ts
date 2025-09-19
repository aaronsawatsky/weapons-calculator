export const physicalDamageEfficiency = [
  {
    statLevel: 10,
    rating: 0.05,
    ratingPerLevel: 0.035,
  },
  {
    statLevel: 20,
    rating: 0.4,
    ratingPerLevel: 0.0225,
  },
  {
    statLevel: 40,
    rating: 0.85,
    ratingPerLevel: 0.0025,
  },
  {
    statLevel: 99,
    rating: 1.0,
    ratingPerLevel: null,
  },
] as const
