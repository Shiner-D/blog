import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { format } from 'date-fns';

interface PostListProps {
  posts: Post[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article key={post.id} className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <Link to={`/posts/${post.slug}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
            </Link>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{post.author?.full_name}</span>
              <span className="mx-2">•</span>
              <time dateTime={post.created_at}>
                {format(new Date(post.created_at), 'MMM d, yyyy')}
              </time>
              {post.categories && post.categories.length > 0 && (
                <>
                  <span className="mx-2">•</span>
                  <div className="flex space-x-2">
                    {post.categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/categories/${category.slug}`}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/tags/${tag.slug}`}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};