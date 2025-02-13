import { Observable } from "rxjs";
import { webSocket } from "rxjs/webSocket";
import { CRYPTO_PAIRS } from "../constants/crypto";
import { KrakenTickerResponse } from "../type/crypto";

export function subscribeToTicker(): Observable<KrakenTickerResponse> {
  const krakenSocket = webSocket(import.meta.env.VITE_KRAKEN_WS_URL);

  krakenSocket.next({
    method: "subscribe",
    params: {
      channel: "ticker",
      symbol: CRYPTO_PAIRS,
    },
  });

  return krakenSocket as Observable<KrakenTickerResponse>;
}
