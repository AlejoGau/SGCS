Ext.define('Tablas.model.TablasTiposModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
    	defaultValue: 3070
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_tipos'
        },
		{name:'tip_ccodigo',type:'string'},
        {name:'tip_cdescripcion',type:'string'},
        {name:'tip_curlimagen',type:'string'},
        {name:'tip_cservicio',type:'string'},
        {name:'tip_nTipo',type:'int',defaultValue:0},
        {name:'tip_nCondicion',type:'int',defaultValue:0},
        {
            name:'tipo_string', type:'string',
            convert: function(v, record){
                
                if(record.get('tip_nTipo') == 0) {
                    return 'Otros';
                } else if(record.get('tip_nTipo') == 1) {
                    return 'Vehiculo';
                } else if(record.get('tip_nTipo') == 2) {
                    return 'Persona';
                } else if(record.get('tip_nTipo') == 3) {
                    return 'Mascota';
                } else if(record.get('tip_nTipo') == 4) {
                    return 'Patrulla';    
                } else if(record.get('tip_nTipo') == 5) {
                    return 'Vigicontrol';    
                }
            }
        },
        {name:'tip_cRubro',type:'string'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_tipos/',
		appendId : true
	}
});
																
