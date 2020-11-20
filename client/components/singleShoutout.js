import React, {Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import {connect} from 'react-redux'
import {showSingleShoutout, sendShoutouts} from '../store'

class SingleShoutout extends Component {
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
    this.props.displaySingleShoutout(id)
  }
  handleClose() {
    this.setState({show: !this.state.show})
    this.props.history.push('/home/showShoutouts')
  }
  handleSubmit() {
    if (this.props) {
      let emailAddress = this.props.shoutout.data.email
      let msg = this.props.shoutout.data.message
      let name = this.props.shoutout.data.name
      this.props.sendShoutout(emailAddress, msg, name)
    }
    // setTimeout(() => {
    //   this.props.history.push('/home/showShowouts')
    // }, 2000)
  }

  render() {
    let name = ''
    let msg = ''
    let email = ''
    if (this.props) {
      name = this.props.shoutout.data.name
      msg = this.props.shoutout.data.message
      email = this.props.shoutout.data.email
    }
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm sending shoutout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{name}</div>
            <div>{msg}</div>
            <div>{email}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              send shoutout
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

const mapState = state => {
  return {
    shoutout: state.shoutouts
  }
}

const mapDispatch = dispatch => {
  return {
    displaySingleShoutout: id => dispatch(showSingleShoutout(id)),
    sendShoutout: (email, msg, name) =>
      dispatch(sendShoutouts(email, msg, name))
  }
}

export default connect(mapState, mapDispatch)(SingleShoutout)
