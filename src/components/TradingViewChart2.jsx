// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewChart2() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
      {
          "symbols": [
            [
              "FRED:SP500|1D"
            ],
            [
              "FRED:NDQ100|1D"
            ],
            [
              "BLACKBULL:US30|1D"
            ]
          ],
          "chartOnly": false,
          "width": 550,
          "height": 400,
          "locale": "en",
          "colorTheme": "light",
          "autosize": false,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": true,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "lineWidth": 2,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|1D",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ]
        } `;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      {/* <div className="tradingview-widget-container__widget"></div> */}
      {/* <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div> */}
    </div>
  );
}

export default memo(TradingViewChart2);
