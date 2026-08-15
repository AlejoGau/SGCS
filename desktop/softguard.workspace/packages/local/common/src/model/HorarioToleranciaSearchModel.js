//MIGRADO2024
Ext.define('Common.model.HorarioToleranciaSearchModel', {
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
defaultValue: 3100
       },
       {
       name: 'ObjectTypeName',
       type: 'string',
defaultValue: 'HorarioTolerancia'
       },
{name:'tol_naperturaantes',type:'int',defaultValue:1, convert:function(v,r){return v==0?1:v}},
            {name:'tol_caperturaantesalarma',type:'string',defaultValue:'', convert:function(v,r){return v.trim()}},
            {name:'tol_naperturadespues',type:'int',defaultValue:1, convert:function(v,r){return v==0?1:v}},
            {name:'tol_caperturadespuesalarma',type:'string',defaultValue:'', convert:function(v,r){return v.trim()}},
            {name:'tol_ncierreantes',type:'int',defaultValue:1, convert:function(v,r){return v==0?1:v}},
            {name:'tol_ccierreantesalarma',type:'string',defaultValue:'', convert:function(v,r){return v.trim()}},
            {name:'tol_ncierredespues',type:'int',defaultValue:1, convert:function(v,r){return v==0?1:v}},
            {name:'tol_ccierredespuesalarma',type:'string',defaultValue:'', convert:function(v,r){return v.trim()}},
            {name:'tol_nnyo',type:'int',defaultValue:2},
            {name:'tol_nnyc',type:'int',defaultValue:2},
            {name:'tol_nControl',type:'int',defaultValue:2},
            {name:'tol_nModo',type:'int',defaultValue:0},
            {name:'tol_nAPNYO',type:'int',defaultValue:2},
            {name:'tol_nAPNYC',type:'int',defaultValue:2},
            {
                name: 'tol_iidcuenta',
                type: 'int'
            },
            {name:'tol_dVacacionesHasta',type:'date',  dateFormat:'n/j/Y g:i:s A', defaultValue: new Date(-62135586000000)},
            {name:'tol_dVacacionesDesde',type:'date',  dateFormat:'n/j/Y g:i:s A', defaultValue: new Date(-62135586000000)}
       ],
   
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/rest/search/HorarioTolerancia',        
        appendId : false
    }
});