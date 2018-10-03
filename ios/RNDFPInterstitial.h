#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTEventEmitter.h>
#else
#import "RCTBridgeModule.h"
#import "RCTEventDispatcher.h"
#import "RCTEventEmitter.h"
#endif

@import GoogleMobileAds;

@interface RNDFPInterstitial : RCTEventEmitter <RCTBridgeModule, GADInterstitialDelegate>

@property(nonatomic, strong) DFPInterstitial *interstitial;

@end
