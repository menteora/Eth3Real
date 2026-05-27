'use client';

import { Post } from '@/types/post';
import { PostCard } from '@/components/PostCard';
import { PageLayout } from '@/components/PageLayout';
import { ArrowLeft, Hash } from 'lucide-react';
import Link from 'next/link';

interface TagContentProps {
  posts: Post[];
  allPosts: Post[];
  tag: string;
}

export function TagContent({ posts, allPosts, tag }: TagContentProps) {
  return (
    <PageLayout allPosts={allPosts}>
        <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <Link 
            href="/tags"
            className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-20"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alle Categorie
          </Link>

          <header className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <Hash className="w-8 h-8 text-emerald-500" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500">Archivio Tag</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif italic mb-6">{tag}</h1>
            <p className="text-xl md:text-2xl text-zinc-500 font-serif max-w-2xl">
              Visualizzazione di {posts.length} {posts.length === 1 ? 'voce' : 'voci'} associate a questo tema.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4">
            {posts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
    </PageLayout>
  );
}
