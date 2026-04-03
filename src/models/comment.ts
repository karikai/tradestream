import { DocumentSnapshot } from 'firebase/firestore';

export class Comment {
    uid: string;
    postId: string;
    content: string;
    timestamp: number;

    constructor({
        uid = '',
        postId = '',
        content = '',
        timestamp = 0,
    }: Partial<Comment> = {}) {
        this.uid = uid;
        this.postId = postId;
        this.content = content;
        this.timestamp = timestamp;
    }

    static fromSnapshot(snapshot: DocumentSnapshot): Comment {
        const data = snapshot.data() ?? {};
        return new Comment({
            uid: data.uid ?? '',
            postId: data.postId ?? '',
            content: data.content ?? '',
            timestamp: data.timestamp ?? 0,
        });
    }

    toObject(): Record<string, unknown> {
        return {
            uid: this.uid,
            postId: this.postId,
            content: this.content,
            timestamp: this.timestamp,
        };
    }
}
