'use client'

import { useState } from 'react'
import { useContentPieces } from '@/hooks/useContentPieces'
import { ContentCard } from '@/components/ContentCard'
import { Input } from '@/components/ui/input'
import type { ContentStatus, ContentPiece } from '@/types'

const columns: { status: ContentStatus; label: string; headerBg: string; count: string }[] = [
  { status: 'pending', label: 'Pendiente', headerBg: 'bg-[#ffca0c]/30', count: 'bg-[#ffca0c]/40 text-yellow-900' },
  { status: 'approved', label: 'Aprobado', headerBg: 'bg-green-500/30', count: 'bg-green-500/40 text-green-900' },
  { status: 'rejected', label: 'Rechazado', headerBg: 'bg-red-500/30', count: 'bg-red-500/40 text-red-900' },
]

function filterByQuery(items: ContentPiece[], query: string): ContentPiece[] {
  if (!query) return items
  return items.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()))
}

export function ContentList() {
  const { contentPieces, loading, error } = useContentPieces()
  const [search, setSearch] = useState('')

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
    pending: filterByQuery(contentPieces.filter((c) => c.status === 'pending'), search),
    approved: filterByQuery(contentPieces.filter((c) => c.status === 'approved'), search),
    rejected: filterByQuery(contentPieces.filter((c) => c.status === 'rejected'), search),
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#212121]">Contenido enviado</h2>
        <span className="text-sm font-medium text-[#212121] bg-[#ffca0c] px-3 py-1 rounded-full">Total: {contentPieces.length}</span>
      </div>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por título..."
        className="mb-6 max-w-sm bg-white border-gray-200 focus-visible:ring-[#ffca0c]"
      />
      <div className="grid grid-cols-3 gap-6">
        {columns.map((col) => (
          <div key={col.status}>
            <div className={`${col.headerBg} rounded-xl px-4 py-3 flex items-center justify-between mb-4`}>
              <span className="font-semibold text-[#212121] text-sm">{col.label}</span>
              <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${col.count}`}>
                {grouped[col.status].length}
              </span>
            </div>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 py-1">
              {grouped[col.status].length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-6">Sin contenido</p>
              ) : (
                grouped[col.status].map((content) => (
                  <ContentCard key={content.id} content={content} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
