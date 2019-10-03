import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfileHead from '../profile/profile_head'

const mapStateToProps = ({entities, session}) => {
  return {
    type: "boardshow",
  }
}

const mapDispatchToProps = dipstach => {
  return { 
    
  }
}
//

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileHead))