import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {showShoutouts} from '../store'
import './shoutoutList.css'

export class ShoutoutList extends Component {
  componentDidMount() {
    this.props.showAllShoutouts()
  }
  render() {
    const shoutouts = this.props.shoutouts.data
    if (shoutouts !== [] && shoutouts !== undefined) {
      return (
        <div id="shoutouts">
          {shoutouts.length ? (
            shoutouts.map(({id, name, email}) => (
              <div className="shoutout" key={id}>
                <Link
                  className="showOneShoutout"
                  to={`/home/showShoutouts/${id}`}
                >
                  <div>
                    <p>send shoutout to {name}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div id="noShoutouts">
              No shoutouts
              <div className="link">
                <Link className="addShoutout" to="/home/addShoutout">
                  add new shoutout
                </Link>
              </div>
            </div>
          )}
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

const mapState = state => {
  return {
    shoutouts: state.shoutouts
  }
}

const mapDispatch = dispatch => {
  return {
    showAllShoutouts() {
      dispatch(showShoutouts())
    }
  }
}

export default connect(mapState, mapDispatch)(ShoutoutList)
