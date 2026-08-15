//MIGRADO2024
Ext.define('Common.controller.ServTecGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.ServTecEstadoStore' ],
    models : [ 'ServTecSearchModel', 'm_st_cabeceraModel' ],
    views : [ 'ServTecGridView' ],
    init : function(config) {
		// genero los eventos
		this.control({
			'servtecgridview' : {
				afterrender : this.initView,
                objectnew: this.onNewObject
			},
            'servtecgridview button[action=search]' : {
                click: this.onSearchClick
            },
            'servtecgridview button[action=new]' : {
                click : this.onNuevoClick
            }
		});
	}, // cierro init
    
    onNewObject: function (record,view) {
        view.down('pagingtoolbar').doRefresh();
    },
    
    onNuevoClick: function(button, event, options) {
        var view =button.up('servtecgridview');   
        var controller = this;
        var model = this.getM_st_cabeceraModelModel();
        var now = new Date();
        var myobject = model.create({
            stc_iid_cuenta: view.record.get('cue_iid'),
            stc_dfecha_cierre: new Date(),
            stc_dfecha_desde_1: new Date(now.setHours(9)),
            stc_dfecha_hasta_1: new Date(now.setHours(18)),          
            stc_cmovil_1: '',
            stc_cmovil_2: '',
            stc_dfecha_modificacion: new Date()
            
        });  
        myobject.set('Id',0);
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Nuevo servicio técnico',
    		closeAction : 'destroy',
    		width : 750,
    		height : 300,
    		border : true,
            modal: true,
            view : view,
    		items : [
                {
                    xtype: 'sertecmwrformview',                    
                    callerView: view,
                    operador : view.operador,
                    operadorId: view.operadorId,
                    cuenta: view.record,
                    record : myobject,
                    caller: view,
                    rec_iid: view.rec_iid
                }
            ]
    	});
    	win.show();
    },
	initView : function(view) {
        var record = view.record;
        var filters = [];
        if (record)
        {
            filters.push({
                property: 'stc_iid_cuenta',
                value: record.get('cue_iid')
            });
        } else{
            view.down('#nuevoservicio').hide();
        }
        if(view.estadoFilter) {
            filters.push({
                property: 'stc_nestado',
                value: view.estadoFilter
            });
        }
        
		var store = Ext.create('Ext.data.Store', {
            model : this.getServTecSearchModelModel(),
            remoteFilter: true,
        	autoload: false,
            filters:filters
        });
        
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        view.bindStore(store);
        store.load({callback:function(records){
            console.log(records);
        }});
	},
    onSearchClick: function(button){
        var view = button.up('servtecgridview');
        var store = view.getStore();
        var estado = view.down('#estado');
        var filters = [];
        
        if (estado.getValue()){
            filters.push({ 
                property: 'stc_nestado',
                value: estado.getValue(),
                id: 'estado'
            });
        }
        
        store.filter(filters);
    }
});