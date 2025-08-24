import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { SimpleBreadcrumbs } from "./Breadcrumbs.jsx";

function replaceTodayToken(markdown) {
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
  return markdown.replace(/\{\{today\}\}/g, today);
}

export default function DocPage({ title, subtitle, markdown, showContactCard, breadcrumbs }) {
  const md = replaceTodayToken(markdown);
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10 md:py-12">
        {breadcrumbs && <SimpleBreadcrumbs items={breadcrumbs} />}
        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">{title}</h1>
          {subtitle && <p className="mt-3 text-base md:text-lg text-slate-600">{subtitle}</p>}
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-8 xl:gap-12">
          <article>
            <div className="prose prose-slate max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[[rehypeSlug]]}
                components={{
                  h1: ({node, ...props}) => null, // Hide h1 elements to prevent duplicate titles
                  h2: ({node, ...props}) => <h2 {...props} className="text-2xl font-semibold text-slate-900 mt-8 mb-4 first:mt-0" />,
                  h3: ({node, ...props}) => <h3 {...props} className="text-xl font-semibold text-slate-900 mt-6 mb-3" />,
                  p: ({node, ...props}) => <p {...props} className="text-base md:text-lg text-slate-700 mb-4 leading-relaxed" />,
                  ul: ({node, ...props}) => <ul {...props} className="list-disc list-inside mb-6 space-y-2" />,
                  li: ({node, ...props}) => <li {...props} className="text-base md:text-lg text-slate-700" />,
                  strong: ({node, ...props}) => <strong {...props} className="font-semibold text-slate-900" />,
                  em: ({node, ...props}) => <em {...props} className="italic text-slate-700" />,
                  a: ({node, ...props}) => <a {...props} className="text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:decoration-2" />,
                  blockquote: ({node, ...props}) => <blockquote {...props} className="border-l-4 border-indigo-200 bg-indigo-50/60 pl-4 py-2 my-6 rounded-r" />,
                  code: ({node, ...props}) => <code {...props} className="rounded bg-slate-100 px-1.5 py-0.5 text-sm" />,
                  hr: ({node, ...props}) => <hr {...props} className="border-t border-gray-200 my-8" />,
                }}
              >
                {md}
              </ReactMarkdown>
            </div>
          </article>
          {showContactCard && (
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
                <h2 className="text-sm font-semibold text-slate-900">Need help?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Visit the <a href="/faq" className="text-indigo-600 underline underline-offset-2">FAQ</a> or contact Support.
                </p>
                <div className="mt-3 text-sm">
                  <div className="font-medium text-slate-900">Email (24/7)</div>
                  <a href="mailto:info@roadreadysafety.com" className="text-indigo-600">info@roadreadysafety.com</a>
                </div>
                <div className="mt-3 text-sm">
                  <div className="font-medium text-slate-900">Phone (Mon–Fri, 9am–5pm local)</div>
                  <a href="tel:+18888855707" className="text-indigo-600">(888) 885-5707</a>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
