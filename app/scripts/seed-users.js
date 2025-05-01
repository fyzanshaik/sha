// Run this with: node scripts/seed-users.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_DB_URL;
const client = new MongoClient(uri);

async function seedUsers() {
	try {
		await client.connect();
		console.log('Connected to MongoDB');

		const db = client.db('healthConnectDemo');
		const usersCollection = db.collection('users');

		// Clear existing users
		await usersCollection.deleteMany({});

		// Insert sample users
		const users = [
			{ username: 'doctor', password: 'doctor123', role: 'medical' },
			{ username: 'caregiver', password: 'care123', role: 'caregiver' },
			{ username: 'patient', password: 'patient123', role: 'patient' },
		];

		const result = await usersCollection.insertMany(users);
		console.log(`${result.insertedCount} users inserted`);
	} catch (error) {
		console.error('Error seeding users:', error);
	} finally {
		await client.close();
		console.log('MongoDB connection closed');
	}
}

seedUsers();
