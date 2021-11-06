import { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { handleSaveAnswerQuestion } from '../actions/questions'

const Poll = (props) => {

  const { users, id, questions, authedUser, dispatch, location } = props
  const [poll, setPoll] = useState('')

  // if the questions id doesn't exist in users questions --FIX
  if (!questions[id])
    return (<Redirect to={{
      pathname: '/error',
      state: location,
    }} />)

  const name = users[questions[id].author].name 
  const avatar = users[questions[id].author].avatarURL

  // Trigger the user answer selection
  const handleChange = e => {
    setPoll(e.target.value)
  }

  // Save the Answer of the Question
  const handleSubmit = evt => {
    evt.preventDefault()
    setPoll(evt.target.value)
    dispatch(handleSaveAnswerQuestion({
      authedUser,
      qid: questions[id].id,
      answer: poll
    }))
  }

  return (
    <div className="container w-50 border mt-5 p-3">
      <div className="text-left pt-3 px-3">
        <h3 className="text-dark h6 ">{name} asks:</h3>
        <hr />
      </div>
      <div className="row p-4">
        <div className="col-4">
          <div className="mt-2">
            <img className="" width="140" height="140" alt={`${name} avatar`} src={avatar} />
          </div>
        </div>
        <div className="col-8">
          <form className="mt-3" onChange={handleChange}>
            <h5 className="text-dark mb-3">Would You Rather...</h5>
            <div className="form-check">
              <input className="form-check-input" type='radio' name='vote' value='optionOne' id='one' onChange={handleChange} />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                {questions[id].optionOne.text}
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type='radio' name='vote' value='optionTwo' id='two' onChange={handleChange} />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                {questions[id].optionTwo.text}
              </label>
            </div>
          </form>
          <button className="btn btn-success mt-3 w-100" 
                  type="submit" 
                  onClick={handleSubmit} 
                  disabled={ poll === ''}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ questions, users, authedUser }) => (
  {
    questions,
    users,
    authedUser,
  }
)

export default connect(mapStateToProps)(Poll)