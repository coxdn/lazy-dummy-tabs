import React from 'react'
import Loader from './Loader'

export default class LoadConfig extends React.Component {
	state = { loaded: false }

	getJson(file) {
		// const controller = new AbortController();
		// const signal = controller.signal;
		fetch(file)
			.then(response => response.json())
			.then(json => this.setState({ loaded: true, config: json.sort((a, b) => a.order < b.order ? -1 : 1) }) )
			.catch(e => {
				this.setState({ loaded: true, hasError: true })
			})
	}

	componentDidMount() {
		this.getJson(this.props.configURI)
	}

	render() {
		const { config, hasError, loaded } = this.state
		if (!loaded) return <Loader />
		if (hasError) throw new Error('JSON config parsing error')
		if (!config.length) throw new Error('JSON config is empty')

		const children = React.Children.map(
			this.props.children,
			(child, index) => React.cloneElement(child, { config })
		)

		return children
	}
}