
import { Trade, User } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Alex Rivera',
    handle: 'arivera_trades',
    avatar: PlaceHolderImages[0].imageUrl,
    verified: true,
  },
  {
    id: 'u2',
    name: 'Sarah Chen',
    handle: 'optionsqueen',
    avatar: PlaceHolderImages[1].imageUrl,
    verified: true,
  },
  {
    id: 'u3',
    name: 'Market Whiz',
    handle: 'marketwhiz',
    avatar: PlaceHolderImages[2].imageUrl,
  },
];

export const MOCK_TRADES: Trade[] = [
  {
    id: 't1',
    user: MOCK_USERS[0],
    ticker: 'AAPL',
    optionType: 'call',
    strikePrice: 245,
    expirationDate: '2025-06-20',
    size: 50,
    price: 12.45,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    sentiment: 'bullish',
  },
  {
    id: 't2',
    user: MOCK_USERS[1],
    ticker: 'TSLA',
    optionType: 'put',
    strikePrice: 190,
    expirationDate: '2025-04-18',
    size: 200,
    price: 8.12,
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    sentiment: 'bearish',
  },
  {
    id: 't3',
    user: MOCK_USERS[2],
    ticker: 'NVDA',
    optionType: 'call',
    strikePrice: 155,
    expirationDate: '2025-05-16',
    size: 15,
    price: 145.20,
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    sentiment: 'bullish',
  },
  {
    id: 't4',
    user: MOCK_USERS[0],
    ticker: 'META',
    optionType: 'call',
    strikePrice: 620,
    expirationDate: '2025-03-21',
    size: 100,
    price: 45.60,
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    sentiment: 'bullish',
  },
  {
    id: 't5',
    user: MOCK_USERS[1],
    ticker: 'AMZN',
    optionType: 'put',
    strikePrice: 175,
    expirationDate: '2025-04-11',
    size: 75,
    price: 3.25,
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    sentiment: 'bearish',
  },
];
