//MIGRADO2024
Ext.define('Common.controller.SerTecROController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ServTecModel', 'ServTecSearchModel' ],
    views : [ 'SerTecROView' ],
    init : function(config) {
        // genero los eventos
        this.control({
            'sertecroview' : {
        		afterrender : this.initView,
                objectchanged: this.onObjectChanged
            },
            'sertecroview button[action=asignar]' : {
                click : this.onAsignarClick
    		},
            'sertecroview button[action=asignarmovil]' : {
                click : this.onAsignarMovilClick
    		},
            'sertecroview button[action=ordenes]' : {
                click : this.onOrdenesClick
    		},
            'sertecroview button[action=reporte]' : {
                click: this.onReporteClick
            },
            'sertecroview button[action=reclamos]' : {
                click : this.onReclamosClick
        	}
		});
        
	}, // cierro init
    
    
    onReclamosClick: function(button){ 
            var view = button.up('sertecroview');
         
            var rec = view.initRecord;
            var title = 'Reclamo ('+rec.get('stc_inumero')+')';
            
            
          
                 
                     var newTab = Ext.widget('sertecreclamosformview',{
                        //record: record,
                        title: title,
                        record: rec,
                        closeAction: 'destroy',
                        caller: view
                        });
                    var win = Ext.create('Ext.Window', {
                        layout: 'fit',
                        title : title,
                        closeAction : 'hide',                		
            			border : true,
                        modal: false,
                        view: view,
                        height: 350,
                        width: 600,
            			items : newTab,  
            		});
                    
                    win.show();
         
     },
    
    initView: function(view){
        
        var record = view.initRecord;
      
        view.loadRecord(record);
        
        this.hideEmptyField(view,record);
       
       var value = record.get('_stc_estadodescripcion');
       
       view.down("#header-sertec").setValue(getLocale("Orden de servicio: ")+record.get('stc_inumero')+' '+record.get('tip_cdescripcion')+" - "+record.get('stc_ccontacto')+" - "+record.get('_stc_estadodescripcion').toUpperCase());
        if(value == 'Cancelado') {
            view.down("#header-sertec").setFieldStyle('style="text-align:center;font-size:18px;background-color:#FF0000;color:#FFF;"');        
        } else if( value =='Finalizado') {
            view.down("#header-sertec").setFieldStyle('style="text-align:center;font-size:18px;background-color:#33CC33;color:black;"');
        }  else if( value =='Pendiente') {
            view.down("#header-sertec").setFieldStyle('style="text-align:center;font-size:18px;background-color:#FFFF00;color:black;"');            
        }  else if( value =='Asignado') {
             view.down("#header-sertec").setFieldStyle('style="text-align:center;font-size:18px;background-color:#FFFF00;color:black;"');
        } else if( value =='En Ejecución') {
             view.down("#header-sertec").setFieldStyle('style="text-align:center;font-size:18px;background-color:#FFFF00;color:black;"');
        }
        else if( value =='En Camino') {
             view.down("#header-sertec").setFieldStyle('style="text-align:center;font-size:18px;background-color:#FFFF00;color:black;"');
        }
        
        
        if(value != 'Cancelado' && value !='Finalizado') {
            
            view.down('#asignarmovil').setDisabled(false);
            view.down('#asignar').setDisabled(false);
        }
        
        
        if(view.getForm().findField('stc_ctecnico_1_cnombre').getValue() == '' &&
        view.getForm().findField('stc_ctecnico_2_cnombre').getValue() == '' &&
        view.getForm().findField('stc_ctecnico_3_cnombre').getValue() == '' &&
        view.getForm().findField('stc_ctecnico_4_cnombre').getValue() == '' &&
        view.getForm().findField('stc_ctecnico_5_cnombre').getValue() == '') {
            view.down('#tecnico').hide();
        }
        
        if(view.getForm().findField('stc_ctecnico_1_cnombre').getValue() == '') {
            view.down('#tecnico1').hide();
        }
        if(view.getForm().findField('stc_ctecnico_2_cnombre').getValue() == '') {
            view.down('#tecnico2').hide();
        }
        if(view.getForm().findField('stc_ctecnico_3_cnombre').getValue() == '') {
            view.down('#tecnico3').hide();
        }
        if(view.getForm().findField('stc_ctecnico_4_cnombre').getValue() == '') {
            view.down('#tecnico4').hide();
        }
        if(view.getForm().findField('stc_ctecnico_5_cnombre').getValue() == '') {
            view.down('#tecnico5').hide();
        }
        
        
        
        if(view.getForm().findField('stc_creclamo_1').getValue() == '' && 
            view.getForm().findField('stc_creclamo_2').getValue() == '' &&
            view.getForm().findField('stc_creclamo_3').getValue() == '' &&
            view.getForm().findField('stc_creclamo_4').getValue() == '' &&
            view.getForm().findField('stc_creclamo_5').getValue() == '') {
                view.down('#reclamos').hide();
            }
            
            
            
        var ocultos = 0; 
            
        if(view.getForm().findField('stc_mobservaciones').getValue() == '') {
                view.down('#observaciones').hide();
                ocultos++;
            }    
        
            
        if(view.getForm().findField('stc_dintecnico_1').getValue() == '1/1/1900 12:00:00 AM' && 
            view.getForm().findField('stc_doutecnico_1').getValue() == '1/1/1900 12:00:00 AM' &&
            view.getForm().findField('stc_dintecnico_2').getValue() == '1/1/1900 12:00:00 AM' &&
            view.getForm().findField('stc_doutecnico_2').getValue() == '1/1/1900 12:00:00 AM' &&
            view.getForm().findField('stc_dintecnico_3').getValue() == '1/1/1900 12:00:00 AM' &&
            view.getForm().findField('stc_doutecnico_3').getValue() == '1/1/1900 12:00:00 AM') {
                view.down('#entradasysalidas').hide();
                ocultos++;
            }
       
        if(Ext.util.Format.trim(view.getForm().findField('stc_cmovil_1').getValue()) == '' && 
            Ext.util.Format.trim(view.getForm().findField('stc_cmovil_2').getValue()) == '' ) {
                view.down('#moviles').hide();
                ocultos++;
            }
        if(view.getForm().findField('stc_minsumos').getValue() == '') {
                view.down('#insumos').hide();
                ocultos++;
            }
        if(view.getForm().findField('ope_cnombre').getValue() == '') {
                view.down('#operador').hide();
                ocultos++;
            }
        if(ocultos >= 5) {
            view.down('#serviciosconcluidos').hide();
        }
        if(record.get('cue_cLatLng') != '0.0,0.0' && record.get('cue_cLatLng') != ''){
           view.down('#mapaimagen').setSrc('http://maps.googleapis.com/maps/api/staticmap?center='+record.get('cue_cLatLng')+'&zoom=14&size=387x261&markers=color:green|label:Cliente|'+record.get('cue_cLatLng')+'&sensor=false');
            view.down('#mapa').show();
        } else {
            view.down('#mapa').hide();
        }
            
     
    },
    
    onObjectChanged : function(cuenta, view){
        var record = view.initRecord;      
        var store = Ext.create('Ext.data.Store', {
            model : this.getServTecSearchModelModel(),
            remoteFilter: true,
        	autoload: false,
            filters: [
                {
                    property: 'stc_iid',
                    value: view.initRecord.get('Id')
                }
            ]
            
        });
        
        store.load({callback: function (records) {
            if(records[0]) {
                view.loadRecord(records[0]);
            }
        }});
    },
    
    onReporteClick: function(button){ 
        
        var view = button.up('sertecroview');
        var tabpanel = button.up('tabpanel');
        var title = 'Reporte';
        var mytab = tabpanel.down('[title="' + title + '"]');
        
        var selection = [];
        selection.push(view.initRecord);
        
        var filters;
        if(selection.length === 0) {
        filters = view.filters;
        } else {
        
            var idsSeleccionados ='';
            for(var key in selection) {
            
            idsSeleccionados += selection[key].get('Id');
            if(key<(selection.length-1)) {
                idsSeleccionados += ',';
            }
        }
        
        filters = [
            {
                property: 'stc_iid:inint',
                value: idsSeleccionados
            }
        ];
        
        }        
        
        /*  if (!mytab) {
             
        var newTab = Ext.widget('reporteservtecview',{
            //record: record,
            title: title,
            closable: true,
            filters: filters,
            closeAction: 'destroy'
        });
        
        
        // agrego la paleta creada
        tabpanel.add(newTab);
        tabpanel.setActiveTab(newTab);
        }*/
        
        
        var newTab = Ext.widget('reporteservtecview',{
                //record: record,
                title: title,
                filters: filters,
                closeAction: 'destroy'
            });
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : title,
        	closeAction : 'hide',
        	width : 750,
        	height : 400,
        	border : true,
            modal: false,
            view: view,
        	items : newTab
        });
        
        win.show();
    },
    
    
    onOrdenesClick: function(button){ 
                    var view = button.up('sertecroview');
                    var tabpanel = view.up('tabpanel');
                    var rec = view.record;
                    var title = 'Orden';
                    var mytab = tabpanel.down('[title="' + title + '"]');
                    
                    var selection = [];
                    selection.push(view.initRecord);
                    
                    var filters;
                    if(selection.length === 0) {
                        filters = view.filters;
                    } else {
                        
                        var idsSeleccionados ='';
                        for(var key in selection) {
                            
                            idsSeleccionados += selection[key].get('Id');
                            if(key<(selection.length-1)) {
                                idsSeleccionados += ',';
                            }
                        }
                        
                        filters = [
                            {
                                property: 'stc_iid:inint',
                                value: idsSeleccionados
                            }
                        ];
                        
                    }
                   
                  /*  if (!mytab) {
                             
                        var newTab = Ext.widget('ordenservtecview',{
                            //record: record,
                            title: title,
                            closable: true,
                            filters: filters,
                            closeAction: 'destroy'
                        });
                        
                       
                        // agrego la paleta creada
                        tabpanel.add(newTab);
                        tabpanel.setActiveTab(newTab);
                    }*/
                    
                    var newTab = Ext.widget('ordenservtecview',{
                            //record: record,
                            title: title,
                            filters: filters,
                            closeAction: 'destroy'
                        });
                    var win = Ext.create('Ext.Window', {
                        layout: 'fit',
                        title : title,
                    	closeAction : 'hide',
            			border : true,
                        modal: false,
                        view: view,
            			items : newTab,                        
                        maximized: true
            		});
                    
                    win.show();
    },
    
    
    onAsignarMovilClick : function(button, event, options) {
        
        
        var view =button.up('sertecroview');     
             
        var selection = [];
        selection.push(view.initRecord);
            
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Seleccione un movil',
    		closeAction : 'destroy',
    		width : 750,
    		height : 550,
    		border : true,
            modal: true,
            view : view,
    		items : [
                {
                    xtype: 'asignarmovilgridview',
                    
                    caller: view,
                    selection : selection
                }
            ]
    	});
    	win.show();
        
        
    },
    
    onAsignarClick: function(button, event, options) {
        
        
        var view =button.up('sertecroview');     
             
        var selection = [];
        selection.push(view.initRecord);
            
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
        	title : 'Seleccione un Tecnico',
    		closeAction : 'destroy',
            itemId: 'cuentaWin',
    		width : 750,
    		height : 550,
    		border : true,
            modal: true,
            view : view,
    		items : [
                {
                    xtype: 'asignartecnicogridview',
                    
                    caller: view,
                    selection : selection
                }
            ]
    	});
    	win.show();
        
        
    },
    
    
    
    
    
    hideEmptyField : function (view, record) {
        /* 
        Toma los campos del record y los busca en la view.
        En caso de estar vacios o espacios en blaco los oculta.
        */
        Ext.Object.each(record.data, function(key, value, myself) {          
           var campo = view.getForm().findField(key);
           if(campo) {
               
               if(Ext.util.Format.trim(campo.getValue()) == '' || 
               Ext.util.Format.trim(campo.getValue()) == 0 || 
               Ext.util.Format.trim(campo.getValue()) == '1/1/1900 12:00:00 AM' ||
               Ext.util.Format.trim(campo.getValue()).indexOf('Mon Jan 01 1900 00:00:00') == 0) {
                   campo.hide();
               }
           }
        });
    }
    
});