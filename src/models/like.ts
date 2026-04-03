import { DocumentSnapshot } from 'firebase/firestore';

export class Like {
    uid: string;
    postId: string;

    constructor({
        uid = '',
        postId = '',
    }: Partial<Like> = {}) {
        this.uid = uid;
        this.postId = postId;
    }

    static fromSnapshot(snapshot: DocumentSnapshot): Like {
        const data = snapshot.data() ?? {};
        return new Like({
            uid: data.uid ?? '',
            postId: data.postId ?? '',
        });
    }

    toObject(): Record<string, unknown> {
        return {
            uid: this.uid,
            postId: this.postId,
        };
    }
}
