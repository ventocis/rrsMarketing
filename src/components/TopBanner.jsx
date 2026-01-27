import React from 'react';

export default function TopBanner() {
  return (
    <div className="bg-[#17a34a] flex flex-col items-center px-4 py-2 relative w-full">
      <p 
        className="flex flex-col font-medium justify-center leading-[20px] relative shrink-0 text-sm text-center text-white w-full"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        🎉 Limited Time: Texas Defensive Driving Course — Only $25 + $3 state fee
      </p>
    </div>
  );
}

