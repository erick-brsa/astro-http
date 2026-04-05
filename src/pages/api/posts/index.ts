import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');

    if (slug) {
        const post = await getEntry('blog', slug);
        if (post) {
            return new Response(JSON.stringify(post), {
                status: 200, headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return new Response(JSON.stringify({
            "msg": `Post ${slug} Not Found`
        }), {
            status: 404, headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
    const blogPosts = await getCollection('blog');
    return new Response(JSON.stringify(blogPosts), {
        status: 200, headers: {
            'Content-Type': 'application/json'
        }
    });
};