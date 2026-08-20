import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ContainerProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'main'
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return <Tag className={cn('container', className)}>{children}</Tag>
}
