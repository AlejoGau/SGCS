Ext.define('WebMG.model.PagosModel', {
    extend: 'Ext.data.Model',
    fields: [/*{name:'cuota',type:'string'},*/
             {name:'importe',type:'float'},
             {name:'forma',type:'string'},
             {name:'formaId', type:'int'},
             {name:'formaDescripcion',type:'string'},
             {name:'numeroCheque',type:'string'},
             {name:'banco',type:'string'},
             {name:'firmante',type:'string'},
             {name:'bancoNombre',type:'string'},
             {name:'firmanteNombre',type:'string'},
             {name:'vencimiento',type:'string'}]
});