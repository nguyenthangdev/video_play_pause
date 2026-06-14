import { VideoFeed } from "@/components/video-feed/video-feed";
import { videos } from "@/lib/videos";

export default function Home() {
  return <VideoFeed videos={videos} />;
}
