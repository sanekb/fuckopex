export const name = 'CODECS';
export const type = 'utils';
export const title = 'Танки CODECS';
export const desc = '';


import { Packages, Tanki } from 'mods';

export function launch () {

	window.Packages = Packages;

	// Tanki.replace( 'vt(n(100)),vt(n(150)),', 'new wn(r,t,this,e);return;' );
	Tanki.replace( 'Dt(this.local$closure$launchParams),', '' );
	// Tanki.replace( 'function Io(t){this', 'function Io(t){console.warn(this);this' );
	// Tanki.replace( /,.{2,3}\(\)}\(t.exports/, '}(t.exports' );

	Packages.use(

		[ /alternativa.client:2/, f => {

			const connectToServer_y0zsll$ = f.connectToServer_y0zsll$;

			f.connectToServer_y0zsll$ = function ( t ) {

				console.log( 'connectToServer_y0zsll$' );

				return connectToServer_y0zsll$.bind( this )( t );

			};

		}],

		[ /alternativa.services:/, f => {

			const registerService_1b0sb3$ = f.registerService_1b0sb3$;

			f.registerService_1b0sb3$ = function ( t,e,n ) {

				// console.log( 'registerService_1b0sb3$', t,e,n );

				return registerService_1b0sb3$.bind( this )( t,e,n );

			};

		}],

		// [ /Codec/, f => {

		// 	const codecName = f.$metadata$?.simpleName;

		// 	if ( codecName === undefined ) { console.warn(f); return; }

		// 	let decode_1 = null;
		// 	let encode_2 = null;

		// 	try {

		// 		decode_1 = Packages.prop( f.prototype, 'decode', 1 );
		// 		encode_2 = Packages.prop( f.prototype, 'encode', 2 );

		// 	} catch (e) {

		// 		console.error( codecName );
		// 		return;

		// 	}

		// 	if ( decode_1 && encode_2 ) {

		// 		const decode = f.prototype[ decode_1 ];
		// 		const encode = f.prototype[ encode_2 ];

		// 		f.prototype[ decode_1 ] = function ( pb ) {

		// 			const result = decode.bind( this )( pb );

		// 			console.log( `%cd: ${ codecName }`, 'color: blue;', result );

		// 			return result;

		// 		}

		// 		f.prototype[ encode_2 ] = function ( pb, val ) {

		// 			const result = encode.bind( this )( pb, val );

		// 			console.log( `%ce: ${ codecName }`, 'color: red;', val );

		// 			return result;

		// 		}				

		// 	}

		// }],

	);

	Tanki.launch();

}