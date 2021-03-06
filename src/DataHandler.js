import Dojot from '@znti/dojot-web';
import Database from '@znti/dojot-database';
import Storage from '@znti/dojot-storage';

export default class DataHandler {

	initialize = (configs) => {
		let dojotConfigs = configs.dojot;
		let dojot = new Dojot();
		console.log('Configuring dojot client with configs:', dojotConfigs);
		return dojot.configure(configs.dojot).then((client) => {
			console.log('All set')
			this.dojot = client;
			return 0;
		}).then(val => {
			let databaseConfigs = configs.database;
			console.log('Initializing Database client with:', databaseConfigs);
			this.database = new Database(databaseConfigs);
			return 0;
		}).then(val => {
			let storageConfigs = configs.storage;
			console.log('Initializing Storage client with:', storageConfigs);
			this.storage = new Storage(storageConfigs);
			return 0;
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
