import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../state/store'
import { login, CurrentUser } from '../../state/current_user'
import { _Login } from '../components/Login'

const mapStateToProps = (state: AppState) => {
  return {
    isLoggedIn: !!state.currentUser.currentUser.currentUser
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    login: (user: CurrentUser) => {
      dispatch(login(user))
    }
  }
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)