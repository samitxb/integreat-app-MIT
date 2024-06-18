// Modell für Fragen
// models/Question.ts

import { ObjectId } from 'mongodb';

export interface Question {
  _id?: ObjectId;
  author: string;
  title: string;
  question: string;
  answers: Answer[];
  createdAt?: Date;
}

export interface Answer {
  _id?: ObjectId; 
  answer: string;
  author: string;
  createdAt?: Date;
  lastEdited?: Date;
}
