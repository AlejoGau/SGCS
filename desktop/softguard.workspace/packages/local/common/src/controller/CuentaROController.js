//MIGRADO2024
Ext.define('Common.controller.CuentaROController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.TablaInstaladoresStore', 'Common.store.ProvinciasStore', 'Common.store.SiNoStore', 'Common.store.WebDealerSecurityModulesStore' ],
    models : [ 'SoftguardCuentaModel', 'TablaInstaladoresModel', 'ProvinciasModel' ],
    views : [ 'CuentaROView' ],
    init: function (config) {
        var me = this;
        // genero los eventos
        this.control({
            'cuentaroview':{
                afterrender : this.initview
            },
            'cuentaroview button[action=copy]':{
                click: this.onCopyClick
            },
            'cuentaroview button[action=abrir]':{
                click: this.onAbrirClick
            }
            
            
        });
    },
	initview : function(view) {
        
        if (view.cuentaMadre){          
            var recordCuenta = this.getSoftguardCuentaModelModel();
            
            var objectId = view.cuentaMadre.get('zon_iidcuenta');
            
            recordCuenta.load(objectId, {
    			callback : function(record,operation) {
                    if (operation.success){
                        view.record = record;
                        view.loadRecord(record);
                    }
    	        }
            });            
            
        } else if (view.record){
            view.loadRecord(view.record);
        } else {
            notifyError('Operación no soportada');
        }
        
        
	},
    
    onAbrirClick: function(button, event, options){
         var view = button.up('cuentaroview');
         var record = view.record;
         
         var id = record.get('cue_iid');
        
        var panel;
        if(view.up('cuentaview')) {
            panel = view.up('cuentaview').up('tabpanel');
        } else {
            panel = view.up('#center');
        }
        var title = record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' - ' + record.get('cue_cnombre');
        
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
            var newTab = Ext.widget('cuentaview', {
                tabConfig: {translate: false},
        		title : title,
                objectId: id,
                translate: false,
                closable: true,
                closeAction: 'destroy'
    		});
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
    },   
    
    onCopyClick: function(button, event, options){
        var view = button.up('cuentaroview');
        /*Ext.Ajax.request({
              url: '/rest/Search/CuentaCopy',
              params: { 
                    cue_clinea: view.cuentaMadre.get('zon_cdealer'), 
                    cue_ncuenta: Ext.String.leftPad(view.cuentaMadre.get('zon_ccuenta'),4,'0'),
                    cue_cnombre: view.cuentaMadre.get('zon_cdescripcion'),
                    cue_iid: view.cuentaMadre.get('zon_iidcuenta')
              },
              method: 'GET',
              scope: this,
              success: function(response){
                  
                  notify('Se actualizo con exito '+view.cuentaMadre.get('zon_cdealer')+" - "+ Ext.String.leftPad(view.cuentaMadre.get('zon_ccuenta'),4,'0'));
              }
        });*/
        
        
    
        //var selection = view.getSelectionModel().getSelection();
         
         
         
        var newView = Ext.widget('particionescopyformview',{
            
            selection: [view.cuentaMadre],
            callerView: view
        });
       
        // Lo agregamos al panel
        var myWindow = Ext.widget('window',{
            title: getLocale('Actualizar datos'),
            height: 350,
            width: 400,
            modal: true, 
            items: newView,
            closable: false,
            layout: 'fit'
        }).show();       
        
    }
    
});