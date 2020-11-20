import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import './user-home.css'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const {invited} = props
  if (invited) {
    return (
      <div>
        <h3 id="greeting">Welcome, {email}</h3>
        <div id="options">
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
          <div>
            <Link to="/home/showShoutouts">show shoutouts list</Link>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div>
          <h3>Welcome, {email}</h3>
        </div>
        <Link to="/home/addShoutout">create a new shoutout</Link>
        <div>
          {' '}
          <Link to="/home/showShoutouts">show shoutouts list</Link>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    invited: state.user.flag
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
