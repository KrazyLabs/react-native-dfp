import React from 'react';
import { 
  requireNativeComponent, 
  View,
} from 'react-native';
import PropTypes from 'proptypes';

const RNBanner = requireNativeComponent('RNDFPBanner', DFPBanner);

export default class DFPBanner extends React.Component {
  state = {
    style: {}
  };

  onSizeChange = ({ nativeEvent }) => {
    const { height, width } = nativeEvent;
    this.setState({ style: { width, height } });
  };

  admobDispatchAppEvent = event => {
    if (this.props.admobDispatchAppEvent) {
      this.props.admobDispatchAppEvent(event);
    }
  };

  didFailToReceiveAdWithError = ({ nativeEvent }) => {
    if (this.props.didFailToReceiveAdWithError) {
      this.props.didFailToReceiveAdWithError(nativeEvent.error);
    }
  };

  render() {
    const {
      adUnitID,
      testDeviceID,
      dimensions,
      customTargeting,
      style
    } = this.props;
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
    if (!bannerSize && (!dimensions || !dimensions.width || !dimensions.height) && (!adSizes || !adSizes.length > 0)) {
       bannerSize = 'smartBannerPortrait';
    }

    return (
      <View style={style}>
        <RNBanner
          bannerSize={bannerSize}
          style={this.state.style}
          onSizeChange={this.onSizeChange}
          onAdViewDidReceiveAd={this.props.adViewDidReceiveAd}
          onDidFailToReceiveAdWithError={this.didFailToReceiveAdWithError}
          onAdViewWillPresentScreen={this.props.adViewWillPresentScreen}
          onAdViewWillDismissScreen={this.props.adViewWillDismissScreen}
          onAdViewDidDismissScreen={this.props.adViewDidDismissScreen}
          onAdViewWillLeaveApplication={this.props.adViewWillLeaveApplication}
          onAdmobDispatchAppEvent={this.admobDispatchAppEvent}
          adSizes={adSizes}
          dimensions={dimensions}
          testDeviceID={testDeviceID}
          adUnitID={adUnitID}
          customTargeting={customTargeting}
        />
      </View>
    );
  }
}

DFPBanner.propTypes = {
  // style: View.propTypes.style,

  /**
   * AdMob iOS library banner size constants
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
    amznp: PropTypes.string,
    amznslots: PropTypes.string
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
   * AdMob ad unit ID
   */
  adUnitID: PropTypes.string,

  /**
   * Test device ID
   */
  testDeviceID: PropTypes.string,

  /**
   * AdMob iOS library events
   */
  adViewDidReceiveAd: PropTypes.func,
  didFailToReceiveAdWithError: PropTypes.func,
  adViewWillPresentScreen: PropTypes.func,
  adViewWillDismissScreen: PropTypes.func,
  adViewDidDismissScreen: PropTypes.func,
  adViewWillLeaveApplication: PropTypes.func,
  admobDispatchAppEvent: PropTypes.func,
  // ...View.propTypes,
};

DFPBanner.defaultProps = {
    didFailToReceiveAdWithError: () => {},
    admobDispatchAppEvent: () => {}
};
