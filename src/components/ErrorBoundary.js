import React from 'react'

export default class ErrorBoundary extends React.Component {
	state = { hasError: false, e: { } }

	componentDidCatch(error, info) {
		this.setState({ hasError: true, e: { error, info } })
	}

	render() {
		const { hasError, e: { error, info } } = this.state
		if (hasError) {
			return (
				<div id="error">
					<h1>Something went wrong...</h1>
					<pre>
						{error && error.toString()}
						{info.componentStack}
					</pre>
				</div>
			)
		}
		return this.props.children
	}
}