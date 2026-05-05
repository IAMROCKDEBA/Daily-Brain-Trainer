import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, BookOpen, Eye, Lightbulb, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import BigButton from '../components/BigButton.jsx';
import SuccessModal from '../components/SuccessModal.jsx';

const wordSets = [
  {
    words: ['Tea', 'River', 'Smile'],
    extras: ['Garden', 'Window', 'Music']
  },
  {
    words: ['Home', 'Cloud', 'Friend'],
    extras: ['Chair', 'Bread', 'Sun']
  },
  {
    words: ['Book', 'Flower', 'Morning'],
    extras: ['Road', 'Cup', 'Song']
  },
  {
    words: ['Warm', 'Leaf', 'Family'],
    extras: ['Stone', 'Door', 'Rain']
  }
];

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

const createRound = () => {
  const set = wordSets[Math.floor(Math.random() * wordSets.length)];
  return {
    words: set.words,
    options: shuffle([...set.words, ...set.extras])
  };
};

export default function WordRecall({ game, onBack, onComplete }) {
  const reduceMotion = useReducedMotion();
  const [roundKey, setRoundKey] = useState(0);
  const round = useMemo(() => createRound(), [roundKey]);
  const [phase, setPhase] = useState('study');
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState('Read these three words gently.');
  const [completed, setCompleted] = useState(false);

  const progress = Math.round((selected.length / round.words.length) * 100);

  useEffect(() => {
    if (phase !== 'study' || completed) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setPhase('choose');
      setFeedback('Now choose the words you remember.');
    }, 5500);

    return () => window.clearTimeout(timeout);
  }, [completed, phase]);

  useEffect(() => {
    if (!completed && selected.length === round.words.length) {
      setCompleted(true);
      onComplete();
    }
  }, [completed, onComplete, round.words.length, selected.length]);

  const restart = () => {
    setRoundKey((key) => key + 1);
    setPhase('study');
    setSelected([]);
    setFeedback('Read these three words gently.');
    setCompleted(false);
  };

  const showAgain = () => {
    setPhase('study');
    setFeedback('Here are the words again. There is no penalty for looking.');
  };

  const choose = (word) => {
    if (phase === 'study' || completed || selected.includes(word)) {
      return;
    }

    if (round.words.includes(word)) {
      setSelected((current) => [...current, word]);
      setFeedback('Yes. That word was in the set.');
    } else {
      setFeedback('That one was not in this set. The remembered words are still here for you.');
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-4 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex min-h-[56px] items-center gap-3 rounded-lg bg-white/80 px-5 py-3 text-lg font-semibold text-charcoal shadow-soft hover:bg-white"
      >
        <ArrowLeft aria-hidden="true" className="h-6 w-6" />
        Back
      </button>

      <section className="mt-6">
        <p className="text-lg font-semibold text-peach-700">{game.difficulty}</p>
        <h1 className="mt-2 text-4xl font-bold text-charcoal sm:text-5xl">
          {game.name}
        </h1>
        <p className="mt-4 max-w-3xl text-xl leading-relaxed text-charcoal/72">
          Read three simple words. When they hide, choose the words you remember.
        </p>
      </section>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_300px]">
        <section className="rounded-lg border border-white/75 bg-white/78 p-6 shadow-soft backdrop-blur-md transform-gpu will-change-transform">
          {phase === 'study' ? (
            <div aria-label="Words to remember" className="grid gap-4 sm:grid-cols-3">
              {round.words.map((word) => (
                <motion.div
                  key={word}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                  className="flex min-h-[150px] items-center justify-center rounded-lg bg-peach-100 px-5 text-center text-4xl font-bold text-peach-700"
                >
                  {word}
                </motion.div>
              ))}
            </div>
          ) : (
            <div aria-label="Word choices" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {round.options.map((word) => {
                const isSelected = selected.includes(word);

                return (
                  <motion.button
                    key={word}
                    type="button"
                    onClick={() => choose(word)}
                    disabled={completed || isSelected}
                    whileTap={!reduceMotion ? { scale: 0.98 } : undefined}
                    className={[
                      'min-h-[112px] rounded-lg border border-white/80 bg-white/88 px-5 py-4 text-2xl font-bold text-charcoal shadow-soft transition-colors hover:bg-peach-50',
                      isSelected ? 'bg-sage-100 text-sage-700 ring-4 ring-sage-200' : ''
                    ].join(' ')}
                  >
                    {word}
                  </motion.button>
                );
              })}
            </div>
          )}
        </section>

        <aside className="rounded-lg border border-white/75 bg-white/78 p-5 shadow-soft backdrop-blur-md transform-gpu will-change-transform">
          <p className="text-base font-bold uppercase tracking-[0.16em] text-sage-700">
            Progress
          </p>
          <p className="mt-4 min-h-[88px] text-xl leading-relaxed text-charcoal/75">
            {feedback}
          </p>
          <div className="mt-5 h-4 overflow-hidden rounded-lg bg-cream-200">
            <div
              className="h-full rounded-lg bg-peach-500 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-6 grid gap-3">
            {phase === 'study' ? (
              <BigButton
                icon={BookOpen}
                variant="peach"
                onClick={() => {
                  setPhase('choose');
                  setFeedback('Now choose the words you remember.');
                }}
                full
              >
                I&apos;m Ready
              </BigButton>
            ) : (
              <BigButton icon={Eye} variant="peach" onClick={showAgain} full>
                Show Again
              </BigButton>
            )}
            <BigButton
              icon={Lightbulb}
              variant="lavender"
              onClick={() => setFeedback('There are three remembered words to choose.')}
              full
            >
              Hint
            </BigButton>
            <BigButton icon={RotateCcw} variant="secondary" onClick={restart} full>
              Restart
            </BigButton>
          </div>
        </aside>
      </div>

      <SuccessModal
        open={completed}
        message="Beautiful recall."
        onReturn={onBack}
        onRestart={restart}
      />
    </div>
  );
}
