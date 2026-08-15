Ext.define('AdministratorSearch.controller.t_redirectorFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_redirectordestinoModel', 't_redirectorModel', 'TablasCodigosAlarmaSearchModel', 't_redirectordestinoSearchModel', 'SoftguardCodigoAlarmaModel' ],
    views : [ 't_redirectorFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
			't_redirectorformview' : {
				beforerender : this.initview,
                selectedEvents: this.eventsSelected
			},
			't_redirectorformview button[action="save"]' : {
				click : this.onSaveClick
			},
            't_redirectorformview #comboeventos':{
                select: this.onEventSelect
            },
            't_redirectorformview #destino':{
                change: this.onDestinoChange
            },
            't_redirectorformview #destinoconfig':{
                click: this.onDestinoconfigClick
            },
            't_redirectorformview #agregarevento':{
                click: this.onEventoClick
            }
			
        });
	}, // cierro init
    
    eventsSelected: function(records, view) {
        var textarea = view.down('#eventos');
       
        var text = '';
        
        var arrayEventos = [];
        Ext.Array.each(records.items, function(record){
            text = text + record.get('Descripcion')+'\r\n';
            arrayEventos.push(record.get('cod_ccodigo'));
        })
    
        
        textarea.setValue(text);
     
        view.down('#eventoshide').setValue(arrayEventos.join(','))
    },
    
    onEventoClick: function (btn) {
        var view = btn.up('t_redirectorformview');
        
        
         var myWindow = Ext.widget('window',{
            title: 'Selector de eventos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true, 
            items: [{
                xtype: 'eventselecterhelperview',                
                eventSelected: view.record.get('trd_ceventos'),
                caller: view
                
            }],
            layout: 'fit'
        }).show();
        
        
        
        myWindow.on('selectedEvents',function () {
         console.log(arguments)
        })
        
            
        
    },
    
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
        var view = combo.up('t_redirectorformview');

        var newRecord = combo.findRecordByValue(newValue);
        if (newRecord && newRecord.get('rrd_cconfig')!='') {
          view.down('#destinoconfig').show();
        } else {
            view.down('#destinoconfig').hide();
        }
            
    },


   

	initview : function(view) {
        var controller = this;
        view.record.set('aut_cautoprocesados',view.record.get('aut_cAutoProcesados'))
        view.loadRecord(view.record);
        
        var aeventos =  view.record.get('trd_ceventos').split(',');
        
        var filter = [  
            {
                property:'cod_ccodigo:IN',
                value:view.record.get('trd_ceventos')
            }
        ];
                
        var model =  this.getSoftguardCodigoAlarmaModelModel()
        
        
        var combostore =Ext.create('Ext.data.Store',{
            model:model,
            pageSize: 1000,       
            remoteFilter: true,
            filters: filter
        })

        var text = '';
        combostore.load({callback: function(){
            // selecciono los eventos
            var sel = [];
            Ext.Array.each(aeventos, function(evento){
                
                sel.push(combostore.findRecord('Codigo', evento));
                
            });
            
            if(sel[0] != null) {            
                Ext.Array.each(sel, function(record){
                    text = text + record.get('Descripcion')+'\r\n';                   
                })
                
                var textarea = view.down('#eventos');     
                if(textarea) {
                    textarea.setValue(text);
                }
                
            }
        }});
        
        
        var comboDestinoStore =Ext.create('Ext.data.Store',{
            model: this.getT_redirectordestinoSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true
        })
        
        var destino = view.down('#destino');
        destino.bindStore(comboDestinoStore);
        comboDestinoStore.load({callback: function(){
            var id = view.record.get('trd_idestino');
            controller.onDestinoChange(destino,id,id);
        }});

	},

    onDestinoconfigClick : function(button, event, options) {
        var view = button.up('t_redirectorformview');
        var combo = view.down('#destino');
        
        // busco el record del config
        var config =  combo.findRecord(combo.valueField || combo.displayField, combo.getValue());
        
        Ext.widget('window',{
            title: 'Configuración del destino',
            width: '400',
            height: '500',
            caller: view,
            layout: 'fit',
            autoScroll: true,
            items: {
                xtype: 't_redirectordestinoformview',
                record: config,
                caller: view
            }
        }).show();

	},

	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('t_redirectorformview');
        var win = button.up('window');
		var record = myform.getRecord();


		myform.updateRecord(record);
        
        
        var model = this.getT_redirectorModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });
        
        if (myform.isValid()){
            
            if(view.down('#destino').getValue() == 1) {
                if( view.down('#eventoshide').getValue() == '') {
                    notify('Debe selecionar almenos una alarma.');
                    return;
                    
                }  
            } else {
                if(view.down('#eventoshide').getValue() == '') {
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