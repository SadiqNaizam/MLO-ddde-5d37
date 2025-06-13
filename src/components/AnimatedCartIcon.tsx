import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { motion, useAnimation } from 'framer-motion';

interface AnimatedCartIconProps {
  itemCount?: number;
  animateTrigger?: number; // A prop that changes (e.g., increments) to trigger the animation
  className?: string;
}

const AnimatedCartIcon: React.FC<AnimatedCartIconProps> = ({
  itemCount = 0,
  animateTrigger = 0,
  className,
}) => {
  const controls = useAnimation();
  const initialRender = useRef(true);

  console.log('AnimatedCartIcon loaded');

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return; // Don't animate on initial render, even if animateTrigger is non-zero
    }

    if (animateTrigger > 0) { // animateTrigger is expected to be 0 initially or when no animation is needed
      controls.start({
        scale: [1, 1.3, 0.9, 1.15, 1],
        rotate: [0, -10, 10, -5, 0],
        transition: {
          duration: 0.6,
          type: 'spring',
          stiffness: 400,
          damping: 10,
        },
      });
    }
  }, [animateTrigger, controls]);

  return (
    <Link
      to="/cart"
      aria-label={`View shopping cart with ${itemCount} items`}
      className={`relative flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${className}`}
    >
      <motion.div
        className="relative"
        animate={controls}
      >
        <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        {itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-3 h-5 min-w-[1.25rem] px-1 flex items-center justify-center rounded-full text-xs"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </Badge>
        )}
      </motion.div>
    </Link>
  );
};

export default AnimatedCartIcon;