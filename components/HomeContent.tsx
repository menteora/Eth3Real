'use client';

import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { PageLayout } from '@/components/PageLayout';
import { PostCard } from '@/components/PostCard';
import { useApp } from '@/context/AppContext';
import { Post, GraphData } from '@/types/post';
import { NeuralGraph } from '@/components/NeuralGraph';
import { StatusLine } from '@/components/StatusLine';

interface HomeContentProps {
  posts: Post[];
  graphData: GraphData;
}

export function HomeContent({ posts, graphData }: HomeContentProps) {
  const { searchQuery } = useApp();
  
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout allPosts={posts} snap={true}>
        <div className="min-h-screen flex flex-col justify-start snap-start px-6 md:px-12 relative overflow-hidden pt-20 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-7xl mx-auto w-full relative z-10"
          >
            <div className="mb-2 md:mb-6 hidden md:block">
              <StatusLine label="Eth3Real Protocol 1.0" sublabel="System Active" />
            </div>
            
            <div className="relative py-2 md:py-8 flex flex-col items-center justify-center min-h-[30vh] md:min-h-[35vh]">
              {/* Central Hub Layout */}
              <div className="relative w-full max-w-6xl flex flex-col items-center">
                {/* Top Row: Eth and Real */}
                <div className="flex flex-row items-center justify-between w-full gap-4 md:gap-32 relative z-10 mb-10 md:mb-24">
                  {/* Background Hub 3 inside this row for perfect centering */}
                  <div className="absolute inset-0 z-0 select-none pointer-events-none flex items-center justify-center overflow-visible">
                    <span className="text-[40vw] md:text-[35vw] lg:text-[25vw] font-serif font-light leading-none text-zinc-300/50 dark:text-zinc-100/30 transition-all duration-1000 select-none">3</span>
                  </div>

                  {/* ETH Cluster: Network/Digital */}
                  <div className="flex flex-col items-center md:items-start group w-1/2 md:w-1/3">
                    <StatusLine label="01. Eth" sublabel="Network / Digitale" theme="zinc" hideSubOnMobile={true} />
                    <h1 className="text-3xl sm:text-4xl md:text-[8vw] font-serif tracking-tighter leading-none group-hover:italic transition-all cursor-default">Eth</h1>
                    <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-zinc-200 to-transparent dark:from-zinc-800 dark:to-transparent mt-2 md:mt-4 hidden md:block" />
                  </div>

                  {/* REAL Cluster: Natura / Analogico */}
                  <div className="flex flex-col items-center md:items-end group w-1/2 md:w-1/3 text-center md:text-right">
                    <StatusLine label="02. Real" sublabel="Presenza / Concretezza" theme="zinc" hideSubOnMobile={true} />
                    <h1 className="text-3xl sm:text-4xl md:text-[8vw] font-serif tracking-tighter leading-none group-hover:italic transition-all cursor-default">Real</h1>
                    <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-zinc-200 to-transparent dark:from-zinc-800 dark:to-transparent mt-2 md:mt-4 hidden md:block" />
                  </div>
                </div>

                {/* Bottom Row: Ethereal (Values/Unknown) */}
                <div className="flex flex-col items-center gap-8 relative z-10 w-full group mt-8 md:mt-0">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-3">
                      {[1, 2, 3].map(i => (
                        <motion.div 
                           key={i} 
                           animate={{ opacity: [0.3, 1, 0.3] }}
                           transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                           className="w-1.5 h-1.5 rounded-full bg-emerald-500" 
                        />
                      ))}
                    </div>
                    <StatusLine label="03. Ethereal" sublabel="Viaggio verso l'ignoto / Con i propri valori" theme="emerald" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 flex flex-col gap-6">
              <div className="hidden md:block">
                <StatusLine label="Connessione ottimizzata" sublabel="Pronto all'uso" />
              </div>
              <div className="flex items-center gap-2 font-mono">
                <div className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
                <span className="text-[9px] uppercase tracking-widest text-zinc-300 dark:text-zinc-500">
                  {searchQuery ? `Ricerca: ${searchQuery}` : 'Scorri per Decriptare'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))
        ) : searchQuery && (
          <div className="h-screen flex items-center justify-center snap-start font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest text-[10px]">
            Nessuna voce corrispondente trovata nell&apos;archivio.
          </div>
        )}

        <section className="min-h-screen snap-start flex flex-col justify-center py-20">
          <NeuralGraph data={graphData} />
        </section>

        <footer className="h-screen flex flex-col justify-center items-center snap-start text-center px-6 md:px-12">
          <div className="relative w-full max-w-5xl mx-auto mb-16 flex items-center justify-center group">
            <div className="absolute inset-x-0 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
            <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-400 dark:via-white to-transparent opacity-30" />
            <h3 className="text-5xl md:text-8xl font-serif italic whitespace-nowrap bg-white dark:bg-black px-8 md:px-16 relative z-10 transition-all duration-1000 group-hover:tracking-tighter">
              Connettiamoci.
            </h3>
          </div>
          
          <div className="flex gap-12 text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-400 dark:text-zinc-500">
            <Link href="/pages/about" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Manifesto</Link>
            <Link href="/tags" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Temi</Link>
            <Link href="/pages/contact" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Contatti</Link>
          </div>
        </footer>
    </PageLayout>
  );
}
