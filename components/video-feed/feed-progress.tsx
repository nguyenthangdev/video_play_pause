import type { VideoItem } from "@/lib/videos";

type FeedProgressProps = {
  activeIndex: number;
  videos: VideoItem[];
};

export function FeedProgress({ activeIndex, videos }: FeedProgressProps) {
  return (
    <div className="feed-progress" aria-hidden="true">
      {videos.map((video, index) => (
        <span
          className={index === activeIndex ? "progress-dot active" : "progress-dot"}
          key={video.id}
        />
      ))}
    </div>
  );
}
