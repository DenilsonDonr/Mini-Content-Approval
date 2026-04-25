import { ContentList } from '@/components/ContentList'
import { ContentForm } from '@/components/ContentForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">ContentFlow</h1>
        <ContentForm />
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-lg font-semibold mb-6">Contenido enviado</h2>
        <ContentList />
      </main>
    </div>
  )
}
