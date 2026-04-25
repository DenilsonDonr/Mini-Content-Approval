'use client'

interface VideoPlayerProps {
  url: string
}

function getVideoType(url: string): 'youtube' | 'vimeo' | 'mp4' {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
  if (url.includes('vimeo.com')) return 'vimeo'
  return 'mp4'
}

function getYouTubeEmbedUrl(url: string): string {
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1].split('?')[0]
    return `https://www.youtube.com/embed/${id}`
  }
  const params = new URL(url).searchParams
  const id = params.get('v')
  return `https://www.youtube.com/embed/${id}`
}

function getVimeoEmbedUrl(url: string): string {
  const id = url.split('vimeo.com/')[1].split('?')[0]
  return `https://player.vimeo.com/video/${id}`
}

export function VideoPlayer({ url }: VideoPlayerProps) {
  const type = getVideoType(url)

  if (type === 'youtube') {
    return (
      <div className="aspect-video w-full">
        <iframe
          src={getYouTubeEmbedUrl(url)}
          className="w-full h-full rounded-lg"
          allowFullScreen
        />
      </div>
    )
  }

  if (type === 'vimeo') {
    return (
      <div className="aspect-video w-full">
        <iframe
          src={getVimeoEmbedUrl(url)}
          className="w-full h-full rounded-lg"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <video
      src={url}
      controls
      className="w-full rounded-lg"
    />
  )
}
