//MIGRADO2024
Ext.define('Common.model.EventoTimelineModel', {
    extend: 'Ext.data.Model',
    fields: [
         {name: 'usuario',  type: 'string'},
         {name: 'comentario',  type: 'string'},
         {name: 'iconCls',  type: 'string'},
         {name: 'cuenta',  type: 'string'},
         {name: 'evento',  type: 'string'},
         {name: 'eventoColor',  type: 'string'},
         {name: 'eventoColorLetra',  type: 'string'},
         {name: 'fecha',  type: 'date'},
         {name: 'order', type:'int', convert:function(v, record){
             if (record.get('fecha')){
                 return record.get('fecha').getTime();
             }else {
                 return v;
             }
         }}
    ],
    proxy: {
        type: 'memory'
    }
});