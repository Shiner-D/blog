import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PostEditor } from '../components/PostEditor';
import { usePostStore } from '../store/postStore';
import toast from 'react-hot-toast';

export const NewPostPage: React.FC = () => {
  const navigate = useNavigate();
  const { createPost } = usePostStore();

  const handleSubmit = async (data: any) => {
    try {
      await createPost(data);
      toast.success('Post created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create post');
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Post</h1>
      <PostEditor onSubmit={handleSubmit} />
    </div>
  );
};