import React, { Component } from 'react'

import {Row, Container} from 'react-bootstrap'
import styles from './page.module.scss'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

import {loginSuccess } from '../../store/authentication/index'
class Page extends Component {
	state = {
		
	}
	constructor(props) {
		super(props)
		
	}
	componentDidMount(){
		var queryParams = new URLSearchParams(this.props.location.hash.slice(1))
		for(let param of queryParams){
			console.log(param[0]+ " : " + param[1])
		}
		let newState ={
			access_token: queryParams.get("access_token"),
			token_type: queryParams.get("token_type"),
			expires_in: queryParams.get("expires_in"),
			scope: queryParams.get("scope"),
		}
		console.debug(newState.access_token)
		this.props.loginSuccess(newState)

		// this.setState(newState)
	}
	render() { 
		return ( 
			<Redirect to="/"></Redirect>
      // <div>
				
			// 	<p>access_token:{this.props.accessToken}</p>
			// 	{/* <p>token_type:{this.state.token_type}</p>
			// 	<p>expires_in:{this.state.expires_in}</p>
			// 	<p>scope:{this.state.scope}</p> */}
      // </div>
		 )
	}
}
const mapStateToProps = state => {
  return {
    loginSuccess: state.auth.loginSuccess,
		accessToken: state.auth.accessToken
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginSuccess: ({access_token, token_type, expires_in, scope}) => dispatch(loginSuccess(access_token,token_type,expires_in,scope)),
  }
} 
const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)



export default ConnectedPage