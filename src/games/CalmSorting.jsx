import { motion, useReducedMotion } from 'framer-motion';
import {
  Apple,
  ArrowLeft,
  Armchair,
  Bus,
  Coffee,
  Flower2,
  Leaf,
  Lightbulb,
  Plane,
  RotateCcw,
  Utensils
} from 'lucide-react';
import { useEffect, useState } from 'react';
import BigButton from '../components/BigButton.jsx';
import SuccessModal from '../components/SuccessModal.jsx';

const items = [
  {
    name: 'Apple',
    correct: 'Fruit',
    options: ['Fruit', 'Flower'],
    Icon: Apple,
    hint: 'An apple is something people eat.'
  },
  {
    name: 'Rose',
    correct: 'Flower',
    options: ['Flower', 'Travel'],
    Icon: Flower2,
    hint: 'A rose grows with petals.'
  },
  {
    name: 'Chair',
    correct: 'Home',
    options: ['Home', 'Fruit'],
    Icon: Armchair,
    hint: 'A chair is often found in a room.'
  },
  {
    name: 'Bus',
    correct: 'Travel',
    options: ['Travel', 'Flower'],
    Icon: Bus,
    hint: 'A bus helps people go places.'
  },
  {
    name: 'Cup',
    correct: 'Home',
    options: ['Home', 'Travel'],
    Icon: Coffee,
    hint: 'A cup is used at home or at a table.'
  },
  {
    name: 'Leaf',
    correct: 'Plant',
    options: ['Plant', 'Home'],
    Icon: Leaf,
    hint: 'A leaf grows on a plant.'
  },
  {
    name: 'Plate',
    correct: 'Home',
    options: ['Travel', 'Home'],
    Icon: Utensils,
    hint: 'A plate is used for meals.'
  },
  {
    name: 'Plane',
    correct: 'Travel',
    options: ['Flower', 'Travel'],
    Icon: Plane,
    hint: 'A plane moves people from place to place.'
  }
];

export default function CalmSorting({ game, onBack, onComplete }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState('Choose the category that fits the item.');
  const [completed, setCompleted] = useState(false);
  const [answering, setAnswering] = useState(false);

  const current = items[index] || items[items.length - 1];
  const progress = Math.round((index / items.length) * 100);
  const Icon = current.Icon;

  useEffect(() => {
    if (!completed && index >= items.length) {
      setCompleted(true);
      onComplete();
    }
  }, [completed, index, onComplete]);

  const restart = () => {
    setIndex(0);
    setFeedback('Choose the category that fits the item.');
    setCompleted(false);
    setAnswering(false);
  };

  const choose = (category) => {
    if (answering || completed) {
      return;
    }

    if (category === current.correct) {
      setAnswering(true);
      setFeedback('Nicely chosen. That fits.');
      window.setTimeout(() => {
        setIndex((value) => value + 1);
        setFeedback('Here is the next item.');
        setAnswering(false);
      }, 800);
    } else {
      setFeedback("Let's try again. Think about where it belongs.");
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
        <p className="text-lg font-semibold text-honey-700">{game.difficulty}</p>
        <h1 className="mt-2 text-4xl font-bold text-charcoal sm:text-5xl">
          {game.name}
        </h1>
        <p className="mt-4 max-w-3xl text-xl leading-relaxed text-charcoal/72">
          Look at one item. Choose the simple category that feels right.
        </p>
      </section>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_300px]">
        <section className="rounded-lg border border-white/75 bg-white/78 p-6 text-center shadow-soft backdrop-blur-md">
          <div className="mx-auto flex min-h-[230px] max-w-md flex-col items-center justify-center rounded-lg bg-honey-50 px-6 py-8 text-honey-700">
            <Icon aria-hidden="true" className="h-20 w-20" />
            <h2 className="mt-5 text-5xl font-bold text-charcoal">{current.name}</h2>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {current.options.map((category) => (
              <motion.button
                key={category}
                type="button"
                onClick={() => choose(category)}
                disabled={answering || completed}
                whileTap={!reduceMotion ? { scale: 0.98 } : undefined}
                className="min-h-[112px] rounded-lg border border-white/80 bg-white/88 px-5 py-4 text-2xl font-bold text-charcoal shadow-soft transition-colors hover:bg-honey-100 disabled:opacity-70"
              >
                {category}
              </motion.button>
            ))}
          </div>
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
              className="h-full rounded-lg bg-honey-500 transition-all duration-700"
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
        message="Nicely sorted."
        onReturn={onBack}
        onRestart={restart}
      />
    </div>
  );
}
