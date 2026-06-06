import { motion } from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';

interface InteractiveCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/**
 * A consistent, animated frame used to wrap every interactive island.
 *
 * The islands hydrate with `client:visible`, so they are already on screen by
 * the time React takes over. We gate the entrance animation behind a `mounted`
 * flag so the server-rendered markup and the first client render are identical
 * (no hydration mismatch), then play the fade/slide-in on mount.
 */
export default function InteractiveCard({ title, subtitle, children }: InteractiveCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.figure
      initial={false}
      animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="my-8 p-5 rounded-sm border border-on-surface/10 bg-surface-container-low shadow-sm"
    >
      <figcaption className="mb-4">
        <div className="font-bold text-[1.05rem] text-on-surface">{title}</div>
        {subtitle ? (
          <div className="text-[0.85rem] text-secondary mt-1">
            {subtitle}
          </div>
        ) : null}
      </figcaption>
      {children}
    </motion.figure>
  );
}
