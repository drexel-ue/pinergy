import { scrapeImage } from '../../util/image_util'
import Interest from './interest'
import { connect } from 'react-redux'
const mapStateToProps = (state, ownProps) => ({ 
  interest: ownProps.interest
} )

const mapDispatchToProps = () => ({
  scrapeImage: interest => scrapeImage(interest)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Interest)