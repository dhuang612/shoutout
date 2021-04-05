import React, {Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import {connect} from 'react-redux'
import {sendInviteEmail, showSingleEmail} from '../store'

class SingleEmail extends Component {
  constructor() {
    super()
    this.state = {
      show: true
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.displaySingleEmail(id)
  }
  handleClose() {
    this.setState({show: !this.state.show})
    this.props.history.push('/home/showEmails')
  }
  handleSubmit() {
    if (this.props) {
      let firstNameOfPerson = this.props.email.data.firstName
      let emailAddresOfPerson = this.props.email.data.email
      this.props.sendOutEmailInvite(firstNameOfPerson, emailAddresOfPerson)

      this.props.history.push('/home/showEmails')
    }
  }

  render() {
    let emailToShow = ''
    let nameToShow = ''
    if (this.props) {
      emailToShow = this.props.email.data.email
      nameToShow = this.props.email.data.firstName
    }

    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm sending invite email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{nameToShow}</div>
            <div>{emailToShow}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              send invite
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

const mapState = state => {
  return {
    email: state.emails
  }
}

const mapDispatch = dispatch => {
  return {
    displaySingleEmail: id => dispatch(showSingleEmail(id)),
    sendOutEmailInvite: (firstName, email) =>
      dispatch(sendInviteEmail(firstName, email))
  }
}

export default connect(mapState, mapDispatch)(SingleEmail)
