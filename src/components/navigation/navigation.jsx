import React, { Component } from 'react'

import {Row, Container} from 'react-bootstrap'
import styles from './navigation.module.scss'
import {Link, Redirect} from 'react-router-dom'
import logo from '../../images/logo-letschess.png'
import { connect } from 'react-redux'
import {API_ENDPOINT} from '../../applicationSettings'

class Page extends Component {
	state = {
		redirectToAuth: false
	}
	constructor(props) {
		super(props)
	}

	render() { 
		if(this.state.redirectToAuth){
			window.location.href = `${API_ENDPOINT}/api/auth/redirectToIdentity?redirectUrl=${window.location.href}auth/redirected`
		}
		return ( 

				
				<div className={styles.sidenav}>
					<Link className={styles.logoWrap} to="/"><img className={styles.logo} src={logo}></img></Link>
					<Link className={styles.menuItem} to="/">Home</Link>
					{this.props.isLoggedIn? <Link className={styles.menuItem} to="/people">People</Link>: null}
					{this.props.isLoggedIn? <Link className={styles.menuItem} to="/play">Play</Link>: null}
					{!this.props.isLoggedIn? <a><button className={[styles.loginButton].join(' ')} onClick={()=>this.setState({redirectToAuth:true})}>Login</button></a>: null}
				</div>

		 )
	}
}
 
const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
		accessToken: state.auth.accessToken
  }
}


const ConnectedPage = connect(
  mapStateToProps,
  null
)(Page)


export default ConnectedPage