Ext.define('iOT.model.iOTSolicitudesSearchModel', {
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
        /*{
        name: 'ObjectTypeId',
        type: 'int',
		defaultValue: 3222
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'm_sgnotes'
        },*/
		{name:'pdl_cLockName',type:'string'},
        {name:'pdl_iStatus',type:'int',defaultValue:0},
        {name:'pdl_tReqFechaHora',type:'date'},
            //, dateFormat:'MS', defaultValue: new Date(-62135586000000)},
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string'},
        {name:'cue_clocalidad',type:'string'},
        {name:'cue_ccalle',type:'string'},
        {name:'cue_cnombre',type:'string'},        
        {name: '_lineacuenta', type:'string',convert: function(v, record){
            return record.get('cue_clinea')+'-'+record.get('cue_ncuenta');   
        }},   
        {name:'cue_cLatLng',type:'string'},     
        {name:'pdl_cAuthorized',type:'string'},
        ],
        proxy : {
            type : 'rest',
            reader: {
                type : 'json',
                rootProperty: 'rows',
                totalProperty : 'total'
            },
            url : '/Rest/search/solicitudesAccesoSearch',
            appendId : false
        }
});