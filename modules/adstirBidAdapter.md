# Overview

```
Module Name: adstir Bidder Adapter
Module Type: Bidder Adapter
Maintainer: support@ad-stir.com
```

# Description

Module that connects to adstir's demand sources

# Test Parameters

```
    var adUnits = [
        {
            code: 'test-div',
            mediaTypes: {
                banner: {
                    sizes: [[300, 250]],  // a display size
                }
            },
            bids: [
                {
                    bidder: 'adstir',
                    params: {
                        appId: 'MEDIA-XXXXX',
                        adSpaceNo: 1,
                    }
                }
            ]
        }
    ];
```