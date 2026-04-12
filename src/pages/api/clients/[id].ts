import type { APIRoute } from 'astro';
import { Client, db, eq } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {

    const { id } = params;

    if (id) {
        const client = await db.select().from(Client).where(
            eq(Client.id, +id)
        );

        if (client) {
            return new Response(JSON.stringify(client), {
                status: 200, headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }


    return new Response(JSON.stringify({
        "msg": `Client ${id} Not Found`
    }), {
        status: 404, headers: { 'Content-Type': 'application/json' }
    });
};

export const PUT: APIRoute = async ({ request, params }) => {
    const { id = '' } = params;
    const { name, age, isActive } = await request.json();

    try {
        const results = await db.update(Client).set({ name, age, isActive })
            .where(eq(Client.id, +id));
        const updatedClient = await db.select().from(Client).where(eq(Client.id, +id));
        return new Response(JSON.stringify(updatedClient.at(0)), {
            status: 200, headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Client not found" }), {
            status: 404, headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export const DELETE: APIRoute = async ({ params }) => {
    const { id = '' } = params;

    try {
        const { rowsAffected } = await db.delete(Client).where(eq(Client.id, +id));
        
        if (rowsAffected) {
            return new Response(JSON.stringify({
                message: "User deleted"
            }), {
                status: 200, headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            return new Response(JSON.stringify({
                message: "User not found"
            }), {
                status:404, headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: "Client not found" }), {
            status: 404, headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}