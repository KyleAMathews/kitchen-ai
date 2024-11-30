import { Link } from "@tanstack/react-router"
import { Button } from "@radix-ui/themes"
import * as React from "react"

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const [showError, setShowError] = React.useState(process.env.NODE_ENV === 'development')

  return (
    <div id="error-page" style={{ padding: 20 }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={() => setShowError(s => !s)}>
          {showError ? 'Hide' : 'Show'} Error
        </Button>
        {' '}
        <Button onClick={() => reset()}>
          Try Again
        </Button>
      </div>
      {showError && (
        <p style={{ 
          padding: 16, 
          background: '#f7f7f7', 
          borderRadius: 4,
          whiteSpace: 'pre-wrap'
        }}>
          {error.message}
          {error.stack && '\n\n' + error.stack}
        </p>
      )}
      <div style={{ marginTop: 16 }}>
        <Link to="/">Return Home</Link>
      </div>
    </div>
  )
}
