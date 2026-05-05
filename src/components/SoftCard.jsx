import { motion, useReducedMotion } from 'framer-motion';

export default function SoftCard({
  children,
  className = '',
  interactive = false,
  ...props
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={!reduceMotion && interactive ? { y: -3 } : undefined}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={[
        'rounded-lg border border-white/75 bg-white/78 p-6 shadow-soft backdrop-blur-md transform-gpu will-change-transform',
        className
      ].join(' ')}
      {...props}
    >
      {children}
    </motion.div>
  );
}
