import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Launch</Button>)
    expect(screen.getByRole('button', { name: 'Launch' })).toBeInTheDocument()
  })

  it('supports the secondary variant', () => {
    render(<Button variant="secondary">Details</Button>)
    expect(screen.getByRole('button', { name: 'Details' })).toHaveClass('btn-secondary')
  })
})
