import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Ranking from './Ranking';

const LeaderBoard = (props) => {

  const { authedUser, location } = props;

  // Checking if there is no user authenticated
  if (!authedUser) {
    return (
      <Redirect to={{
        pathname: '/login',
        state: location
      }} />
    )
  }

  return (
    <div className="container w-50 mt-5">
      <ul className="">
        {Ranking(props).map(user => (
          <li key={user.name} className="mb-3">
            <div className="row p-3 border">
              <div className="col-3 mt-4 border-end">
                <img width="80" height="80"
                  alt={user.name}
                  src={user.avatar} />
              </div>
              <div className="col-6 px-4 border-end">
                <h4>{user.name}</h4>
                <p className="h6 text-muted mt-4">Answered Questions {user.answers}</p>
                <hr />
                <p className="h6 text-muted">Created Questions {user.questions}</p>
              </div>
              <div className="col-3 px-4 text-center">
                <p className="text-dark h5 mb-4 pb-2">Score</p>
                <span className="bg-success text-white px-3 py-2 rounded-circle h4">{user.score}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ users, authedUser }) => (
  {
    users,
    authedUser
  }
)

export default connect(mapStateToProps)(LeaderBoard)