import { DocumentSnapshot } from 'firebase/firestore';

export class Trade {
    id: string;
    uid: string;
    ticker: string;
    option_type: string;
    strike_price: number;
    expiration_date: string;
    contracts_purchased: number;
    average_cost: number;
    contracts_sold: number;
    price_at_close: number;
    timestamp: number;

    constructor({
        id = '',
        uid = '',
        ticker = '',
        option_type = '',
        strike_price = 0,
        expiration_date = '',
        contracts_purchased = 0,
        average_cost = 0,
        contracts_sold = 0,
        price_at_close = 0,
        timestamp = 0,
    }: Partial<Trade> = {}) {
        this.id = id;
        this.uid = uid;
        this.ticker = ticker;
        this.option_type = option_type;
        this.strike_price = strike_price;
        this.expiration_date = expiration_date;
        this.contracts_purchased = contracts_purchased;
        this.average_cost = average_cost;
        this.contracts_sold = contracts_sold;
        this.price_at_close = price_at_close;
        this.timestamp = timestamp;
    }

    static fromSnapshot(snapshot: DocumentSnapshot): Trade {
        const data = snapshot.data() ?? {};
        return new Trade({
            id: snapshot.id,
            uid: data.uid ?? '',
            ticker: data.ticker ?? '',
            option_type: data.option_type ?? '',
            strike_price: data.strike_price ?? 0,
            expiration_date: data.expiration_date ?? '',
            contracts_purchased: data.contracts_purchased ?? 0,
            average_cost: data.average_cost ?? 0,
            contracts_sold: data.contracts_sold ?? 0,
            price_at_close: data.price_at_close ?? 0,
            timestamp: data.timestamp ?? 0,
        });
    }

    toObject(): Record<string, unknown> {
        return {
            id: this.id,
            uid: this.uid,
            ticker: this.ticker,
            option_type: this.option_type,
            strike_price: this.strike_price,
            expiration_date: this.expiration_date,
            contracts_purchased: this.contracts_purchased,
            average_cost: this.average_cost,
            contracts_sold: this.contracts_sold,
            price_at_close: this.price_at_close,
            timestamp: this.timestamp,
        };
    }
}
