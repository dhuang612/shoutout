import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <div>
        <div>
          {' '}
          <Link to="/home/addEmail">add new emails</Link>
        </div>
        <div>
          <Link to="/home/addShoutout">create a new shoutout</Link>
        </div>
        <div>
          <Link to="/home/showEmails">show email list</Link>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
