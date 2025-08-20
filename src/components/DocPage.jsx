import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

function replaceTodayToken(markdown) {
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
  return markdown.replace(/\{\{today\}\}/g, today);
}

export default function DocPage({ title, subtitle, markdown, showContactCard }) {
  const md = replaceTodayToken(markdown);
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-10 md:py-12">
        <header className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">{title}</h1>
          {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,280px] gap-8">
          <article>
            <div className="prose prose-neutral max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[[rehypeSlug]]}
                components={{
                  a: ({node, ...props}) => <a {...props} className="text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:decoration-2" />,
                  blockquote: ({node, ...props}) => <blockquote {...props} className="border-l-4 border-indigo-200 bg-indigo-50/60 pl-4 py-2 my-4 rounded-r" />,
                  code: ({node, ...props}) => <code {...props} className="rounded bg-slate-100 px-1.5 py-0.5" />,
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
