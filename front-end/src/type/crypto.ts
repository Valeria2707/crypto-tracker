export type KrakenTickerResponse = {
  channel: string;
  type: string;
  data: {
    symbol: string;
    last: number;
  }[];
};

export type CryptoPrice = {
  symbol: string;
  price: number;
};
