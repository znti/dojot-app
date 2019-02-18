module.exports = {
	schema: [
		{
			id: 'id',
			tableType: 'text',
			type: 'text',
			label: 'ID',
			size: 'S',
		},{
			id: 'label',
			tableType: 'text',
			type: 'text',
			label: 'Nome',
			size: 'M',
		},{
			id: 'messagesLength',
			tableType: 'text',
			type: 'int',
			label: 'Mensagens',
			size: 'S',
		},{
			id: 'onlineStatus',
			tableType: 'text',
			type: 'string',
			label: 'Status',
			size: 'S',
		},{
			id: 'created',
			tableType: 'text',
			type: 'date',
			label: 'Data de criação',
			size: 'M',
		},{
			id: 'messages',
			tableType: 'none',
			type: 'text[]',
			label: 'Mensagens',
			size: 'S',
		}
	],

};
