const name = 'BeautifyMJS';
const type = 'UTIL';
const title = 'Main.js для редактора';
const desc = 'Сохраняет main.js в читабельном формате';


import { Tanki, Test } from 'mods';

let js="gg";


async function launch () {

	await beautify();
	await render();

}

async function beautify () {

	const beautifier = await import( `/deps/js-beautify@1.14.7.js` ).then( m => m.default );

	js = beautifier.js( Tanki.js, { indent_with_tabs: true } );

}

async function render () {

	const div = document.createElement( 'div' );

	div.textContent = 'Сохранить main.js.txt';
	div.style = 'font-size: 150%;';
	div.addEventListener( 'click', save );

	document.body.append( div );

}

async function save () {

	const handle = await window.showSaveFilePicker( {
		suggestedName: 'main.js.txt'
	});
	const stream = await handle.createWritable();

	await stream.write( new Blob( [ js ], { type: 'text/plain' } ) );
	await stream.close();

}

export { name, type, title, desc, launch };