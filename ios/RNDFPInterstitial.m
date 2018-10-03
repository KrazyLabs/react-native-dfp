//
//  RNDFPInterstitial.m
//  RNDfp
//
//  Created by Bub on 7/28/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "RNDFPInterstitial.h"

@implementation RNDFPInterstitial
{
  bool hasListeners;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(loadAdFromAdUnitId: (NSString *)adUnitId)
{
    NSLog(@"Loading Interstitial ad...");
    self.interstitial = [[DFPInterstitial alloc] initWithAdUnitID:adUnitId];
    self.interstitial.delegate = self;
    [self.interstitial loadRequest:[DFPRequest request]];
}

RCT_EXPORT_METHOD(showAd)
{
    NSLog(@"Checking Interstitial ad...");
    if (self.interstitial.isReady) {
        NSLog(@"Showing Interstitial ad...");
        UIViewController * _root = [UIApplication sharedApplication]
            .delegate.window.rootViewController;
        [self.interstitial presentFromRootViewController:_root];
    } else {
        NSLog(@"Interstitial Ad wasn't ready");
    }
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"onAdLoaded", @"onAdFailedToLoad", @"onAdOpened", @"onAdClosed", @"onAdLeftApplication"];
}

-(void)startObserving {
    hasListeners = YES;
}

-(void)stopObserving {
    hasListeners = NO;
}

- (void)interstitialDidReceiveAd:(DFPInterstitial *)ad {
    if (hasListeners) {
        [self sendEventWithName:@"onAdLoaded" body:@{}];
    }
}

- (void)interstitial:(DFPInterstitial *)ad didFailToReceiveAdWithError:(GADRequestError *)error {
    if (hasListeners) {
        [self sendEventWithName:@"onAdFailedToLoad" body:@{@"error": [error localizedDescription]}];
    }
}

- (void)interstitialWillPresentScreen:(DFPInterstitial *)ad {
    if (hasListeners) {
        [self sendEventWithName:@"onAdOpened" body:@{}];
    }
}

- (void)interstitialDidDismissScreen:(DFPInterstitial *)ad {
    if (hasListeners) {
        [self sendEventWithName:@"onAdClosed" body:@{}];
    }
}

- (void)interstitialWillLeaveApplication:(DFPInterstitial *)ad {
    if (hasListeners) {
        [self sendEventWithName:@"onAdLeftApplication" body:@{}];
    }
}


@end
