'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function ContentForm() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase
      .from('content_pieces')
      .insert({ title, video_url: videoUrl })

    if (error) {
      setError(error.message)
    } else {
      setTitle('')
      setVideoUrl('')
      setOpen(false)
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#ffca0c] hover:bg-[#e6b600] text-[#212121] font-semibold">
          Nuevo contenido
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden">
        <div className="bg-[#212121] px-6 py-5">
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-semibold">Nuevo contenido</DialogTitle>
            <p className="text-gray-400 text-sm mt-1">Completá los datos para enviar el contenido al cliente.</p>
          </DialogHeader>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-[#212121]">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Video campaña verano"
              className="rounded-lg border-gray-200 focus-visible:ring-[#ffca0c]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="video_url" className="text-sm font-medium text-[#212121]">URL del video</Label>
            <Input
              id="video_url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="YouTube, Vimeo o MP4"
              className="rounded-lg border-gray-200 focus-visible:ring-[#ffca0c]"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ffca0c] hover:bg-[#e6b600] text-[#212121] font-semibold rounded-lg"
          >
            {loading ? 'Enviando...' : 'Enviar contenido'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
