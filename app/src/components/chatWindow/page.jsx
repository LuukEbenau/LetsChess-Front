import React, { Component } from 'react'

import {Row, Container} from 'react-bootstrap'
import styles from './page.module.scss'
class Page extends Component {
	constructor(props) {
		super(props)
	}

	render() { 
		return ( 
			<div className="container-fluid">
      <div className={styles.chat}>
        <div className={styles.chatwindow}>
					<div className={styles.messages}>
						<div className={styles.message}>
							<span className={styles.messageUsername}>Sacation: </span>
							<span className={styles.messageText}>Good luck have fun!</span>
						</div>

						<div className={styles.message}>
							<span className={styles.messageUsername}>Enemy: </span>
							<span className={styles.messageText}>Nah good luck, you will need it. but i will not make it fun...</span>
						</div>
					</div>

					<div className="typebox">
						<div className="input-group mb-3">
							<input type="text" className={["form-control", "bg-dark","text-light",styles.chatInput].join(' ')} placeholder="" id="message"/>
							<div className="input-group-append">
								<button type="submit" className="btn btn-secondary">Send</button>
							</div>
						</div>
					</div>
				</div>
      </div>
			</div>
		 )
	}
}
 
export default Page