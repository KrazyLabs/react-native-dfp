package com.krazylabs.rnnativedfp;

import android.os.Handler;
import android.os.Looper;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.doubleclick.PublisherAdRequest;
import com.google.android.gms.ads.doubleclick.PublisherInterstitialAd;

import java.util.HashMap;
import java.util.Map;

public class RNDfpInterstitialAdModule extends ReactContextBaseJavaModule {

    public static final String REACT_CLASS = "RNDFPInterstitial";

    PublisherInterstitialAd mPublisherInterstitialAd;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    public RNDfpInterstitialAdModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mPublisherInterstitialAd = new PublisherInterstitialAd(reactContext);
    }


    @ReactMethod
    public void loadAdFromAdUnitId(final String adUnitID) {
        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run () {
                if (mPublisherInterstitialAd.getAdUnitId() == null) {
                    mPublisherInterstitialAd.setAdUnitId(adUnitID);
                }
                mPublisherInterstitialAd.loadAd(new PublisherAdRequest.Builder().build());
                addListeners();
            }
        });
    }

    @ReactMethod
    public void showAd() {
        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run () {
                if (mPublisherInterstitialAd.isLoaded()) {
                    mPublisherInterstitialAd.show();
                }
            }
        });
    }

    private void addListeners() {
        mPublisherInterstitialAd.setAdListener(new AdListener() {
            ReactContext reactContext = getReactApplicationContext();
            @Override
            public void onAdLoaded() {
                sendEvent(reactContext, "onAdLoaded", null);
            }

            @Override
            public void onAdFailedToLoad(int errorCode) {
                WritableMap error = Arguments.createMap();
                error.putString("error", mapErrorCode(errorCode));
                sendEvent(reactContext, "onAdFailedToLoad", error);
            }

            @Override
            public void onAdOpened() {
                sendEvent(reactContext, "onAdOpened", null);
            }

            @Override
            public void onAdClosed() {
                sendEvent(reactContext, "onAdClosed", null);
            }

            @Override
            public void onAdLeftApplication() {
                sendEvent(reactContext, "onAdLeftApplication", null);
            }
        });
    }

    private void sendEvent(ReactContext reactContext,
                            String eventName,
                            @Nullable WritableMap params) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }

    private String mapErrorCode(int errorCode) {
        String errorMessage;
        switch (errorCode) {
            case PublisherAdRequest.ERROR_CODE_INTERNAL_ERROR:
                errorMessage = "Internal error.";
                break;
            case PublisherAdRequest.ERROR_CODE_INVALID_REQUEST:
                errorMessage = "Invalid request.";
                break;
            case PublisherAdRequest.ERROR_CODE_NETWORK_ERROR:
                errorMessage = "Network error.";
                break;
            case PublisherAdRequest.ERROR_CODE_NO_FILL:
                errorMessage = "No ad returned.";
                break;
            default:
                errorMessage = "Unkown error.";
                break;
        }
        return errorMessage;
    }

    @javax.annotation.Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("simulatorId", AdRequest.DEVICE_ID_EMULATOR);
        return constants;
    }
}