
export type OptionType = 'call' | 'put';

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
  bio?: string;
  joinedDate?: string;
  followers?: number;
  following?: number;
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
  returnPercentage?: number;
}

export type NotificationType = 'like' | 'repost' | 'follow' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  user?: User;
  message: string;
  timestamp: string;
  read: boolean;
  tradeId?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface MessageThread {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: Message[];
}
