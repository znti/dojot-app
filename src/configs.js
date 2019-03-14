// The plan here is to import from @dojot/gui-module-* instead
import HomeModule from './modules/HomeModule';
import ListAndDetailsModule from './modules/ListAndDetailsModule';
import DevicesModule from './modules/DevicesModule';
import CamerasModule from './modules/CamerasModule';
import LoginModule from './modules/LoginModule';

import PersonModule from './modules/PersonModule';
import FilesModule from './modules/FilesModule';

import UiTestModule from './modules/UiTestModule';

export default {

	dojot: {
		host: 'http://10.202.22.40/',
		customEndpoint: 'api',
	},

	routes: [
		{label:'Home', path:'/', module: HomeModule, isProtected: false},
		{label:'Login', path:'/login', module: LoginModule, isProtected: false},
		{label:'List and Details', path:'/ldm', module: ListAndDetailsModule, isProtected: false},
		{label:'Devices', path:'/devices', module: DevicesModule, isProtected: true},
		{label:'Cameras', path:'/cameras', module: CamerasModule, isProtected: false},
		{label:'Database sample', path:'/db', module: PersonModule, isProtected: true},
		{label:'Storage sample', path:'/files', module: FilesModule, isProtected: false},
		{label:'UI Test', path:'/ui', module: UiTestModule},
	],

	database: {
		engine: process.env.REACT_APP_DATABASE_ENGINE,
		configs: {
			apiKey: process.env.REACT_APP_DATABASE_API_KEY,
			authDomain: process.env.REACT_APP_DATABASE_AUTH_DOMAIN,
			databaseURL: process.env.REACT_APP_DATABASE_DATABASE_URL,
			projectId: process.env.REACT_APP_DATABASE_PROJECT_ID,
			storageBucket: process.env.REACT_APP_DATABASE_STORAGE_BUCKET,
			messagingSenderId: process.env.REACT_APP_DATABASE_MESSAGING_ID,
		},
	},
	 
	storage: {
		engine: process.env.REACT_APP_DATABASE_ENGINE,
		configs: {
			apiKey: process.env.REACT_APP_DATABASE_API_KEY,
			authDomain: process.env.REACT_APP_DATABASE_AUTH_DOMAIN,
			databaseURL: process.env.REACT_APP_DATABASE_DATABASE_URL,
			projectId: process.env.REACT_APP_DATABASE_PROJECT_ID,
			storageBucket: process.env.REACT_APP_DATABASE_STORAGE_BUCKET,
			messagingSenderId: process.env.REACT_APP_DATABASE_MESSAGING_ID,
		},
	},

	jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaXh5Vmk5V1JuN296NmttOTN1cVhSSjZZSG1pZmVhMSIsImlhdCI6MTU0OTM3OTkyNCwiZXhwIjoxNTQ5MzgwMzQ0LCJwcm9maWxlIjoiYWRtaW4iLCJncm91cHMiOlsxXSwidXNlcmlkIjoxLCJqdGkiOiIxOGZkODVhOWY5YmQ1MDQ1NWJjMWNhZGYzYzkwMGFkZCIsInNlcnZpY2UiOiJhZG1pbiIsInVzZXJuYW1lIjoiYWRtaW4ifQ.2wdVL0HNI5vMfYix0DEas_fMTj5xqadtleRm41m-6-w',
}
