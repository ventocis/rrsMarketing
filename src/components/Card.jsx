// sref: usp.cards.v1
import React from 'react';

export default function Card({ icon, title, body }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full transition hover:shadow-md hover:-translate-y-0.5 focus:shadow-md focus:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:transform-none motion-reduce:focus:transform-none">
      {icon && <div className="mb-4 flex items-center justify-center">{icon}</div>}
      <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{body}</p>
    </div>
  );
}
