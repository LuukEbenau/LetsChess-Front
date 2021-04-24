import React, { Component } from 'react'

import {Row, Container} from 'react-bootstrap'
import styles from './matchPage.module.scss'
import Board from '../board'
import ChatWindow from '../chatWindow'
class Page extends Component {
	constructor(props) {
		super(props)
	}

	render() { 
		return ( 
      <div className="container-fluid">
				<div className="row">
					<div className="col-9">
						<div className="card">
							<div className="card-body">
								<Board cols={8} rows={8}></Board>
							</div>	
						</div>
					
					</div>
					<div className="col-3">
						<div className="card">
							<div className="card-body">
								historybar
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="card">
							<ChatWindow></ChatWindow>
						</div>
					</div>
				</div>
      </div>
		 )
	}
}
 
export default Page