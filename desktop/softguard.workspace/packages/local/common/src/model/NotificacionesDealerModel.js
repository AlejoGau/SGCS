//MIGRADO2024
Ext.define('Common.model.NotificacionesDealerModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int',
        mapping : 'tnd_idKey'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 3090
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 't_lineas'
        },
        {name:'tnd_idKey', type:'int', defaultValue:0, persist: false},
        {name:'tnd_cDealer', type:'string'},
        {name:'tnd_cDescripcion',type:'string'},
        {name:'tnd_iNotificarAlertas',type:'int', defaultValue:0},
        {name:'tnd_iGrupoAlarmas',type:'int', defaultValue:0},
        {name:'tnd_cAlarmas',type:'string'},
        {name:'tnd_cMail',type:'string'},
        {name:'tnd_cPlantillaMail',type:'string'},
        {name:'tnd_iTipo', type:'int'},
        {name:'tnd_iAdmin', type:'int'},
        {name:'tnd_iNotificarSP', type:'int', defaultValue:0}
    ],
    proxy: {
        type : 'rest',
        /*reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },*/
		url : '/Rest/t_notificaciones_dealer/',
        writer: {
            writeAllFields : true,
        },
		appendId : true
	}
});