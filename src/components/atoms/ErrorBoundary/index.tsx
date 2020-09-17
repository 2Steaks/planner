/** @format */

import React, { FunctionComponent } from 'react';

interface ErrorBoundaryProps {
  fallback: FunctionComponent<any>;
  onError?: (error: Error, info: any) => void;
  onReset?: (...xs: any) => void;
}

const initialState = { error: null };

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state: {
    error?: string | null;
  };
  updatedWithError: boolean;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = initialState;
    this.updatedWithError = false;
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  resetErrorBoundary(...args: any) {
    const { onReset } = this.props;

    onReset && onReset(...args);
    this.reset();
  }

  reset() {
    this.updatedWithError = false;
    this.setState(initialState);
  }

  componentDidCatch(error: Error, info: any) {
    const { onError } = this.props;
    onError && onError(error, info);
  }

  render() {
    const { error } = this.state;
    const { fallback: FallbackComponent } = this.props;

    if (error !== null) {
      const props = {
        error,
        resetErrorBoundary: this.resetErrorBoundary
      };

      if (FallbackComponent) {
        return <FallbackComponent {...props} />;
      } else {
        throw new Error('Requires FallbackComponent');
      }
    }

    return this.props.children;
  }
}
