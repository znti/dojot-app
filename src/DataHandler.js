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

	getAuthToken = () => {
		return this.dojot.getAuthToken();
	}

	initializeWithCredentials = (username, password) => {

//		// Bypassing dojot for now
//		return Promise.resolve(configs.jwt);

		console.log('Initializing dojot client', this.dojot, 'with', username, password);
		return new Promise((resolve, reject) => {
			this.dojot.initializeWithCredentials({
				username,
				passwd: password,
			}).then(initializedClient => {
				this.authToken = initializedClient.getAuthToken();
				console.log('Authentication completed on dojot client. Got token', this.authToken);
				resolve(this.authToken);
			}).catch((err) => reject(err));
		});
	}

	initializeWithAuthToken = (authToken) => {
		console.log('Initializing with token', authToken);

//		// Bypassing dojot for now
//		return Promise.resolve();

		return new Promise((resolve, reject) => {
			this.dojot.initializeWithAuthToken(authToken).then(() => {
				console.log('Initialized the client with the previously saved token');
				resolve();
			}).catch((err) => reject(err));
		});
	}

	ping = () => {
		console.log('pong');
	}

}
