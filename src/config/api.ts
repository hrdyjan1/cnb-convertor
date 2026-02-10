const API_ENDPOINTS = Object.freeze({
  CNB_RATES: {
    DIRECT:
      'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt',
    CORS_PROXY: 'https://corsproxy.io/?',
    VERCEL: '/api/cnb-rates',
  },
});

const API_CONFIG = Object.freeze({
  RATE_DELIMITER: '|',
  HEADER_LINES: 1,
});

export { API_CONFIG, API_ENDPOINTS };
