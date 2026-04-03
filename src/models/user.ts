import { DocumentSnapshot } from 'firebase/firestore';

export class UserData {
    uid: string;
    email: string;
    name: string;
    username: string;
    dateCreated: number;
    dateCreatedString: string;
    verified: boolean;
    robinhoodEmail: string;
    bio: string;
    website: string;
    location: string;

    constructor({
        uid = '',
        email = '',
        name = '',
        username = '',
        dateCreated = 0,
        dateCreatedString = '',
        verified = false,
        robinhoodEmail = '',
        bio = '',
        website = '',
        location = '',
    }: Partial<UserData> = {}) {
        this.uid = uid;
        this.email = email;
        this.name = name;
        this.username = username;
        this.dateCreated = dateCreated;
        this.dateCreatedString = dateCreatedString;
        this.verified = verified;
        this.robinhoodEmail = robinhoodEmail;
        this.bio = bio;
        this.website = website;
        this.location = location;
    }

    static fromSnapshot(snapshot: DocumentSnapshot): UserData {
        const data = snapshot.data() ?? {};
        return new UserData({
            uid: snapshot.id,
            email: data.email ?? '',
            name: data.name ?? '',
            username: data.username ?? '',
            dateCreated: data.dateCreated ?? 0,
            dateCreatedString: data.dateCreatedString ?? '',
            verified: data.verified ?? false,
            robinhoodEmail: data.robinhoodEmail ?? '',
            bio: data.bio ?? '',
            website: data.website ?? '',
            location: data.location ?? '',
        });
    }

    toObject(): Record<string, unknown> {
        return {
            uid: this.uid,
            email: this.email,
            name: this.name,
            username: this.username,
            dateCreated: this.dateCreated,
            dateCreatedString: this.dateCreatedString,
            verified: this.verified,
            robinhoodEmail: this.robinhoodEmail,
            bio: this.bio,
            website: this.website,
            location: this.location,
        };
    }
}
