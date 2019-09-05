import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from '../../state/store'
import { addSutra } from '../../state/sutra'
import { Sutra} from '../../state/sutra/types'
import { form } from '../components/Form'

const mapStateToProps = (state: AppState) => {
  return {
    isRedirect: state.sutra.sutras.isRedirect
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addSutra: (sutra: Sutra) => {
      dispatch(addSutra.start(sutra))
    }
  }
}

export const Form = connect(mapStateToProps, mapDispatchToProps)(form)