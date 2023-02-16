import { serve } from 'std/http/server.ts';
import { port } from '/app/config.js';


const data = await Deno.readFile( `${ Deno.cwd() }/deno.json` );
const deno_json = JSON.parse( ( new TextDecoder ).decode( data ) );

const program = deno_json.tasks[ 'test' ];
const lifetime = 10e3;

let proc = null;
let tid = null;

const process = () => { proc === null ? start() : delay(); close(); }

const start = () => proc = Deno.run( { cmd: program.split( ' ' ) } );

const delay = () => clearTimeout( tid );

const close = () => tid = setTimeout( () => { proc.close(); proc = null; }, lifetime );

const proxy = req => {

	const url = new URL( req.url );

	const params = {
		headers: req.headers,
		method: req.method,
		body: req.body,
	};

	return fetch( `http://localhost:${ port + 10e3 }` + url.pathname, params );

}

const handler = async req => {

	process();
	
	const timeout = 60e3;
	const time = performance.now();
	const bad = new Response( 'DEPLOYMENT_FAILED', { status: 502 } );

	let res = null;

	while ( true ) {

		res = await proxy( req ).then( res => res, rej => bad );

		if ( performance.now() - time >= timeout ) break;
		if ( res.status !== bad.status ) break;

	}

	return res;

}

serve( handler, { port } );