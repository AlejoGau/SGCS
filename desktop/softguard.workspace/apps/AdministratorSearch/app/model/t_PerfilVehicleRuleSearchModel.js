Ext.define('AdministratorSearch.model.t_PerfilVehicleRuleSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',

    fields: [
        {name:'Id',type:'int'},
        {name:'Name',type:'string'},
        {name:'ObjectTypeId',type:'int',defaultValue:7056},
        {name:'ObjectTypeName',type:'string',defaultValue:'t_PerfilVehicleRule'},

        {name:'pvr_idPerfilVehicle',type:'int',defaultValue:0},

        // Los dias van como 'bool' y no como 'int' porque este modelo alimenta la grilla:
        // el checkcolumn setea un booleano, y el convert de 'int' lo volveria NaN.
        // La conversion a 1/0 para la base la hace saveRules() al persistir.
        {name:'pvr_iLunes',type:'bool',defaultValue:false},
        {name:'pvr_iMartes',type:'bool',defaultValue:false},
        {name:'pvr_iMiercoles',type:'bool',defaultValue:false},
        {name:'pvr_iJueves',type:'bool',defaultValue:false},
        {name:'pvr_iViernes',type:'bool',defaultValue:false},
        {name:'pvr_iSabado',type:'bool',defaultValue:false},
        {name:'pvr_iDomingo',type:'bool',defaultValue:false},

        {name:'pvr_tHoraInicio',type:'date',dateFormat:'MS',defaultValue:new Date(1900,0,1)},
        {name:'pvr_tHoraFin',type:'date',dateFormat:'MS',defaultValue:new Date(1900,0,1)}
    ],

    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/t_PerfilVehicleRule/',
        appendId : true
    }
});
