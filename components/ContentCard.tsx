'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/StatusBadge'
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

export function ContentCard({ content }: ContentCardProps) {
  const shareableUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/review/${content.token}`

  function copyToClipboard() {
    navigator.clipboard.writeText(shareableUrl)
  }

  const date = new Date(content.created_at).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-[#212121] text-sm truncate">{content.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{date}</p>
          </div>
          <StatusBadge status={content.status} />
        </div>

        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-[#212121] hover:bg-[#333] text-white text-xs h-7 px-3 rounded-md"
              >
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

          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 flex-1 min-w-0">
            <p className="text-xs text-gray-400 truncate flex-1">{shareableUrl}</p>
            <Button
              size="sm"
              onClick={copyToClipboard}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7 px-3 shrink-0 rounded-md"
            >
              Copiar
            </Button>
          </div>
        </div>

        {content.feedback && (
          <p className="text-xs text-gray-500 italic border-l-2 border-red-300 pl-2">
            {content.feedback}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
