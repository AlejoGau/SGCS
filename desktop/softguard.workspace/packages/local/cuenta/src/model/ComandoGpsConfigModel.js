Ext.define('Cuenta.model.ComandoGpsConfigModel', {
    extend: 'Ext.data.Model',
    idProperty: 'ticks',
    fields: [{
            name: 'Id',
            type: 'int',
            convert: function(v){
                if (v==0){
                    var d = new Date();
                    v = d.getTime();
                    
                }
                return v;
            }
        },
        {
            name:'Tipo',
            type:'int'
        },
        {
            name: 'Name',
            type: 'string'
        },
        {
            name:'Config',
            type:'string'
        },
        {
            name:'cComando',
            type: 'string'
        }
    ]
});