import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Result from './Result'
import Poll from './Poll'

const Question = (props) => {
  const { pollAnswered, questions_id, location } = props

  // Handle err if question id does not exist
  if (!questions_id) {
    return (
      <Redirect to={{
        pathname: '/error',
        state: location
      }} />
    )
  }

  return (
    <div>
      {/* if the user answered the question ? view the result component */}
      { pollAnswered 
        && (<Result id={questions_id} />)}
      {!pollAnswered 
        && (<Poll id={questions_id} />)}
    </div>
  )
}

const mapStateToProps = ({ users, authedUser }, props) => {
  // if there is no authednticated user redicrect to login page
  if (!authedUser)
    return (<Redirect to={'/login'} />)
  
  // the question id to the answered poll 
  const { questions_id } = props.match.params
  let pollAnswered = Object.keys(users[authedUser].answers)
    .includes(questions_id)

  return {
    questions_id,
    pollAnswered
  }
}

export default connect(mapStateToProps)(Question)