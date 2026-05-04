import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Home, RotateCcw, Sparkles } from 'lucide-react';
import BigButton from './BigButton.jsx';

export default function SuccessModal({
  open,
  message,
  onReturn,
  onRestart,
  returnLabel = 'Return to Dashboard'
}) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/30 px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            aria-describedby="success-message"
            className="w-full max-w-xl rounded-lg border border-white/80 bg-cream-50 p-7 text-center shadow-lift"
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? {} : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <motion.div
              aria-hidden="true"
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sage-100 text-sage-700"
              animate={
                reduceMotion
                  ? {}
                  : {
                      scale: [1, 1.04, 1],
                      transition: {
                        duration: 1.8,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }
                    }
              }
            >
              <CheckCircle2 className="h-12 w-12" />
            </motion.div>

            <p className="mt-5 inline-flex items-center justify-center gap-2 text-base font-bold uppercase tracking-[0.16em] text-lavender-700">
              <Sparkles aria-hidden="true" className="h-5 w-5" />
              Well done
            </p>
            <h2 id="success-title" className="mt-2 text-4xl font-bold text-charcoal">
              Session complete
            </h2>
            <p
              id="success-message"
              className="mx-auto mt-4 max-w-md text-xl leading-relaxed text-charcoal/75"
            >
              {message}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <BigButton icon={Home} onClick={onReturn}>
                {returnLabel}
              </BigButton>
              <BigButton icon={RotateCcw} variant="secondary" onClick={onRestart}>
                Play Again
              </BigButton>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
