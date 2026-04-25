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
      <div className="text-center py-4 space-y-1">
        <p className="text-[#212121] font-semibold text-base">¡Gracias por tu respuesta!</p>
        <p className="text-gray-400 text-sm">Tu decisión ha sido registrada correctamente.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {!showFeedback ? (
        <div className="space-y-3">
          <p className="text-sm text-gray-500 text-center mb-2">¿Qué te parece este contenido?</p>
          <div className="flex gap-3">
            <Button
              onClick={handleApprove}
              disabled={loading}
              className="flex-1 bg-[#ffca0c] hover:bg-[#e6b600] text-[#212121] font-semibold rounded-xl h-12"
            >
              ✅ Aprobar
            </Button>
            <Button
              onClick={() => setShowFeedback(true)}
              disabled={loading}
              variant="outline"
              className="flex-1 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 font-semibold rounded-xl h-12"
            >
              ❌ Rechazar
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-[#212121]">¿Por qué rechazás este contenido?</p>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Describí los cambios que necesitás..."
              className="rounded-xl border-gray-200 focus-visible:ring-[#ffca0c] resize-none"
              rows={4}
            />
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleReject}
              disabled={loading || !feedback.trim()}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl h-12"
            >
              {loading ? 'Enviando...' : 'Confirmar rechazo'}
            </Button>
            <Button
              onClick={() => setShowFeedback(false)}
              disabled={loading}
              variant="outline"
              className="flex-1 rounded-xl h-12"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
