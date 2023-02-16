export const name = 'Test';
export const type = 'game';
export const title = 'Танки TESTST';
export const desc = '';

import { Packages, Tanki } from 'mods';

export function replace () {

	const suffix_regex = /_\w{6}\$/g;
	const separator = 'prototype';

	let js = Tanki.js;
	let jsp = js.split( separator );

	let m = new Map();

	Array.from( new Set( js.match( suffix_regex ) ) ).forEach( ( a, i ) => m.set( a, '_' + i.toString( 36 ).padStart( 3, '0' ) ) );

	let JS = jsp.map( j => j.replace( suffix_regex, a => m.get(a) ) ).join( separator );

	return JS;

}

export function launch () {

	window.Tanki = Tanki;


	// Packages.use(

	// 	[ 'FollowCameraRelativePath:1', f => {

	// 		const bz = Packages.get( 'alternativa.math.bezier' );
	// 		const getPoint_2 = Packages.prop( f.prototype, 'getPoint', 2 );

	// 		const p0_0 = [ 545, 145 ];
	// 		const p1_0 = [ 1395, 930 ];
	// 		const p2_0 = [ 1565, 2245 ];
	// 		const p3_0 = [ 5e3, 5e3 ];
	// 		const pathDistanceFactor = 1;

	// 		f.prototype[ getPoint_2 ] = function ( t, e ) {
	// 			e.distance = bz( t, p0_0[0], p1_0[0], p2_0[0], p3_0[0] ) * pathDistanceFactor;
	// 			e.height = bz( t, p0_0[1], p1_0[1], p2_0[1], p3_0[1] );
	// 		}

	// 	}],

	// );

	// Tanki.launch();

}