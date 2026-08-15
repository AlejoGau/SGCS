//MIGRADO2024
Ext.define('Common.controller.MGClientFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'MoneyguardClientSearchModel' ],
    views : [ 'MoneyguardClientFormView' ],
    init : function(config) {
		// genero los eventos
		this.control({
			'moneyguardclientformview' : {
				afterrender : this.initview,
                clientchanged: this.onClientChanged
			},
			'moneyguardclientformview button[action="asignar"]' : {
				click : this.onAsignarClick
			},
			'moneyguardclientformview button[action="delete"]' : {
				click : this.onDeleteClick
            }
        });
	}, 
	initview : function(view) {
        
        if(view.record && view.record.id && view.record.id.indexOf('OrganizationModel')>=0){
            
            var store = view.helperStore?view.helperStore: Ext.create('Ext.data.Store',{
                model: this.getMoneyguardClientSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: [{
                    property: 'cli_icodigo_ID',
                    value: view.record.get('Account')
                }]
            }).load({callback:function(records) {
                    view.loadRecord(records[0]);
                    
                    
                var dias = [
                {dia:"Lunes", campo:"cli_nlunes"},
                {dia:"Martes", campo:"cli_nmartes"},
                {dia:"Miercoles", campo:"cli_nmiercoles"},
                {dia:"Jueves", campo:"cli_njueves"},
                {dia:"Viernes", campo:"cli_nviernes"},
                {dia:"Sabado", campo:"cli_nsabado"},
                {dia:"Domingo", campo:"cli_ndomingo"}
                    ];
                var pilaDias = new Array();    
                for (var dia in dias) {
                   if(view.record.get(dias[dia].campo) == 1) {
                       pilaDias.push( dias[dia].dia );
                   }
                }
                
                       
                view.down('#dias').setValue(pilaDias.join(', '));
            }
        })
            
        } else if (view.record){
            view.loadRecord(view.record);
        }
        console.log(view.record);
	},
	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		myform = button.up('form').getForm();
		mymodel = myform.getRecord();
		
        oldname = mymodel.get('Name');
		myform.updateRecord(mymodel);
		newname = mymodel.get('Name');
		mymodel.save({
			scope : this,
			callback : function(record, operation) {
                notify('Los datos se guardaron correctamente');
			},
			button : button
		});
	},
	onDeleteClick : function(button, event, options) {
		var view = button.up('moneyguardclientformview');
        var organization = view.organization;
        if (organization){
            organization.set('Account','');
            organization.save();
        }
        
        var record = Ext.create(this.getMoneyguardClientSearchModelModel());
        view.loadRecord(record);
        
	},
    
    onAsignarClick : function(button, event, options) {
        var view =button.up('moneyguardclientformview');
        
        var win = Ext.create('Ext.Window', {
    		layout: 'fit',
			title : 'Seleccione un Cliente',
			closeAction : 'hide',
            itemId: 'MGWin',
            caller: view,
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view: view,
			items : [
                {xtype: 'mgclienthelperview'}
            ]
		});
		win.show();
    },
    
    onClientChanged: function(record, view){
        view.loadRecord(record);
        var organization = view.organization;
        if (organization){
            organization.set('Account',record.get('cli_icodigo_ID'));
            organization.save();
        }
        
    }
	
});