"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { VideoItem } from "@/lib/videos";
import { BottomNavigation, SideNavigation } from "./navigation";
import { FeedProgress } from "./feed-progress";
import { VideoCard } from "./video-card";
import type { LikeState, PlaybackState, VideoTimeState } from "./types";

type VideoFeedProps = {
  videos: VideoItem[];
};

const emptyVideoTime = {
  currentTime: 0,
  duration: 0,
};

export function VideoFeed({ videos }: VideoFeedProps) {
  const feedRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [activeId, setActiveId] = useState(videos[0]?.id ?? "");
  const [isMuted, setIsMuted] = useState(true);
  const [playbackState, setPlaybackState] = useState<PlaybackState>({});
  const [videoTimes, setVideoTimes] = useState<VideoTimeState>({});
  const [scrubbingVideoId, setScrubbingVideoId] = useState<string | null>(null);
  const [likeState, setLikeState] = useState<LikeState>(() =>
    Object.fromEntries(
      videos.map((video) => [
        video.id,
        { liked: false, count: video.likesCount },
      ]),
    ),
  );

  const activeIndex = useMemo(
    () => videos.findIndex((video) => video.id === activeId),
    [activeId, videos],
  );

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;
          const videoId = card.dataset.videoId;
          const video = videoId ? videoRefs.current[videoId] : null;

          if (!videoId || !video) {
            return;
          }

          if (entry.isIntersecting) {
            setActiveId(videoId);
            video.play().catch(() => {
              setPlaybackState((current) => ({
                ...current,
                [videoId]: false,
              }));
            });
            return;
          }

          video.pause();
        });
      },
      {
        root: feed,
        threshold: 0.72,
      },
    );

    const cards = feed.querySelectorAll<HTMLElement>("[data-video-card]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  function togglePlayback(videoId: string) {
    const video = videoRefs.current[videoId];

    if (!video) {
      return;
    }

    if (video.paused) {
      video.play().catch(() => undefined);
      setActiveId(videoId);
      return;
    }

    video.pause();
  }

  function toggleLike(videoId: string) {
    setLikeState((current) => {
      const item = current[videoId];

      return {
        ...current,
        [videoId]: {
          liked: !item.liked,
          count: item.count + (item.liked ? -1 : 1),
        },
      };
    });
  }

  function updateVideoTime(videoId: string, video: HTMLVideoElement) {
    setVideoTimes((current) => ({
      ...current,
      [videoId]: {
        currentTime: video.currentTime,
        duration: Number.isFinite(video.duration) ? video.duration : 0,
      },
    }));
  }

  function seekVideo(videoId: string, value: string) {
    const video = videoRefs.current[videoId];
    const nextTime = Number(value);

    if (!video || Number.isNaN(nextTime)) {
      return;
    }

    video.currentTime = nextTime;
    setVideoTimes((current) => ({
      ...current,
      [videoId]: {
        currentTime: nextTime,
        duration: Number.isFinite(video.duration) ? video.duration : 0,
      },
    }));
  }

  function setVideoRef(videoId: string, node: HTMLVideoElement | null) {
    videoRefs.current[videoId] = node;
  }

  return (
    <main className="app-shell">
      <SideNavigation />

      <section
        className="video-feed"
        ref={feedRef}
        aria-label="Danh sách video"
      >
        {videos.map((video, index) => (
          <VideoCard
            index={index}
            isActive={video.id === activeId}
            isMuted={isMuted}
            isPlaying={playbackState[video.id] ?? false}
            isScrubbing={scrubbingVideoId === video.id}
            key={video.id}
            like={likeState[video.id]}
            onScrubEnd={() => setScrubbingVideoId(null)}
            onScrubStart={() => setScrubbingVideoId(video.id)}
            onSeek={(value) => seekVideo(video.id, value)}
            onToggleLike={() => toggleLike(video.id)}
            onToggleMute={() => setIsMuted((current) => !current)}
            onTogglePlayback={() => togglePlayback(video.id)}
            onPlaybackChange={(isPlaying) =>
              setPlaybackState((current) => ({
                ...current,
                [video.id]: isPlaying,
              }))
            }
            onUpdateTime={(element) => updateVideoTime(video.id, element)}
            setVideoRef={(node) => setVideoRef(video.id, node)}
            totalVideos={videos.length}
            video={video}
            videoTime={videoTimes[video.id] ?? emptyVideoTime}
          />
        ))}
      </section>

      <BottomNavigation />
      <FeedProgress activeIndex={activeIndex} videos={videos} />
    </main>
  );
}
