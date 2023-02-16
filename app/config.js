import { getAvailablePort } from 'x/port/mod.ts';


export const dev = Deno.args[ 0 ] === '--dev';

export const port = await getAvailablePort( { port: [ 9090, 19090 ] } );

export const maxFetchPool = 50;
