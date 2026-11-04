// Pulls the video ID out of any usual YouTube link:
// youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, youtube.com/embed/ID (or just the ID itself).
export function youtubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/) ?? url.match(/^([\w-]{11})$/);
  if (!match) throw new Error(`Couldn't find a YouTube video in "${url}" (src/content/projects.ts)`);
  return match[1];
}

// YouTube's own still for the video. "hqdefault" exists for every video.
export function youtubeThumbnail(url: string) {
  return `https://i.ytimg.com/vi/${youtubeId(url)}/hqdefault.jpg`;
}
