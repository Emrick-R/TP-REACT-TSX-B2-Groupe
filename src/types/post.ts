export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    userId: number;
    views?: number;
    reactions?: Reactions;
}

export interface Reactions {
    likes: number;
    dislikes: number;
}
