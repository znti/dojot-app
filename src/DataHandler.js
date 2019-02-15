import Dojot from '@znti/dojot-web';
import configs from './configs';

export default class DataHandler {

	initialize = (configs) => {
		let dojotConfigs = configs.dojot;

		let dojot = new Dojot();
		let dojotHost = configs.dojot.host;
		console.log('Configuring dojot client pointing to', dojotHost);
		return dojot.configure(dojotHost).then((client) => {
			console.log('All set')
			this.dojot = client;
			return 3;
		}).then(val => {
			console.log('OMG i have', val);
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
