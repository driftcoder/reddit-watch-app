import {connect} from 'react-redux';

import {hideImages, showImages, showBigImages} from 'actions/preferences.js';
import bottomBarComponent from 'components/bottomBar.js';

const mapStateToProps = (state) => {
  return {
    imagesShown: state.preferences.showImages,
    bigImagesShown: state.preferences.showBigImages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideImages: () => dispatch(hideImages()),
    showImages: () => dispatch(showImages()),
    showBigImages: () => dispatch(showBigImages()),
  };
};

const bottomBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(bottomBarComponent);

export default bottomBar;
