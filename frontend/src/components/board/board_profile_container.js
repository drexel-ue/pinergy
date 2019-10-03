import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfileHead from '../profile/profile_head'

const mapStateToProps = ({entities, session}) => {
  debugger
  return {
    type: "boardshow",
    profilePhotoUrl: entities.users[session.user.id].profilePhotoUrl
    // profilePhotoUrl: session.user.id

  }
}

const mapDispatchToProps = dipstach => {
  return { 
    
  }
}
//

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileHead))