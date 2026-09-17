import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
    
    // If it's a dynamic import failure (like Vite HMR crash or chunk failure), auto-reload.
    // This perfectly prevents the "black screen error" you get on HMR restarts!
    const isChunkLoadFailed = error.name === 'ChunkLoadError' || 
                              error.message.includes('Failed to fetch dynamically imported module');
                              
    if (isChunkLoadFailed) {
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '50px', background: '#220000', color: '#ffaaaa', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2>Application Error</h2>
          <p>Something went wrong in the React component tree.</p>
          <pre>{this.state.error?.toString()}</pre>
          <pre style={{ fontSize: '12px', marginTop: '20px' }}>{this.state.errorInfo?.componentStack}</pre>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
