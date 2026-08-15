//MIGRADO2024
Ext.define('Common.model.p_grabacion_mp4SearchModel', {
   extend: 'Ext.data.Model',
   idProperty: 'grm_idKey',
   fields: [{
       name: 'grm_idKey',
       type: 'int'
       },
    {name:'grm_cArchivo',type:'string'},
    {name:'grm_dFechaHora',type:'date'},
    {name:'grm_iidCuenta',type:'int'},
    {name:'grm_iidRecepcion',type:'int'},
    {name:'grm_cTipo',type:'string'},
    {name:'grm_cCarpeta',type:'string'},
    {name:'cue_clinea',type:'string'},
    {name:'cue_ncuenta',type:'string'}
    
   ],
   proxy: {
    type: 'rest',
            reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
            },
    url : '/Rest/search/p_grabacion_mp4',
    appendId : false
}
});