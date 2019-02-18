module.exports = {
	schema: [
		{
			id: 'id',
			label: 'ID',
			tableType: 'text',
			formType: 'text',
			size: 'S',
		},{
			id: 'label',
			label: 'Nome',
			tableType: 'text',
			formType: 'text',
			size: 'M',
		},{
			id: 'messagesLength',
			label: 'Mensagens',
			tableType: 'int',
			formType: 'none',
			size: 'S',
		},{
			id: 'onlineStatus',
			label: 'Status',
			tableType: 'text',
			formType: 'string',
			size: 'S',
		},{
			id: 'created',
			label: 'Data de criação',
			tableType: 'text',
			formType: 'date',
			size: 'M',
		},{
			id: 'messages',
			label: 'Mensagens',
			tableType: 'none',
			formType: 'text[]',
			size: 'L',
		}
	],

};
