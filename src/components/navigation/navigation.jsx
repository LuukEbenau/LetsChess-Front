import React, { Component } from 'react'

import {Row, Container} from 'react-bootstrap'
import styles from './navigation.module.scss'
class Page extends Component {
	constructor(props) {
		super(props)
	}

	render() { 
		return ( 
      <div className={styles.sidenav}>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#clients">Clients</a>
        <a href="#contact">Contact</a>
      </div>
		 )
	}
}
 
export default Page