import { supabase } from '@/lib/supabase/client'
import { VideoPlayer } from '@/components/VideoPlayer'
import { ApprovalActions } from '@/components/ApprovalActions'
import { notFound } from 'next/navigation'

interface ReviewPageProps {
  params: Promise<{ token: string }>
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { token } = await params

  const { data: content } = await supabase
    .from('content_pieces')
    .select('*')
    .eq('token', token)
    .single()

  if (!content) {
    notFound()
  }

  const alreadyReviewed = content.status !== 'pending'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">{content.title}</h1>
        <VideoPlayer url={content.video_url} />
        {alreadyReviewed ? (
          <p className="text-center text-muted-foreground">
            Este contenido ya fue revisado.
          </p>
        ) : (
          <ApprovalActions token={token} />
        )}
      </div>
    </div>
  )
}
