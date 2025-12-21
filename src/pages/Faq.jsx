import React from "react";
import { Accordion } from "flowbite-react";
import { SimpleBreadcrumbs } from "../components/Breadcrumbs.jsx";
import faq from "../../blueprint/copy/faq.json";
import SEO from "../components/SEO.jsx";

export default function Faq() {
  const breadcrumbs = [
    { label: "FAQ", href: "/faq" }
  ];

  return (
    <>
      <SEO 
        title="Frequently Asked Questions"
        description="Answers to common questions about enrollment, certificates, and reporting for our traffic safety courses."
        keywords="FAQ, traffic school questions, course enrollment, certificates, reporting"
        image="/assets/rrs (1200 x 630 px).png"
        url="/faq"
      />
      <main className="bg-[#f9fafb] min-h-screen">
      <section className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <SimpleBreadcrumbs items={breadcrumbs} />
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e2832] mb-4">Frequently asked questions</h1>
          <p className="text-lg text-[#616d7b] max-w-3xl mx-auto">
            Answers to common questions about enrollment, certificates, and reporting.
          </p>
        </div>
        <div className="flex flex-col gap-4 mb-12">
          {faq.items.map((qa, i) => (
            <Accordion key={i} alwaysOpen={false} collapseAll className="!border-0 !divide-y-0 !shadow-none !bg-transparent">
              <Accordion.Panel>
                <Accordion.Title className="bg-white border border-[#e4e6ea] rounded-[16px] px-6 py-5 text-base font-semibold text-[#1e2832] tracking-[-0.4px] leading-6 hover:bg-gray-50 transition-colors !shadow-none">
                  {qa.q}
                </Accordion.Title>
                <Accordion.Content className="bg-white border-l border-r border-b border-[#e4e6ea] rounded-b-[16px] px-6 py-4 !shadow-none">
                  <div className="text-base leading-6 text-[#616d7b]">
                    {Array.isArray(qa.a)
                      ? qa.a.map((p, j) => <div key={j} dangerouslySetInnerHTML={{ __html: p }} />)
                      : <div dangerouslySetInnerHTML={{ __html: qa.a }} />}
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          ))}
        </div>
        <p className="text-center text-sm text-[#616d7b]">
          Still need help? Visit our <a href="/support" className="text-[#0667D1] hover:text-[#0556b3] underline">Help Center</a>.
        </p>
      </section>
    </main>
    </>
  );
}
