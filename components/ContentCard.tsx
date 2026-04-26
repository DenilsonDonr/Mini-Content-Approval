'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VideoPlayer } from '@/components/VideoPlayer'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { ContentPiece } from '@/types'

interface ContentCardProps {
  content: ContentPiece
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr.replace(' ', 'T'))
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function ContentCard({ content }: ContentCardProps) {
  const shareableUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/review/${content.token}`

  function copyToClipboard() {
    navigator.clipboard.writeText(shareableUrl)
  }

  return (
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl">
      <CardContent className="p-3 space-y-3">
        <div>
          <p className="font-semibold text-[#212121] text-sm truncate">{content.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{formatDate(content.created_at)}</p>
        </div>

        {content.feedback && (
          <div className="border-l-2 border-red-300 pl-2 space-y-0.5">
            <p className="text-xs text-gray-500 italic">{content.feedback}</p>
            <p className="text-xs text-gray-400">Revisado: {formatDate(content.updated_at)}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="flex-1 bg-[#212121] hover:bg-[#333] text-white text-xs h-8 rounded-md">
                Ver video
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl rounded-2xl p-0 overflow-hidden">
              <div className="bg-[#ffca0c] px-6 py-4">
                <DialogHeader>
                  <DialogTitle className="text-[#212121] font-bold">{content.title}</DialogTitle>
                </DialogHeader>
              </div>
              <div className="p-4">
                <VideoPlayer url={content.video_url} />
              </div>
            </DialogContent>
          </Dialog>

          <Button
            size="sm"
            onClick={copyToClipboard}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 rounded-md"
          >
            Copiar enlace
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
