import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import SEO from "../components/SEO.jsx";
import md from "/blueprint/legal/privacy.md?raw";

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how Road Ready Safety collects, uses, and protects your personal information when you use our traffic safety courses."
        keywords="privacy policy, data protection, personal information, traffic course privacy"
        image="/assets/rrs (1200 x 630 px).png"
        url="/privacy"
      />

      <section className="py-[112px] px-4 sm:px-6 lg:px-8 bg-[#f9fafb]">
        <div className="max-w-4xl mx-auto">
          {/* Header - Texas terms style */}
          <div className="flex flex-col gap-4 items-center mb-12">
            <div className="bg-[#e5f6fe] inline-flex items-center px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-[#0351b4] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Legal</span>
            </div>
            <h1 className="text-[36px] font-bold text-[#1e2832] text-center leading-[40px] tracking-[-0.9px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Privacy Policy
            </h1>
            <p className="text-base text-[#616d7b] text-center leading-6 max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Road Ready Driver Instruction LLC dba Road Ready Safety
            </p>
          </div>

          {/* Content - white card with markdown, same format as /texas/terms */}
          <div className="bg-white border border-[#e4e6ea] rounded-[20px] p-8 lg:p-12">
            <div className="prose prose-lg max-w-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[[rehypeSlug]]}
                components={{
                  h1: ({ node, ...props }) => null,
                  h2: ({ node, ...props }) => (
                    <h2 {...props} className="text-2xl font-bold text-[#1e2832] leading-8 mb-4 mt-8 first:mt-0" style={{ fontFamily: "'Outfit', sans-serif" }} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 {...props} className="text-xl font-bold text-[#1e2832] leading-8 mb-4 mt-6" style={{ fontFamily: "'Outfit', sans-serif" }} />
                  ),
                  p: ({ node, ...props }) => (
                    <p {...props} className="text-base text-[#616d7b] leading-6 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul {...props} className="list-disc list-inside space-y-2 text-base text-[#616d7b] leading-6 mb-4 ml-4" style={{ fontFamily: "'DM Sans', sans-serif" }} />
                  ),
                  li: ({ node, ...props }) => (
                    <li {...props} className="text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }} />
                  ),
                  strong: ({ node, ...props }) => <strong {...props} className="font-bold text-[#1e2832]" />,
                  a: ({ node, ...props }) => (
                    <a {...props} className="text-[#0667d1] hover:text-[#0556b3] hover:underline" />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <table {...props} className="min-w-full border border-[#e4e6ea] text-base text-[#616d7b]" />
                    </div>
                  ),
                  thead: ({ node, ...props }) => <thead {...props} className="bg-[#f9fafb] border-b border-[#e4e6ea]" />,
                  th: ({ node, ...props }) => (
                    <th {...props} className="px-4 py-3 text-left font-semibold text-[#1e2832] border-r border-[#e4e6ea] last:border-r-0" />
                  ),
                  td: ({ node, ...props }) => (
                    <td {...props} className="px-4 py-3 border-b border-r border-[#e4e6ea] last:border-r-0" />
                  ),
                  tr: ({ node, ...props }) => <tr {...props} className="border-b border-[#e4e6ea]" />,
                  tbody: ({ node, ...props }) => <tbody {...props} />,
                }}
              >
                {md}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
