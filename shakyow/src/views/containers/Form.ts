import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../state/store'
import { addSutra, clearContext, Sutra } from '../../state/sutra'
import { _Form } from '../components/Form'

const mapStateToProps = (state: AppState) => {
  return {
    isRedirect: state.sutra.sutras.context.isRedirect
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addSutra: (sutra: Sutra) => {
      dispatch(addSutra.start(sutra))
    },
    clearContext: () => {
      dispatch(clearContext())
    }
  }
}

export const Form = connect(mapStateToProps, mapDispatchToProps)(_Form)