import { getPostsByTag, getPosts } from '@/lib/posts';
import { TagContent } from '@/components/TagContent';
import Link from 'next/link';

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);
  const allPosts = getPosts();

  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-serif italic mb-8">Nessun contenuto trovato per #{decodedTag}</h1>
        <Link href="/tags" className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">Torna alle categorie</Link>
      </div>
    );
  }

  return <TagContent posts={posts} allPosts={allPosts} tag={decodedTag} />;
}
