import React from 'react'
import loader from '../../assets/loader.svg'

export default function Loader() {
	return <div id="loader">
			<img src={loader} alt=""/>
			<div>Loading... Please wait.</div>
		</div>
}