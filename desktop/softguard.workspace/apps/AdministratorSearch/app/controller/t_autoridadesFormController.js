Ext.define('AdministratorSearch.controller.t_autoridadesFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'TablaLineasStore', 'eventosAutoridadesStore', 'ProvinciasStore' ],
    models : [ 't_autoridadesModel', 'TablasLineasSearchModel', 't_provinciasSearchModel', 'SoftguardCodigoAlarmaModel', 'TablasCodigosAlarmaSearchModel', 't_autoridaddestinoModel', 't_autoridaddestinoSearchModel' ],
    views : [ 't_autoridadesFormView', 't_autoridaddestinoFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
    				't_autoridadesformview' : {
						beforerender : this.initview
					},
					't_autoridadesformview button[action="save"]' : {
						click : this.onSaveClick
					},
                    't_autoridadesformview #comboeventos':{
                        select: this.onEventSelect
                    },
                    't_autoridadesformview #comboeventosauto':{
                        select: this.onEventAutoSelect
                    },
                    't_autoridadesformview #comboeventosreportatautoprocesados':{
                        select: this.onEventAutoProcesadoSelect
                    },
                    't_autoridadesformview #destino':{
                        change: this.onDestinoChange
                    },
                    't_autoridadesformview #destinoconfig':{
                        click: this.onDestinoconfigClick
                    }
    				
                });
	}, // cierro init
    
    onEventSelect: function(combo, records, options){
        var form = combo.up('form').getForm();
        var field = form.findField('aut_meventos');
        var eventos = form.findField('_eventos');
        //var text = eventos.getValue();
        var text = '';
        
        //field.setValue(new String().concat(combo.getValue()));
        
        Ext.Array.each(records, function(record){
            if (record){
                text = text + record.get('cod_ccodigo')+'\r\n';
            }
            
        })
        
        eventos.setValue(text);
    },
    
    onDestinoChange: function(combo, newValue,oldValue, options){
        var view = combo.up('t_autoridadesformview');
        if (newValue!=1){
            view.down('#destinoconfig').show();
            view.down('#comboeventosauto').setDisabled(true)
            view.down('#_eventosauto').setDisabled(true)
            
            view.down('#comboeventosreportatautoprocesados').setDisabled(true) 
            view.down('#_eventosreportatautoprocesados').setDisabled(true)
            
        } else {
            view.down('#destinoconfig').hide();
            view.down('#comboeventosauto').setDisabled(false)
            view.down('#_eventosauto').setDisabled(false)
            
            view.down('#comboeventosreportatautoprocesados').setDisabled(false) 
            view.down('#_eventosreportatautoprocesados').setDisabled(false)
        }
            
    },
    onEventAutoSelect: function(combo, records, options){
        var form = combo.up('form').getForm();
        var field = form.findField('aut_meventos');
        var eventos = form.findField('_eventosauto');
        //var text = eventos.getValue();
        var text = '';
        
        //field.setValue(new String().concat(combo.getValue()));
        
        Ext.Array.each(records, function(record){
            if (record){
                text = text + record.get('cod_ccodigo')+'\r\n';
            }
            
        })
        
        eventos.setValue(text);
    },


    onEventAutoProcesadoSelect: function(combo, records, options){
        var form = combo.up('form').getForm();
        var field = form.findField('aut_cautoprocesados');
        var eventos = form.findField('_eventosreportatautoprocesados');
        //var text = eventos.getValue();
        var text = '';
        
        //field.setValue(new String().concat(combo.getValue()));
        
        Ext.Array.each(records, function(record){
            if (record){
                text = text + record.get('cod_ccodigo')+'\r\n';
            }
            
        })
        
        eventos.setValue(text);
    },

	initview : function(view) {
        view.record.set('aut_cautoprocesados',view.record.get('aut_cAutoProcesados'))
        view.loadRecord(view.record);
        
        var comboEventos = view.down('#comboeventos');
        var comboEventosAuto = view.down('#comboeventosauto');
        var comboEventosAutoProcesados = view.down('#comboeventosreportatautoprocesados');
        
        var comboEnventosStore =Ext.create('Ext.data.Store',{
            model: this.getTablasCodigosAlarmaSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                    property: 'cod_nAutoridad',
                    value: 1
                    
                }
            ]
        })
        
        comboEventos.bindStore(comboEnventosStore)
        comboEventosAuto.bindStore(comboEnventosStore)
        comboEventosAutoProcesados.bindStore(comboEnventosStore)
        
        comboEnventosStore.load({callback:function (records){
            var eventos = view.record.get('aut_meventos');
            var eventosauto = view.record.get('aut_meventosauto');
            var eventosautoprocesados = view.record.get('aut_cautoprocesados');
            var aeventos = eventos.split(',');
            var aeventosauto = eventosauto.split(',');
            var aeventosautoprocesados = eventosautoprocesados.split(',');

            // seteo los eventos
            var sel;
            var sel2;
            var sel3;
            Ext.Array.each(aeventos, function(evento){
                sel = Ext.Array.push(sel,comboEventos.findRecord('cod_ccodigo', evento));
            }); 
            Ext.Array.each(aeventosauto, function(evento){
                sel2 = Ext.Array.push(sel2,comboEventosAuto.findRecord('cod_ccodigo', evento));
            });        
            Ext.Array.each(aeventosautoprocesados, function(evento){
                sel3 = Ext.Array.push(sel3,comboEventosAutoProcesados.findRecord('cod_ccodigo', evento));
            });   
            comboEventos.setValue(sel, false);
            comboEventos.fireEvent('select', comboEventos, sel);
            comboEventosAuto.setValue(sel2, false);
            comboEventosAuto.fireEvent('select', comboEventosAuto, sel2);
            comboEventosAutoProcesados.setValue(sel3, false);
            comboEventosAutoProcesados.fireEvent('select', comboEventosAutoProcesados, sel3);
        }})
        
        
         var comboProvinciasStore =Ext.create('Ext.data.Store',{
            model: this.getT_provinciasSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true
        })
        
        view.down('#provincia').bindStore(comboProvinciasStore)
        comboProvinciasStore.load();

        if(Ext.util.Format.trim(view.record.get('aut_cprovincia')) == "0") {
            view.down('#provincia').setValue(' ')
            
        }
        
        var comboDestinoStore =Ext.create('Ext.data.Store',{
            model: this.getT_autoridaddestinoSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true
        })
        
        view.down('#destino').bindStore(comboDestinoStore)
        comboDestinoStore.load();

	},

    onDestinoconfigClick : function(button, event, options) {
        var view = button.up('t_autoridadesformview');
        var combo = view.down('#destino');
        
        // busco el record del config
        var config =  combo.findRecord(combo.valueField || combo.displayField, combo.getValue());
        
        Ext.widget('window',{
            title: 'Configuración del destino',
            width: '400',
            height: '400',
            caller: view,
            layout: 'fit',
            autoScroll: true,
            items: {
                xtype: 't_autoridaddestinoformview',
                record: config,
                caller: view
            }
        }).show();

	},

	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('t_autoridadesformview');
        var win = button.up('window');
		var record = myform.getRecord();


		myform.updateRecord(record);
        
        
        var model = this.getT_autoridadesModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });
        
        if (myform.isValid()){
            
            if(view.down('#destino').getValue() == 1) {
                if(view.down('#comboeventosauto').getValue() == '' &&
                    view.down('#comboeventosreportatautoprocesados').getValue() == '' &&
                    view.down('#comboeventos').getValue() == '') {
                    notify('Debe selecionar almenos una alarma.');
                    return;
                    
                }  
            } else {
                if(view.down('#comboeventos').getValue() == '') {
                    notify('Debe selecionar almenos una alarma en Eventos a reportar manualmente.');
                    return;
                }
            }
            
    		record.save({
    			scope : this,
               
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');           
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('objectchanged',view.caller,record);
                        win.close();
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			},
    			button : button
    		});
        }

	}
    
   

	
   
});