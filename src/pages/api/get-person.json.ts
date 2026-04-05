import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ params, request }) => {
    const person = {
        name: "Erick",
        age: 21
    }
    return new Response(JSON.stringify(person), { status: 200, headers: {
        'Content-Type': 'application/json'
    } });
};