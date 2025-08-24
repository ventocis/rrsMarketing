import React from 'react';
import { Accordion } from 'flowbite-react';
import Button from './components/Button.jsx';
import faqData from '../blueprint/copy/faq.json';
// sref: faq-section.v1

export default function FaqSection() {
  const heading = faqData.heading;
  const items = faqData.items.slice(0, 5); // Limit to first 5 items
  return (
    <section className="bg-white py-20 lg:py-28 border-b border-gray-100">
      <div className="max-w-[65ch] mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{heading}</h2>
        <Accordion alwaysOpen={false} className="mb-8">
          {items.map((item, i) => (
            <Accordion.Panel key={i}>
              <Accordion.Title className="text-lg md:text-xl font-semibold">{item.q}</Accordion.Title>
              <Accordion.Content>
                <div className="text-gray-600 leading-relaxed">
                  {Array.isArray(item.a) ? item.a.map((paragraph, index) => (
                    <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  )) : (
                    <div dangerouslySetInnerHTML={{ __html: item.a }} />
                  )}
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
        <div className="mt-8 text-center">
          <Button href="/faq" variant="link" size="md">
            See full FAQ
          </Button>
        </div>
      </div>
    </section>
  );
}
