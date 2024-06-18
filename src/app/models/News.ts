import { ObjectId } from "mongodb";

// Struktur einer News
export interface NewsModel {
    _id?: ObjectId;
    title: string;
    content: string;
    createdAt: Date;
}