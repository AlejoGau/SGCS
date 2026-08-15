Ext.define('AdministratorSearch.controller.ObjectForeignTableFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ObjectForeignTableModel' ],
    views : [ 'ObjectForeignTableFormView' ],

    init : function(config) {
    	// genero los eventos

		this.control({
					'objectforeingtableformview' : {
						beforerender : this.initview
					},
					'objectforeingtableformview button[action="save"]' : {
						click : this.onSaveClick
					}
                });
	}, // cierro init

	initview : function(view) {
        var record = view.record;
        var parent = view.parent;
        
        record.set('_tabla', parent.get('ParentTypeName'));
        
        view.loadRecord(record);
	},


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('objectforeingtableformview');
        var win = button.up('window');
		var record = myform.getRecord();

		myform.updateRecord(record);
        
      
		record.save({
			callback : function(record, operation) {
                if (operation.success){
                    notify('Los datos se cuardaron correctamente');
                    win.caller.down('pagingtoolbar').doRefresh();
                    win.close();
                } else {
                    notifyError('Hubo un error al guardar los datos');
                }
                
			},
			button : button
		});

	},
    
    onAdd : function(button, event, options) {
    	var id = 0;
        var title = 'Nuevo Campo';
        var view = button.up('objectforeingtableformview');
        
        var record = view.record;
        var model = this.getObjectForeignTableModelModel();
        
        var bundle = Ext.create(model, {
            ObjectTypeId: record.get('ObjectTypeId'),
            ObjectId: record.get('Id'),
            Name: record.get('Name')
        })
        
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
    		title : title,
			closeAction : 'hide',
            itemId: 'versionesWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view: view, 
            iconCls: 'icon-brick-edit',
			items : [
                {
                    xtype: 'objectforeingtableformview',
                    record: bundle
                }
            ]
		});
		win.show();

	},

	
   
});