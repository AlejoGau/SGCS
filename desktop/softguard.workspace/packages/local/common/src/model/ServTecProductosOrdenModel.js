//MIGRADO2024
Ext.define('Common.model.ServTecProductosOrdenModel', {
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
         defaultValue: 3102
         },
         {
         name: 'ObjectTypeName',
         type: 'string',
         defaultValue: 'm_st_cabecera'
         },
         {name:'spr_idKey',type:'int',defaultValue:0},
         {name:'Name',type:'string'},
         {name:'spr_iServicio',type:'int'},
         {name:'spr_iVisita',type:'int'},
         {name:'spr_iProducto',type:'int'},
         {name:'spr_iCantidad',type:'int'},
         
         
    ],
     proxy: {
         type : 'rest',
         url : '/Rest/SerTecProductosOrden/',
         appendId : true,
         writer:{ writeAllFields:true }
     }
 });
