import React from 'react';
import SEO from '../../components/SEO.jsx';

export default function TexasAccessibility() {
  return (
    <>
      <SEO
        title="ADA and Accessibility Policy - Road Ready Safety"
        description="Road Ready Safety's ADA and accessibility policy. Reasonable accommodations for qualified students with disabilities in the Texas driving safety course."
        url="/texas/accessibility"
      />

      <section className="py-[112px] px-4 sm:px-6 lg:px-8 bg-[#f9fafb]">
        <div className="max-w-4xl mx-auto">
          {/* Header - same style as /privacy and /texas/refund */}
          <div className="flex flex-col gap-4 items-center mb-12">
            <div className="bg-[#e5f6fe] inline-flex items-center px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-[#0351b4] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Legal</span>
            </div>
            <h1 className="text-[36px] font-bold text-[#1e2832] text-center leading-[40px] tracking-[-0.9px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
              ADA and Accessibility Policy
            </h1>
            <p className="text-base text-[#616d7b] text-center leading-6 max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Road Ready Driver Instruction LLC d/b/a Road Ready Safety
            </p>
          </div>

          {/* Content - white card, same as /privacy */}
          <div className="bg-white border border-[#e4e6ea] rounded-[20px] p-8 lg:p-12">
            <div className="prose prose-lg max-w-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <p className="text-base text-[#616d7b] leading-6 mb-6">
                Road Ready Safety is committed to providing reasonable accommodations to qualified students with disabilities, consistent with applicable laws and with the integrity of course requirements.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-6">
                Students who require accommodations should notify Road Ready Safety as early as possible, preferably at or shortly after enrollment, by contacting support through the published channels and describing the requested accommodation and the nature of the limitation.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-6">
                Road Ready Safety will review each request individually and may request appropriate documentation when needed to determine a reasonable accommodation. Examples of accommodations may include extended time limits, alternative formats, or assistance with navigation, provided that such accommodations do not compromise course integrity or identity verification requirements.
              </p>
              <p className="text-base text-[#616d7b] leading-6 mb-8">
                Road Ready Safety will make good-faith efforts to provide reasonable accommodations and to communicate clearly with students about available options and any limitations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
