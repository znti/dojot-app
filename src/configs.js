// The plan here is to import from @dojot/gui-module-* instead
import HomeModule from './modules/HomeModule';
import ListAndDetailsModule from './modules/ListAndDetailsModule';
import DevicesModule from './modules/DevicesModule';
import CamerasModule from './modules/CamerasModule';
import LoginModule from './modules/LoginModule';

import PersonModule from './modules/PersonModule';

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
		{label:'UI Test', path:'/ui', module: UiTestModule},
	],

	 
	database: {
		engine: 'firebase',
		configs: {
			apiKey: "AIzaSyBC81OUdcCQB6Qt3-Rvtyn59SbR0ndsFQ8",
			authDomain: "safe-city-cimcamp.firebaseapp.com",
			databaseURL: "https://safe-city-cimcamp.firebaseio.com",
			projectId: "safe-city-cimcamp",
			storageBucket: "safe-city-cimcamp.appspot.com",
			messagingSenderId: "138793306167"
		},
	},

	jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaXh5Vmk5V1JuN296NmttOTN1cVhSSjZZSG1pZmVhMSIsImlhdCI6MTU0OTM3OTkyNCwiZXhwIjoxNTQ5MzgwMzQ0LCJwcm9maWxlIjoiYWRtaW4iLCJncm91cHMiOlsxXSwidXNlcmlkIjoxLCJqdGkiOiIxOGZkODVhOWY5YmQ1MDQ1NWJjMWNhZGYzYzkwMGFkZCIsInNlcnZpY2UiOiJhZG1pbiIsInVzZXJuYW1lIjoiYWRtaW4ifQ.2wdVL0HNI5vMfYix0DEas_fMTj5xqadtleRm41m-6-w',
}
