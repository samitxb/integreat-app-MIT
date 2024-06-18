import { ObjectId } from "mongodb";

// Struktur einer Veranstaltung
export interface EventModel {
    _id?: ObjectId;
    title: string;
    content: string;
    date: Date;
    createdAt?: Date;
}