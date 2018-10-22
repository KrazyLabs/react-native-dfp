#import "RNDFPBannerManager.h"
#import "RNDFPBannerView.h"

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#else
#import "RCTBridge.h"
#endif

@implementation RNDFPBannerManager

RCT_EXPORT_MODULE();

- (UIView *)view
{
  RNDFPBannerView *bannerView = [[RNDFPBannerView alloc] init];
  bannerView.hasSetCustomTargeting = NO;
  return bannerView;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_VIEW_PROPERTY(adSizes, NSArray);
RCT_EXPORT_VIEW_PROPERTY(dimensions, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(bannerSize, NSString);
RCT_EXPORT_VIEW_PROPERTY(adUnitID, NSString);
RCT_EXPORT_VIEW_PROPERTY(testDeviceID, NSString);
RCT_EXPORT_VIEW_PROPERTY(customTargeting, NSDictionary);

RCT_EXPORT_VIEW_PROPERTY(onSizeChange, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onAdViewEvent, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onAdViewDidReceiveAd, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onAdViewDidFailToReceiveAd, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onAdViewWillPresentScreen, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onAdViewWillDismissScreen, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onAdViewDidDismissScreen, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onAdViewWillLeaveApplication, RCTBubblingEventBlock);

@end
