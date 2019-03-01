import Dojot from '@znti/dojot-web';
import Database from './data/Database';
import Storage from './data/Storage';

import configs from './configs';

export default class DataHandler {

	initialize = (configs) => {
		let dojotConfigs = configs.dojot;
		let dojot = new Dojot();
		console.log('Configuring dojot client with configs:', dojotConfigs);
		return dojot.configure(dojotConfigs).then((client) => {
			console.log('All set')
			this.dojot = client;
			return 3;
		}).then(val => {
			console.log('Initializing Database client with:', val);
			this.database = new Database(val);
			return 1;
		}).then(val => {
			console.log('Initializing Storage client with:', val);
			this.Storage = new Storage(val);
		});

	}

	setOnLoginChangeListener = (loginChangeListener) => {
		if(typeof loginChangeListener !== 'function') return;
		this.loginChangeListener = loginChangeListener;
	}

	onLoginChange = (authToken) => {
		this.loginChangeListener(authToken);
	}

	getAuthToken = () => {
		return this.dojot.getAuthToken();
	}

	initializeWithCredentials = (username, password) => {

//		// Bypassing dojot for now
//		return Promise.resolve(configs.jwt);

		console.log('Initializing dojot client', this.dojot, 'with', username, password);
		return new Promise((resolve, reject) => {
			this.dojot.initializeWithCredentials(username, password).then(() => {
				this.authToken = this.dojot.getAuthToken();
				console.log('Authentication completed on dojot client. Got token', this.authToken);
				resolve(this.authToken);
				this.onLoginChange(this.authToken);
			}).catch((err) => {
				reject(err);
			});
		});
	}

	initializeWithToken = (authToken) => {
		console.log('Initializing with token', authToken);

//		// Bypassing dojot for now
//		return Promise.resolve();

		return new Promise((resolve, reject) => {
			this.dojot.initializeWithToken(authToken).then(() => {
				console.log('Initialized the client with the previously saved token');
				resolve();
				this.onLoginChange(authToken);
			}).catch((err) => reject(err));
		});
	}

	logout = () => {
		this.onLoginChange(null);
		return Promise.resolve();
	}

	ping = () => {
		console.log('pong');
	}

}
