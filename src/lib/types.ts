import { UserData } from "@/models/user";

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

export interface Group {
  id: string;
  name: string;
  description: string;
  creator: UserData;
  monthlyPrice: number;
  avatar: string;
  memberCount: number;
}

export interface Membership {
  id: string;
  groupId: string;
  userId: string;
  expiresAt: string;
}

export interface Trade {
  id: string;
  user: User;
  ticker: string;
  optionType: OptionType;
  strikePrice: number;
  expirationDate: string;
  contractsPurchased: number;
  averageCost: number;
  contractsSold?: number;
  priceAtClose?: number;
  profitAmount?: number;
  profitPercentage?: number;
  timestamp: string;
  sentiment?: 'bullish' | 'bearish' | 'neutral';
  groupId?: string; // Optional: linked to a group
}

export type NotificationType = 'like' | 'repost' | 'follow' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  user?: UserData;
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
  user: UserData;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: Message[];
}
