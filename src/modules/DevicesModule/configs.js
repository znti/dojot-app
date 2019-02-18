module.exports = {
	schema: [
		{
			id: 'id',
			type: 'text',
			label: 'ID',
			size: 'S',
		},{
			id: 'messagesLength',
			type: 'int',
			label: 'Mensagens',
			size: 'S',
		},{
			id: 'onlineStatus',
			type: 'string',
			label: 'Status',
			size: 'S',
		},{
			id: 'created',
			type: 'date',
			label: 'Data de criação',
			size: 'M',
		},{
			id: 'label',
			type: 'text',
			label: 'Nome',
			size: 'M',
		}
	],

};
