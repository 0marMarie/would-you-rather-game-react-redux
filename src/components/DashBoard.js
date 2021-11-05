import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'

const DashBoard = (props) => {

  const { authedUser, users, questions } = props
  
  //Checking if there is an authenticated user to continue
  if (!authedUser) {
    return (
      <Redirect to={{
        pathname: '/login',
        state: props.location
      }} />
    )
  }

  const answers = users[authedUser].answers
  // Getting the answered and unanswered questions needed data
  const answeredQuestion = Object.keys(answers)
  const unansweredQuestion = Object.keys(questions)
    .filter((q) => !answeredQuestion.includes(q))
    
  // Sorting the questions 
  answeredQuestion.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  unansweredQuestion.sort((a, b) => questions[b].timestamp - questions[a].timestamp)

  return (
    <div className="container border w-50 home mt-5 mb-5">
      <div className="text-left">

        <Tabs defaultActiveKey="unanswered" id="uncontrolled-tab-example" 
              className="text-success mb-3 w-100 text-center">
          
          {/* Unanswered Questions Tab */}
          <Tab eventKey="unanswered" title="Unanswered Questions " >
            <ul>
              {unansweredQuestion.map(id => {
                const avatar = users[questions[id].author].avatarURL
                const author = users[questions[id].author].name
                return (
                  <li key={id}>
                    <div className="">
                      <div>
                        <div className="text-left mt-5">
                          <h3 className="text-dark h6 ">{author} asks:</h3>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-4">
                            <div className="mt-5">
                              <img className="" width="100" height="100" alt={`${author} avatar`} src={avatar} />
                            </div>
                          </div>
                          <div className="col-8">
                            <div className="mt-3">
                              <h5 className="text-dark">Would You Rather...</h5>
                              <div className="text-muted ">
                                <p className="h6">{questions[id].optionOne.text}</p>
                                <p className="h6">----------or----------</p>
                                <p className="h6">{questions[id].optionTwo.text}</p>
                              </div>
                              <Link to={{
                                pathname: `/questions/${id}`,
                                state: { pollAnswered: false }
                              }}>
                                <button className="btn btn-outline-success w-100 mt-2">
                                  View
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </Tab>

          {/* Answered Questions Tab */}
          <Tab eventKey="answered" title="Answered Questions">
            <ul>
              {answeredQuestion.map(id => {
                const avatar = users[questions[id].author].avatarURL
                const author = users[questions[id].author].name
                return (
                  <li key={id}>
                    <div className="questions">
                      <div>
                        <div className="text-left mt-5">
                          <h3 className="text-dark h6 ">{author} asks:</h3>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-4">
                            <div className="mt-5">
                              <img className="" width="100" height="100" alt={`${author} avatar`} src={avatar} />
                            </div>
                          </div>
                          <div className="col-8">
                            <div className="mt-3">
                              <h5 className="text-dark">Would You Rather...</h5>
                              <div className="text-muted ">
                                <p className="h6">{questions[id].optionOne.text}</p>
                                <p className="h6">----------or----------</p>
                                <p className="h6">{questions[id].optionTwo.text}</p>
                              </div>
                              <Link to={{
                                pathname: `/questions/${id}`,
                                state: { pollAnswered: false }
                              }}>
                                <button className="btn btn-outline-success w-100 mt-2">
                                  View
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </Tab>
        </Tabs>

      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {users, questions, authedUser} = state
  return (
    {
      users,
      questions,
      authedUser
    }
  )
}

export default connect(mapStateToProps)(DashBoard)