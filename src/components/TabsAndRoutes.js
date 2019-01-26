import React, { Suspense, lazy, Fragment } from 'react'
import { Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { createBrowserHistory } from 'history'
import Loader from './Loader'
import "react-tabs/style/react-tabs.css"

// History we need to add a new URI to the address bar of browser.
// This allows to dynamically change the URL, without refreshing the page
const history = createBrowserHistory()

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = { tabIndex: 0 }
	}

	WaitingComponent = name => lazy(() => import(`./${name}`))
	
	Lazy(name) {
		const Component = this.WaitingComponent(name)
		return props => (
			<Suspense fallback={<Loader />}>
				<Component {...props} />
			</Suspense>
		)
	}

	// getting tab info by current URL or by "id"
	getTabData(id = 'current') {
		let index = -1, defaultId = '';
		const currentpath = history.location.pathname.substr(1)
		// get the item we are looking for or empty object
		const tabInfo = this.props.config.find((item, i) => {
			index = i
			return id == 'current' ? item.id == currentpath : i == id
		}) || {}
		return { id: defaultId, ...tabInfo, index }
	}

	// fires when we click on any tab
	onTabChange = tabIndex => {
		// update browser address bar according to selected tab
		history.push('/' + this.getTabData(tabIndex).id)
		this.setState({ tabIndex })
	}

	componentDidMount() {
		const tabIndex = this.getTabData().index
		// if found index then set it to the state
		if (tabIndex > -1) this.setState({ tabIndex })
	}

	render() {
		const { config } = this.props
		if (!config) return <Loader />

		return  (
			<Router history={history}>
				<Switch>
					<Fragment>
						<Tabs selectedIndex={this.state.tabIndex} onSelect={this.onTabChange} >
							{ config[0]
									&& config[0].id
									&& <Route path="/" exact render={ () => <Redirect to={`/${config[0].id}`} /> } /> }
								<TabList>
									{ config.map(item => <Tab key={item.id}>{item.title}</Tab>) }
								</TabList>
									{ config.map(item => (
										<TabPanel key={item.id}>
											<Route path={`/${item.id}`} component={this.Lazy(item.path)} />
										</TabPanel> )) }
						</Tabs>
					</Fragment>
				</Switch>
			</Router>
		)
	}
}