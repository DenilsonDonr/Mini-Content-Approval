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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{content.title}</CardTitle>
        <StatusBadge status={content.status} />
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground truncate mb-3">{content.video_url}</p>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground truncate flex-1">{shareableUrl}</p>
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            Copiar enlace
          </Button>
        </div>
        {content.feedback && (
          <p className="mt-3 text-xs text-muted-foreground italic">
            Comentario: {content.feedback}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
