import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../state/store'
import { _Auth } from '../components/Auth'

const mapStateToProps = (state: AppState) => {
  return {
    isLoggedIn: !!state.currentUser.currentUser.currentUser
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {}
}

export const Auth = connect(mapStateToProps, mapDispatchToProps)(_Auth)