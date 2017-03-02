import {connect} from 'react-redux';

import imageComponent from 'components/post/image.js';

const mapStateToProps = (state) => {
  return {
    showImages: state.preferences.showImages,
    bigImages: state.preferences.bigImages,
  };
};

const image = connect(
  mapStateToProps
)(imageComponent);

export default image;
