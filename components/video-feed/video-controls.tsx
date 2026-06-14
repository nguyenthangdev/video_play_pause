import type { CSSProperties } from "react";
import { formatTime } from "@/lib/formatters";
import type { VideoTime } from "./types";

type VideoControlsProps = {
  authorName: string;
  isScrubbing: boolean;
  onScrubEnd: () => void;
  onScrubStart: () => void;
  onSeek: (value: string) => void;
  progress: number;
  time: VideoTime;
};

export function VideoControls({
  authorName,
  isScrubbing,
  onScrubEnd,
  onScrubStart,
  onSeek,
  progress,
  time,
}: VideoControlsProps) {
  return (
    <div className="video-controls">
      <div
        className={isScrubbing ? "time-display visible" : "time-display"}
        aria-hidden={!isScrubbing}
        aria-live="off"
      >
        <span>{formatTime(time.currentTime)}</span>
        <span aria-hidden="true">/</span>
        <span>{formatTime(time.duration)}</span>
      </div>
      <input
        aria-label={`Tua video của ${authorName}`}
        className="video-seek"
        disabled={time.duration === 0}
        max={time.duration || 0}
        min="0"
        onBlur={onScrubEnd}
        onChange={(event) => onSeek(event.target.value)}
        onFocus={onScrubStart}
        onPointerCancel={onScrubEnd}
        onPointerDown={onScrubStart}
        onPointerUp={onScrubEnd}
        step="0.1"
        style={{ "--progress": `${progress}%` } as CSSProperties}
        type="range"
        value={Math.min(time.currentTime, time.duration || 0)}
      />
    </div>
  );
}
