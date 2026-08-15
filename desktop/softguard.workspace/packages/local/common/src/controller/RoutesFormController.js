//MIGRADO2024
Ext.define('Common.controller.RoutesFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'RoutesModel', 'SoftguardUsuarioModel' ],
    views : [ 'RoutesFormView' ],
    init : function(config) {
        this.control({
            'routesformview' : {
                beforerender : this.initview
            },
            'routesformview button[action="save"]' : {
                click : this.onSaveClick
            }
        });
	}, // cierro init
	initview : function(view) {
        var controller = this;
        var mystore =Ext.create('Ext.data.Store',{
            model: this.getSoftguardUsuarioModelModel()
        });
        
        var _ObjectId = view.record.get('cuentaId');
        var pointsgrid = view.down('#pointsgrid');
        
        if(view.record.get('Id') != 0) {
            pointsgrid.setDisabled(false);
            view.down('#programgrid').setDisabled(false);
        }
        // cambio titulo para cleanapp
        if (UiApplication == 'CleanApp'){
            var _locale = getLocale('Postas de limpieza');
            pointsgrid.setTitle(_locale);
            pointsgrid.down('#pointscolumn').setText(_locale);
        }
        view.down('#usuarios').bindStore(mystore);
        mystore.load({ObjectId:_ObjectId,view:view,store:mystore});
        view.loadRecord(view.record);  
        if(view.readOnly) {
            notify('Solo lectura')
            view.down('#save').hide()
            view.down('#savepoint').hide()
            view.down('#agregar').hide()
            view.down('#add').hide()
            view.down('#Name').setDisabled(true)
            view.down('#datestart').setDisabled(true)
            view.down('#usuarios').setDisabled(true)
        }
	},
	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('routesformview');
		var record = myform.getRecord();
        var model = this.getRoutesModelModel();        
        record.setConfig({
            proxy: model.getProxy()
        });		myform.updateRecord(record);
        if (myform.isValid()){
            record.set('userId',view.down('#usuarios').getValue());
            if(!record.get('userId')) {
                record.set('userId',0);
            }
            if(record.get('userId') == 0) {
                notify ("No se realizará control sobre los usuarios que intervengan en la ronda");
            }
            record.set('datestart',new Date(record.get('datestart').setHours(12)));
            
    		record.save({
    			scope : this,
               
                view: view,
    			success: function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');           
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('objectchanged',view.caller,record);
                        //view.close();
                        
                        var pointsgrid= view.down('#pointsgrid')
                        pointsgrid.record = record;
                        pointsgrid.fireEvent('afterrecord', pointsgrid);
                        pointsgrid.setDisabled(false);
                        view.down('routespointsgridview').record = record;
                        view.down('routesprogramgridview').setRecord(record);
                        view.down('#programgrid').record = record;
                		view.down('#programgrid').setDisabled(false);
                        
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
    			},
    			button : button
    		});
        }
	}
});