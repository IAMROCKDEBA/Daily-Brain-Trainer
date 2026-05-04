import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Flower2,
  Heart,
  Leaf,
  Moon,
  Sparkles,
  Star,
  Sun
} from 'lucide-react';
import { useState } from 'react';
import BigButton from './components/BigButton.jsx';
import GameCard from './components/GameCard.jsx';
import Layout from './components/Layout.jsx';
import ProgressPanel from './components/ProgressPanel.jsx';
import SoftCard from './components/SoftCard.jsx';
import { games, getGameById } from './data/games.js';
import CalmSorting from './games/CalmSorting.jsx';
import MemoryMatch from './games/MemoryMatch.jsx';
import NumberGarden from './games/NumberGarden.jsx';
import PatternFocus from './games/PatternFocus.jsx';
import WordRecall from './games/WordRecall.jsx';
import {
  loadProgress,
  recordGameCompletion,
  setSoundPreference
} from './utils/progress.js';

const gameComponents = {
  'memory-match': MemoryMatch,
  'pattern-focus': PatternFocus,
  'number-garden': NumberGarden,
  'word-recall': WordRecall,
  'calm-sorting': CalmSorting
};

const calmScrollToTop = () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
};

function Screen({ children, screenKey }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      key={screenKey}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
      exit={reduceMotion ? {} : { opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  );
}

function WelcomeScreen({ progress, onStart }) {
  const hasProgress = progress.totalCompleted > 0;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-7xl items-center px-4 pb-12 pt-4 sm:px-6 lg:px-8">
      <section className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-lg bg-white/70 px-4 py-3 text-base font-bold uppercase tracking-[0.16em] text-sage-700 shadow-soft">
            <Sparkles aria-hidden="true" className="h-5 w-5" />
            A gentle daily pause
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-tight text-charcoal sm:text-6xl">
            Daily Brain Trainer
          </h1>
          <p className="mt-5 max-w-2xl text-2xl leading-relaxed text-charcoal/72">
            Gentle games to keep your mind active
          </p>

          {hasProgress ? (
            <p className="mt-6 max-w-2xl rounded-lg border border-white/70 bg-white/70 px-5 py-4 text-lg font-semibold text-charcoal/75 shadow-soft">
              You have completed {progress.totalCompleted} gentle game
              {progress.totalCompleted === 1 ? '' : 's'} so far.
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <BigButton icon={ArrowRight} onClick={onStart}>
              Start Today&apos;s Session
            </BigButton>
          </div>
        </div>

        <SoftCard className="relative min-h-[420px] overflow-hidden p-8" aria-label="Calm illustration">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(220,235,212,0.95),transparent_34%),radial-gradient(circle_at_75%_30%,rgba(236,228,255,0.9),transparent_32%),radial-gradient(circle_at_60%_80%,rgba(255,225,207,0.8),transparent_32%)]" />
          <div className="relative grid min-h-[360px] place-items-center">
            <div className="grid grid-cols-3 gap-5">
              {[
                { Icon: Heart, className: 'bg-peach-100 text-peach-700' },
                { Icon: Sun, className: 'bg-honey-100 text-honey-700' },
                { Icon: Leaf, className: 'bg-sage-100 text-sage-700' },
                { Icon: Flower2, className: 'bg-lavender-100 text-lavender-700' },
                { Icon: Brain, className: 'bg-white text-charcoal shadow-lift' },
                { Icon: Moon, className: 'bg-dusty-100 text-dusty-700' },
                { Icon: Star, className: 'bg-cream-100 text-honey-700' },
                { Icon: Sparkles, className: 'bg-sage-50 text-sage-700' },
                { Icon: Heart, className: 'bg-white/85 text-peach-700' }
              ].map(({ Icon, className }, index) => (
                <span
                  key={index}
                  className={[
                    'flex h-24 w-24 items-center justify-center rounded-lg',
                    className
                  ].join(' ')}
                >
                  <Icon aria-hidden="true" className="h-11 w-11" />
                </span>
              ))}
            </div>
          </div>
        </SoftCard>
      </section>
    </div>
  );
}

function Dashboard({ progress, onPlay }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-4 sm:px-6 lg:px-8">
      <section className="mb-8">
        <p className="text-lg font-semibold text-sage-700">Welcome back</p>
        <h1 className="mt-2 text-4xl font-bold text-charcoal sm:text-5xl">
          Choose a gentle game
        </h1>
        <p className="mt-3 max-w-3xl text-xl leading-relaxed text-charcoal/70">
          Each activity is short, calm, and forgiving. Pick whichever feels pleasant now.
        </p>
      </section>

      <ProgressPanel progress={progress} totalGames={games.length} />

      <section
        aria-label="Available games"
        className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            completed={progress.completedToday.includes(game.id)}
            onPlay={onPlay}
          />
        ))}
      </section>
    </div>
  );
}

export default function App() {
  const [progress, setProgress] = useState(() => loadProgress());
  const [screen, setScreen] = useState('welcome');
  const [activeGameId, setActiveGameId] = useState('');

  const handleToggleSound = () => {
    setProgress((current) => setSoundPreference(!current.soundEnabled));
  };

  const handleGameComplete = (gameId) => {
    setProgress(recordGameCompletion(gameId));
  };

  const openGame = (gameId) => {
    setActiveGameId(gameId);
    setScreen('game');
    calmScrollToTop();
  };

  const returnToDashboard = () => {
    setActiveGameId('');
    setScreen('dashboard');
    calmScrollToTop();
  };

  const ActiveGame = gameComponents[activeGameId];
  const activeGame = getGameById(activeGameId);

  return (
    <Layout progress={progress} onToggleSound={handleToggleSound}>
      <AnimatePresence mode="wait">
        {screen === 'welcome' ? (
          <Screen screenKey="welcome">
            <WelcomeScreen progress={progress} onStart={() => setScreen('dashboard')} />
          </Screen>
        ) : null}

        {screen === 'dashboard' ? (
          <Screen screenKey="dashboard">
            <Dashboard progress={progress} onPlay={openGame} />
          </Screen>
        ) : null}

        {screen === 'game' && ActiveGame ? (
          <Screen screenKey={activeGameId}>
            <ActiveGame
              game={activeGame}
              onBack={returnToDashboard}
              onComplete={() => handleGameComplete(activeGameId)}
            />
          </Screen>
        ) : null}
      </AnimatePresence>
    </Layout>
  );
}
