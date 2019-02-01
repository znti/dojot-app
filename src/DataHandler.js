import Dojot from '@znti/dojot-web';
import configs from './configs';

export default class DataHandler {
	constructor() {
		let dojot = new Dojot();
		let dojotHost = configs.dojot.host;
		console.log('Configuring dojot client pointing to', dojotHost);
		dojot.configure(dojotHost).then((client) => {
			console.log('All set')
			this.dojot = client;
		});
	}

	getAuthToken = () => {
		return this.dojot.getAuthToken();
	}

	initializeWithCredentials = (username, password) => {
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
			let jwt = authToken;
      console.log('Loaded previous token', jwt);
      this.dojot.initializeWithAuthToken(jwt).then(() => {
        console.log('Initialized the client with the previously saved token');
        this.setState({authenticated: true, jwt});
      });
	}

	ping = () => {
		console.log('pong');
	}

}
