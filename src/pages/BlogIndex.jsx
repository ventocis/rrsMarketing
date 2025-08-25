import React from 'react';
import { Link } from 'react-router-dom';
import blogData from '../data/blog.json';
import SEO from '../components/SEO.jsx';

export default function BlogIndex() {
  return (
    <>
      <SEO 
        title="Drive Smart Blog"
        description="Tips, insights, and advice for safer driving. Expert guidance on traffic safety, defensive driving techniques, and road rules."
        keywords="driving tips, traffic safety, defensive driving, road safety, driving blog"
        image="/assets/rrs (1200 x 630 px).png"
        url="/blog"
      />
      <main className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Drive Smart Blog</h1>
            <p className="text-xl text-gray-600">Tips, insights, and advice for safer driving</p>
          </header>
          
          <div className="grid gap-8">
            {blogData.posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-200 pb-8 last:border-b-0">
                <div className="mb-4">
                  <time className="text-sm text-gray-500" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.description}
                </p>
                
                <Link 
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read more
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
          
          {blogData.posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blog posts available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
