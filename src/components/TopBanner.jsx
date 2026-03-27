import React, { useEffect, useState } from 'react';

const ANNOUNCEMENT_MESSAGES = [
  'Complete Today & Get Your Certificate Instantly for FREE',
  '$28 Total, No Hidden Fees — No Surprises at Checkout',
];

export default function TopBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((i) => (i + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-[#17a34a] flex flex-col items-center px-4 py-2 relative w-full">
      <div
        className="grid w-full place-items-center [&>*]:col-start-1 [&>*]:row-start-1"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {ANNOUNCEMENT_MESSAGES.map((message, i) => (
          <p
            key={i}
            className={
              'col-start-1 row-start-1 m-0 flex max-w-full flex-col justify-center text-center text-sm font-medium leading-[20px] text-white transition-opacity duration-[400ms] ease-in-out ' +
              (i === activeIndex
                ? 'relative z-10 opacity-100'
                : 'pointer-events-none opacity-0')
            }
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            aria-hidden={i !== activeIndex}
          >
            {message}
          </p>
        ))}
      </div>
    </div>
  );
}
