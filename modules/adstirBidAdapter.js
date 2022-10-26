import * as utils from '../src/utils.js';
import { config } from '../src/config.js';
import { registerBidder } from '../src/adapters/bidderFactory.js';
import { BANNER } from '../src/mediaTypes.js';

const BIDDER_CODE = 'adstir';
const ENDPOINT = 'https://stage-ad.ad-stir.com/prebid'

export const spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [BANNER],

  isBidRequestValid: function (bid) {
    return !!(utils.isStr(bid.params.appId) && !utils.isEmptyStr(bid.params.appId) && utils.isInteger(bid.params.adSpaceNo));
  },

  buildRequests: function (validBidRequests, bidderRequest) {
    const requests = validBidRequests.map((r) => {
      return {
        method: 'POST',
        url: ENDPOINT,
        data: JSON.stringify({
          appId: r.params.appId,
          adSpaceNo: r.params.adSpaceNo,
          auctionId: r.auctionId,
          transactionId: r.transactionId,
          bidId: r.bidId,
          mediaTypes: r.mediaTypes,
          sizes: r.sizes,
          ref: {
            referrer: bidderRequest.refererInfo.referer,
            topurl: config.getConfig('pageUrl') ? false : bidderRequest.refererInfo.reachedTop,
          },
          gdpr: utils.deepAccess(bidderRequest, 'gdprConsent.gdprApplies', false),
          usp: (bidderRequest.uspConsent || '1---') !== '1---',
          eids: utils.deepAccess(bidderRequest, 'userIdAdEids', []),
          schain: utils.deepAccess(r, 'schain', null),
          pbVersion: '$prebid.version$',
        }),
      }
    });
    return requests;
  },

  interpretResponse: function (serverResponse, bidRequest) {
    const seatbid = serverResponse.body.seatbid;
    if (!utils.isArray(seatbid)) {
      return [];
    }
    const bids = [];
    seatbid.forEach((b) => {
      const bid = b.bid || null;
      if (!bid) {
        return;
      }
      bids.push(bid);
    });
    return bids;
  },
}

registerBidder(spec);