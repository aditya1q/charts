// src/datafeed.js
import axios from 'axios';

const ALPHA_VANTAGE_API_KEY = 'V10ZYSGXKHAGDKLY'; // Replace with your Alpha Vantage API Key

export const datafeed = {
    onReady: (callback) => {
        setTimeout(() => callback({
            supports_search: true,
            supports_group_request: false,
            supports_marks: true,
            supports_timescale_marks: true,
            supports_time: true,
            exchanges: [
                { value: "", name: "All Exchanges", desc: "" },
                { value: "NasdaqNM", name: "NasdaqNM", desc: "NasdaqNM" },
                { value: "NYSE", name: "NYSE", desc: "NYSE" }
            ],
            symbols_types: [
                { name: "All types", value: "" },
                { name: "Stock", value: "stock" },
                { name: "Index", value: "index" }
            ],
            supported_resolutions: ["D", "2D", "3D", "W", "3W", "M", "6M"]
        }), 0);
    },
    resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        setTimeout(() => {
            onSymbolResolvedCallback({
                // name: symbolName,
                // ticker: symbolName,
                // type: 'stock',
                // session: '0930-1600',
                // timezone: 'Asia/Kolkata',
                // // timezone: 'exchange',
                // has_intraday: true,
                // has_no_volume: false,
                // minmov: 1,
                // pricescale: 100,
                // supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
                ticker: 'IBM',
                name: 'IBM',
                description: 'IBM/INR',
                type: 'stock',
                session: '0930-1600',
                timezone: 'Asia/Kolkata',
                exchange: 'Example Exchange',
                minmov: 1,
                pricescale: 100,
                has_intraday: true,
                // visible_plots_set: 'ohlcv',
                has_weekly_and_monthly: false,
                supported_resolutions: ["D", "2D", "3D", "W", "3W", "M", "6M"],
                volume_precision: 2,
                // data_status: 'streaming',
            });
        }, 0);
    },
    getBars: (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
        const interval = getAlphaVantageInterval(resolution);
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbolInfo.name}&interval=${interval}&apikey=${ALPHA_VANTAGE_API_KEY}`;

        axios.get(url)
            .then(response => {
                const data = response.data[`Time Series (${interval})`];
                console.log(data);
                if (!data) {
                    onHistoryCallback([], { noData: true });
                    return;
                }

                const bars = Object.keys(data).map(time => ({
                    time: new Date(time).getTime(),
                    open: parseFloat(data[time]['1. open']),
                    high: parseFloat(data[time]['2. high']),
                    low: parseFloat(data[time]['3. low']),
                    close: parseFloat(data[time]['4. close']),
                    volume: parseFloat(data[time]['5. volume']),
                }));

                onHistoryCallback(bars, { noData: false });
            })
            .catch(err => onErrorCallback(err));
    },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
        // Real-time updates would require a websocket connection if supported by the API
    },
    unsubscribeBars: (subscriberUID) => {
        // Close the websocket connection if implemented
    }
};

const getAlphaVantageInterval = (resolution) => {
    switch (resolution) {
        case '1': return '1min';
        case '5': return '5min';
        case '15': return '15min';
        case '30': return '30min';
        case '60': return '60min';
        case '1D': return 'daily';
        case '1W': return 'weekly';
        case '1M': return 'monthly';
        default: return 'daily';
    }
};
