import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  Flower2,
  Heart,
  Leaf,
  Lightbulb,
  Moon,
  RotateCcw,
  Star,
  Sun
} from 'lucide-react';
import { useEffect, useState } from 'react';
import BigButton from '../components/BigButton.jsx';
import SuccessModal from '../components/SuccessModal.jsx';

const symbolMap = {
  sun: { label: 'Sun', Icon: Sun, className: 'bg-honey-100 text-honey-700' },
  moon: { label: 'Moon', Icon: Moon, className: 'bg-dusty-100 text-dusty-700' },
  star: { label: 'Star', Icon: Star, className: 'bg-cream-100 text-honey-700' },
  heart: { label: 'Heart', Icon: Heart, className: 'bg-peach-100 text-peach-700' },
  leaf: { label: 'Leaf', Icon: Leaf, className: 'bg-sage-100 text-sage-700' },
  flower: { label: 'Flower', Icon: Flower2, className: 'bg-lavender-100 text-lavender-700' }
};

const questions = [
  {
    sequence: ['sun', 'moon', 'sun', 'moon'],
    answer: 'sun',
    options: ['sun', 'star', 'moon'],
    hint: 'The symbols are taking turns: sun, then moon.'
  },
  {
    sequence: ['heart', 'heart', 'star', 'heart', 'heart'],
    answer: 'star',
    options: ['leaf', 'star', 'heart'],
    hint: 'Two hearts come before one star.'
  },
  {
    sequence: ['leaf', 'flower', 'leaf', 'flower'],
    answer: 'leaf',
    options: ['flower', 'leaf', 'sun'],
    hint: 'The leaf starts each small pair.'
  },
  {
    sequence: ['moon', 'star', 'star', 'moon', 'star', 'star'],
    answer: 'moon',
    options: ['moon', 'heart', 'star'],
    hint: 'One moon is followed by two stars.'
  },
  {
    sequence: ['flower', 'sun', 'flower', 'sun'],
    answer: 'flower',
    options: ['leaf', 'sun', 'flower'],
    hint: 'Flower and sun are gently alternating.'
  }
];

export default function PatternFocus({ game, onBack, onComplete }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState('Look across the row, then choose what comes next.');
  const [completed, setCompleted] = useState(false);
  const [answering, setAnswering] = useState(false);

  const current = questions[index] || questions[questions.length - 1];
  const progress = Math.round((index / questions.length) * 100);

  useEffect(() => {
    if (!completed && index >= questions.length) {
      setCompleted(true);
      onComplete();
    }
  }, [completed, index, onComplete]);

  const restart = () => {
    setIndex(0);
    setFeedback('Look across the row, then choose what comes next.');
    setCompleted(false);
    setAnswering(false);
  };

  const choose = (symbol) => {
    if (answering || completed) {
      return;
    }

    if (symbol === current.answer) {
      setAnswering(true);
      setFeedback('Beautiful noticing. The pattern continues.');
      window.setTimeout(() => {
        setIndex((value) => value + 1);
        setFeedback('Here is the next gentle pattern.');
        setAnswering(false);
      }, 850);
    } else {
      setFeedback("Let's try again. Look for what repeats.");
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
        <p className="text-lg font-semibold text-dusty-700">{game.difficulty}</p>
        <h1 className="mt-2 text-4xl font-bold text-charcoal sm:text-5xl">
          {game.name}
        </h1>
        <p className="mt-4 max-w-3xl text-xl leading-relaxed text-charcoal/72">
          Follow the symbols from left to right. Choose the symbol that feels like it belongs next.
        </p>
      </section>

      <section className="mt-8 rounded-lg border border-white/75 bg-white/78 p-6 shadow-soft backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {current.sequence.map((symbol, itemIndex) => {
            const item = symbolMap[symbol];
            const Icon = item.Icon;

            return (
              <span
                key={`${symbol}-${itemIndex}`}
                className={[
                  'flex h-24 w-24 items-center justify-center rounded-lg',
                  item.className
                ].join(' ')}
              >
                <Icon aria-hidden="true" className="h-12 w-12" />
              </span>
            );
          })}
          <span className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-dusty-200 bg-white/70 text-5xl font-bold text-dusty-700">
            ?
          </span>
        </div>
      </section>

      <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_300px]">
        <section aria-label="Choose the next symbol" className="grid gap-4 sm:grid-cols-3">
          {current.options.map((symbol) => {
            const item = symbolMap[symbol];
            const Icon = item.Icon;

            return (
              <motion.button
                key={symbol}
                type="button"
                onClick={() => choose(symbol)}
                disabled={answering || completed}
                whileTap={!reduceMotion ? { scale: 0.98 } : undefined}
                className={[
                  'min-h-[150px] rounded-lg border border-white/80 p-5 text-xl font-bold shadow-soft transition-colors hover:bg-white disabled:opacity-70',
                  item.className
                ].join(' ')}
                aria-label={`Choose ${item.label}`}
              >
                <Icon aria-hidden="true" className="mx-auto h-14 w-14" />
                <span className="mt-4 block">{item.label}</span>
              </motion.button>
            );
          })}
        </section>

        <aside className="rounded-lg border border-white/75 bg-white/78 p-5 shadow-soft backdrop-blur-md">
          <p className="text-base font-bold uppercase tracking-[0.16em] text-sage-700">
            Progress
          </p>
          <p className="mt-4 min-h-[88px] text-xl leading-relaxed text-charcoal/75">
            {feedback}
          </p>
          <div className="mt-5 h-4 overflow-hidden rounded-lg bg-cream-200">
            <div
              className="h-full rounded-lg bg-dusty-500 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-6 grid gap-3">
            <BigButton
              icon={Lightbulb}
              variant="lavender"
              onClick={() => setFeedback(current.hint)}
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
        message="You followed the pattern beautifully."
        onReturn={onBack}
        onRestart={restart}
      />
    </div>
  );
}
