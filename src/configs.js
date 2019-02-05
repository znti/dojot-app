// The plan here is to import from @dojot/gui-module-* instead
import HomeModule from './modules/HomeModule';
import ModuleA from './modules/ModuleA';
import ModuleB from './modules/ModuleB';
import ModuleC from './modules/ModuleC';
import ListAndDetailsModule from './modules/ListAndDetailsModule';

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
	],
}
