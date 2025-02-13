import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    if (['/', '/battle', '/shop', '/bestiary'].includes(event.url.pathname)) {
        return await resolve(event);
    } else {
        return new Response(null, {
            status: 303,
            headers: { location: '/' },
        });
    }
};
