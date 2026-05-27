import { getPosts, getGraphData } from '@/lib/posts';
import { HomeContent } from '@/components/HomeContent';

export default async function Home() {
  const posts = getPosts();
  const graphData = getGraphData();

  return <HomeContent posts={posts} graphData={graphData} />;
}
