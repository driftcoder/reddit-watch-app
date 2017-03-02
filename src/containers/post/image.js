import {connect} from 'react-redux';

import imageComponent from 'components/post/image.js';

const mapStateToProps = (state) => {
  return {
    imagesShown: state.preferences.showImages,
    bigImagesShown: state.preferences.showBigImages,
  };
};

const image = connect(
  mapStateToProps
)(imageComponent);

export default image;
