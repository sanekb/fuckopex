import { fetchText, fetchAll } from '/app/fetch.js';
import { dev } from '/app/config.js';
import { walk } from 'std/fs/mod.ts';
import { extname, posix, sep } from 'std/path/mod.ts';
import { contentType } from 'std/media_types/mod.ts';
import { concat } from 'std/bytes/mod.ts';
import { encode } from 'std/encoding/hex.ts';


const datapackDir = './datapack/';

const tankiUrl = 'https://tankionline.com/'; //`http://localhost:${ 9999 }/` ?? 
const tankiRegex = /main.[0-9a-f]{8}.(css|js)/g;

let cache, request, match;


export const response = await load();


async function load () {

	cache = await caches.open( 'datapack' );
	request = new Request( `http://localhost/` );
	match = async () => cache.match( request );

	await diff() &&
	await update();

	return await match( request );

}

async function diff () {

	const res = await match( request );
	const index = await fetchText( `${ tankiUrl }play/` );

	const client = res?.headers.get( 'based-on' );
	const server = index.match( tankiRegex )[ 1 ];

	return client !== server;

}

async function update () {

	const urls = await getTankiUrls();
	const tanki = await fetchAll( urls );
	const self = await getSelfResps();

	const resps = tanki.concat( dev ? [] : self );

	await pack( resps );

}

async function getTankiUrls () {

	const urls = [ `${ tankiUrl }play/` ];

	let regexp = tankiRegex;
	let tanki = await fetchText( urls.at( -1 ) ).then( t => t.match( regexp ) );

	urls.push(
		`${ tankiUrl }play/static/css/${ tanki[ 0 ] }`,
		`${ tankiUrl }play/static/js/${ tanki[ 1 ] }`,
		`${ tankiUrl }s/status.js/`
	);

	regexp = /"static\/.+?"/g;
	tanki = await fetchText( urls.at( -2 ) ).then( t => t.match( regexp ) );

	urls.push(
		...tanki.map( m => `${ tankiUrl }play/${ m.slice( 1, -1 ) }` )
	);

	return urls;

}

async function getSelfResps () {

	const resps = [];
	const url = request.url;

	let path, body, resp;

	for await ( let e of walk( datapackDir, { includeDirs: false } ) ) {

		path = e.path;
		body = await Deno.readFile( path );
		resp = new Response( body, { headers: { 'content-type': contentType( extname( path ) ) } } );
		setUrl( resp, url + path.split( sep ).slice( 1 ).join( posix.sep ) );

		resps.push( resp );

	}

	resp = resps.find( r => r.url === `${ url }index.html` ).clone();
	setUrl( resp, url );

	return resps.concat( resp );

}

function setUrl ( res, url ) {

	Object.defineProperty( res, 'url', { value: url } );

}

async function pack ( resps ) {

	const meta = [];
	const data = [];

	for ( let res of resps ) {

		const path = new URL( res.url ).pathname;
		const type = res.headers.get( 'content-type' );
		const ui8 = new Uint8Array( res.buffer ?? await res.arrayBuffer() );
		const size = ui8.length;

		meta.push( { path, type, size } );
		data.push( ui8 );

	}

	const head = JSON.stringify( meta );
	const body = concat( new TextEncoder().encode( head ), ...data );

	const ebuf = await crypto.subtle.digest( 'SHA-256', body );
	const etag = new TextDecoder().decode( encode( new Uint8Array( ebuf ) ) );

	const headers = {
		'etag': etag.slice( 0, 8 ),
		'based-on': head.match( tankiRegex )[ 1 ],
		'content-type': 'application/x-tar',
	}

	await cache.delete( request );
	await cache.put( request, new Response( body, { headers } ) );

	// await Deno.writeFile( './datapack.bin', body );

}