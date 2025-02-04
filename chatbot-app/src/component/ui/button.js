import React from 'react';
import classNames from 'classnames';

/**
 * 基本的なボタンコンポーネント
 * variant によってボタンの色などを切り替えます。
 */
function Button({
  variant = 'default',
  className,
  children,
  ...props
}) {
  const baseStyles = 'rounded-full px-4 py-2 font-medium transition-colors';
  const variants = {
    default: 'bg-red-600 text-white hover:bg-red-700',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const combinedClassName = classNames(
    baseStyles,
    variants[variant],
    className
  );

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}

export { Button };