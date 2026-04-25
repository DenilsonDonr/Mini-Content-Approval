'use client'

import { Badge } from '@/components/ui/badge'
import type { ContentStatus } from '@/types'

interface StatusBadgeProps {
  status: ContentStatus
}

const statusConfig = {
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
  approved: { label: 'Approved', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
  rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800 hover:bg-red-100' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = statusConfig[status]
  return <Badge className={className}>{label}</Badge>
}
