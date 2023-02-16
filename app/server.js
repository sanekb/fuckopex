import { serveFile as file, serveDir as dir } from 'std/http/file_server.ts';
import { serve as run } from 'std/http/server.ts';
import { response } from '/app/datapack.js';
import { port } from '/app/config.js';


const indexFile = './core/document.html';
const workerFile = './core/serviceworker.js';
const datapackDir = './datapack/';


export function start () {

	run( server, { port } );

}

async function server ( req ) {

	const dest = getDest( req );
	const root = isRoot( req );

	if ( root && dest === 'document' ) 		return noCache( await file( req, indexFile ) );
	if ( root && dest === 'serviceworker' ) return noCache( await file( req, workerFile ) );
	if ( root && dest === 'datapack' ) 		return noCache( response.clone() );

	return noCache( await dir( req, { fsRoot: datapackDir, showDirListing: true, quiet: true } ) );

}

function getDest ( req ) {

	const get = prefix => req.headers.get( `${ prefix }-fetch-dest` );

	return get( 'sw' ) ?? get( 'sec' ) ?? get( 'self' );

}

function isRoot( req ) {

	return new URL( req.url ).pathname === '/';

}

function noCache ( res ) {

	res.headers.set( 'cache-control', 'no-cache, no-store, must-revalidate' );

	return res;

}