import { connect } from 'react-redux'
import{withRouter}from 'react-router-dom'
import Pin from './pin'

const msp = ({ session, entities }, ownProps) => ({
    user: (session.isAuthenticated ? entities.users[session.user.id] : {}),
    pin: ownProps.pin
})

const mdp = dispatch => ({})

export default withRouter(connect(msp,mdp)(Pin))