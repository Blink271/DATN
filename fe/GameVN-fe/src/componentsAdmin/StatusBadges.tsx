// componentsAdmin/StatusBadges.tsx
import React from 'react'

interface StatusBadgeProps {
  status: 'pending' | 'completed' | 'canceled'
}

export const OrderStatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    canceled: 'bg-red-100 text-red-800'
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
