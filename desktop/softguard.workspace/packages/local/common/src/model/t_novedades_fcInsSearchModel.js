//MIGRADO2024
Ext.define('Common.model.t_novedades_fcInsSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int',
        persist: false
        },
        {
        name: 'Name',
        type: 'string',
        persist: false
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 3153,
        persist: false
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 't_novedades_fc',
        persist: false
        },
        {name:'nov_cdescripcion',type:'string'},
        {name:'nov_mimporte',type:'float'},
        {name:'nov_cimpuesto1',type:'string'},
        {name:'nov_cimpuesto2',type:'string'},
        {name:'nov_cimpuesto3',type:'string'},
        {name:'nov_idproducto',type:'int'},
        
        {name:'nfc_icliente',type:'int'},
        {name:'nfc_nrecurrente',type:'int',
        persist: false},
        {name:'nfc_nestado',type:'int',
        persist: false}
    ],
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/handler/SearchPostJson?search=t_novedades_fcIns',
        appendId : true
    }
});