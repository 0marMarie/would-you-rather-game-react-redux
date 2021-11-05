import { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

const NewQuestion = (props) => {

  const { dispatch, authedUser, location } = props

  const [optionOne, setOptionOne] = useState('')
  const [optionTwo, setOptionTwo] = useState('')
  const [newQuestion, setNewQuestion] = useState(false)

  // Getting the value of option one input
  const handleOptionOne = evt => {
    evt.preventDefault();
    setOptionOne(evt.target.value)
  }

  // Getting the value of option two input
  const handleOptionTwo = evt => {
    evt.preventDefault();
    setOptionTwo(evt.target.value)
  }

  // Save the added question 
  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(handleAddQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    }))
    setOptionOne('')
    setOptionTwo('')
    setNewQuestion(true)
  }

  if (newQuestion)
    return (<Redirect to={'/'} />)

  if (!authedUser)
    return (
      <Redirect to={{
        pathname: '/login',
        state: location,
      }} />
    )

  return (
    <div className="container w-50 mt-5">
      <form className="border p-4">
        <div>
          <h3 className="text-center">
            Create New Question
          </h3>
          <hr />
          <h6 className="text-muted mb-4">
            Complete the question
          </h6>
        </div>
        <label className="form-label h4 mb-4">Would You rather... ? </label>
        <div className="mb-3">
          <input type="text" className="form-control"
            aria-describedby="textForOptionOne"
            placeholder="Enter Option One Text Here"
            onChange={handleOptionOne} />
        </div>
        <div className="hr-text">
          <hr />
          <span className="text-muted">Or</span>
        </div>
        <div class="mb-3">
          <input type="text"
            className="form-control" placeholder="Enter Option Two Text Here"
            onChange={handleOptionTwo} />
        </div>
        <button type="submit"
          className="btn btn-success w-100"
          disabled={optionOne === '' || optionTwo === ''}
          onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

const mapStateToProps = ({ authedUser }) => (
  {
    authedUser
  }
)

export default connect(mapStateToProps)(NewQuestion)