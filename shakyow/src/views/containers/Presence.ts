import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../state/store'
import { subscribePresence, unsubscribePresence, Subscription } from '../../state/presence'
import { _Presence } from '../components/Presence'

const mapStateToProps = (state: AppState) => {
  return {
    presences: state.presence.presences.presences
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    subscribePresence: (subscription: Subscription) => {
      dispatch(subscribePresence(subscription))
    },
    unsubscribePresence: (subscription: Subscription) => {
      dispatch(unsubscribePresence(subscription))
    }
  }
}

export const Presence = connect(mapStateToProps, mapDispatchToProps)(_Presence)