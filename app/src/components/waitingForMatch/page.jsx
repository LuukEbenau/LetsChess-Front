import React, { Component } from 'react'

import {Row, Container} from 'react-bootstrap'
import { connect } from 'react-redux'
import { findMatch } from '../../store/matchmaking/matchmaking.actions'
import styles from './page.module.scss'
import {Redirect} from 'react-router-dom'
class Page extends Component {
	state = {
		redirect:null
	}
	constructor(props) {
		super(props)
	}

	componentDidMount(){
		this.props.wsClient.onMatchFound = (matchId) => {
      this.setState({redirect: '/match/' + matchId})
    }
		this.props.findMatch()
	}
	componentWillUnmount(){
		console.debug("unmounting")
		this.props.wsClient.onMatchFound = null
	}
	render() { 
		if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
		return ( 
			<div className="container-fluid">
				<div className={["row", styles.page].join(' ')}>
					Waiting for game...
				</div>
			</div>
		 )
	}
}
 
const mapStateToProps = state => {
  return {
		wsClient: state.game.wsClient
  }
}

function mapDispatchToProps(dispatch) {
  return {
    findMatch: () => dispatch(findMatch()),
  }
} 
const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)

export default ConnectedPage