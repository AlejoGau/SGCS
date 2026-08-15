Ext.define('AdministratorSearch.model.t_PerfilVehicleSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',

    fields: [
        {name:'Id',type:'int'},
        {name:'Name',type:'string'},
        {name:'ObjectTypeId',type:'int',defaultValue:7055},
        {name:'ObjectTypeName',type:'string',defaultValue:'t_PerfilVehicle'},

        {name:'pfv_cNombre',type:'string'},
        {name:'pfv_cDescripcion',type:'string'},
        {name:'pfv_iAplicaFeriado',type:'int',defaultValue:0}
    ],

    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/t_PerfilVehicle/',
        appendId : true
    }
});
