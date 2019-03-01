const minMsDelay = 100;
const maxMsDelay = 1000;

export default class Database {
	constructor(configs) {
		console.log('Initializing database with configs:', configs);
		this.db = {};
	}

	post(data) {
		let delay = minMsDelay + Math.random()*(maxMsDelay - minMsDelay);
		return new Promise((resolve, reject) => {
			let id = Object.keys(this.db).length;
			let newEntry = {
				id,
				data,
			}
			this.db[id] = newEntry;
			setTimeout(() => {
				console.log(`Saved data under id '${id}' on ${delay} ms.`);
				resolve(id);
			}, delay);
		});
	}

	get(id) {
		let delay = minMsDelay + Math.random()*(maxMsDelay - minMsDelay);
		return new Promise((resolve, reject) => {
			let data = this.db[id];
			setTimeout(() => {
				console.log('ID', id, 'retrieved data: |', data, '| in', delay, ' ms.');
				resolve(data);
			}, delay);
		});
	}

}
