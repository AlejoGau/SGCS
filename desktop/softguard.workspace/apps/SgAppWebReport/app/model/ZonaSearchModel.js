Ext.define('SgAppWebReport.model.ZonaSearchModel', {
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
        {name:'zon_iidcuenta',type:'int',defaultValue:0},
        {name:'zon_ccodigo',type:'string'},// convert: function(value){return Ext.String.trim(value);}},
        {name:'zon_cdescripcion',type:'string'},
        {name:'zon_codigoalarma',type:'string'},
        {name:'zon_clistaemergencia',type:'string'},
        {name:'zon_cimagen',type:'string'},
        {name:'zon_mobservacion',type:'string'},
        {name:'zon_ccodigorestauracion',type:'string'},
        {name:'zon_nminutosrestauracion',type:'int',defaultValue:0},
        {name:'zon_nmostrar',type:'int',defaultValue:0},
        {name:'zon_cdealer',type:'string'},
        {name:'zon_ccuenta',type:'string', convert: function(v, record){
            if (v){
                v = v.substr(0,4)
            }
            return v
        }},
        {name:'zon_nautoprocesa',type:'int',defaultValue:0},
        {name:'zon_cAlarmaAGenerar',type:'string'},
        {name:'_cuenta',type:'string', convert: function(v, record){
           
            return record.get('zon_cdealer')+"-"+record.get('zon_ccuenta');
        }},
        {name:'_codydesc',type:'string', convert: function(v, record){
           
            return record.get('zon_ccodigo')+"-"+record.get('zon_cdescripcion');;
        }},
        ],

    proxy: {
        type: 'rest',
        url: '/Rest/Zona/',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        appendId: true
    }

});