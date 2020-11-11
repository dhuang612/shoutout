import axios from 'axios'

const CREATE_SHOUTOUT = 'CREATE_SHOUTOUT'

const shoutout = {}

const newShoutout = shoutout => ({type: CREATE_SHOUTOUT, shoutout})

export const addShoutout = (name, message, email, from) => async dispatch => {
  try {
    const add = await axios.post('/api/shoutouts/new', {
      name,
      message,
      email,
      from
    })
    console.log(add)
  } catch (error) {
    console.error(error)
  }
}

export default function(state = shoutout, action) {
  switch (action.type) {
    case CREATE_SHOUTOUT:
      return action.shoutout
    default:
      return state
  }
}
