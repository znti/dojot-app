module.exports = {

	schema: [
		{
			id: 'cameraLabel',
			type: 'text',
			label: 'Câmera',
			size: 'L',
		},{
			id: 'id',
			type: 'text',
			label: 'ID',
			size: 'S',
		}
	],

	data: [
		{ id: 'lab', cameraLabel: 'Laboratório', wsAddress: 'ws://10.202.22.40:8441/lab'},
		{ id: 'tc1', cameraLabel: 'Terminal Central 01', wsAddress: 'ws://10.202.22.40:8442/tc1'},
		{ id: 'tc2', cameraLabel: 'Terminal Central 02', wsAddress: 'ws://10.202.22.40:8443/tc2'},
	],

};
