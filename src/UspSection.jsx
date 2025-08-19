import React from 'react';
import Card from './components/Card.jsx';
// sref: usp.grid.v1
import uspData from '../blueprint/copy/home.json';

export default function UspSection() {
  const heading = uspData.usp.heading;
  const items = uspData.usp.items;
  return (
    <section className="bg-gray-50 py-20 lg:py-28 border-b border-gray-100">
      <div className="max-w-[65ch] mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {items.map((item, i) => (
            <Card key={i} title={item.title} body={item.body} />
          ))}
        </div>
      </div>
    </section>
  );
}
