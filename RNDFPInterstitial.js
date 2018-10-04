import { NativeModules, NativeEventEmitter, DeviceEventEmitter, Platform } from 'react-native';
const { RNDFPInterstitial } = NativeModules

const eventTypes = {
  onAdLoaded: 'onAdLoaded',
  onAdOpened: 'onAdOpened',
  onAdLeftApplication: 'onAdLeftApplication',
  onAdClosed: 'onAdClosed',
  onAdFailedToLoad: 'onAdFailedToLoad'
}
let subscriptions = [];

const interstitialEventEmitter = Platform.OS === 'ios' ? new NativeEventEmitter(RNDFPInterstitial) : DeviceEventEmitter;

export default class Interstitial {

  constructor(adUnitId, customTargeting) {
    this.adUnitId = adUnitId;
    this.customTargeting = customTargeting;
    for (let i = 0, len = subscriptions.length; i < len; i++) {
      subscriptions[i].remove();
    }
    subscriptions = [];
  }

  /**
   * Load an ad with an instance of AdRequest
   * @returns {*}
   */
  loadAd() {
    RNDFPInterstitial.loadAdFromAdUnitId(this.adUnitId, this.customTargeting);
  }

  /**
   * Show the advert - will only show if loaded
   * @returns {*}
   */
  show() {
    RNDFPInterstitial.showAd();
  }

  /**
   * Listen to an Ad event
   * @param eventType
   * @param listenerCb
   * @returns {null}
   */
  on(eventType, listenerCb) {
    if (!eventTypes[eventType]) {
      console.warn(
        `Invalid event type provided, must be one of: ${Object.keys(
          eventTypes
        ).join(', ')}`
      );
      return null;
    }

    const sub = interstitialEventEmitter.addListener(
      eventType,
      listenerCb
    );
    subscriptions.push(sub);
    return sub;
  }
}
