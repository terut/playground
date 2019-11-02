import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../state/store'
import { subscribePresence, unsubscribePresence, updatePresence, Presence } from '../../state/presence'
import { _Presence } from '../components/Presence'

const mapStateToProps = (state: AppState) => {
  return {
    presences: state.presence.presences.presences
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    subscribePresence: (presence: Presence) => {
      dispatch(subscribePresence(presence))
    },
    unsubscribePresence: (presence: Presence) => {
      dispatch(unsubscribePresence(presence))
    },
    updatePresence: (presence: Presence) => {
      dispatch(updatePresence.start(presence))
    }
  }
}

export const PresenceScreen = connect(mapStateToProps, mapDispatchToProps)(_Presence)