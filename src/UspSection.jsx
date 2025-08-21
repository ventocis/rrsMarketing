import React from 'react';
import Card from './components/Card.jsx';
// sref: usp.grid.v1
import uspData from '../blueprint/copy/home.json';

export default function UspSection() {
  const heading = uspData.usp.heading;
  const items = uspData.usp.items;
  return (
    <section className="bg-gray-50 py-20 lg:py-28 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12">
          {/* Left column - existing content unchanged */}
          <div className="max-w-[65ch]">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center lg:text-left">{heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {items.map((item, i) => (
                <Card key={i} title={item.title} body={item.body} />
              ))}
            </div>
          </div>
          
          {/* Right column - illustration only */}
          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src="/assets/illustrations/report.svg" 
                alt="What sets us apart - reporting and compliance features"
                className="h-48 md:h-64 lg:h-72 mx-auto lg:ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
