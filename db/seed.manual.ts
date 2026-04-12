import { Client, db } from 'astro:db';

export default async function seed() {
    await db.insert(Client).values([
        { id: 1, name: "Erick", age: 21, isActive: true },
        { id: 2, name: "Viry", age: 21, isActive: true },
        { id: 3, name: "John", age: 42, isActive: false },
        { id: 4, name: "Karen", age: 30, isActive: false },
    ]);
    console.log("Seed executed");
}