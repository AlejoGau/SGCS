Ext.define('AdministratorSearch.model.t_PerfilVehicleRuleModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',

    fields: [
        {name:'Id',type:'int'},
        {name:'Name',type:'string'},
        {name:'ObjectTypeId',type:'int',defaultValue:7056},
        {name:'ObjectTypeName',type:'string',defaultValue:'t_PerfilVehicleRule'},

        {name:'pvr_idPerfilVehicle',type:'int',defaultValue:0},
        {name:'pvr_iLunes',type:'int',defaultValue:0},
        {name:'pvr_iMartes',type:'int',defaultValue:0},
        {name:'pvr_iMiercoles',type:'int',defaultValue:0},
        {name:'pvr_iJueves',type:'int',defaultValue:0},
        {name:'pvr_iViernes',type:'int',defaultValue:0},
        {name:'pvr_iSabado',type:'int',defaultValue:0},
        {name:'pvr_iDomingo',type:'int',defaultValue:0},

        // Se persisten como DATETIME. La fecha (1900-01-01) es de relleno: solo importa la hora.
        {name:'pvr_tHoraInicio',type:'date',dateFormat:'MS',defaultValue:new Date(1900,0,1)},
        {name:'pvr_tHoraFin',type:'date',dateFormat:'MS',defaultValue:new Date(1900,0,1)}
    ],

    proxy: {
        type : 'rest',
        url : '/Rest/t_PerfilVehicleRule/',
        appendId : true
    }
});
