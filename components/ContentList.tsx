'use client'

import { useContentPieces } from '@/hooks/useContentPieces'
import { ContentCard } from '@/components/ContentCard'
import type { ContentStatus, ContentPiece } from '@/types'

const columns: { status: ContentStatus; label: string; bg: string; headerBg: string; count: string }[] = [
  { status: 'pending', label: 'Pendiente', bg: 'bg-[#ffca0c]/10', headerBg: 'bg-[#ffca0c]/30', count: 'bg-[#ffca0c]/40 text-yellow-900' },
  { status: 'approved', label: 'Aprobado', bg: 'bg-green-500/10', headerBg: 'bg-green-500/30', count: 'bg-green-500/40 text-green-900' },
  { status: 'rejected', label: 'Rechazado', bg: 'bg-red-500/10', headerBg: 'bg-red-500/30', count: 'bg-red-500/40 text-red-900' },
]

export function ContentList() {
  const { contentPieces, loading, error } = useContentPieces()

  if (loading) {
    return <p className="text-gray-400 text-sm">Cargando contenido...</p>
  }

  if (error) {
    return <p className="text-red-500 text-sm">Error al cargar el contenido: {error}</p>
  }

  if (contentPieces.length === 0) {
    return <p className="text-gray-400 text-sm">No hay contenido enviado aún.</p>
  }

  const grouped: Record<ContentStatus, ContentPiece[]> = {
    pending: contentPieces.filter((c) => c.status === 'pending'),
    approved: contentPieces.filter((c) => c.status === 'approved'),
    rejected: contentPieces.filter((c) => c.status === 'rejected'),
  }

  const activeColumns = columns.filter((col) => grouped[col.status].length > 0)

  return (
    <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${activeColumns.length}, minmax(0, 1fr))` }}>
      {activeColumns.map((col) => (
        <div key={col.status}>
          <div className={`${col.headerBg} rounded-xl px-4 py-3 flex items-center justify-between mb-4`}>
            <span className="font-semibold text-[#212121] text-sm">{col.label}</span>
            <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${col.count}`}>
              {grouped[col.status].length}
            </span>
          </div>
          <div className="space-y-3">
            {grouped[col.status].map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
