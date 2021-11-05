import { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

const Signin = (props) => {

  const { location, users, dispatch } = props

  // Set the authed user to empty string
  const [authedUser, setLogin] = useState('')
  const [dashboard, setDashboard] = useState(false)

  // Set the authed user based on his selection
  const handleChangeUser = (evt) => {
    setLogin(evt.target.value)
    setDashboard(false)
  }

  // login to see the dashboard
  const handleSubmit = evt => {
    evt.preventDefault()
    if (!authedUser) {
      setLogin(props?.users[0]?.id)
    }

    dispatch(setAuthedUser(authedUser))
    setLogin(authedUser)
    setDashboard(true)
  }

  if (dashboard)
    return ( <Redirect to={location.state} />)

  return (
    <div className="container border bg-light w-50 mt-5">
      <div className="text-center pt-3">
        <h5 className="text-dark">Welcome To The Would You Rather App!</h5>
        <p className="text-muted">Please sign in to continue...</p>
      </div>
      <hr />
      <form className="">
        <div className="text-center">
          <img src='would_u_rather.png' width='300' height='200' />
        </div>
        <h3 className="text-success text-center signin mt-4">Sign in</h3>
        <select id="choose" className="form-select mt-3" onChange={handleChangeUser}>
          <option value="" disabled selected hidden className="text-mueted">Select User</option>
          {users.map((user) => (
            <option value={user.id} key={user.id} >
              {user.name}
            </option>
          ))}
        </select>
        <button className="btn btn-lg btn-success w-100 mt-3 mb-4" onClick={handleSubmit}>
          Sign in
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = ({ users, authedUser }) => (
  {
    users: Object.keys(users).map(id => {
      return {
        id: users[id]['id'],
        name: users[id]['name']
      }
    }),
    authedUser
  }
)

export default connect(mapStateToProps)(Signin)