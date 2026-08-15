Ext.define('GestorSim.model.ComandoGpsConfigModel', {
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
            name:'Tipo', //va el id del comando tcm_iid de la tabla _tablas..t_comandos
            type:'int'
        },
        {
            name: 'Name', // nombre del comando tcm_cdescripcion desde _tablas..t_comandos
            type: 'string'
        },
        {
            name:'Config',
            type:'string'
        },
        {
            name:'cComando', //
            type: 'string'
        },{
            name:'Modem',
            type: 'int'
        }
    ]
});