const STORAGE_KEY = 'daily-brain-trainer-progress';

const defaultProgress = {
  completedToday: [],
  totalCompleted: 0,
  streak: 0,
  lastPlayedDate: '',
  perGame: {},
  soundEnabled: false
};

export const todayKey = (date = new Date()) => {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};

const daysBetween = (dateA, dateB) => {
  if (!dateA || !dateB) {
    return Number.POSITIVE_INFINITY;
  }

  const start = new Date(`${dateA}T00:00:00`);
  const end = new Date(`${dateB}T00:00:00`);
  return Math.round((end - start) / 86400000);
};

const canUseStorage = () =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const loadProgress = () => {
  const today = todayKey();

  if (!canUseStorage()) {
    return { ...defaultProgress, todayDate: today };
  }

  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
    const progress = {
      ...defaultProgress,
      ...stored,
      completedToday:
        stored.lastPlayedDate === today && Array.isArray(stored.completedToday)
          ? stored.completedToday
          : []
    };

    if (progress.lastPlayedDate && progress.lastPlayedDate !== today) {
      const gap = daysBetween(progress.lastPlayedDate, today);
      progress.streak = gap > 1 ? 0 : progress.streak;
    }

    return { ...progress, todayDate: today };
  } catch {
    return { ...defaultProgress, todayDate: today };
  }
};

const saveProgress = (progress) => {
  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  return { ...progress, todayDate: todayKey() };
};

export const recordGameCompletion = (gameId) => {
  const today = todayKey();
  const current = loadProgress();
  const alreadyCompletedToday = current.completedToday.includes(gameId);
  const completedToday = alreadyCompletedToday
    ? current.completedToday
    : [...current.completedToday, gameId];

  const isNewPlayingDay = current.lastPlayedDate !== today;
  const streak = isNewPlayingDay
    ? daysBetween(current.lastPlayedDate, today) === 1
      ? current.streak + 1
      : 1
    : Math.max(current.streak, 1);

  const previousGame = current.perGame[gameId] || {
    totalCompletions: 0,
    lastCompletedDate: ''
  };

  return saveProgress({
    ...current,
    completedToday,
    totalCompleted: alreadyCompletedToday
      ? current.totalCompleted
      : current.totalCompleted + 1,
    streak,
    lastPlayedDate: today,
    perGame: {
      ...current.perGame,
      [gameId]: {
        totalCompletions: alreadyCompletedToday
          ? previousGame.totalCompletions
          : previousGame.totalCompletions + 1,
        lastCompletedDate: today
      }
    }
  });
};

export const setSoundPreference = (enabled) => {
  const current = loadProgress();
  return saveProgress({
    ...current,
    soundEnabled: enabled
  });
};
