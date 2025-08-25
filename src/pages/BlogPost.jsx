import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import blogData from '../data/blog.json';
import SEO from '../components/SEO.jsx';
import StructuredData from '../components/StructuredData.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogData.posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <>
        <SEO 
          title="Blog post not found"
          description="The blog post you're looking for doesn't exist."
          url="/blog/not-found"
        />
        <main className="bg-white min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to blog
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO 
        title={post.title}
        description={post.description}
        keywords="driving tips, traffic safety, defensive driving, road safety"
        url={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.date}
        modifiedTime={post.date}
      />
      <StructuredData type="article" data={post} />
      <main className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Navigation */}
          <nav className="mb-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to blog
            </Link>
          </nav>

          {/* Article header */}
          <header className="mb-8">
            <time className="text-sm text-gray-500 mb-4 block" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">{post.description}</p>
          </header>

          {/* Article content */}
          <article className="prose prose-slate max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Footer navigation */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to blog
            </Link>
          </footer>
        </div>
      </main>
    </>
  );
}
