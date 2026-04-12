import type { APIRoute } from 'astro';
import { Client, db } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async () => {

    const clients = await db.select().from(Client);

    return new Response(JSON.stringify(clients), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    })
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { name, age, isActive } = body;

        const result = await db.insert(Client).values({ name, age, isActive });
        
        // El problema suele estar aquí: lastInsertRowid es BigInt
        // Lo convertimos a Number para que JSON.stringify no falle
        const id = Number(result.lastInsertRowid);

        return new Response(JSON.stringify({
            id,
            name, 
            age, 
            isActive
        }), {
            status: 201,
            headers: { "Content-Type": "application/json" } 
        });

    } catch (error) {
        // Imprime el error real en tu terminal para estar 100% seguros
        console.error("DEBUG ERROR:", error);

        return new Response(
            JSON.stringify({ 
                message: "Error al procesar la respuesta", 
                serverError: error instanceof Error ? error.message : error 
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
};