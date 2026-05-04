export const games = [
  {
    id: 'memory-match',
    name: 'Memory Match',
    purpose: 'Remember and match gentle symbols.',
    time: '2 min',
    difficulty: 'Gentle',
    icon: 'memory',
    accent: 'lavender'
  },
  {
    id: 'pattern-focus',
    name: 'Pattern Focus',
    purpose: 'Notice what comes next.',
    time: '1-2 min',
    difficulty: 'Easy',
    icon: 'pattern',
    accent: 'dusty'
  },
  {
    id: 'number-garden',
    name: 'Number Garden',
    purpose: 'Find numbers in a calm order.',
    time: '1 min',
    difficulty: 'Gentle',
    icon: 'number',
    accent: 'sage'
  },
  {
    id: 'word-recall',
    name: 'Word Recall',
    purpose: 'Hold a few friendly words in mind.',
    time: '2 min',
    difficulty: 'Relaxed',
    icon: 'word',
    accent: 'peach'
  },
  {
    id: 'calm-sorting',
    name: 'Calm Sorting',
    purpose: 'Choose the category that fits.',
    time: '1-2 min',
    difficulty: 'Easy',
    icon: 'sorting',
    accent: 'honey'
  }
];

export const getGameById = (id) => games.find((game) => game.id === id);
