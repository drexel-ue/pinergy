import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfileHead from '../profile/profile_head'

const mapStateToProps = ({entities, session}) => {
  let profilePhotoUrl = entities.users[session.user.id] ? entities.users[session.user.id].profilePhotoUrl : null
  return {
    type: "boardshow",
    profilePhotoUrl: profilePhotoUrl

  }
}

const mapDispatchToProps = dipstach => {
  return { 
    
  }
}
//

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileHead))