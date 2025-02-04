// card.js
import React from 'react';
import classNames from 'classnames';

function Card({ className, children }) {
  return (
    <div
      className={classNames(
        'bg-white shadow-md rounded-2xl',
        className
      )}
    >
      {children}
    </div>
  );
}

function CardContent({ className, children }) {
  return (
    <div
      className={classNames(
        'p-4',
        className
      )}
    >
      {children}
    </div>
  );
}

export { Card, CardContent };