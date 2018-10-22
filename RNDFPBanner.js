import React from 'react';
import {
  requireNativeComponent,
  View,
  ViewPropTypes,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

const RNBanner = requireNativeComponent('RNDFPBanner', DFPBanner);

export default class DFPBanner extends React.Component {
  state = {
    height: null,
    width: null,
  };

  onSizeChange = ({ nativeEvent }) => {
    if (this.props.onSizeChange) {
      const { height, width } = nativeEvent;
      this.setState({ height, width });
    }
  };

  onAdViewDidFailToReceiveAd = ({ nativeEvent }) => {
    if (this.props.onAdViewDidFailToReceiveAd) {
      this.props.onAdViewDidFailToReceiveAd(nativeEvent.error);
    }
  };

  render() {
    const {
      adUnitID,
      testDeviceID,
      dimensions,
      customTargeting,
      style,
    } = this.props;

    const width = this.state.width || this.props.style.width;
    const height = this.state.height || this.props.style.height;

    let { bannerSize, adSizes } = this.props;

    // Dimensions gets highest priority
    if (dimensions && dimensions.width && dimensions.height) {
      bannerSize = undefined;
      adSizes = undefined;
    }

    // AdSizes gets second priority
    if (adSizes && adSizes.length > 0) {
      bannerSize = undefined;
    }

    // Default to something if nothing is set
    if (
      !bannerSize &&
      (!dimensions || !dimensions.width || !dimensions.height) &&
      (!adSizes || !adSizes.length > 0)
    ) {
      bannerSize = 'smartBannerPortrait';
    }

    console.log({ style, width, height });

    return (
      <View style={style}>
        <RNBanner
          style={{ width, height }}
          bannerSize={bannerSize}
          adSizes={adSizes}
          dimensions={dimensions}
          testDeviceID={testDeviceID}
          adUnitID={adUnitID}
          onSizeChange={this.onSizeChange}
          onAdViewDidReceiveAd={this.props.onAdViewDidReceiveAd}
          onAdViewDidFailToReceiveAd={this.onAdViewDidFailToReceiveAd}
          onAdViewWillPresentScreen={this.props.onAdViewWillPresentScreen}
          onAdViewWillDismissScreen={this.props.onAdViewWillDismissScreen}
          onAdViewDidDismissScreen={this.props.onAdViewDidDismissScreen}
          onAdViewWillLeaveApplication={this.props.onAdViewWillLeaveApplication}
          onAdViewEvent={this.props.onAdViewEvent}
          customTargeting={customTargeting}
        />
      </View>
    );
  }
}

DFPBanner.propTypes = {
  style: ViewPropTypes.style,

  /**
   * Mobile Ads iOS library banner size constants
   * (https://developers.google.com/admob/ios/banner)
   * banner (320x50, Standard Banner for Phones and Tablets)
   * largeBanner (320x100, Large Banner for Phones and Tablets)
   * mediumRectangle (300x250, IAB Medium Rectangle for Phones and Tablets)
   * fullBanner (468x60, IAB Full-Size Banner for Tablets)
   * leaderboard (728x90, IAB Leaderboard for Tablets)
   * smartBannerPortrait (Screen width x 32|50|90, Smart Banner for Phones and Tablets)
   * smartBannerLandscape (Screen width x 32|50|90, Smart Banner for Phones and Tablets)
   *
   * banner is default
   */
  bannerSize: PropTypes.string,

  /**
   * Custom targeting to add to the dfp request
   */
  customTargeting: PropTypes.shape({
    amzn_b: PropTypes.string,
    amzn_h: PropTypes.string,
    amznp: Platform.OS === 'ios' ? PropTypes.array : PropTypes.string,
    amznslots: PropTypes.string,
  }),

  /**
   * Custom banner size (instead of using bannerSize)
   */
  dimensions: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),

  /**
   * Array of some combination of bannerSize and dimensions that are valid for the ad
   * Example: ['mediumRectangle', { width: 320, height: 400 }, 'smartBannerPortrait']
   */
  adSizes: PropTypes.array,

  /**
   * Mobile ad unit ID
   */
  adUnitID: PropTypes.string,

  /**
   * Test device ID
   */
  testDeviceID: PropTypes.string,

  /**
   * Mobile ads iOS library events
   */
  onAdViewDidReceiveAd: PropTypes.func,
  onAdViewDidFailToReceiveAd: PropTypes.func,
  onAdViewWillPresentScreen: PropTypes.func,
  onAdViewWillDismissScreen: PropTypes.func,
  onAdViewDidDismissScreen: PropTypes.func,
  onAdViewWillLeaveApplication: PropTypes.func,
  onAdViewEvent: PropTypes.func,
  // ...View.propTypes,
};

DFPBanner.defaultProps = {
  onAdViewDidReceiveAd: () => {},
  onAdViewDidFailToReceiveAd: () => {},
  onAdViewWillPresentScreen: () => {},
  onAdViewWillDismissScreen: () => {},
  onAdViewDidDismissScreen: () => {},
  onAdViewWillLeaveApplication: () => {},
  onAdViewEvent: () => {},
};
