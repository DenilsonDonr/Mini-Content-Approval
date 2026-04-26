# ContentFlow — Mini Content Approval Engine

A full-stack web application that allows content agencies to submit videos for client review and approval. Clients receive a unique shareable link to watch the video and approve or reject it with feedback. The agency dashboard updates in real time.

---

## Features

- **Agency Dashboard** — submit content with title and video URL, view all submissions grouped by status in a kanban-style layout, search by title, and copy shareable client links
- **Client Review Page** — clean public page accessible via unique URL, renders YouTube, Vimeo, or MP4 videos automatically
- **Approve / Reject Flow** — clients can approve or reject content with written feedback; buttons are disabled after submission to prevent duplicates
- **Real-time Updates** — dashboard status changes instantly via Supabase Realtime WebSockets when a client acts, no page refresh needed
- **Video Preview** — agencies can preview videos directly from the dashboard without leaving the page

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase (PostgreSQL) |
| Realtime | Supabase Realtime (WebSockets) |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/DenilsonDonr/Mini-Content-Approval.git
cd Mini-Content-Approval
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

You can find your Supabase credentials in **Project Settings → API**.

### 4. Set up the database

Run the following SQL in your Supabase SQL Editor:

```sql
CREATE TABLE content_pieces (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  feedback TEXT,
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE content_pieces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON content_pieces FOR ALL USING (true);
ALTER PUBLICATION supabase_realtime ADD TABLE content_pieces;
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
/
├── app/
│   ├── page.tsx                    # Agency Dashboard
│   └── review/[token]/page.tsx     # Client Review Page
├── components/
│   ├── ui/                         # shadcn/ui base components
│   ├── ApprovalActions.tsx         # Approve/Reject flow
│   ├── ContentCard.tsx             # Single content card
│   ├── ContentForm.tsx             # New content submission form
│   ├── ContentList.tsx             # Kanban columns with search
│   ├── StatusBadge.tsx             # Status color badge
│   └── VideoPlayer.tsx             # Smart video player
├── hooks/
│   └── useContentPieces.ts         # Realtime data fetching hook
├── lib/
│   └── supabase/client.ts          # Supabase client
└── types/
    └── index.ts                    # TypeScript interfaces
```

---

## AI Tools Used

Built using **Claude Code** as the primary AI coding assistant for architecture decisions, component implementation, Supabase integration, and real-time subscription setup. The UI was designed iteratively using Tailwind CSS with shadcn/ui components, guided through conversation with the AI agent.
