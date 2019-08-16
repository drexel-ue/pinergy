import { connect } from 'react-redux'
import{withRouter}from 'react-router-dom'
import Pin from './pin'

const msp = ({ session }, ownProps) => ({
    currentUser: session.user.id,
    pin: ownProps.pin
})

const mdp = dispatch => ({})

export default withRouter(connect(msp,mdp)(Pin))