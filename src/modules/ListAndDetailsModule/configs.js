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

	// This list is supposed to be returned from the SDK
	data: [
		{ id: 'i01', name: 'Pedro', gender: '2', birthDate: '2001-10-10'},
		{ id: 'i02', name: 'Maria', gender: '1', birthDate: '2002-10-10'},
		{ id: 'i03', name: 'José', gender: '2', birthDate: '2003-10-10'},
		{ id: 'i04', name: 'Felipe', gender: '2', birthDate: '2004-10-10'},
		{ id: 'i05', name: 'Mariana', gender: '1', birthDate: '2005-10-10'},
		{ id: 'i06', name: 'Ronaldo', gender: '2', birthDate: '2006-10-10'},
		{ id: 'i07', name: 'Cristina', gender: '1', birthDate: '2007-10-10'},
		{ id: 'i08', name: 'Leticia', gender: '1', birthDate: '2008-10-10'},
		{ id: 'i09', name: 'Carlos', gender: '2', birthDate: '2009-10-10'},
		{ id: 'i10', name: 'Amanda', gender: '1', birthDate: '2010-10-10'},
		{ id: 'i11', name: 'Danilo', gender: '2', birthDate: '2011-10-10'},
	],

};
