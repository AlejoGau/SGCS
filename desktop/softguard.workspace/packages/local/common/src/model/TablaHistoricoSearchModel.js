//MIGRADO2024
Ext.define('Common.model.TablaHistoricoSearchModel', {
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
        defaultValue: 3095
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 's_tablahistoricos'
        },
		{name:'iid_reporte',type:'int',defaultValue:0},
        {name:'c_periodo',type:'string'},
        {name:'n_usado',type:'int',defaultValue:0},
        {name:'_periodo',type:'string',
            convert: function(v, record){
                    var periodo = record.get('c_periodo');
                    var year = periodo.match(/\d{4}/g);
                    var month = periodo.match(/\d{2}$/g);
                   
                    var monthString = '';
                    switch (parseInt(month)){
                        case 1: monthString = 'Enero'; break;
                        case 2: monthString = 'Febrero'; break;
                        case 3: monthString = 'Marzo'; break;
                        case 4: monthString = 'Abril'; break;
                        case 5: monthString = 'Mayo'; break;
                        case 6: monthString = 'Junio'; break;
                        case 7: monthString = 'Julio'; break;
                        case 8: monthString = 'Agosto'; break;
                        case 9: monthString = 'Septiembre'; break;
                        case 10: monthString = 'Octubre'; break;
                        case 11: monthString = 'Noviembre'; break;
                        case 12: monthString = 'Diciembre'; break;      
                    }
                    return getLocale(monthString) + ' ' + year;
            }
            
        }
        ],
		
    
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/rest/search/s_tablahistoricos',
		appendId : true
	}
});