import { motion, useReducedMotion } from 'framer-motion';
import { Brain, Sparkles, Volume2, VolumeX } from 'lucide-react';

export default function Layout({ children, progress, onToggleSound }) {
  const reduceMotion = useReducedMotion();

  const floatingMotion = reduceMotion
    ? {}
    : {
        y: [0, -14, 0],
        x: [0, 8, 0],
        transition: {
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#fff4e2_0%,#fffaf2_34%,#eef7fb_74%,#f7f3ff_100%)]">
      <motion.div
        aria-hidden="true"
        animate={floatingMotion}
        className="pointer-events-none fixed left-[5%] top-24 h-40 w-40 rounded-full bg-sage-100/55 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? {}
            : {
                y: [0, 16, 0],
                x: [0, -10, 0],
                transition: {
                  duration: 12,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }
        }
        className="pointer-events-none fixed right-[8%] top-44 h-48 w-48 rounded-full bg-peach-100/60 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? {}
            : {
                y: [0, -10, 0],
                transition: {
                  duration: 11,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }
        }
        className="pointer-events-none fixed bottom-10 left-1/2 h-52 w-52 rounded-full bg-lavender-100/60 blur-3xl"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/85 text-lavender-700 shadow-soft">
            <Brain aria-hidden="true" className="h-7 w-7" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-bold text-charcoal">
              Daily Brain Trainer
            </p>
            <p className="hidden text-sm font-medium text-charcoal/65 sm:block">
              A calm daily session
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleSound}
          aria-label={
            progress.soundEnabled ? 'Turn calming sound off' : 'Turn calming sound on'
          }
          className="inline-flex min-h-[52px] items-center gap-2 rounded-lg border border-white/75 bg-white/80 px-4 py-3 text-base font-semibold text-charcoal shadow-soft transition-colors hover:bg-white"
        >
          {progress.soundEnabled ? (
            <Volume2 aria-hidden="true" className="h-5 w-5 text-sage-700" />
          ) : (
            <VolumeX aria-hidden="true" className="h-5 w-5 text-charcoal/60" />
          )}
          <span className="hidden sm:inline">
            {progress.soundEnabled ? 'Sound On' : 'Sound Off'}
          </span>
        </button>
      </header>

      <div className="relative z-10">{children}</div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-5 right-5 hidden items-center gap-2 rounded-lg bg-white/55 px-4 py-3 text-sm font-semibold text-charcoal/55 shadow-soft backdrop-blur sm:flex"
      >
        <Sparkles className="h-4 w-4 text-honey-700" />
        Gentle progress
      </div>
    </div>
  );
}
