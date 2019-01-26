import React, { Component } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import LoadConfig from './components/LoadConfig'
import TabsAndRoutes from './components/TabsAndRoutes'
import './App.scss'

// path to tabs.json which will be loaded from "public" folder
const configURI = '/tabs.json'

class App extends Component {
	render() {
		return (
			<ErrorBoundary>
				<LoadConfig configURI={configURI}>
					<TabsAndRoutes />
				</LoadConfig>
			</ErrorBoundary>
		)
	}
}

export default App