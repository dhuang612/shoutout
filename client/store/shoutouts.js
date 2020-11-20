import axios from 'axios'
import history from '../history'

const CREATE_SHOUTOUT = 'CREATE_SHOUTOUT'

const GET_SHOUTOUTS = 'GET_SHOUTOUTS'

const GET_SINGLE_SHOUTOUT = 'GET_SINGLE_SHOUTOUT'
const shoutout = {}

const getShoutouts = shoutouts => ({type: GET_SHOUTOUTS, shoutouts})

const newShoutout = shoutout => ({type: CREATE_SHOUTOUT, shoutout})

const getSingleShoutout = shoutout => ({
  type: GET_SINGLE_SHOUTOUT,
  shoutout
})

export const addShoutout = (name, message, email, from) => async dispatch => {
  try {
    const add = await axios.post('/api/shoutouts/new', {
      name,
      message,
      email,
      from
    })
    if (add.data) {
      history.push('/home/showShoutouts')
    }
  } catch (error) {
    console.error(error)
  }
}

export const showShoutouts = id => async dispatch => {
  try {
    const allShoutouts = await axios.get('/api/shoutouts/showAllShoutouts', {
      id
    })
    dispatch(getShoutouts(allShoutouts))
  } catch (error) {
    console.error(error)
  }
}

export const showSingleShoutout = id => async dispatch => {
  try {
    const shoutoutToFind = await axios.get(`/api/shoutouts/${id}`)
    if (shoutoutToFind) {
      dispatch(getSingleShoutout(shoutoutToFind))
    }
  } catch (error) {
    console.error(error)
  }
}

export const sendShoutouts = (email, msg, name) => async dispatch => {
  try {
    const shoutoutToSend = await axios.post('/api/shoutouts/send', {
      email,
      msg,
      name
    })
    console.log(shoutoutToSend)
  } catch (error) {
    console.error(error)
  }
}

export default function(state = shoutout, action) {
  switch (action.type) {
    case CREATE_SHOUTOUT:
      return action.shoutout
    case GET_SHOUTOUTS:
      return action.shoutouts
    case GET_SINGLE_SHOUTOUT:
      return action.shoutout
    default:
      return state
  }
}
