import React from "react";
import { Accordion } from "flowbite-react";
import { SimpleBreadcrumbs } from "../components/Breadcrumbs.jsx";
import faq from "../../blueprint/copy/faq.json";

export default function Faq() {
  const breadcrumbs = [
    { label: "FAQ", href: "/faq" }
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <SimpleBreadcrumbs items={breadcrumbs} />
      <h1 className="text-3xl font-bold text-gray-900">Frequently asked questions</h1>
      <p className="mt-2 text-gray-600">
        Answers to common questions about enrollment, certificates, and reporting.
      </p>
      <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
        <Accordion>
          {faq.items.map((qa, i) => (
            <Accordion.Panel key={i}>
              <Accordion.Title className="font-semibold text-gray-900">
                {qa.q}
              </Accordion.Title>
              <Accordion.Content>
                <div className="prose prose-slate max-w-none">
                  {Array.isArray(qa.a)
                    ? qa.a.map((p, j) => <p key={j}>{p}</p>)
                    : <p>{qa.a}</p>}
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      </div>
      <p className="mt-6 text-sm text-gray-600">
        Still need help? Visit our <a href="/support" className="text-indigo-600 underline">Help Center</a>.
      </p>
    </main>
  );
}
