import { Tanki } from 'mods';


const name = 'DebugMJS';
const type = 'DEBUG';
const title = 'Отладить main.js';
const desc = 'Отладочный запуск танкового main.js из файла';


let js;

async function openFile ( handle, reader ) {

	handle = await window.showOpenFilePicker();
	js = await new Promise( async resolve => {

		reader = new FileReader();
		reader.readAsText( await handle[ 0 ].getFile() );
		reader.onload = () => resolve( reader.result );

	});

}

async function launch () {

	await openFile();
	
	Tanki.setJS( js );
	Tanki.launch();

}

export { name, type, title, desc, openFile, launch };