/*
  # Initial Schema Setup for Personal Blog

  1. New Tables
    - users (handled by Supabase Auth)
    - posts
      - id (uuid, primary key)
      - title (text)
      - content (text)
      - excerpt (text)
      - slug (text, unique)
      - published (boolean)
      - author_id (uuid, foreign key)
      - created_at (timestamp)
      - updated_at (timestamp)
    - categories
      - id (uuid, primary key)
      - name (text)
      - slug (text, unique)
      - description (text)
    - tags
      - id (uuid, primary key)
      - name (text)
      - slug (text, unique)
    - posts_categories
      - post_id (uuid, foreign key)
      - category_id (uuid, foreign key)
    - posts_tags
      - post_id (uuid, foreign key)
      - tag_id (uuid, foreign key)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  slug text UNIQUE NOT NULL,
  published boolean DEFAULT false,
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL
);

-- Create junction tables
CREATE TABLE IF NOT EXISTS posts_categories (
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

CREATE TABLE IF NOT EXISTS posts_tags (
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts_tags ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read published posts"
  ON posts
  FOR SELECT
  USING (published = true);

CREATE POLICY "Authors can CRUD their own posts"
  ON posts
  USING (auth.uid() = author_id);

CREATE POLICY "Anyone can read categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create categories"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read tags"
  ON tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create tags"
  ON tags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read posts_categories"
  ON posts_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authors can manage their posts' categories"
  ON posts_categories
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_id
      AND posts.author_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can read posts_tags"
  ON posts_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authors can manage their posts' tags"
  ON posts_tags
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_id
      AND posts.author_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to update updated_at
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE
  ON posts
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();