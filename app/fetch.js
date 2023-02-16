import { pooledMap } from 'std/async/pool.ts';
import { maxFetchPool } from '/app/config.js';


export function fetchText ( url ) {

	return fetch( url ).then( r => r.text() );

}

export async function fetchAll ( urls ) {

	const resps = [];
	const ifun = u => fetchWithArrayBuffer( u )
	const pool = pooledMap( maxFetchPool, urls, ifun );

	for await ( let res of pool ) resps.push( res );

	return resps;

}

async function fetchWithArrayBuffer( url ) {

	let res;

	res = await fetch( url );
	res.buffer = await res.arrayBuffer();

	return res;

}