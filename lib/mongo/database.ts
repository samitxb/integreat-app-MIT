// \lib\mongo\database.ts - Initialisiert Datenbank
import { MongoClient } from 'mongodb'

// Überprüfen, ob die Umgebungsvariable "MONGODB_URI" vorhanden ist
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

// MongoDB URI und Optionen
const uri = process.env.MONGODB_URI
const options = {}

// MongoClient-Instanz und Promise für die Verbindung
let client: MongoClient
let clientPromise: Promise<MongoClient>

// Entwicklungsmodus: Verwende globalWithMongo._mongoClientPromise, um die Verbindung zwischen Hot Reloads aufrechtzuerhalten
if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  // Wenn _mongoClientPromise noch nicht vorhanden ist, erstelle eine neue MongoClient-Instanz und verbinde
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }

  // Verwende die existierende _mongoClientPromise
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // Produktionsmodus: Einfach eine neue MongoClient-Instanz erstellen und verbinden
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise