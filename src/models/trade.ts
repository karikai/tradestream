import { DocumentSnapshot } from 'firebase/firestore';

export class TradeData {
    id: string;
    user: string;
    ticker: string;
    optionType: "call" | "put";
    strikePrice: number;
    expirationDate: string;
    contractsPurchased: number;
    averageCost: number;
    contractsSold: number;
    priceAtClose: number;
    profitAmount: number;
    profitPercentage: number;
    timestamp: number;
    sentiment: string;
    groupId: string;

    constructor({
        id = '',
        user = '',
        ticker = '',
        optionType = 'call' as "call" | "put",
        strikePrice = 0,
        expirationDate = '',
        contractsPurchased = 0,
        averageCost = 0,
        contractsSold = 0,
        priceAtClose = 0,
        profitAmount = 0,
        profitPercentage = 0,
        timestamp = 0,
        sentiment = '',
        groupId = '',
    }: Partial<TradeData> = {}) {
        this.id = id;
        this.user = user;
        this.ticker = ticker;
        this.optionType = optionType;
        this.strikePrice = strikePrice;
        this.expirationDate = expirationDate;
        this.contractsPurchased = contractsPurchased;
        this.averageCost = averageCost;
        this.contractsSold = contractsSold;
        this.priceAtClose = priceAtClose;
        this.profitAmount = profitAmount;
        this.profitPercentage = profitPercentage;
        this.timestamp = timestamp;
        this.sentiment = sentiment;
        this.groupId = groupId;
    }

    static fromSnapshot(snapshot: DocumentSnapshot): TradeData {
        const data = snapshot.data() ?? {};
        return new TradeData({
            id: snapshot.id,
            user: data.user ?? '',
            ticker: data.ticker ?? '',
            optionType: data.optionType ?? 'call',
            strikePrice: data.strikePrice ?? 0,
            expirationDate: data.expirationDate ?? '',
            contractsPurchased: data.contractsPurchased ?? 0,
            averageCost: data.averageCost ?? 0,
            contractsSold: data.contractsSold ?? 0,
            priceAtClose: data.priceAtClose ?? 0,
            profitAmount: data.profitAmount ?? 0,
            profitPercentage: data.profitPercentage ?? 0,
            timestamp: data.timestamp ?? 0,
            sentiment: data.sentiment ?? '',
            groupId: data.groupId ?? '',
        });
    }

    toObject(): Record<string, unknown> {
        return {
            id: this.id,
            user: this.user,
            ticker: this.ticker,
            optionType: this.optionType,
            strikePrice: this.strikePrice,
            expirationDate: this.expirationDate,
            contractsPurchased: this.contractsPurchased,
            averageCost: this.averageCost,
            contractsSold: this.contractsSold,
            priceAtClose: this.priceAtClose,
            profitAmount: this.profitAmount,
            profitPercentage: this.profitPercentage,
            timestamp: this.timestamp,
            sentiment: this.sentiment,
            groupId: this.groupId,
        };
    }
}
