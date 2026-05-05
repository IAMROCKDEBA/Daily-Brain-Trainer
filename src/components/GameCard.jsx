import { BookOpen, Brain, Clock, Hash, ListChecks, Play, Shapes } from 'lucide-react';
import BigButton from './BigButton.jsx';

const iconMap = {
  memory: Brain,
  pattern: Shapes,
  number: Hash,
  word: BookOpen,
  sorting: ListChecks
};

const accentClasses = {
  lavender: 'bg-lavender-100 text-lavender-700',
  dusty: 'bg-dusty-100 text-dusty-700',
  sage: 'bg-sage-100 text-sage-700',
  peach: 'bg-peach-100 text-peach-700',
  honey: 'bg-honey-100 text-honey-700'
};

export default function GameCard({ game, completed, onPlay }) {
  const Icon = iconMap[game.icon] || Brain;

  return (
    <article className="flex h-full flex-col rounded-lg border border-white/75 bg-white/82 p-6 shadow-soft backdrop-blur-md transform-gpu will-change-transform transition-shadow duration-300 hover:shadow-lift">
      <div className="flex items-start gap-4">
        <span
          className={[
            'inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-lg',
            accentClasses[game.accent]
          ].join(' ')}
        >
          <Icon aria-hidden="true" className="h-8 w-8" />
        </span>
        <div className="min-w-0">
          <h3 className="text-2xl font-bold text-charcoal">{game.name}</h3>
          <p className="mt-2 text-lg leading-relaxed text-charcoal/72">
            {game.purpose}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-base font-semibold text-charcoal/70">
        <span className="inline-flex items-center gap-2">
          <Clock aria-hidden="true" className="h-5 w-5 text-dusty-700" />
          {game.time}
        </span>
        <span>{game.difficulty}</span>
        {completed ? (
          <span className="text-sage-700">Completed today</span>
        ) : null}
      </div>

      <div className="mt-auto pt-7">
        <BigButton
          full
          icon={Play}
          variant={completed ? 'gentle' : 'primary'}
          onClick={() => onPlay(game.id)}
          aria-label={`Play ${game.name}`}
        >
          {completed ? 'Play Again' : 'Play'}
        </BigButton>
      </div>
    </article>
  );
}
