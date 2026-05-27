import { Post, GraphData } from '@/types/post';

export function getRelatedPosts(currentPost: Post, allPosts: Post[], limit = 2): Post[] {
  const posts = allPosts.filter(p => p.id !== currentPost.id);
  return posts
    .map(post => ({
      post,
      score: post.tags.filter(tag => currentPost.tags.includes(tag)).length
    }))
    .sort((a, b) => b.score - a.score)
    .filter(item => item.score > 0)
    .slice(0, limit)
    .map(item => item.post);
}

export function buildGraph(posts: Post[]): GraphData {
  const nodes = posts.map(p => ({ 
    id: p.id, 
    title: p.title, 
    category: p.tags[0] 
  }));
  
  const links: { source: string; target: string }[] = [];
  
  for (let i = 0; i < posts.length; i++) {
    for (let j = i + 1; j < posts.length; j++) {
      const commonTags = posts[i].tags.filter(tag => posts[j].tags.includes(tag));
      if (commonTags.length > 0) {
        links.push({ source: posts[i].id, target: posts[j].id });
      }
    }
  }
  
  return { nodes, links };
}

export function getLocalGraphData(postId: string, allPosts: Post[]): GraphData {
  const currentPost = allPosts.find(p => p.id === postId);
  if (!currentPost) return { nodes: [], links: [] };

  const neighbors = allPosts.filter(p => 
    p.id !== postId && p.tags.some(t => currentPost.tags.includes(t))
  );

  return buildGraph([currentPost, ...neighbors]);
}
