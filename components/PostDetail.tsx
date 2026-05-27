'use client';

import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'motion/react';
import { Post } from '@/types/post';
import { getRelatedPosts, getLocalGraphData } from '@/lib/client-utils';
import { X, ArrowLeft, Bookmark, Heart, Share2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { NeuralGraph } from '@/components/NeuralGraph';

export function PostDetail({ post, allPosts }: { post: Post; allPosts: Post[] }) {
  const { setActivePostId } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const relatedPosts = getRelatedPosts(post, allPosts);
  const localGraph = getLocalGraphData(post.id, allPosts);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [headerScrolled, setHeaderScrolled] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setHeaderScrolled(latest > 0.01);
  });

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
      exit={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-white dark:bg-[#0a0a0a] overflow-y-auto overflow-x-hidden no-scrollbar"
      ref={containerRef}
    >
      <div className="fixed top-0 left-0 w-full h-1 z-[120]">
        <motion.div 
          className="h-full bg-zinc-900 dark:bg-white origin-left"
          style={{ scaleX }}
        />
      </div>

      <div className={`fixed top-0 left-0 w-full transition-all duration-500 z-[110] pointer-events-none flex justify-between items-center ${
        headerScrolled 
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900 py-4 px-8' 
          : 'p-8'
      }`}>
        <button
          onClick={() => setActivePostId(null)}
          className="flex items-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase transition-all text-zinc-900 dark:text-white hover:opacity-50 pointer-events-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Chiudi Voce
        </button>
        
        <div className="flex gap-6 pointer-events-auto text-zinc-900 dark:text-white">
          <button className="hover:scale-125 transition-transform"><Heart className="w-4 h-4" /></button>
          <button className="hover:scale-125 transition-transform"><Bookmark className="w-4 h-4" /></button>
          <button className="hover:scale-125 transition-transform"><Share2 className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-48">
        <motion.header
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-8 font-mono">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-400 dark:text-zinc-600">
              ID: {post.id}
            </span>
            <div className="h-[1px] w-8 bg-zinc-100 dark:bg-zinc-900" />
            <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-zinc-500">
              {post.date.split(' ').join(' // ')}
            </span>
          </div>

          <h1 className="text-6xl md:text-[10vw] font-serif leading-[0.8] tracking-tighter mb-16">
            {post.title}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono border-y border-zinc-100 dark:border-zinc-900 py-8">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] uppercase tracking-widest text-zinc-400">Contesto</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-900 dark:text-white">Umanistico</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[8px] uppercase tracking-widest text-zinc-400">Tempo di Lettura</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-900 dark:text-white">~4.2 Minuti</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[8px] uppercase tracking-widest text-zinc-400">Stabilità</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500">Ottimizzato</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[8px] uppercase tracking-widest text-zinc-400">Entropia</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-900 dark:text-white">Minima</span>
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative aspect-video mb-24 overflow-hidden rounded-sm"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="markdown-body prose dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ margin: "-20% 0px -20% 0px" }}
                  transition={{ duration: 0.8 }}
                  className="text-xl md:text-2xl leading-relaxed text-zinc-800 dark:text-zinc-300 font-serif mb-12"
                >
                  {children}
                </motion.p>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="flex flex-wrap gap-4 py-12 border-y border-zinc-100 dark:border-zinc-900 mt-20">
          {post.tags.map((tag) => (
            <Link 
              key={tag}
              href={`/tags/${tag.toLowerCase()}`}
              className="px-4 py-2 border border-zinc-100 dark:border-zinc-800 text-[10px] font-mono tracking-widest uppercase hover:border-emerald-500/50 hover:text-emerald-500 transition-all rounded-full"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-40">
            <header className="mb-16">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-400 block mb-4">Pillole di Approfondimento</span>
              <h3 className="text-4xl font-serif italic tracking-tighter">Risonanze Correlate.</h3>
            </header>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-900"
            >
              {relatedPosts.map((related) => (
                <motion.button
                  key={related.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  onClick={() => {
                    setActivePostId(related.id);
                    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group relative bg-white dark:bg-[#0a0a0a] p-12 overflow-hidden transition-all duration-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 text-left"
                >
                  <motion.div 
                    className="absolute inset-0 bg-emerald-500/5 transition-transform duration-1000 origin-bottom"
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-12">
                      <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-300">#{related.tags[0]}</span>
                      <ArrowRight className="w-4 h-4 text-zinc-200 group-hover:text-emerald-500 transition-colors group-hover:translate-x-1" />
                    </div>
                    
                    <h4 className="text-2xl font-serif mb-6 group-hover:italic transition-all duration-500">{related.title}</h4>
                    <p className="text-sm text-zinc-500 font-serif leading-relaxed line-clamp-3 mb-12 opacity-60 group-hover:opacity-100 transition-opacity">
                      {related.excerpt}
                    </p>
                    
                    <div className="font-mono text-[9px] uppercase tracking-widest text-zinc-900 dark:text-white flex items-center gap-4">
                      <div className="w-8 h-px bg-zinc-900 dark:bg-white origin-left transition-transform duration-500 group-hover:scale-x-150" />
                      <span>Connetti</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        )}

        <div className="mt-40 mb-32">
          <NeuralGraph 
            data={localGraph} 
            height={400} 
            title="Coscienza Locale."
            subtitle="Vicinanza Immediata"
            focusNodeId={post.id}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 pt-16 flex flex-col items-center gap-12"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                />
              ))}
            </div>
          </div>

          <button 
            onClick={() => setActivePostId(null)}
            className="group relative px-16 py-5 overflow-hidden border border-zinc-900 dark:border-white text-[10px] font-bold tracking-[0.4em] uppercase transition-all duration-500 hover:text-white dark:hover:text-zinc-900"
          >
            <div className="absolute inset-0 bg-zinc-900 dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]" />
            <span className="relative z-10 flex items-center gap-4">
              Voce d&apos;Archivio
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
