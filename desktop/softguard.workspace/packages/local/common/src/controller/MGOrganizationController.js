//MIGRADO2024
Ext.define('Common.controller.MGOrganizationController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.MoneyGuardModuleStore' ],
    models : [ 'm_clientes_fcModel', 'MoneyguardClientSearchModel' ],
    views : [ 'OrganizationMoneyguardView' ],
    init : function(config) {
        // genero los eventos
		this.control({
            'organizationmoneyguardview' : {
                beforerender : this.initView
    		}
		});
	}, // cierro init
    
    initView: function(view){
        var objectId = view.objectId;
        var record = view.record;
        view.organization= record;
        this.loadRecord(record.get('Account'),view);
    },
    loadRecord: function(account,view){
        record = this.getMoneyguardClientSearchModelModel();
        if (account == '') {    
            // dejo para que busquen la cuenta
            this.setRecord(undefined,view);
		} else {            
		    record.load(account, {
                //params:{id:null},
				callback : function(record,operation) {
                    if (operation.success){
					    this.setRecord(record,view); 
                    }
				},
				scope : this
			});
        }
    },
    
    setRecord: function(record,viewport){
        var myPanel = viewport.down('tabpanel');
        var center = viewport.down('#center');
        var targetTab = viewport.targetTab;
      
        // si center es un tabpanel agrego el tab, 
        // sino supongo que el form esta cargado y le agrego el record
        if (myPanel){
            this.getM_clientes_fcModelModel().load(viewport.record.get('Account'),{callback:function (clienteRecord) {
                var datos = Ext.widget('moneyguardclientformview',{
                    record: clienteRecord,
                    organization: viewport.organization,
                    title: 'Datos',
                    targetTab: targetTab,
                    closable: false
                });
                
                myPanel.add(datos); 
                myPanel.setActiveTab(datos);
            }})
			var comprobantes = Ext.widget('mgcomprobantesgridview',{
                record: viewport.record,
                organization: viewport.organization,
                title: 'Comprobantes',
                targetTab: targetTab,
                closable: false
        	});
			myPanel.add(comprobantes);
        } else {
            var form = viewport.down('moneyguardclientformview');
            form.record = record;
            form.loadRecord(record);
            
            // cambio el titulo del padre
            var center = window.parent.Ext.getCmp('center');
            if (center){
                center.getActiveTab().setTitle(record.get('Name'));
            }
        };
        var _module = viewport.down('moduletreeview');
        if (_module!=null) {
            _module.down('treeview').record= record;
            _module.record = record;
            _module.targetTab = center;
            _module.down('treeview').targetTab = center;
        }
    }
});