import { motion, useReducedMotion } from 'framer-motion';

const variantClasses = {
  primary:
    'bg-charcoal text-cream-50 shadow-soft hover:bg-[#33403e] active:bg-[#1f2827]',
  secondary:
    'bg-white/85 text-charcoal border border-white shadow-soft hover:bg-white',
  gentle:
    'bg-sage-100 text-sage-700 border border-sage-200 hover:bg-sage-50',
  lavender:
    'bg-lavender-100 text-lavender-700 border border-lavender-200 hover:bg-lavender-50',
  peach:
    'bg-peach-100 text-peach-700 border border-peach-200 hover:bg-peach-50'
};

export default function BigButton({
  children,
  icon: Icon,
  variant = 'primary',
  className = '',
  full = false,
  type = 'button',
  disabled = false,
  ...props
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={!reduceMotion && !disabled ? { scale: 1.015 } : undefined}
      whileTap={!reduceMotion && !disabled ? { scale: 0.985 } : undefined}
      className={[
        'inline-flex min-h-[64px] items-center justify-center gap-3 rounded-lg px-6 py-4',
        'text-center text-lg font-semibold leading-snug transition-colors duration-300 transform-gpu will-change-transform',
        'disabled:cursor-not-allowed disabled:opacity-60',
        full ? 'w-full' : '',
        variantClasses[variant] || variantClasses.primary,
        className
      ].join(' ')}
      {...props}
    >
      {Icon ? <Icon aria-hidden="true" className="h-6 w-6 shrink-0" /> : null}
      <span>{children}</span>
    </motion.button>
  );
}
