export type VideoItem = {
  id: string;
  videoUrl: string;
  authorName: string;
  description: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
};

export const videos: VideoItem[] = [
  {
    id: "big-buck-bunny",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    authorName: "Bunny Studio",
    description: "A quick cinematic moment from Big Buck Bunny.",
    likesCount: 12400,
    commentsCount: 328,
    sharesCount: 91,
  },
  {
    id: "friday",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "MDN Shorts",
    description: "Friday colors, soft motion, and a calm loop.",
    likesCount: 8700,
    commentsCount: 146,
    sharesCount: 53,
  },
  {
    id: "sintel",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    authorName: "Sintel Team",
    description: "A dramatic trailer frame built for vertical discovery.",
    likesCount: 15300,
    commentsCount: 512,
    sharesCount: 204,
  },
  {
    id: "city-replay",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    authorName: "Loop Lab",
    description: "A familiar scene remixed for the feed experience.",
    likesCount: 6400,
    commentsCount: 88,
    sharesCount: 37,
  },
];
