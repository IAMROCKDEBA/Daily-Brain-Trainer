import { CalendarCheck, CheckCircle2, Flame, Sparkles } from 'lucide-react';

const messageForCount = (count, total) => {
  if (count >= total) {
    return 'A full gentle session is complete for today.';
  }

  if (count > 0) {
    return 'You are building a calm rhythm, one small game at a time.';
  }

  return 'Begin anywhere. There is no rush here.';
};

export default function ProgressPanel({ progress, totalGames }) {
  const completedCount = progress.completedToday.length;
  const percent = Math.round((completedCount / totalGames) * 100);

  return (
    <section
      aria-labelledby="today-progress"
      className="rounded-lg border border-white/75 bg-white/78 p-6 shadow-soft backdrop-blur-md"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-base font-bold uppercase tracking-[0.16em] text-sage-700">
            <Sparkles aria-hidden="true" className="h-5 w-5" />
            Today&apos;s progress
          </p>
          <h2 id="today-progress" className="mt-2 text-3xl font-bold text-charcoal">
            {messageForCount(completedCount, totalGames)}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center sm:min-w-[420px]">
          <div>
            <CalendarCheck
              aria-hidden="true"
              className="mx-auto mb-2 h-6 w-6 text-dusty-700"
            />
            <p className="text-3xl font-bold text-charcoal">
              {completedCount}/{totalGames}
            </p>
            <p className="text-sm font-semibold text-charcoal/60">Today</p>
          </div>
          <div>
            <Flame
              aria-hidden="true"
              className="mx-auto mb-2 h-6 w-6 text-peach-700"
            />
            <p className="text-3xl font-bold text-charcoal">{progress.streak}</p>
            <p className="text-sm font-semibold text-charcoal/60">Streak</p>
          </div>
          <div>
            <CheckCircle2
              aria-hidden="true"
              className="mx-auto mb-2 h-6 w-6 text-sage-700"
            />
            <p className="text-3xl font-bold text-charcoal">
              {progress.totalCompleted}
            </p>
            <p className="text-sm font-semibold text-charcoal/60">Total</p>
          </div>
        </div>
      </div>

      <div className="mt-7" aria-label={`${percent}% of today's session complete`}>
        <div className="h-4 overflow-hidden rounded-lg bg-cream-200">
          <div
            className="h-full rounded-lg bg-gradient-to-r from-sage-500 via-dusty-500 to-lavender-500 transition-all duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </section>
  );
}
