export interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  content: string;
  tags: string[];
}

export interface GraphData {
  nodes: { id: string; title: string; category: string }[];
  links: { source: string; target: string }[];
}
