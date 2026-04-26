import { ContentList } from '@/components/ContentList'
import { ContentForm } from '@/components/ContentForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#ffca0c] px-6 py-4 flex items-center justify-between shadow-sm">
        <span className="text-[#212121] text-2xl font-bold tracking-tight">ContentFlow</span>
        <ContentForm />
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <ContentList />
      </main>
    </div>
  )
}
