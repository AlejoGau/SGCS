Ext.define('GestorSim.model.PanelCommandSearchModel', {
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
        'pan_iidcuenta','pan_ccodigo','pan_mubicacion','pan_ccallerid1','pan_ccallerid2','pan_ccallerid3','pan_ccallerid4','pan_ccallerid5',
        {
            name: 'pan_nmostrar',
            type: 'int',
            defaultValue: 2
        }
        ,'pan_csender','pan_cnrosim1','pan_ccompania1','pan_cnrosim2','pan_ccompania2','pan_cgprs'
        
        
        //Dedalo 28/9/2018 gcs estaba con el campo pan_cconfig pero los clientes tienen pan_cConfig se ajusta para compatibilidad.
        //[Adrian] 08/11/2018 modifque el cambio que hizo rodirgo para que soporte los 2 casos
        ,{
            name: 'pan_cConfig',
            type: 'string'
        },{
            name: 'pan_cconfig',
            type: 'string',
           // mapping: 'pan_cConfig'
           convert: function (v,r) {
               if(v) {
                   return v
               } else {
                   return r.get('pan_cConfig')
               }
           }
        },
        {
            name: 'pan_rpmidKey',
            type: 'int'
        },{
            name: 'pan_cdescripcion',
            type: 'string'
        },{
            name: 'pan_ireceptor',
            type: 'int',
            mapping: 'pan_iReceptor'
        },{
            name: 'pan_rpmidkey',
            type: 'int',
            mapping: 'pan_rpmidKey'
        },{
            name: 'rec_cdescripcion',
            type: 'string'
        },{
            name: 'pan_iModelo',
            type: 'int'
        }
        

    ],
    proxy: { 
        type: 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url: '/Rest/search/panelcommand' ,
    	appendId : true      
    }
});