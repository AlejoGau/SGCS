Ext.define('Common.controller.CuentasSinContratoGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'CuentaByFilterSearchModel' ],
    views : [ 'CuentasSinContratoGridView' ],

	init : function(config) {
		// genero los eventos
		this.control({
			'cuentassincontratogridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                cuentaselected: this.onCuentaSelected
			},
            'cuentassincontratogridview button[action=addCuenta]' : {
                click: this.onAddCuentaClick
			},
            'cuentassincontratogridview button[action=filterNohabilitadas]' : {
                click: this.onNohabilitadasClick
			},
            'cuentassincontratogridview button[action=filterHabilitadas]' : {
                click: this.onHabilitadasClick
			},
            'cuentassincontratogridview button[action=filterEnprueba]' : {
                click: this.onEnpruebaClick
			},
            'cuentassincontratogridview button[action=removefilter]' : {
                click: this.onRemovefilterClick
    		},
            'cuentassincontratogridview button[action=filterText]' : {
                click: this.onFiltertextClick
        	}
		});
	}, // cierro init

	initView : function(view) {
        var record = view.record;

        var filters = []
        if(view.filters) {
            filters = view.filters
        } else {
            filters.push({
                property: 'GetSqlFilter_CuentasByNotContrato:Function',
                value: '1'
            },
            {property:"cue_nparticion",value:"0"}
            )

            view.filters = filters;
        }

        if (view.hidebuttons){
            Ext.Array.each(view.hidebuttons, function(button){
                view.down(button).hide();
            })
        }
        
		view.store = Ext.create('Ext.data.Store', {
            model : this.getCuentaByFilterSearchModelModel(),
            remoteFilter: true,
            pageSize: 100,
            filters: filters,
        	autoload: false
        });
        
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        view.bindStore(view.store);
        view.store.load();
	},
    
    onAddCuentaClick : function(button, event, options) {
        var view =button.up('cuentassincontratogridview');
        var record = view.record;
        
        /* Debería ser un store con las cuentas libres pero no de MG sino de CS.
        var store = Ext.create('Ext.data.Store', {
            model : this.getMGClientSinEntidadModelModel(),
            remoteFilter: true,
            autoload: false
        });
        */
        
        var win = Ext.create('Ext.Window', {
    		layout: 'fit',
			title : 'Seleccione las cuentas',
			closeAction : 'hide',
            itemId: 'cuentaWin',
			width : 780,
			height : 550,
			border : true,
            modal: true,
            view: view,
			items : [
                {
                    xtype: 'cuentahelperview',
                    multiSelect: true,
                    //helperStore: store,
                    caller: view,
                    selectionEvent: 'cuentaselected'
                }
            ]
		});
		win.show();
	},
    
    
    
    onItemClick: function(view,record,item,index,e,options){
        var id = record.get('Id');
        var panel = view.up('#center');
        var title = record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' - ' + record.get('cue_cnombre');
        
        title = title.replace(',','');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
		if (!mytab) {
			var myLocation = "/a/dealer"+
            "?objectId=" + id + 
            "&autocreateviewport=true";
            
            var language = myQueryString.Language;

            if (language){
                myLocation =Ext.String.urlAppend(myLocation, 'Language='+language);
            }

           /* var newTab = Ext.create('Slbf.ux.uxiframe', {
    			title : title,
                translate:false,
                tabConfig: {translate: false},
    			id : id,
    			border : false,
    			src : myLocation,
                tabConfig: {
                    translate: false
                },
    			closable : true
    		});*/
           /* this.application._nameModule = 'Administrator';
            this.application._idModule = this.application.getModuleIdByName(this.application._nameModule);*/
            
            
            
            var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
            var recordAdminsitrator = storeSecurity.findRecord('KeyReference', 'Administrator')
            var recordDealerSearch = storeSecurity.findRecord('KeyReference', 'WebDealer')
            if(recordAdminsitrator && recordAdminsitrator.get('Available') == true) {  
                forceIdModule = recordAdminsitrator.get('Id')
            } else if (recordDealerSearch && recordDealerSearch.get('Available') == true) {  
                forceIdModule = recordDealerSearch.get('Id')
            }
            
            var newTab = Ext.widget('cuentaview', {
                tabConfig: {translate: false},
                translate:false,
        		title : title,
                record: record,
                closable: true,
                objectId:record.get('cue_iid') ,
                recordCuenta: record,
                closeAction: 'destroy',
                forceIdModule: forceIdModule
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
        
    },
    
    onCuentaSelected: function(cuentas, view){
        var entidad = view.record;
        var model = this.getOrganizationCuentaRangoModelModel();
        
        view.cuentasAsignando = cuentas.length;
        
        Ext.Array.each(cuentas, function(cuenta, index){
            var record = Ext.create(model,{
                IdEntidad: entidad.get('Id'),
                Dealer: cuenta.get('cue_clinea'),
                CuentaDesde: cuenta.get('cue_ncuenta'),
                CuentaHasta: cuenta.get('cue_ncuenta')
            })
            
            
            record.save({callback:function(){
                
                view.cuentasAsignando--;
                
                if(view.cuentasAsignando < 1) {
                    view.down('pagingtoolbar').doRefresh();    
                }
                
            }});
            
            /*
            if (index == (cuentas.length-1)){
                record.save({callback:function(){
                    view.down('pagingtoolbar').doRefresh();
                }});
            }else{
                record.save();
            }*/
            
        });
        
        
    },
    
    // BUSCADORES 
    
    onNohabilitadasClick: function(button, event, options){
        var view = button.up('cuentassincontratogridview');
        var store = view.getStore();
        var filters = Ext.Array.clone(view.filters);
        filtes.add({property:'tip_nCondicion',value:1, id: 'tip_nCondicion'});
        store.currentPage = 1;
        store.filter(filters);
        view.down('#query').setValue('');
    },
    
    onHabilitadasClick: function(button, event, options){
        var view = button.up('cuentassincontratogridview');
        var store = view.getStore();
        store.filters.clear(false);
        store.currentPage = 1;
        store.filter([{property:'Situacion',value:'Habilitada'},{property:'tip_nCondicion',value:1, id: 'tip_nCondicion'}]);
        view.down('#query').setValue('');
    },
    
    onEnpruebaClick: function(button, event, options){
        var view = button.up('cuentassincontratogridview');
        var store = view.getStore();
        store.filters.clear();
        store.currentPage = 1;
        store.filter([{property:'Situacion',value:'En Prueba'},{property:'tip_nCondicion',value:1, id: 'tip_nCondicion'}]);
        view.down('#query').setValue('');
    },
    
    onRemovefilterClick: function(button, event, options){
        var view = button.up('cuentassincontratogridview');
        var store = view.getStore();
        var filters = Ext.Array.clone(view.filters);
        store.filters.clear(false);
        store.currentPage = 1;
        store.filter(filters);
    },
    
    onFiltertextClick: function(button, event, options){
        var view = button.up('cuentassincontratogridview');
        var store = view.getStore();
        var query = view.down('#query');
        var queryType = view.down('#queryType');
        var filters = Ext.Array.clone(view.filters);
        store.filters.clear(false);
        store.currentPage = 1;
        
        if (queryType.getValue() == 'Dealer-Cuenta' && query.getValue()){
            var valores = query.getValue().split('-');
            filters.push({property:'cue_ncuenta',value:valores[1]});
            filters.push({property:'cue_clinea',value:valores[0]});
        }else{
            if (query.getValue())
            filters.push({property:queryType.getValue(),value:query.getValue()})
        }
        store.filter(filters);
    }

});