#if __has_include(<React/RCTComponent.h>)
#import <React/RCTComponent.h>
#else
#import "RCTComponent.h"
#endif

@import GoogleMobileAds;

@class RCTEventDispatcher;

@interface RNDFPBannerView : UIView <GADBannerViewDelegate, GADAdSizeDelegate>

@property (nonatomic, copy) NSArray *adSizes;
@property (nonatomic, copy) NSDictionary *dimensions;
@property (nonatomic, copy) NSString *bannerSize;
@property (nonatomic, copy) NSString *adUnitID;
@property (nonatomic, copy) NSString *testDeviceID;
@property (nonatomic, copy) NSDictionary *customTargeting;
@property (nonatomic, assign) BOOL hasSetCustomTargeting;

@property (nonatomic, copy) RCTBubblingEventBlock onWillChangeAdSizeTo;
@property (nonatomic, copy) RCTBubblingEventBlock onSizeChange;
@property (nonatomic, copy) RCTBubblingEventBlock onAdViewEvent;
@property (nonatomic, copy) RCTBubblingEventBlock onAdViewDidReceiveAd;
@property (nonatomic, copy) RCTBubblingEventBlock onAdViewDidFailToReceiveAd;
@property (nonatomic, copy) RCTBubblingEventBlock onAdViewWillPresentScreen;
@property (nonatomic, copy) RCTBubblingEventBlock onAdViewWillDismissScreen;
@property (nonatomic, copy) RCTBubblingEventBlock onAdViewDidDismissScreen;
@property (nonatomic, copy) RCTBubblingEventBlock onAdViewWillLeaveApplication;

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;
- (GADAdSize)getAdSizeFromString:(NSString *)bannerSize;
- (void)loadBanner;

@end
