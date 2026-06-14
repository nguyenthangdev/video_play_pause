import { Pause, Play } from "lucide-react";
import type { VideoItem } from "@/lib/videos";
import { ActionRail } from "./action-rail";
import { VideoControls } from "./video-controls";
import type { VideoTime } from "./types";

type VideoCardProps = {
  index: number;
  isActive: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  isScrubbing: boolean;
  like: {
    liked: boolean;
    count: number;
  };
  onScrubEnd: () => void;
  onScrubStart: () => void;
  onSeek: (value: string) => void;
  onToggleLike: () => void;
  onToggleMute: () => void;
  onTogglePlayback: () => void;
  onPlaybackChange: (isPlaying: boolean) => void;
  onUpdateTime: (video: HTMLVideoElement) => void;
  setVideoRef: (node: HTMLVideoElement | null) => void;
  totalVideos: number;
  video: VideoItem;
  videoTime: VideoTime;
};

export function VideoCard({
  index,
  isActive,
  isMuted,
  isPlaying,
  isScrubbing,
  like,
  onScrubEnd,
  onScrubStart,
  onSeek,
  onToggleLike,
  onToggleMute,
  onTogglePlayback,
  onPlaybackChange,
  onUpdateTime,
  setVideoRef,
  totalVideos,
  video,
  videoTime,
}: VideoCardProps) {
  const progress =
    videoTime.duration > 0
      ? (videoTime.currentTime / videoTime.duration) * 100
      : 0;

  return (
    <article
      className="video-card"
      data-video-card
      data-video-id={video.id}
      key={video.id}
    >
      <button
        aria-label={isPlaying ? "Tạm dừng video" : "Phát video"}
        className="video-tap-layer"
        onClick={onTogglePlayback}
        type="button"
      >
        <video
          className="video-media"
          loop
          muted={isMuted}
          playsInline
          preload={index < 2 ? "auto" : "metadata"}
          ref={setVideoRef}
          src={video.videoUrl}
          onLoadedMetadata={(event) => onUpdateTime(event.currentTarget)}
          onPause={() => onPlaybackChange(false)}
          onPlay={() => onPlaybackChange(true)}
          onTimeUpdate={(event) => onUpdateTime(event.currentTarget)}
        />
        <span
          className={
            isPlaying ? "playback-badge" : "playback-badge playback-badge-visible"
          }
          aria-hidden="true"
        >
          {isPlaying ? <Pause size={34} /> : <Play size={36} />}
        </span>
      </button>

      <div className="video-gradient" aria-hidden="true" />

      <div className="video-copy">
        <p className="author">@{video.authorName}</p>
        <p className="description">{video.description}</p>
        <p className="position">
          {index + 1}/{totalVideos}
        </p>
      </div>

      <ActionRail
        commentsCount={video.commentsCount}
        isMuted={isMuted}
        like={like}
        onToggleLike={onToggleLike}
        onToggleMute={onToggleMute}
        sharesCount={video.sharesCount}
      />

      <VideoControls
        authorName={video.authorName}
        isScrubbing={isScrubbing}
        onScrubEnd={onScrubEnd}
        onScrubStart={onScrubStart}
        onSeek={onSeek}
        progress={progress}
        time={videoTime}
      />

      <div
        className={isActive ? "active-ring active" : "active-ring"}
        aria-hidden="true"
      />
    </article>
  );
}
