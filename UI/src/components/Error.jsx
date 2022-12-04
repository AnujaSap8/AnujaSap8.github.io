import React from 'react'


export default class errorBondary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      //log the error to an error reporting service
      errorInfo.log({ error, errorInfo });
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Oops, something went wrong.</h1>;
      }
      return this.props.children; 
    }
  }

