import { Heart, MessageCircle, Share2, Volume2, VolumeX } from "lucide-react";
import { compactNumber } from "@/lib/formatters";

type ActionRailProps = {
  commentsCount: number;
  isMuted: boolean;
  like: {
    liked: boolean;
    count: number;
  };
  onToggleLike: () => void;
  onToggleMute: () => void;
  sharesCount: number;
};

export function ActionRail({
  commentsCount,
  isMuted,
  like,
  onToggleLike,
  onToggleMute,
  sharesCount,
}: ActionRailProps) {
  return (
    <div className="action-rail" aria-label="Tương tác">
      <button
        aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
        className="action-button"
        onClick={onToggleMute}
        type="button"
      >
        {isMuted ? (
          <VolumeX aria-hidden="true" size={25} />
        ) : (
          <Volume2 aria-hidden="true" size={25} />
        )}
        <span>{isMuted ? "Mute" : "Sound"}</span>
      </button>
      <button
        aria-pressed={like.liked}
        aria-label={like.liked ? "Bỏ thích" : "Thích"}
        className={like.liked ? "action-button liked" : "action-button"}
        onClick={onToggleLike}
        type="button"
      >
        <Heart
          aria-hidden="true"
          fill={like.liked ? "currentColor" : "none"}
          size={25}
        />
        <span>{compactNumber.format(like.count)}</span>
      </button>
      <button className="action-button" type="button" aria-label="Bình luận">
        <MessageCircle aria-hidden="true" size={25} />
        <span>{compactNumber.format(commentsCount)}</span>
      </button>
      <button className="action-button" type="button" aria-label="Chia sẻ">
        <Share2 aria-hidden="true" size={25} />
        <span>{compactNumber.format(sharesCount)}</span>
      </button>
    </div>
  );
}
