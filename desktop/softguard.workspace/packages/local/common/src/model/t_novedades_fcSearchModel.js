//MIGRADO2024
Ext.define('Common.model.t_novedades_fcSearchModel', {
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
        defaultValue: 3107
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 's_operadores'
        },
		{name:'nov_icodigo_ID',type:'int'},
{name:'nov_cdescripcion',type:'string'},
{name:'nov_mimporte',type:'float'},
{name:'nov_cimpuesto1',type:'string'},
{name:'nov_cimpuesto2',type:'string'},
{name:'nov_cimpuesto3',type:'string'},
{name:'imp1descripcion',type:'string'},
{name:'imp2descripcion',type:'string'},
{name:'imp3descripcion',type:'string'},
{name:'cli_cnombre',type:'string'},
{name:'nfc_nrecurrente',type:'string'},
{name:'nfc_nestado',type:'string'},
{name:'nfc_icodigo_ID',type:'string'},
        ],
		
   
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/search/t_novedades_fc',
		appendId : true
	}
});