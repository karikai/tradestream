
export type OptionType = 'call' | 'put';

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
}

export interface Trade {
  id: string;
  user: User;
  ticker: string;
  optionType: OptionType;
  strikePrice: number;
  expirationDate: string;
  size: number;
  price: number;
  timestamp: string;
  sentiment?: 'bullish' | 'bearish' | 'neutral';
}
