import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Flower2, Lightbulb, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import BigButton from '../components/BigButton.jsx';
import SuccessModal from '../components/SuccessModal.jsx';

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

export default function NumberGarden({ game, onBack, onComplete }) {
  const reduceMotion = useReducedMotion();
  const [roundKey, setRoundKey] = useState(0);
  const numbers = useMemo(() => shuffle([1, 2, 3, 4, 5]), [roundKey]);
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState('Tap the flowers from 1 to 5.');
  const [completed, setCompleted] = useState(false);

  const nextNumber = selected.length + 1;
  const progress = Math.round((selected.length / 5) * 100);

  useEffect(() => {
    if (!completed && selected.length === 5) {
      setCompleted(true);
      onComplete();
    }
  }, [completed, onComplete, selected.length]);

  const restart = () => {
    setRoundKey((key) => key + 1);
    setSelected([]);
    setFeedback('Tap the flowers from 1 to 5.');
    setCompleted(false);
  };

  const choose = (number) => {
    if (completed || selected.includes(number)) {
      return;
    }

    if (number === nextNumber) {
      setSelected((current) => [...current, number]);
      setFeedback(`Lovely. Number ${number} is blooming.`);
    } else {
      setFeedback(`Try this one again. Look for number ${nextNumber}.`);
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
        <p className="text-lg font-semibold text-sage-700">{game.difficulty}</p>
        <h1 className="mt-2 text-4xl font-bold text-charcoal sm:text-5xl">
          {game.name}
        </h1>
        <p className="mt-4 max-w-3xl text-xl leading-relaxed text-charcoal/72">
          Find the flower numbers in order. If you tap another one, simply try again.
        </p>
      </section>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_300px]">
        <section aria-label="Number flowers" className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {numbers.map((number) => {
            const isSelected = selected.includes(number);

            return (
              <motion.button
                key={number}
                type="button"
                aria-label={`Flower number ${number}`}
                onClick={() => choose(number)}
                disabled={completed || isSelected}
                whileTap={!reduceMotion ? { scale: 0.98 } : undefined}
                className={[
                  'relative min-h-[170px] rounded-lg border border-white/80 bg-white/82 p-5 text-charcoal shadow-soft transition-colors hover:bg-sage-50',
                  isSelected ? 'bg-sage-100 text-sage-700 ring-4 ring-sage-200' : ''
                ].join(' ')}
              >
                <Flower2 aria-hidden="true" className="mx-auto h-16 w-16 text-sage-500" />
                <span className="mt-3 block text-5xl font-bold">{number}</span>
                {isSelected ? (
                  <span className="mt-2 block text-base font-semibold">Blooming</span>
                ) : null}
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
              className="h-full rounded-lg bg-sage-500 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-6 grid gap-3">
            <BigButton
              icon={Lightbulb}
              variant="lavender"
              onClick={() => setFeedback(`The next gentle number is ${nextNumber}.`)}
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
        message="Your number garden is blooming."
        onReturn={onBack}
        onRestart={restart}
      />
    </div>
  );
}
