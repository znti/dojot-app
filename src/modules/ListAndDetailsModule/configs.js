module.exports = {
	schema: [
		{
			id: 'id',
			type: 'text',
			label: 'ID',
			size: 'S',
		},{
			id: 'name',
			type: 'text',
			label: 'Nome',
			size: 'L',
		},{
			id: 'gender',
			type: 'radio',
			label: 'Sexo',
			options: [
				{label: 'Feminino', value: 1},
				{label: 'Masculino', value: 2},
			],
			size: 'M'
		},{
			id: 'birthDate',
			type: 'date',
			label: 'Data de nascimento',
			size: 'M',
		}
	],
};