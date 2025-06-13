import React from 'react';
import { ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn utility for classnames

interface ThemedLoadingIndicatorProps {
  /**
   * The size of the loading icon in pixels.
   * @default 48
   */
  size?: number;
  /**
   * Optional additional class names for the loading indicator.
   */
  className?: string;
  /**
   * Optional text to display below the loading icon.
   */
  loadingText?: string;
}

const ThemedLoadingIndicator: React.FC<ThemedLoadingIndicatorProps> = ({
  size = 48,
  className,
  loadingText,
}) => {
  console.log('ThemedLoadingIndicator loaded');

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={loadingText || "Loading content"}
      className={cn(
        'flex flex-col items-center justify-center space-y-2 p-4',
        className
      )}
    >
      <ChefHat
        className="animate-spin text-orange-500"
        size={size}
        strokeWidth={1.5}
      />
      {loadingText && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {loadingText}
        </p>
      )}
    </div>
  );
};

export default ThemedLoadingIndicator;