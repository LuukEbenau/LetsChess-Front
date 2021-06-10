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
			id_token: queryParams.get("id_token"),
			access_token: queryParams.get("access_token"),
			token_type: queryParams.get("token_type"),
			expires_in: queryParams.get("expires_in"),
			scope: queryParams.get("scope"),
		}
		console.debug(newState.id_token)
		this.props.loginSuccess(newState)
	}
	render() { 
		return ( 
			<Redirect to="/"></Redirect>
		 )
	}
}
const mapStateToProps = state => {
  return {
    loginSuccess: state.auth.loginSuccess
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginSuccess: ({token_type, expires_in, scope, id_token}) => dispatch(loginSuccess(id_token,expires_in,scope)),
  }
} 
const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)



export default ConnectedPage