import {connect} from 'react-redux';

import {setShowImages, setBigImages} from 'actions/preferences.js';
import bottomBarComponent from 'components/bottomBar.js';

const mapStateToProps = (state) => {
  return {
    showImages: state.preferences.showImages,
    bigImages: state.preferences.bigImages,
    autoscroll: state.preferences.autoscroll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setShowImages: (show) => dispatch(setShowImages(show)),
    setBigImages: (big) => dispatch(setBigImages(big)),
  };
};

const bottomBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(bottomBarComponent);

export default bottomBar;
