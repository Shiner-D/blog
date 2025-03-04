import { create } from 'zustand';
import { Post } from '../types';
import { supabase } from '../lib/supabase';

interface PostState {
  posts: Post[];
  loading: boolean;
  searchTerm: string;
  selectedCategory: string | null;
  selectedTag: string | null;
  setPosts: (posts: Post[]) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  setSelectedTag: (tagId: string | null) => void;
  fetchPosts: () => Promise<void>;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  loading: false,
  searchTerm: '',
  selectedCategory: null,
  selectedTag: null,
  setPosts: (posts) => set({ posts }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
  setSelectedTag: (tagId) => set({ selectedTag: tagId }),
  fetchPosts: async () => {
    try {
      set({ loading: true });
      let query = supabase
        .from('posts')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          ),
          tags (
            id,
            name,
            slug
          )
        `)
        .eq('published', true);

      const { selectedCategory, selectedTag, searchTerm } = get();

      if (selectedCategory) {
        query = query.eq('categories.id', selectedCategory);
      }
      if (selectedTag) {
        query = query.eq('tags.id', selectedTag);
      }
      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching posts:', error);
        set({ posts: [], loading: false });
        return;
      }

      set({ posts: data as Post[], loading: false });
    } catch (error) {
      console.error('Error in fetchPosts:', error);
      set({ posts: [], loading: false });
    }
  },
}));