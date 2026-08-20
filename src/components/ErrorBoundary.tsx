import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/Button'

type Props = { children: ReactNode }
type State = { hasError: boolean; message?: string }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  private handleReset = () => {
    this.setState({ hasError: false, message: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-screen container">
          <p className="eyebrow">Something went wrong</p>
          <h1>We hit an unexpected error</h1>
          <p className="lede">{this.state.message || 'Please try again.'}</p>
          <Button onClick={this.handleReset}>Try again</Button>
        </div>
      )
    }

    return this.props.children
  }
}
