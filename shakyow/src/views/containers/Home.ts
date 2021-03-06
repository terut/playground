import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../state/store'
import { fetchSutras, clearContext } from '../../state/sutra'
import { logout } from '../../state/current_user'
import { _Home } from '../components/Home'

const mapStateToProps = (state: AppState) => {
  return {
    sutras: state.sutra.sutras.sutras
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchSutras: () => {
      dispatch(fetchSutras.start())
    },
    clearContext: () => {
      dispatch(clearContext())
    },
    logout: () => {
      dispatch(logout())
    }
  }
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)