import React, { Component } from 'react'

import {Row, Container} from 'react-bootstrap'
import { connect } from 'react-redux'
import styles from './page.module.scss'
class Page extends Component {
	constructor(props) {
		super(props)
	}

	render() { 
		return ( 
			<div className="container-fluid">
				<div className={["row", styles.page].join(' ')}>
					<div className="col-7">
						<div className={["card", styles.mainBlock].join(' ')}>
				
						</div>
					</div>
					<div className="col-5 align-items-stretch">
							<div className={["card", styles.homeBlock].join(' ')}>
								<div className={styles.profileBox}>
									<img className={styles.profilePicture} src={this.props.profilePicture}></img>
									<h3 className={styles.profileName}>{this.props.username}</h3>
									<div style={{"clear":"both"}}></div>
								</div>
							</div>
							<div className={["card", styles.homeBlock].join(' ')}>
								card2
							</div>
							<div className={["card", styles.homeBlock].join(' ')}>
								card 3
							</div>

					</div>
				</div>
			</div>
		 )
	}
}
 
const mapStateToProps = state => {
  return {
    username: state.auth.userInfo.name,
		profilePicture: state.auth.userInfo.picture
  }
}

const ConnectedPage = connect(
  mapStateToProps,
  null
)(Page)

export default ConnectedPage