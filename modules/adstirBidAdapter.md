# Overview

```
Module Name: adstir Bidder Adapter
Module Type: Bidder Adapter
Maintainer: support@ad-stir.com
```

# Description

Module that connects to adstir's demand sources

# Configuration

## BidderSettings

This adapter uses browser storage (cookies / local storage). In order to optimize targeting and monetization, the activation of the access to storage by adstir Bidder Adapter is strongly recommended.

```js
// https://docs.prebid.org/dev-docs/publisher-api-reference/bidderSettings.html
pbjs.bidderSettings = {
  adstir: {
    storageAllowed: true
  }
};
```

# Test Parameters

```
    var adUnits = [
        // Banner adUnit
        {
            code: 'test-div',
            mediaTypes: {
                banner: {
                    sizes: [[300, 250]],
                }
            },
            bids: [
                {
                    bidder: 'adstir',
                    params: {
                        appId: 'TEST-MEDIA',
                        adSpaceNo: 1,
                    }
                }
            ]
        }
    ];
```
