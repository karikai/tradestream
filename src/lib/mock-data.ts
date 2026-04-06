
import { Trade, User, Notification, MessageThread, Group, Membership } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { UserData } from '@/models/user';
import { TradeData } from '@/models/trade';


export const MOCK_USERS: UserData[] = [
  {
    uid: 'u1',
    name: 'Alex Rivera',
    username: 'arivera_trades',
    // avatar: PlaceHolderImages[0].imageUrl,
    verified: true,
    bio: 'Macro options trader focused on tech and energy sectors. 10 years in the game.',
    dateCreated: 1775235260499,
    dateCreatedString: "2026-04-03T16:54:20.499Z",
    website: 'tradestream.money',
    robinhoodEmail: 'test@email.com',
    email: '',
    location: '',
    toObject: function (): Record<string, unknown> {
      throw new Error('Function not implemented.');
    }
  },
  {
    uid: 'u2',
    name: 'Sarah Chen',
    username: 'optionsqueen',
    // avatar: PlaceHolderImages[1].imageUrl,
    verified: true,
    bio: 'Volatility specialist. Selling premium and managing risk. I love iron condors.',
    dateCreated: 1775235260499,
    dateCreatedString: "2026-04-03T16:54:20.499Z",
    website: 'tradestream.money',
    robinhoodEmail: 'test@email.com',
    email: '',
    location: '',
    toObject: function (): Record<string, unknown> {
      throw new Error('Function not implemented.');
    }
  },
  {
    uid: 'u3',
    name: 'Market Whiz',
    username: 'marketwhiz',
    // avatar: PlaceHolderImages[2].imageUrl,
    bio: 'Searching for whales and unusual options activity. Data-driven only.',
    dateCreated: 1775235260499,
    dateCreatedString: "2026-04-03T16:54:20.499Z",
    website: 'tradestream.money',
    robinhoodEmail: 'test@email.com',
    email: '',
    verified: false,
    location: '',
    toObject: function (): Record<string, unknown> {
      throw new Error('Function not implemented.');
    }
  },
  {
    uid: 'u4',
    name: 'John Doe',
    username: 'johndoe_trading',
    // avatar: 'https://picsum.photos/seed/jd/200/200',
    bio: 'Professional coffee drinker and part-time index trader.',
    dateCreated: 1775235260499,
    dateCreatedString: "2026-04-03T16:54:20.499Z",
    website: 'tradestream.money',
    robinhoodEmail: 'test@email.com',
    email: '',
    verified: false,
    location: '',
    toObject: function (): Record<string, unknown> {
      throw new Error('Function not implemented.');
    }
  }
];

export const MOCK_GROUPS: Group[] = [
  {
    id: 'g1',
    name: 'Whale Alerts Pro',
    description: 'Real-time tracking of the biggest options orders in the market.',
    creator: MOCK_USERS[0],
    monthlyPrice: 49.99,
    avatar: 'https://picsum.photos/seed/whale/200/200',
    memberCount: 1240,
  },
  {
    id: 'g2',
    name: 'Volatility Masters',
    description: 'Learn to trade iron condors and credit spreads for consistent income.',
    creator: MOCK_USERS[1],
    monthlyPrice: 29.99,
    avatar: 'https://picsum.photos/seed/vol/200/200',
    memberCount: 850,
  }
];

export const MOCK_MEMBERSHIPS: Membership[] = [
  {
    id: 'mem1',
    groupId: 'g1',
    userId: 'u4',
    expiresAt: '2025-12-31T23:59:59Z'
  }
];

export const MOCK_TRADES: TradeData[] = [
  {
    id: 't1',
    user: MOCK_USERS[0].uid,
    ticker: 'AAPL',
    optionType: 'call',
    strikePrice: 245,
    expirationDate: '2025-06-20',
    contractsPurchased: 50,
    averageCost: 12.45,
    contractsSold: 50,
    priceAtClose: 18.50,
    profitAmount: 30250,
    profitPercentage: 48.5,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).getUTCSeconds(),
    sentiment: 'bullish',
    groupId: '',
    toObject: function (): Record<string, unknown> {
      throw new Error('Function not implemented.');
    }
  },
  {
    id: 't2',
    user: MOCK_USERS[1].uid,
    ticker: 'TSLA',
    optionType: 'put',
    strikePrice: 190,
    expirationDate: '2025-04-18',
    contractsPurchased: 200,
    averageCost: 8.12,
    contractsSold: 100,
    priceAtClose: 12.40,
    profitAmount: 42800,
    profitPercentage: 52.7,
    timestamp: new Date(Date.now() - 1000 * 60 * 12).getUTCSeconds(),
    sentiment: 'bullish',
    groupId: '',
    toObject: function (): Record<string, unknown> {
      throw new Error('Function not implemented.');
    }
  },
  {
    id: 't3',
    user: MOCK_USERS[2].uid,
    ticker: 'NVDA',
    optionType: 'call',
    strikePrice: 155,
    expirationDate: '2025-05-16',
    contractsPurchased: 15,
    averageCost: 145.20,
    contractsSold: 15,
    priceAtClose: 210.50,
    profitAmount: 97950,
    profitPercentage: 44.9,
    timestamp: new Date(Date.now() - 1000 * 60 * 25).getUTCSeconds(),
    sentiment: 'bullish',
    groupId: '',
    toObject: function (): Record<string, unknown> {
      throw new Error('Function not implemented.');
    }
  },
  // {
  //   id: 't-g1-1',
  //   user: MOCK_USERS[0].uid,
  //   ticker: 'TSLA',
  //   optionType: 'call',
  //   strikePrice: 250,
  //   expirationDate: '2025-07-18',
  //   contractsPurchased: 500,
  //   averageCost: 15.20,
  //   timestamp: new Date(Date.now() - 1000 * 60 * 120).getUTCSeconds().toString(),
  //   sentiment: 'bullish',
  //   groupId: 'g1',
  // },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    user: MOCK_USERS[0],
    message: 'liked your trade on $AAPL',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    read: false,
    tradeId: 't1',
  },
  {
    id: 'n2',
    type: 'follow',
    user: MOCK_USERS[1],
    message: 'started following you',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    read: false,
  },
  {
    id: 'n3',
    type: 'repost',
    user: MOCK_USERS[2],
    message: 'reposted your whale alert on $NVDA',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    read: true,
    tradeId: 't3',
  },
  {
    id: 'n4',
    type: 'system',
    message: 'Welcome to TradeStream! Start following top traders to see their activity.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
  }
];

// export const MOCK_MESSAGE_THREADS: MessageThread[] = [
//   {
//     id: 'm1',
//     user: MOCK_USERS[0],
//     lastMessage: 'Did you see that volume on $NVDA calls? Absolute insanity.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
//     unread: true,
//     messages: [
//       { id: 'ms1', senderId: 'u1', text: 'Hey, checking out the flow today?', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
//       { id: 'ms2', senderId: 'u4', text: 'Yeah, looks like heavy buying on tech.', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
//       { id: 'ms3', senderId: 'u1', text: 'Did you see that volume on $NVDA calls? Absolute insanity.', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
//     ]
//   },
//   {
//     id: 'm2',
//     user: MOCK_USERS[1],
//     lastMessage: 'The iron condor strategy is working perfectly in this range.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
//     unread: false,
//     messages: [
//       { id: 'ms4', senderId: 'u2', text: 'Volatility is crushing right now.', timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString() },
//       { id: 'ms5', senderId: 'u2', text: 'The iron condor strategy is working perfectly in this range.', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
//     ]
//   }
// ];
