'use client'

import { useContentPieces } from '@/hooks/useContentPieces'
import { ContentCard } from '@/components/ContentCard'

export function ContentList() {
  const { contentPieces, loading, error } = useContentPieces()

  if (loading) {
    return <p className="text-muted-foreground text-sm">Cargando contenido...</p>
  }

  if (error) {
    return <p className="text-red-500 text-sm">Error al cargar el contenido: {error}</p>
  }

  if (contentPieces.length === 0) {
    return <p className="text-muted-foreground text-sm">No hay contenido enviado aún.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {contentPieces.map((content) => (
        <ContentCard key={content.id} content={content} />
      ))}
    </div>
  )
}
