//MIGRADO2024
Ext.define('WeSafe.model.WeSafeEventosInformadosModel', {
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
       defaultValue: 3067
       },
       {
       name: 'ObjectTypeName',
       type: 'string',
     defaultValue: 'EventosInformados'
       },
     {name:'RowNumber',type:'int'},
       {name:'id',type:'int'},
       {name:'fechaHora',type:'string'},
       {name:'descripcionEvento',type:'string'},
       {name:'video',type:'int'},
       {name:'imagen',type:'int'},
       {name:'audio',type:'int'},
       {name:'comentarioEvento',type:'string'},
       {name:'usuarioEvento',type:'string'},
       {name:'cantReportes',type:'int'},
       {name:'estadoEvento',type:'string'},
       {name:'idEstado',type:'int'}
   ]
});