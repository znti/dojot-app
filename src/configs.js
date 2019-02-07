// The plan here is to import from @dojot/gui-module-* instead
import HomeModule from './modules/HomeModule';
import ModuleA from './modules/ModuleA';
import ModuleB from './modules/ModuleB';
import ModuleC from './modules/ModuleC';
import ListAndDetailsModule from './modules/ListAndDetailsModule';
import LoginModule from './modules/LoginModule';

export default {

	dojot: {
		host: 'http://localhost/api',
//		host: 'http://10.202.21.65/api',
	},

	routes: [
		{label:'Home', path:'/', module: HomeModule},
		{label:'Module A', path:'/moduleA', module: ModuleA, isProtected: true},
		{label:'Module B', path:'/moduleB', module: ModuleB, isProtected: true},
		{label:'Module C', path:'/moduleC', module: ModuleC, isProtected: true},
		{label:'List and Details', path:'/ldm', module: ListAndDetailsModule, isProtected: false},
		{label:'Login page', path:'/login', module: LoginModule, isProtected: false},
	],

	jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaXh5Vmk5V1JuN296NmttOTN1cVhSSjZZSG1pZmVhMSIsImlhdCI6MTU0OTM3OTkyNCwiZXhwIjoxNTQ5MzgwMzQ0LCJwcm9maWxlIjoiYWRtaW4iLCJncm91cHMiOlsxXSwidXNlcmlkIjoxLCJqdGkiOiIxOGZkODVhOWY5YmQ1MDQ1NWJjMWNhZGYzYzkwMGFkZCIsInNlcnZpY2UiOiJhZG1pbiIsInVzZXJuYW1lIjoiYWRtaW4ifQ.2wdVL0HNI5vMfYix0DEas_fMTj5xqadtleRm41m-6-w',
}
