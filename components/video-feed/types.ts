export type LikeState = Record<string, { liked: boolean; count: number }>;

export type PlaybackState = Record<string, boolean>;

export type VideoTime = {
  currentTime: number;
  duration: number;
};

export type VideoTimeState = Record<string, VideoTime>;
