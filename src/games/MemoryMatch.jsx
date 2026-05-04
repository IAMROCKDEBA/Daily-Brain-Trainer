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
import { useEffect, useMemo, useState } from 'react';
import BigButton from '../components/BigButton.jsx';
import SuccessModal from '../components/SuccessModal.jsx';

const symbols = [
  { key: 'heart', label: 'heart', Icon: Heart, className: 'bg-peach-100 text-peach-700' },
  { key: 'flower', label: 'flower', Icon: Flower2, className: 'bg-lavender-100 text-lavender-700' },
  { key: 'sun', label: 'sun', Icon: Sun, className: 'bg-honey-100 text-honey-700' },
  { key: 'leaf', label: 'leaf', Icon: Leaf, className: 'bg-sage-100 text-sage-700' },
  { key: 'moon', label: 'moon', Icon: Moon, className: 'bg-dusty-100 text-dusty-700' },
  { key: 'star', label: 'star', Icon: Star, className: 'bg-cream-100 text-honey-700' }
];

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

const createCards = () => {
  const selected = shuffle(symbols).slice(0, 4);
  return shuffle(
    selected.flatMap((symbol) => [
      { ...symbol, id: `${symbol.key}-a` },
      { ...symbol, id: `${symbol.key}-b` }
    ])
  );
};

export default function MemoryMatch({ game, onBack, onComplete }) {
  const reduceMotion = useReducedMotion();
  const [roundKey, setRoundKey] = useState(0);
  const cards = useMemo(() => createCards(), [roundKey]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [hintIds, setHintIds] = useState([]);
  const [feedback, setFeedback] = useState('Choose two cards and see what matches.');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (selected.length !== 2) {
      return undefined;
    }

    const [first, second] = selected;
    const isMatch = first.key === second.key;

    const timeout = window.setTimeout(
      () => {
        if (isMatch) {
          setMatched((current) => [...current, first.id, second.id]);
          setFeedback('Lovely. That pair will stay open.');
        } else {
          setFeedback("Let's try again. The cards will turn back gently.");
        }
        setSelected([]);
      },
      isMatch ? 650 : 1200
    );

    return () => window.clearTimeout(timeout);
  }, [selected]);

  useEffect(() => {
    if (!completed && matched.length === cards.length) {
      setCompleted(true);
      onComplete();
    }
  }, [cards.length, completed, matched.length, onComplete]);

  const restart = () => {
    setRoundKey((key) => key + 1);
    setSelected([]);
    setMatched([]);
    setHintIds([]);
    setFeedback('Choose two cards and see what matches.');
    setCompleted(false);
  };

  const handleCardClick = (card) => {
    if (
      completed ||
      selected.length === 2 ||
      selected.some((item) => item.id === card.id) ||
      matched.includes(card.id)
    ) {
      return;
    }

    setFeedback('Good choice. Now choose one more card.');
    setSelected((current) => [...current, card]);
  };

  const showHint = () => {
    const openIds = new Set([...matched, ...selected.map((card) => card.id)]);
    const nextPair = cards.filter((card) => !openIds.has(card.id));
    const pair = nextPair.find((card) =>
      nextPair.some((other) => other.key === card.key && other.id !== card.id)
    );

    if (!pair) {
      setFeedback('Every remaining card is almost ready.');
      return;
    }

    const pairIds = cards
      .filter((card) => card.key === pair.key && !openIds.has(card.id))
      .map((card) => card.id);

    setHintIds(pairIds);
    setFeedback(`A matching pair of ${pair.label} cards is glowing for a moment.`);
    window.setTimeout(() => setHintIds([]), 1400);
  };

  const progress = Math.round((matched.length / cards.length) * 100);

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
        <p className="text-lg font-semibold text-lavender-700">{game.difficulty}</p>
        <h1 className="mt-2 text-4xl font-bold text-charcoal sm:text-5xl">
          {game.name}
        </h1>
        <p className="mt-4 max-w-3xl text-xl leading-relaxed text-charcoal/72">
          Turn over two cards. If they match, they stay open. Take all the time you need.
        </p>
      </section>

      <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_280px]">
        <section aria-label="Memory cards" className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.Icon;
            const isOpen =
              matched.includes(card.id) ||
              selected.some((item) => item.id === card.id) ||
              hintIds.includes(card.id);

            return (
              <motion.button
                key={card.id}
                type="button"
                aria-label={
                  isOpen ? `${card.label} card revealed` : 'Hidden memory card'
                }
                onClick={() => handleCardClick(card)}
                whileTap={!reduceMotion && !completed ? { scale: 0.98 } : undefined}
                className="memory-card min-h-[150px] rounded-lg focus:outline-none sm:min-h-[178px]"
              >
                <motion.span
                  className="memory-card-inner relative block h-full min-h-[150px] rounded-lg sm:min-h-[178px]"
                  animate={{ rotateY: isOpen ? 180 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.7, ease: 'easeInOut' }}
                >
                  <span className="memory-card-face absolute inset-0 flex items-center justify-center rounded-lg border border-white/80 bg-white/88 shadow-soft">
                    <span className="flex h-20 w-20 items-center justify-center rounded-lg bg-cream-100 text-charcoal/55">
                      <Star aria-hidden="true" className="h-10 w-10" />
                    </span>
                  </span>
                  <span
                    className={[
                      'memory-card-face memory-card-back absolute inset-0 flex items-center justify-center rounded-lg border border-white/80 shadow-soft',
                      card.className,
                      matched.includes(card.id) ? 'ring-4 ring-sage-200' : ''
                    ].join(' ')}
                  >
                    <Icon aria-hidden="true" className="h-16 w-16" />
                  </span>
                </motion.span>
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
            <BigButton icon={Lightbulb} variant="lavender" onClick={showHint} full>
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
        message="Wonderful memory work."
        onReturn={onBack}
        onRestart={restart}
      />
    </div>
  );
}
