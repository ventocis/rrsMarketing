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

export default function DocPage({ title, subtitle, markdown, showContactCard, breadcrumbs, customComponents }) {
  const md = replaceTodayToken(markdown);
  
  return (
    <section className="bg-[#f9fafb] min-h-screen">
      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {breadcrumbs && <SimpleBreadcrumbs items={breadcrumbs} />}
        <header className="text-center mb-16 md:mb-20">
          <div className="flex flex-col gap-4 items-center">
            <div className="bg-[#e5f6fe] inline-flex items-center px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-[#0351b4] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Need Help?</span>
            </div>
            <h1 className="text-[36px] font-bold text-[#1e2832] text-center leading-[40px] tracking-[-0.9px]" style={{ fontFamily: "'Outfit', sans-serif" }}>{title}</h1>
            {subtitle && <p className="text-base text-[#616d7b] text-center leading-6 max-w-3xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>{subtitle}</p>}
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-8 xl:gap-12">
          <article>
            <div className="prose prose-slate max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[[rehypeSlug]]}
                components={{
                  h1: ({node, ...props}) => null, // Hide h1 elements to prevent duplicate titles
                  h2: ({node, ...props}) => <h2 {...props} className="text-2xl font-semibold text-[#1e2832] mt-8 mb-4 first:mt-0" />,
                  h3: ({node, ...props}) => <h3 {...props} className="text-xl font-semibold text-[#1e2832] mt-6 mb-3" />,
                  p: ({node, ...props}) => <p {...props} className="text-base md:text-lg text-[#616d7b] mb-4 leading-relaxed" />,
                  ul: ({node, ...props}) => <ul {...props} className="list-disc list-inside mb-6 space-y-2" />,
                  li: ({node, ...props}) => <li {...props} className="text-base md:text-lg text-[#616d7b]" />,
                  strong: ({node, ...props}) => <strong {...props} className="font-semibold text-[#1e2832]" />,
                  em: ({node, ...props}) => <em {...props} className="italic text-[#616d7b]" />,
                  a: ({node, ...props}) => <a {...props} className="text-[#0667D1] underline decoration-[#7cc3f9] underline-offset-2 hover:text-[#0556b3] hover:decoration-2" />,
                  blockquote: ({node, ...props}) => <blockquote {...props} className="border-l-4 border-[#7cc3f9] bg-[#e6f4fd] pl-4 py-2 my-6 rounded-r" />,
                  code: ({node, ...props}) => <code {...props} className="rounded bg-[#F9FAFB] border border-[#e5e5e5] px-1.5 py-0.5 text-sm text-[#1e2832]" />,
                  hr: ({node, ...props}) => <hr {...props} className="border-t border-[#e5e5e5] my-8" />,
                }}
              >
                {md}
              </ReactMarkdown>
              
              {/* Render custom components on mobile */}
              <div className="lg:hidden">
                {customComponents && Object.values(customComponents)}
              </div>
            </div>
          </article>
          {(showContactCard || customComponents) && (
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                {showContactCard && (
                  <div className="rounded-[20px] border border-[#e4e6ea] bg-white p-6">
                    <h2 className="text-base font-semibold text-[#1e2832] mb-2">Need help?</h2>
                    <p className="text-sm text-[#616d7b] mb-4">
                      Visit the <a href="/faq" className="text-[#0667D1] underline underline-offset-2 hover:text-[#0556b3]">FAQ</a> or contact Support.
                    </p>
                    <div className="mt-4 text-sm">
                      <div className="font-medium text-[#1e2832] mb-1">Email (24/7)</div>
                      <a href="mailto:info@roadreadysafety.com" className="text-[#0667D1] hover:text-[#0556b3]">info@roadreadysafety.com</a>
                    </div>
                    <div className="mt-4 text-sm">
                      <div className="font-medium text-[#1e2832] mb-1">Phone (Mon–Fri, 9am–5pm EST)</div>
                      <a href="tel:+18888855707" className="text-[#0667D1] hover:text-[#0556b3]">(888) 885-5707</a>
                    </div>
                  </div>
                )}
                
                {/* Render custom components */}
                {customComponents && Object.values(customComponents)}
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
