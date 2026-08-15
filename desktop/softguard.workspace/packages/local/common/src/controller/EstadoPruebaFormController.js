//MIGRADO2024
Ext.define('Common.controller.EstadoPruebaFormController', {
    extend: 'Ext.app.Controller',
        stores : [ 'Common.store.SoftguardEstadoEstadoStore', 'Common.store.SoftguardEstadoTipoStore' ],
    	models : [ 'NameValueIntModel', 'SoftguardEstadoModel' ],
		views : [ 'EstadoPruebaFormView' ],
    init: function (config) {
        var me = this;
        this.control({
    
            'estadopruebaformview':{
                beforerender: this.initview
            },
            'estadopruebaformview button[action=save]':{
                click: this.onSaveClick
            },
            'estadopruebaformview button[action=deshabilitar]':{
                click: this.onDeshabilitarClick
            },
            'estadopruebaformview button[action=habilitar]':{
                click: this.onHabilitarClick
            },
            'estadopruebaformview button[action=prueba]':{
                click: this.onPruebaClick
            },
            'estadopruebaformview #duracion':{
                change: this.onDuracionChange
            },
            'estadopruebaformview #tipo':{
                select: this.onTipoSelect
            },
            
        });
		
    },
   
    
    initview : function(view) {
        var cuenta = view.cuenta;
        var objectId = cuenta.get('Id');
    	this.getSoftguardEstadoModelModel().load(objectId, {
            view: view,
            scope: this,
			success : function(record,operation) {
                var controller = operation.scope;
                var view = operation.view;
                var desdeTime = view.down('#desdeTime');
                var hastaTime = view.down('#hastaTime');
                
                
                if (!record){
                    controller.createRecord(operation.view);
                } else {
                    view.record=record;
                    var estado = record.get('est_nestado');
                    
                    
                    if (record.get('est_dfechadesde').getFullYear()< 1900){
                        var desde = new Date();
                        var hasta = new Date();
                        
                        record.set('est_dfechadesde', desde);
                        record.set('est_dfechahasta', hasta);
                    };
                    
                    desdeTime.setValue(record.get('est_dfechadesde'));
                    hastaTime.setValue(record.get('est_dfechahasta'));
        
                     switch(estado)
                    {
                        case 0:
                              view.down('#btnhabilitar').hide();
                              break;
                        case 1:
                              view.down('#btnprueba').hide();
                              break;
                        case 2:
                              view.down('#btndeshabilitar').hide();
                              break;
                        case 3:
                            //view.down('#btnxzonas').hide();
                            break;
                    }
                    
                    if (estado == 0 || estado == 4){
                        controller.hideHabilitadoFields(view);
                    } else {
                        controller.showHabilitadoFields(view);
                        if (estado > 2){
                            var combo = view.down('#tipo');
                            var store = combo.getStore();
                            store.removeAt(0)
                        }
                    }
        
                    view.loadRecord(view.record);
                }
			},
			failure : function(record,operation) {
                var controller = operation.scope;
                if (operation.error.status = 404){
                    controller.createRecord(operation.view);
                }else{
    				console.log(arguments);
                }
			}
		});
	},
    
    createRecord: function(view){
        var model = this.getSoftguardEstadoModelModel();
        var viewport = view.up('#viewport');
        var cuenta = viewport.cuenta;
        var desdeTime = view.down('#desdeTime');
        var hastaTime = view.down('#hastaTime');
        view.record = model.create({
            Id: cuenta.get('cue_iid'),
            est_dfechadesde: new Date(),
            est_dfechahasta: new Date()
        });
        view.loadRecord(view.record);
        desdeTime.setValue(view.record.get('est_dfechadesde'));
        hastaTime.setValue(view.record.get('est_dfechahasta'));
    },
    
	onSaveClick : function(button, event, options) {
        var view =button.up('form');
        var myform = view.getForm();
        var record = myform.getRecord();
        myform.updateRecord(record);
        var hastaField = myform.findField('est_dfechahasta');
        var hastaValue = hastaField.getValue();
        
        record.set('est_dfechahasta', hastaValue);
        
        var desdeTime = view.down('#desdeTime');
        var hastaTime = view.down('#hastaTime');
        var fechaDesde = record.get('est_dfechadesde');
        var fechaHasta = record.get('est_dfechahasta');
        var tiempoDesde = desdeTime.getValue();
        var tiempoHasta = hastaTime.getValue();
        
        fechaHasta.setHours(tiempoHasta.getHours());//-(tiempoHasta.getTimezoneOffset()/60));
        fechaHasta.setMinutes(tiempoHasta.getMinutes());
        fechaDesde.setHours(tiempoDesde.getHours());//-(fechaDesde.getTimezoneOffset()/60));
        fechaDesde.setMinutes(tiempoDesde.getMinutes());
        
        
		record.save({
            view: view,
			failure : function() {
				console.log(arguments);
			},
			success : function() {
                var win = view.up('window');
                notify('El estado se guardó con éxito');
                win.caller.down('pagingtoolbar').doRefresh();
                win.close();
			}
		});
	},
    
    onDeshabilitarClick: function(button, event, options) {
        var view =button.up('estadopruebaformview');
        var form = view.getForm();
        var record = form.getRecord();
        var combo = view.down('#tipo');
        var tipo = {Name:'Permanente', Value: 0};
        var store = combo.getStore();
        
        record.set('est_nestado', 2);
        form.loadRecord(record);
        this.hideHabilitadoFields(view);
        
        if(store.find('Value',0) == -1){
            store.insert(0, tipo)
        }
    },
    
    onHabilitarClick: function(button, event, options) {
        var view =button.up('estadopruebaformview');
        var form = view.getForm();
        var record = form.getRecord();
        //var store = combo.getStore();
        
        view.down('#btnhabilitar').hide();
        view.down('#btnprueba').show();
        view.down('#btndeshabilitar').show();
        //view.down('#btnxzonas').show();
        
        if (view.hideControls){
            Ext.Array.each(view.hideControls, function(control){
                view.down(control).hide();
            })
        }
        
        record.set('est_nestado', 0);
        record.set('est_ntipo', 0); // pongo permanente
        form.loadRecord(record);
        this.hideHabilitadoFields(view);
    },
    onPruebaClick: function(button, event, options) {
        var view =button.up('estadopruebaformview');
            
        var form = view.getForm();
        var record = form.getRecord();
        var combo = view.down('#tipo');
        var store = combo.getStore();
        
        record.set('est_nestado', 1);
        record.set('est_ntipo', 1);
        record.set('est_nduracion',1);
        view.down('#duracion').setValue(1);
        combo.setValue(1);
        record.set('est_dfechadesde',new Date());
        form.loadRecord(record);
        this.showHabilitadoFields(view);
        
        if(store.find('Value',0) >= 0){
            store.removeAt(0)
        }
    },
    onZonasClick: function(button, event, options) {
        var view =button.up('estadopruebaformview');
        var form = view.getForm();
        var record = form.getRecord();
        var combo = view.down('#tipo');
        var store = combo.getStore();
        
        record.set('est_nestado', 3);
        form.loadRecord(record);
        this.showHabilitadoFields(view);
        
        if(store.find('Value',0) >= 0){
            store.removeAt(0)
        }
    },
    hideHabilitadoFields: function(view){
        view.down('#nohabilitado').hide();
    },
    
    showHabilitadoFields: function(view){
            
        view.down('#nohabilitado').show();
    },
   
    onTipoSelect: function(combo, records, options){
        var view = combo.up('form');
        var record = view.record;
        var form = view.getForm();
        var desde = new Date();
        var desdeField = form.findField('est_dfechadesde');
        var desdeTime = view.down('#desdeTime');
        var hasta = form.findField('est_dfechahasta');
        var hastaTime = view.down('#hastaTime');
        var duracion = form.findField('est_nduracion').getValue();
        var tipo = form.findField('est_ntipo');
        
        record.set('est_dfechadesde',desde);
        desdeField.setValue(desde);
        desdeTime.setValue(desde);
        
        switch (tipo.getValue()){
            case 0:
            break;
            case 1:
                hastaTime.setValue(Ext.Date.add(desde, Ext.Date.MINUTE, duracion));
                hasta.setValue(Ext.Date.add(desde, Ext.Date.MINUTE, duracion));
            break;
            case 2:
                hastaTime.setValue(Ext.Date.add(desde, Ext.Date.HOUR, duracion));
                hasta.setValue(Ext.Date.add(desde, Ext.Date.HOUR, duracion));
            break;
            case 3:
                hasta.setValue(Ext.Date.add(desde, Ext.Date.DAY, duracion));
                hastaTime.setValue(Ext.Date.add(desde, Ext.Date.DAY, duracion));
            break;
            case 4:
                hasta.setValue(Ext.Date.add(desde, Ext.Date.MONTH, duracion));
                hastaTime.setValue(Ext.Date.add(desde, Ext.Date.MONTH, duracion));
            break;
        }
    },
    
    onDuracionChange: function(field, newValue, oldValue, options){
        var view = field.up('form');
        var form = view.getForm();
        var record = view.record;
        var desde = new Date();
        var hasta = form.findField('est_dfechahasta');
        var desdeField = form.findField('est_dfechadesde');
        var desdeTime = view.down('#desdeTime');
        var hastaTime = view.down('#hastaTime');
        var tipo = form.findField('est_ntipo');
        
        record.set('est_dfechadesde',desde);
        desdeField.setValue(desde);
        desdeTime.setValue(desde);
        
        
        switch (tipo.getValue()){
            case 0:
            break;
            case 1:
                hastaTime.setValue(Ext.Date.add(desde, Ext.Date.MINUTE, newValue));
                hasta.setValue(Ext.Date.add(desde, Ext.Date.MINUTE, newValue));
            break;
            case 2:
                hastaTime.setValue(Ext.Date.add(desde, Ext.Date.HOUR, newValue));
                hasta.setValue(Ext.Date.add(desde, Ext.Date.HOUR, newValue));
            break;
            case 3:
                hasta.setValue(Ext.Date.add(desde, Ext.Date.DAY, newValue));
                hastaTime.setValue(Ext.Date.add(desde, Ext.Date.DAY, newValue));
            break;
            case 4:
                hasta.setValue(Ext.Date.add(desde, Ext.Date.MONTH, newValue));
                hastaTime.setValue(Ext.Date.add(desde, Ext.Date.MONTH, newValue));
            break;
        }
    }
});