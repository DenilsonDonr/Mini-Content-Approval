'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/StatusBadge'
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
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-semibold text-[#212121]">{content.title}</CardTitle>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>
        <StatusBadge status={content.status} />
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-gray-500 truncate">{content.video_url}</p>
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-400 truncate flex-1">{shareableUrl}</p>
          <Button
            size="sm"
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs shrink-0"
          >
            Copiar enlace
          </Button>
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
