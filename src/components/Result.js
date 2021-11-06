import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function Result (props) {

  const { users, authedUser, id, questions } = props
  
  // Retreive a Specific User Answer
  const answer = users[authedUser].answers[id]
  const answerText = questions[id][answer].text
  console.log(id, authedUser)

  // Checking the id and if there is an authenticated user already.
  if (!authedUser)
    return (<Redirect to='/login' />)

  if (!id)
    return (<Redirect to='/error' />)


  // Get the sum of first option, second option and the Total Votes
  const optionOne = questions[id].optionOne
  const optionTwo = questions[id].optionTwo
  const sumVotes = optionOne.votes.length + optionTwo.votes.length

  const author = users[questions[id].author]
  console.log(author)
  const authorName = author.name
  const authorAvatar = author.avatarURL

  return (

    <div className="container w-50 border mt-5 p-3">
      <div className="text-left pt-3 px-3">
        <h3 className="text-dark h6 "> Asked by {authorName}</h3>
        <hr />
      </div>
      <div className="row p-4">
        <div className="col-4">
          <div className="mt-5 pt-5">
            <img className="" width="140" height="140"
              alt={`${authorName} avatar`}
              src={authorAvatar}
            />
          </div>
        </div>
        <div className="col-8">
          <h4 className="text-dark">Results: </h4>
          <div className="border bg-light pt-3 px-4 question mt-3">
            <p className="text-success">
              Would you rather {optionOne.text} ?
            </p>
            <div className="progress" style={{ height: "30px", fontSize: "15px" }}>
              <div className="progress-bar bg-success" role="progressbar"
                style={{
                  width: `${(optionOne.votes.length / sumVotes) * 100}%`
                }}
                aria-valuenow={(optionOne.votes.length / sumVotes) * 100}
                aria-valuemin="0"
                aria-valuemax="100"> {((optionOne.votes.length / sumVotes) * 100).toFixed(2)} %
              </div>
            </div>
            <p className="text-dark text-center mt-1">
              {optionOne.votes.length} out of {sumVotes} Votes
            </p>
            { answerText === optionOne.text
              ? <p className="p-2">
                <img src="/answer.png" width="20" alt="answer" height="20" />
                <span className="text-secondary"> your answer! </span>
              </p>
              : ''
            }
          </div>

          <div className="border bg-light pt-3 px-4 question mt-3">
            <p className="text-success">
              Would you rather {optionTwo.text} ?
            </p>
            <div className="progress" style={{ height: "30px", fontSize: "15px" }}>
              <div className="progress-bar bg-success" role="progressbar"
                style={{
                  width: `${(optionTwo.votes.length / sumVotes) * 100}%`
                }}
                aria-valuenow={(optionTwo.votes.length / sumVotes) * 100}
                aria-valuemin="0"
                aria-valuemax="100"> {((optionTwo.votes.length / sumVotes) * 100).toFixed(2)} %
              </div>
            </div>
            <p className="text-dark text-center mt-1">
              {optionTwo.votes.length} out of {sumVotes} Votes
            </p>
            {answerText === optionTwo.text
              ? <p className="p-2">
                <img src="/answer.png" alt="answer" width="20" height="20" />
                <span className="text-secondary"> your answer! </span>
              </p>
              : ''
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ questions, users, authedUser }) => (
  {
    authedUser,
    questions,
    users
  }
)

export default connect(mapStateToProps)(Result);