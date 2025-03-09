import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm } from 'react-hook-form';
import { Post } from '../../types';

interface PostEditorProps {
  initialData?: Post;
  onSubmit: (data: Partial<Post>) => Promise<void>;
}

export const PostEditor: React.FC<PostEditorProps> = ({ initialData, onSubmit }) => {
  const { register, handleSubmit, setValue, watch } = useForm<Partial<Post>>({
    defaultValues: initialData || {},
  });

  const content = watch('content', '');

  const handleContentChange = (value: string) => {
    setValue('content', value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
          Excerpt
        </label>
        <textarea
          {...register('excerpt')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <SimpleMDE value={content} onChange={handleContentChange} />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialData ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};