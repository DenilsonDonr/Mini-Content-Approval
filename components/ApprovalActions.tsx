'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ApprovalActionsProps {
  token: string
}

export function ApprovalActions({ token }: ApprovalActionsProps) {
  const [submitted, setSubmitted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleApprove() {
    setLoading(true)
    await supabase
      .from('content_pieces')
      .update({ status: 'approved' })
      .eq('token', token)
    setSubmitted(true)
    setLoading(false)
  }

  async function handleReject() {
    if (!feedback.trim()) return
    setLoading(true)
    await supabase
      .from('content_pieces')
      .update({ status: 'rejected', feedback })
      .eq('token', token)
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <p className="text-center text-muted-foreground">
        Gracias por tu respuesta. Tu decisión ha sido registrada.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {!showFeedback ? (
        <div className="flex gap-4 justify-center">
          <Button onClick={handleApprove} disabled={loading} className="bg-green-600 hover:bg-green-700">
            ✅ Aprobar
          </Button>
          <Button onClick={() => setShowFeedback(true)} disabled={loading} variant="destructive">
            ❌ Rechazar
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Escribe tu comentario de rechazo..."
            rows={4}
          />
          <div className="flex gap-3 justify-center">
            <Button onClick={handleReject} disabled={loading || !feedback.trim()} variant="destructive">
              {loading ? 'Enviando...' : 'Confirmar rechazo'}
            </Button>
            <Button onClick={() => setShowFeedback(false)} disabled={loading} variant="outline">
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
