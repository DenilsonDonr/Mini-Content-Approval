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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-4">
        <div className="bg-[#212121] rounded-2xl px-6 py-5">
          <p className="text-[#ffca0c] text-xs font-semibold uppercase tracking-widest mb-1">Revisión de contenido</p>
          <h1 className="text-white text-2xl font-bold">{content.title}</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <VideoPlayer url={content.video_url} />
        </div>
        <div className="bg-white rounded-2xl shadow-sm px-6 py-6">
          {alreadyReviewed ? (
            <p className="text-center text-gray-400 text-sm py-2">
              Este contenido ya fue revisado. Gracias.
            </p>
          ) : (
            <ApprovalActions token={token} />
          )}
        </div>
      </div>
    </div>
  )
}
