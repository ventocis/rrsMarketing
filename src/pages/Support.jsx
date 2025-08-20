import React from "react";
import ReactMarkdown from "react-markdown";
import md from "/blueprint/legal/support.md?raw";

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <article className="prose prose-slate max-w-none">
        <ReactMarkdown>{md}</ReactMarkdown>
      </article>
    </main>
  );
}
