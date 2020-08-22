import React from 'react'
import {ErrorImageContainer, ErrorImageOverlay, ErrorImageText} from "./error-boundary.styles";
import Header from "../header/header.component";

class ErrorBoundary extends React.Component {
    constructor() {
        super();
        this.state = {hasErrored: false}
    }
    static getDerivedStateFromError(error) {
        // process the error
        return {hasErrored: true}
    }

    componentDidCatch(error, errorInfo) {
        console.log(error)
    }

    render() {
        if(this.state.hasErrored) {
            return (
                <>
                    <Header />
                    <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl="https://i.imgur.com/WvEu0cO.png"/>
                    <ErrorImageText>Sorry this page is broken</ErrorImageText>
                </ErrorImageOverlay>
                </>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary
