'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { ContentPiece } from '@/types'

export function useContentPieces() {
  const [contentPieces, setContentPieces] = useState<ContentPiece[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContentPieces() {
      const { data, error } = await supabase
        .from('content_pieces')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setContentPieces(data)
      }

      setLoading(false)
    }

    fetchContentPieces()

    const subscription = supabase
      .channel('content_pieces_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'content_pieces' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setContentPieces((prev) => [payload.new as ContentPiece, ...prev])
          }

          if (payload.eventType === 'UPDATE') {
            setContentPieces((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? (payload.new as ContentPiece) : item
              )
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  return { contentPieces, loading, error }
}
