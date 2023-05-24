import * as React from 'react';

import { cn } from '@/lib/utils';
import { NumericFormat, NumericFormatProps, PatternFormat, PatternFormatProps } from 'react-number-format';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

const FormattedTimeInput = React.forwardRef<HTMLInputElement, PatternFormatProps>(
  ({ className, type, ...props }, _ref) => {
    return (
      <PatternFormat
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        type={type}
        {...props}
      />
    );
  }
);

const FormattedFloatInput = React.forwardRef<HTMLInputElement, NumericFormatProps>(
  ({ className, type, ...props }, _ref) => {
    return (
      <NumericFormat
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        type={type}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
FormattedTimeInput.displayName = 'FormattedTimeInput';
FormattedFloatInput.displayName = 'FormattedFloatInput';

export { Input, FormattedTimeInput, FormattedFloatInput };
