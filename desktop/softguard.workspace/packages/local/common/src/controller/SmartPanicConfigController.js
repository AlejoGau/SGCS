//MIGRADO2024
Ext.define('Common.controller.SmartPanicConfigController', {
    extend: 'Ext.app.Controller',
            stores : [ 'Common.store.TablasModemsSmsStore' ],
			models : [ 'm_dealer_spconfigSearchModel', 'm_dealer_spconfigModel', 'TablasModemsSmsSearchModel', 'CuentaSearchModel' ],
			views : [ 'SmartPanicConfigView' ],
    refs: [
        {
            ref: 'statusBar',
            selector: '#statusbar'
        }
    ],
    init: function () {
        // genero los eventos
        this.control({
            'smartpanicconfigview': {
                afterrender: this.loadData,                
                cuentanew: this.onCuentaSelected//,
                //selectedEvents: this.eventsSelected,
            },            
            'smartpanicconfigview [action=save]': {
                click: this.onSaveClick
            },            
            'smartpanicconfigview #selectcuenta': {
                click: this.onSelectCuentaClick
            },
            'smartpanicconfigview #deletecuenta': {
                click: this.onDeleteCuentaClick
            },
            'smartpanicconfigview #btnExtras': {
                change: this.onBtnExtrasChange
            },
            'smartpanicconfigview #trackingTrigger': {
                change: this.onTrackingTriggerChange
            },
            'smartpanicconfigview #delete': {
                click: this.onDeleteClick
            },
            'smartpanicconfigview #modoVecinal': {
                change: this.onModoVecinalChange
            },
            'smartpanicconfigview #SMSACTIVATION': {
                change: this.onSMSACTIVATIONChange
            },
            'smartpanicconfigview [action=agregar_categoria]':{
                click: this.onAddCategoriaClick
            },
            'smartpanicconfigview [action=remover_categoria]':{
                click: this.onRemoveCategoriaClick
            },
            'smartpanicconfigview [action=agregar_boton_home]':{
                click: this.onAddBotonHome
            },
            'smartpanicconfigview [action=remover_boton_home]':{
                click: this.onRemoveBotonHome
            }/*,
            'smartpanicconfigview #agregarevento' : {
                click : this.onAgregarEventoClick
			},*/            
        });
    }, // cierro init:
    
    onModoVecinalChange: function (combo, value) {
        var view = combo.up('smartpanicconfigview')
        if(value != 1) {
            view.down('#funcMisCuentas').setDisabled(false)
            view.down('#funcMisMoviles').setDisabled(false)
            view.down('#funcMisCamaras').setDisabled(false)
            view.down('#funcMiEntorno').setDisabled(false)
            //view.down('#funcMiGrupo').setDisabled(false) //https://basecamp.com/2249105/projects/16594557/todos/440228417
        } else {
            //lo diferio para que funcione cuando se estan setiando todo los campos en el inicio
            setTimeout(function () {
                view.down('#funcMisCuentas').setDisabled(true)
                view.down('#funcMisMoviles').setDisabled(true)
                view.down('#funcMisCamaras').setDisabled(true)
                view.down('#funcMiEntorno').setDisabled(true)
                view.down('#funcMiGrupo').setDisabled(true)
                view.down('#funcMisCuentas').setValue(2)
                view.down('#funcMisMoviles').setValue(2)
                view.down('#funcMisCamaras').setValue(2)
                view.down('#funcMiEntorno').setValue(2)
                view.down('#funcMiGrupo').setValue(2)
            },30)
        }
    },
    onSMSACTIVATIONChange: function (field, value) {
        var view = field.up('smartpanicconfigview');
        var SMSMODEM = view.down('#SMSMODEM');
        if(value) {
            SMSMODEM.show();          
        } else {
            SMSMODEM.hide(); 
            SMSMODEM.setValue(null);
        }
    },
    
    onBtnExtrasChange: function (combo, value) {
        var view = combo.up('smartpanicconfigview')
        if(value == 1) {
            view.down('#btn-extras-config').show()
        } else {
            view.down('#btn-extras-config').hide()
        }
    },
    
    onTrackingTriggerChange: function (combo, value) {
        var view = combo.up('smartpanicconfigview')
        if(value == 0) {
            view.down('#trackingDistance').setValue(3000);
            view.down('#trackingTime').setValue(30);
        } else if(value == 1){
            view.down('#trackingDistance').setValue(1500);
            view.down('#trackingTime').setValue(15);
        } else if(value == 2){
            view.down('#trackingDistance').setValue(500);
            view.down('#trackingTime').setValue(5);
        }
    },
    
    onDeleteCuentaClick: function(button, event, options) {
        var view =button.up('smartpanicconfigview');
        view.down('#idcuenta').setValue(0);
        view.down('#nombrecuenta').setValue('No hay seleccionada');
	},
    
    onSelectCuentaClick : function(button, event, options) {
        var view =button.up('smartpanicconfigview');
        var filters = [];
        if(view.byDealer) {
            //filtro cuentas
            filters.push({
                property:'cue_clinea',
                value:view.record.get('cue_clinea')?view.record.get('cue_clinea'):view.record.get('lin_ccodigo')
            })    
        }
        
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
    		title : 'Seleccione una Cuenta',
			closeAction : 'destroy',
            itemId: 'cuentaWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view : view,
			items : [
                {
                    xtype: 'cuentahelperview',
                    caller: view,
                    metodo: 'new',
                    filter:filters
                }
            ]
		});
		win.show();                
	},
    onCuentaSelected: function(cuenta, view){
       // var gridview = view.down('smartpanicconfigview');        
        view.down('#idcuenta').setValue(cuenta.get('Id'));
        view.down('#nombrecuenta').setValue(cuenta.get('Name'));
    },
    configBtnMenuInferior: function(panel){
        for (i = 1; i <= 5; i++) { 
            panel.down('#btn-menuinferior-config').add(Ext.widget({
                xtype:'container',
                layout:'hbox',                                    
                margin:'0 0 5 0',
                items:[
                      {
                          xtype:'container',
                          html:getLocale('Boton Menu Inf.')+' '+i,
                          margin:'4 10 0 0',
                          width:70
                      },
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Tipo',
                                name: "btnMenuInf"+i+"Tipo",
                                itemId: "btnMenuInf"+i+"Tipo",
                                indexBtnMenuInf: i,
                                labelWidth: 60,
                                value: 4,
                                store: [ /*[ 0, getLocale( 'Evento' ) ],*/ [ 1, getLocale( 'Telefono' ) ], [ 2, getLocale( 'Url' ) ],/* [ 3, getLocale( 'Único evento' ) ], */[ 4, getLocale( 'Función interna' ) ] ],
                                //plugins: ['clearbutton'],
                                listeners: {
                                    change: function( combo, value ) {
                                        var view = this.up( 'smartpanicconfigview' );
                                        if( value == 0 || value == 3 ) {
                                            // si es 0, muestro las opciones de boton
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'TipoBoton' ).show();
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'Telefono' ).hide();
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'Url' ).hide();
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'Actividad' ).hide();
                                        } else if( value == 1 ) {
                                            // si es 1, muestro las opciones de telefono
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'TipoBoton' ).hide();
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'Telefono' ).show();
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'Url' ).hide();
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'Actividad' ).hide();
                                        } else if( value == 2 ) {
                                            // si es 1, muestro las opciones de telefono
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'TipoBoton' ).hide();
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'Telefono' ).hide();
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'Url' ).show();
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'Actividad' ).hide();
                                        } else if( value == 4 ) {
                                            // si es 1, muestro las opciones de telefono
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'TipoBoton' ).hide();
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'Telefono' ).hide();
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'Url' ).hide();
                                            view.down( "#btnMenuInf"+combo.indexBtnMenuInf+'Actividad' ).show();
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'textfield',
                                name: "btnMenuInf"+i+'Nombre',
                                fieldLabel: 'Nombre',
                                itemId: "btnMenuInf"+i+'Nombre',
                                labelWidth: 60,
                                width: 170
                            },/* {
                                xtype: 'container',
                                layout: 'hbox',
                                itemId: 'containerpickerMenuInf'+i,
                                padding: '0 5 0 0',
                                items: [ {
                                    xtype: 'textfield',
                                    name: "btnMenuInf"+i+'Color',
                                    fieldLabel: 'Color',
                                    itemId: "btnMenuInf"+i+'Color',
                                    labelWidth: 50,
                                    width: 120,
                                    listeners: {
                                        change: function( field, value ) {
                                            field.setFieldStyle( 'background-color:' + value )
                                        }
                                    }
                                }, {
                                        xtype: 'button',
                                        text: 'Color picker',
                                        menu: {
                                            xtype: 'menu',
                                            layout: 'fit',
                                            items: {
                                                xtype: 'colorpicker',
                                                fieldLabel: 'Color letra',
                                                indexBtnHome: i,
                                                allowBlank: false,
                                                listeners: {
                                                    select: function( picker, selColor ) {
                                                        var container = this.up( '#containerpickerMenuInf'+picker.indexBtnHome );
                                                        container.down( '#btnMenuInf'+picker.indexBtnHome+'Color' ).setValue( '#' + selColor )
                                                        this.up( 'menu' ).hide();
                                                        return false;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                ]
                            },*/
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                itemId: 'btnMenuInf'+i+'TipoBoton',
                                hidden: false,
                                items: [
                                    {
                                        xtype: 'textfield',
                                        name: 'btnMenuInf'+i+'CIDESOS',
                                        fieldLabel: 'Formato',
                                        itemId: 'btnMenuInf'+i+'CIDESOS',
                                        labelWidth: 60,
                                        width: 110,
                                        maxLength: 4,
                                        enforceMaxLength: true
                                    }, {
                                        xtype: 'textfield',
                                        name: 'btnMenuInf'+i+'CIDRSOS',
                                        fieldLabel: 'Restauracion',
                                        itemId: 'btnMenuInf'+i+'CIDRSOS',
                                        labelWidth: 90,
                                        width: 130,
                                        maxLength: 4,
                                        enforceMaxLength: true,
                                        margin: '0 0 10 0'
                                    }
                                ]
                            }, {
                                xtype: 'textfield',
                                name: 'btnMenuInf'+i+'Telefono',
                                fieldLabel: 'Número de Telefono',
                                itemId: 'btnMenuInf'+i+'Telefono',
                                hidden: true,
                                labelWidth: 150,
                                width: 300
                            }, {
                                xtype: 'textfield',
                                name: 'btnMenuInf'+i+'Url',
                                fieldLabel: 'Url',
                                itemId: 'btnMenuInf'+i+'Url',
                                labelAlign: 'right',
                                hidden: true,
                                labelWidth: 50,
                                width: 300
                            }, {
                                xtype: 'combobox',
                                name: 'btnMenuInf'+i+'Actividad',
                                fieldLabel: 'Función',
                                itemId: 'btnMenuInf'+i+'Actividad',
                                labelAlign: 'right',
                                hidden: true,
                                labelWidth: 50,
                                width: 300,
                                store: [
                                    [ 0, getLocale( 'Mis cuentas' ) ],
                                    [ 1, getLocale( 'Mis Moviles' ) ],
                                    [ 2, getLocale( 'Mi grupo' ) ],
                                    [ 3, getLocale( 'Extras' ) ],
                                    [ 4, getLocale( 'Mis camaras' ) ],
                                    [ 5, getLocale( 'Mis comandos' ) ],
                                    [ 5, getLocale( 'Mi entorno' ) ]
                                ]
                            }                
                    ]
            }));
            if(panel.down("#btnMenuInf"+i+"Tipo").getValue()==0)
                panel.down("#btnMenuInf"+i+"Tipo").fireEvent('change',panel.down("#btnMenuInf"+i+"Tipo"),4) ;
            else
                panel.down("#btnMenuInf"+i+"Tipo").fireEvent('change',panel.down("#btnMenuInf"+i+"Tipo"),panel.down("#btnMenuInf"+i+"Tipo").getValue()) ;
        } //fin del for
    },
    loadData: function (panel) {
        var _ObjectId = 30;
        var _ObjectTypeName = 'UiApplication';
        var _restPath = (myQueryString.restPath != undefined) ? myQueryString.restPath : 'Rest';
        var url = '/'+_restPath+'/' +_ObjectTypeName+'/'+ _ObjectId + '/Metadata';
        var controller = this;
        var storeModems = this.getTablasModemsSmsStoreStore()
        panel.down('#SMSMODEM').bindStore(storeModems)
        
        //TODO: borrar cuando no se pisen mas los campos de conexion
        Ext.Ajax.request({
            url: url,
            scope: this,
            panel: panel,
            success: function(resp,operation) {
                panel.metadataGlobal = Ext.JSON.decode(resp.responseText);
                panel.metadataGlobal.Config = Ext.JSON.decode(panel.metadataGlobal.Config);
                //this.bindingCategoriaBotones(panel,panel.metadataGlobal.Config);
                panel.down('#conexion').down('#readerIp').setValue(panel.metadataGlobal.Config.readerIp);
                panel.down('#conexion').down('#readerPort').setValue(panel.metadataGlobal.Config.readerPort);
            }
        });
        //armo campos
        for (i = 1; i <= 12; i++) { 
            panel.down('#btn-extras-config').add(Ext.widget({
                xtype:'container',
                layout:'hbox',                                    
                margin:'0 0 5 0',
                items:[
                      {
                          xtype:'container',
                          html:getLocale('Boton')+' '+i,
                          margin:'4 10 0 0',
                          width:70
                      },
                       {
                            xtype : 'combobox',
                            fieldLabel : 'Tipo',
                            itemId:'extra-tipo-'+i,
                            name:'extra-tipo-'+i,
                            store: [[0,getLocale('Oculto')],[1,getLocale('Evento')],[2,getLocale('Url')]],
                            ITERACION:i,
                            labelWidth:80,
                            value:0,
                            listeners:{
                               change: function (combo, value) {
                                    var container = this.up('container')
                                   container.down('#btn-nombre-'+this.ITERACION).show()
                                   if(value == 2) {
                                       container.down('#btn-formato-'+this.ITERACION).hide()
                                       container.down('#btn-url-'+this.ITERACION).show()
                                      // container.down('#btn-target-'+this.ITERACION).show()                                               
                                       
                                       container.down('#btn-formato-'+this.ITERACION).setValue('')
                                   } else if(value == 1) {                                               
                                       container.down('#btn-formato-'+this.ITERACION).show()
                                       container.down('#btn-url-'+this.ITERACION).hide()
                                     //  container.down('#btn-target-'+this.ITERACION).hide()
                                       
                                       container.down('#btn-url-'+this.ITERACION).setValue('')
                                      // container.down('#btn-target-'+this.ITERACION).setValue('')
                                   } else {
                                       container.down('#btn-nombre-'+this.ITERACION).hide()
                                       container.down('#btn-formato-'+this.ITERACION).hide()
                                       container.down('#btn-url-'+this.ITERACION).hide()
                                      // container.down('#btn-target-'+this.ITERACION).hide()
                                       
                                       container.down('#btn-nombre-'+this.ITERACION).setValue('')
                                       container.down('#btn-formato-'+this.ITERACION).setValue('')
                                       container.down('#btn-url-'+this.ITERACION).setValue('')
                                      // container.down('#btn-target-'+this.ITERACION).setValue('')
                                   }
                                   return false;
                               }
                           }
                        },{
                            xtype:'textfield',
                            fieldLabel : 'Nombre',
                            name:'btn-nombre-'+i,
                            itemId:'btn-nombre-'+i,
                            ITERACION:i,
                            hidden:true,
                            labelWidth:80,
                            listeners:{
                               change: function (combo, value) {
                                   if(value != '') {
                                       var container = this.up('container')
                                       if(container.down('#extra-tipo-'+this.ITERACION).getValue() <= 0) { 
                                        container.down('#extra-tipo-'+this.ITERACION).setValue(1)
                                       }
                                   }
                               }
                            }
                        },{
                            xtype:'textfield',
                            fieldLabel : 'Formato',
                            labelWidth:80,
                            name:'btn-formato-'+i,
                            itemId:'btn-formato-'+i,
                            hidden:true,
                            margin:'0 0 0 10'
                        },{
                            xtype:'textfield',
                            fieldLabel : 'Url',
                            labelWidth:80,
                            name:'btn-url-'+i,
                            itemId:'btn-url-'+i,
                            hidden:true,
                            margin:'0 0 0 10'
                        },{
                            xtype : 'combobox',
                            fieldLabel : 'Abrir en',
                            store: [[0,getLocale('SmartPanics')],[1,getLocale('Navegador')]],
                            name:'btn-target-'+i,
                            itemId:'btn-target-'+i,
                            hidden:true,
                            labelWidth:80,
                            value:0
                        }                        
                    ]
            }))
        } //fin del for
        //this.configBtnMenuInferior(panel);// cargo fields de menu inferior 
        if(!panel.byDealer) {
            Ext.Ajax.request({
              url: url,
              scope: this,
              panel: panel,
              success: function(resp,operation) {
                var metadata = Ext.JSON.decode(resp.responseText);
                //this.bindingCategoriaBotones(panel,metadata.Config);
                //panel.metadataGlobal = Ext.JSON.decode(resp.responseText);
                //panel.metadataGlobal.Config = Ext.JSON.decode(panel.metadataGlobal.Config);
                this.bindingCategoriaBotones(panel,Ext.JSON.decode(metadata.Config));
                this.bindingBotonesHome(panel,Ext.JSON.decode(metadata.Config));
                this.setMetadata(metadata,operation.panel);
                controller.setDefaultValues(panel)
              }
            });
        } else {
            //configuracion por dealer
            //panel.down('#conexion').tab.hide() // 05/09/2018 se solicito https://basecamp.com/2249105/projects/14758734/todos/356859768
            
            panel.down('#conexion').down('#readerIp').hide()
            panel.down('#conexion').down('#readerPort').hide()
            panel.down('#conexion').down('#readerIp').disable()
            panel.down('#conexion').down('#readerPort').disable()
            panel.down('#conexion').down('#remoteUrl').hide()
            panel.down('#conexion').down('#cuentapordefecto').hide()
            panel.down('#conexion').down('#firebasekey').show()
            panel.down('#conexion').down('#images').hide() //pedido en ticket https://basecamp.com/2249105/projects/12939010/todos/364657521
            panel.down('tabpanel').setActiveTab(0);
            
            var configstore =Ext.create('Ext.data.Store',{
                model: controller.getM_dealer_spconfigSearchModelModel() ,
                remoteSort: true,
                remoteFilter: true,
                filters: [
                    {
                        property: 'dsp_cdealer',
                        value: panel.record.get('cue_clinea')?panel.record.get('cue_clinea'):panel.record.get('lin_ccodigo')
                    }
                ]
            }).load({callback:function (records) {
                
                var configObj
                if(records && records.length>0){
                    panel.currentConfig = records[0];
                    configObj = Ext.JSON.decode(panel.currentConfig.get('dsp_config'));
                    controller.setMetadata({Config:panel.currentConfig.get('dsp_config')},panel);
                    controller.bindingCategoriaBotones(panel,configObj);
                    controller.bindingBotonesHome(panel,configObj);
                    controller.bindingWesafe(panel,configObj);
                    controller.setDefaultValues(panel)
                } else {
                    //hago default con la config global
                    
                    Ext.Ajax.request({
                      url: url,
                      scope: this,
                      panel: panel,
                      success: function(resp,operation) {
                        var metadata = Ext.JSON.decode(resp.responseText);
                        if(metadata) {
                            
                            configObj = controller.mixMetadata(configObj, Ext.JSON.decode(metadata.Config))
                            
                            controller.setMetadata({Config:Ext.encode(configObj)},operation.panel);
                            controller.bindingCategoriaBotones(panel,configObj);
                            controller.bindingBotonesHome(panel,configObj);
                            notify('Se tomo la metada global.')
                        } else {
                            panel.metadata = {}
                            panel.metadata.Config = {}
                        }
                        
                        controller.setDefaultValues(panel)
                      }
                    });
                }
                if(!panel.currentConfig) {
                    panel.down('#delete').hide()
                }
            }})
        }
        if(panel.showDelete) {
            panel.down('#delete').show()
        }                
    },
    
    setDefaultValues: function (view) {
        if(view.down('#funcbtnBluetooth').getValue() == '' || view.down('#funcbtnBluetooth').getValue() == 0) {
            view.down('#funcbtnBluetooth').setValue(0);    
        }
        if(view.down('#btnEncuesta').getValue() == '' || view.down('#btnEncuesta').getValue() == 0) {
            view.down('#btnEncuesta').setValue(0);
        }
                
        for (i = 1; i <= 12; i++) { 
            var target = '#btn-target-'+i;
            var bTarget = view.down(target);
            if(bTarget.getValue() == '' || bTarget.getValue() == null) {
                bTarget.setValue(0)    
            }
        } 
    },  
    mixMetadata: function (metadataPrincipal, metdataAgregada) {
        console.log(metadataPrincipal);
        console.log(metdataAgregada);
        if(metadataPrincipal) {
            for(var keyMetdataAgregada in metdataAgregada) {            
                //si tiene el campo la metadata principal
                if (metadataPrincipal.hasOwnProperty(keyMetdataAgregada)) {
                    //si el campo de la metadataprincipal no tiene ningun valor
                    if((metadataPrincipal[keyMetdataAgregada] == '' || metadataPrincipal[keyMetdataAgregada] == null) && parseInt(metadataPrincipal[keyMetdataAgregada]) != 0) {
                       // console.log(keyMetdataAgregada,metadataPrincipal[keyMetdataAgregada],'->',metdataAgregada[keyMetdataAgregada])
                        metadataPrincipal[keyMetdataAgregada] = metdataAgregada[keyMetdataAgregada]
                    }
                }
            }        
        } else {
            metadataPrincipal = metdataAgregada
        }
        
        return metadataPrincipal;
    },
    setMetadata: function(metadata,view){
        view.metadata = metadata;
        var config = Ext.JSON.decode(metadata.Config);
        var form = view.getForm();
        var controller = this;
        
        Ext.Object.each(config, function(key, value) {
            var field = form.findField(key);
            if(key == 'NewLogin'){
                console.log('TIENE KEY ');
                if(value==1)
                    view.down('#NewLogin').checked;
            }
            if(key == 'remoteDesktopURLs'){
                if(form.findField('remoteUrl')) {
                    form.findField('remoteUrl').setValue(value[0].remoteUrl)
                }
            } else {            
                if (field) {
                    field.setValue(value);
                    if(key == 'DEFAULTIDCUENTA') {
                        var store = Ext.create('Ext.data.Store',{
                            model: controller.getCuentaSearchModelModel(),
                            pageSize: 50,
                            remoteSort: true,
                            remoteFilter: true,
                            filters: [
                                {
                                    property: 'cue_iid',
                                    value: value
                                }
                            ]
                        })
                        
                        store.load({callback: function ( records) {
                            var record = records[0];
                            if (record)
                            view.down('#nombrecuenta').setValue(record.get('Name'));
                        }});
                    }
                }
            }
        });
        
        if(view.down('#btnExtras').getValue() == 1) {
            view.down('#btn-extras-config').show()
        } else {
            view.down('#btn-extras-config').hide()
        }
        
        
      //  view.down('#envioAudioAuto').fireEvent('change',view.down('#envioAudioAuto'),view.down('#envioAudioAuto').getValue());
      //  view.down('#envioVideoAuto').fireEvent('change',view.down('#envioVideoAuto'),view.down('#envioVideoAuto').getValue());
        // seteo el combo de frecuencia segun la velocidad
        var trackingDistance = view.down('#trackingDistance').getValue();
        if( trackingDistance >= 0 && trackingDistance <= 1000) {
            view.down('#trackingTrigger').setValue(2);
        } else if(trackingDistance > 1000 && trackingDistance <= 2500 ) {
            view.down('#trackingTrigger').setValue(1);
        }else {
            view.down('#trackingTrigger').setValue(0);
        }
        
        //si la key de google esta vacia agrego la global
        if(view.down('#googleKey').getValue() == '') {
            view.down('#googleKey').setValue(getParametro('KEYGOOGLEMAPS'))
        }
    },
    onDeleteClick: function (button) {
        var view= button.up('smartpanicconfigview');
        var controller = this;
        
        Ext.MessageBox.confirm('Atencion', 'Esta a punto de eliminar la configuracion para este dealer, quiere continuar ?', function(btn){
            if(btn === 'yes'){
                controller.getM_dealer_spconfigModelModel().load(view.currentConfig.get('Id'), {callback:function (record) {
                record.destroy({callback:function () {
                    notify('La configuracion fue eliminada con exito.')
                    if(view.up('window')) {
                        view.up('window').close()
                    }
                }})            
        }})
            }
            else{
                //some code
            }
        });
    },
    validarBotonesHome: function(view){
       
        var contenedorBtnHome = view.down('#fieldsetBotonHome');
        var cantBotones = contenedorBtnHome.cantBotones;
        var tipoBtnHome;
        var btnHomeError = false;
        //CIDESOS
        //CIDRSOS
        for(i=1;i<=cantBotones;i++){
            tipoBtnHome = view.down("#btnHome"+i+"Tipo");
            if(tipoBtnHome.getValue()==0){
                if(view.down('#CIDESOS'+i).getValue()=='' 
                    || view.down('#CIDRSOS'+i).getValue()=='' )
                    btnHomeError = true;
            }
        }
        if(view.down('#btnHomePanicoTipo').getValue()==0){
            if(view.down('#CIDESOS').getValue()==''
                || view.down('#CIDRSOS').getValue()== '')
                btnHomeError = true;
        }
        
        
        if(view.down('#btnHomeFuego').getValue()==0){
            if(view.down('#CIDEFIRE').getValue()==''
                || view.down('#CIDRFIRE').getValue()== '')
                btnHomeError = true;
        }
        if(view.down('#btnHomeAsistencia').getValue()==0){
            if(view.down('#CIDEASSIST').getValue()==''
                || view.down('#CIDRASSIST').getValue()== '')
                btnHomeError = true;
        }
        return btnHomeError;
    },
    onRemoveBotonHome: function(button){
        var view = button.up('smartpanicconfigview');
        
        var contenedorBtnHome = view.down('#fieldsetBotonHome');
        if(contenedorBtnHome.cantBotones>0){        
            contenedorBtnHome.remove(contenedorBtnHome.down('#containerBtnHome'+contenedorBtnHome.cantBotones));
            contenedorBtnHome.cantBotones = contenedorBtnHome.cantBotones - 1;
        }
    },
    onAddBotonHome: function(button){
        var view = button.up('smartpanicconfigview');
        var contenedorBtnHome = view.down('#fieldsetBotonHome');
        if(contenedorBtnHome.cantBotones>=5){
            notifyError('La cantidad máxima de botones a agregar es de 5');
            return
        }
        contenedorBtnHome.cantBotones = contenedorBtnHome.cantBotones + 1;
        contenedorBtnHome.add(Ext.widget({
            xtype: 'container',
            margin: '5 0 10 0',
            itemId: 'containerBtnHome'+contenedorBtnHome.cantBotones,    
            layout: 'hbox',
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Botón Home '+contenedorBtnHome.cantBotones,
                    name: "btnHome"+contenedorBtnHome.cantBotones,
                    itemId: "btnHome"+contenedorBtnHome.cantBotones,
                    labelWidth: 120,
                    value: 1,      
                    store: [ [ 2, getLocale( 'Grisado' ) ], [ 1, getLocale( 'Visible' ) ], [ 0, getLocale( 'Oculto' ) ] ],
                    listeners: {
                        change: function( combo, value ) {
                            if( value == '' && parseInt( value ) != 0 ) {
                                var view = this.up( 'smartpanicconfigview' )
                               // view.down( '#btnHome'+contenedorBtnHome.cantBotones+'Nombre' ).setValue( '' ) 
                                view.down( '#CIDESOS'+contenedorBtnHome.cantBotones ).setValue( '' )
                                view.down( '#CIDRSOS'+contenedorBtnHome.cantBotones ).setValue( '' )
                               // view.down( '#btnHome'+contenedorBtnHome.cantBotones+'Color' ).setValue( '' ) 
                            }
                        }
                    }
                                  
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Tipo',
                    name: "btnHome"+contenedorBtnHome.cantBotones+"Tipo",
                    itemId: "btnHome"+contenedorBtnHome.cantBotones+"Tipo",
                    indexBtnHome: contenedorBtnHome.cantBotones,
                    labelWidth: 60,
                    value: 0,
                    store: [ [ 0, getLocale( 'Evento' ) ], [ 1, getLocale( 'Telefono' ) ], [ 2, getLocale( 'Url' ) ], [ 3, getLocale( 'Único evento' ) ], [ 4, getLocale( 'Función interna' ) ] ],
                    //plugins: ['clearbutton'],
                    listeners: {
                        change: function( combo, value ) {
                            var view = this.up( 'smartpanicconfigview' );
                            if( value == 0 || value == 3 ) {
                                // si es 0, muestro las opciones de boton
                                view.down( '#btnHome'+combo.indexBtnHome+'TipoBoton' ).show();
                                view.down( '#btnHome'+combo.indexBtnHome+'Telefono' ).hide();
                                view.down( '#btnHome'+combo.indexBtnHome+'Url' ).hide();
                                view.down( '#btnHome'+combo.indexBtnHome+'Actividad' ).hide();
                            } else if( value == 1 ) {
                                // si es 1, muestro las opciones de telefono
                                view.down( '#btnHome'+combo.indexBtnHome+'TipoBoton' ).hide();
                                view.down( '#btnHome'+combo.indexBtnHome+'Telefono' ).show();
                                view.down( '#btnHome'+combo.indexBtnHome+'Url' ).hide();
                                view.down( '#btnHome'+combo.indexBtnHome+'Actividad' ).hide();
                            } else if( value == 2 ) {
                                // si es 1, muestro las opciones de telefono
                                view.down( '#btnHome'+combo.indexBtnHome+'TipoBoton' ).hide();
                                view.down( '#btnHome'+combo.indexBtnHome+'Telefono' ).hide();
                                view.down( '#btnHome'+combo.indexBtnHome+'Url' ).show();
                                view.down( '#btnHome'+combo.indexBtnHome+'Actividad' ).hide();
                            } else if( value == 4 ) {
                                // si es 1, muestro las opciones de telefono
                                view.down( '#btnHome'+combo.indexBtnHome+'TipoBoton' ).hide();
                                view.down( '#btnHome'+combo.indexBtnHome+'Telefono' ).hide();
                                view.down( '#btnHome'+combo.indexBtnHome+'Url' ).hide();
                                view.down( '#btnHome'+combo.indexBtnHome+'Actividad' ).show();
                            }
                        }
                    }
                },//Anular desde aqui
                /*{
                    xtype: 'textfield',
                    name: 'btnHome'+contenedorBtnHome.cantBotones+'Nombre',
                    fieldLabel: 'Nombre',
                    itemId: 'btnHome'+contenedorBtnHome.cantBotones+'Nombre',
                    labelWidth: 60,
                    width: 170
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    itemId: 'containerpicker'+contenedorBtnHome.cantBotones,
                    padding: '0 5 0 0',
                    items: [ {
                        xtype: 'textfield',
                        name: 'btnHome'+contenedorBtnHome.cantBotones+'Color',
                        fieldLabel: 'Color',
                        itemId: 'btnHome'+contenedorBtnHome.cantBotones+'Color',
                        labelWidth: 50,
                        width: 120,
                        listeners: {
                            change: function( field, value ) {
                                field.setFieldStyle( 'background-color:' + value )
                            }
                        }
                    }, {
                            xtype: 'button',
                            text: 'Color picker',
                            menu: {
                                xtype: 'menu',
                                layout: 'fit',
                                items: {
                                    xtype: 'colorpicker',
                                    fieldLabel: 'Color letra',
                                    indexBtnHome: contenedorBtnHome.cantBotones,
                                    allowBlank: false,
                                    listeners: {
                                        select: function( picker, selColor ) {
                                            var container = this.up( '#containerpicker'+picker.indexBtnHome );
                                            container.down( '#btnHome'+picker.indexBtnHome+'Color' ).setValue( '#' + selColor )
                                            this.up( 'menu' ).hide();
                                            return false;
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },*/
                {
                    xtype: 'container',
                    layout: 'hbox',
                    itemId: 'btnHome'+contenedorBtnHome.cantBotones+'TipoBoton',
                    hidden: false,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'CIDESOS'+contenedorBtnHome.cantBotones,
                            fieldLabel: 'Formato',
                            itemId: 'CIDESOS'+contenedorBtnHome.cantBotones,
                            labelWidth: 60,
                            width: 110,
                            maxLength: 4,
                            enforceMaxLength: true
                        }, {
                            xtype: 'textfield',
                            name: 'CIDRSOS'+contenedorBtnHome.cantBotones,
                            fieldLabel: 'Restauracion',
                            itemId: 'CIDRSOS'+contenedorBtnHome.cantBotones,
                            labelWidth: 90,
                            width: 130,
                            maxLength: 4,
                            enforceMaxLength: true,
                            margin: '0 0 10 0'
                        }
                    ]
                }, {
                    xtype: 'textfield',
                    name: 'btnHome'+contenedorBtnHome.cantBotones+'Telefono',
                    fieldLabel: 'Número de Telefono',
                    itemId: 'btnHome'+contenedorBtnHome.cantBotones+'Telefono',
                    hidden: true,
                    labelWidth: 150,
                    width: 300
                }, {
                    xtype: 'textfield',
                    name: 'btnHome'+contenedorBtnHome.cantBotones+'Url',
                    fieldLabel: 'Url',
                    itemId: 'btnHome'+contenedorBtnHome.cantBotones+'Url',
                    labelAlign: 'right',
                    hidden: true,
                    labelWidth: 50,
                    width: 300
                }, {
                    xtype: 'combobox',
                    name: 'btnHome'+contenedorBtnHome.cantBotones+'Actividad',
                    fieldLabel: 'Función',
                    itemId: 'btnHome'+contenedorBtnHome.cantBotones+'Actividad',
                    labelAlign: 'right',
                    hidden: true,
                    labelWidth: 50,
                    width: 300,
                    store: [
                        [ 0, getLocale( 'Mis cuentas' ) ],
                        [ 1, getLocale( 'Mis Moviles' ) ],
                        [ 2, getLocale( 'Mi grupo' ) ],
                        [ 3, getLocale( 'Extras' ) ],
                        [ 4, getLocale( 'Mis camaras' ) ],
                        [ 5, getLocale( 'Mis comandos' ) ],
                        [ 6, getLocale( 'Mi entorno' ) ]
                    ]
                }                
            ]
        }));
    },
    onRemoveCategoriaClick:function(button){
        var view = button.up('smartpanicconfigview');
        var contenedorCateg = view.down('#cnt-btn-categoria');
        if(contenedorCateg.cantCateg>0){        
            
            contenedorCateg.remove(contenedorCateg.down('#categoria'+contenedorCateg.cantCateg));
            contenedorCateg.cantCateg = contenedorCateg.cantCateg - 1;
            if(contenedorCateg.cantCateg>0){
                contenedorCateg.down('#categoria'+contenedorCateg.cantCateg).setDisabled(false);
            }            
            
        }
    },
    onAddCategoriaClick:function(button){
        var view = button.up('smartpanicconfigview');
        let controller = this;
        var contenedorCateg = view.down('#cnt-btn-categoria');
        if(contenedorCateg.cantCateg>0){
            if(contenedorCateg.down('#categoria'+contenedorCateg.cantCateg).buttonIndex<=0){
                notifyError('Antes de agregar otra categoría, por favor agregue al menos un botón a la categoría '+contenedorCateg.cantCateg);
                return;
            }
            contenedorCateg.down('#categoria'+contenedorCateg.cantCateg).setDisabled(true);
        }
        contenedorCateg.cantCateg = contenedorCateg.cantCateg+1;
        contenedorCateg.add(Ext.widget({
                xtype:'fieldset',
                collapsible: true,
                collapsed: false,
                autoScroll: true,
                width:'97%',
                title:'Categoría '+contenedorCateg.cantCateg,
                layout:'vbox',
                align: 'stretch',
                itemId: 'categoria'+contenedorCateg.cantCateg,
                margin:'10 10 10 10',
                margin: '',
                buttonIndex: 0,
                items:[
//-------------------------------------
                      {
                          xtype:'toolbar',
                          layout:'hbox',
                          items:[
                                {
                                    xtype: 'button',
                                    text:getLocale('Agregar botón'),
                                    action: 'agregar_boton_categ',
                                    itemId: 'addBotonCategoria',
                                    listeners:{
                                        click: function(){
                                            //var view =
                                            controller.onAddBotonesEnCategoria(this,contenedorCateg.cantCateg); 
                                        }
                                    }
                                },{
                                    xtype: 'button',
                                    text:getLocale('Remover botón'),
                                    action: 'remover_boton_categ',
                                    listeners:{
                                        click: function(){
                                            //var view =
                                            controller.onRemoveBotonesEnCategoria(this,contenedorCateg.cantCateg); 
                                        }
                                    }                          
                                }
                          ]
                      },{
                          xtype:'textfield',
                          fieldLabel: 'Nombre categoria',
                          itemId : 'categoria-nombre-'+contenedorCateg.cantCateg,
                          name : 'categoria-nombre-'+contenedorCateg.cantCateg
                      }
//-----------------------------------
                ]
        })); 
        
    },
    onRemoveBotonesEnCategoria: function(button,numeroCateg){
        var view = button.up('smartpanicconfigview');
        var categoria = view.down('#categoria'+numeroCateg);
        if(categoria.buttonIndex>0){
            categoria.remove(categoria.down('#container'+numeroCateg+'-btn-extra-'+categoria.buttonIndex));
            categoria.buttonIndex = categoria.buttonIndex - 1;            
        }
    },
    onAddBotonesEnCategoria: function(button,numeroCateg){
        var view = button.up('smartpanicconfigview');
        var categoria = view.down('#categoria'+numeroCateg);
        
        categoria.buttonIndex = categoria.buttonIndex + 1;
        categoria.add(Ext.widget({
                      xtype:'container',
                      layout:'hbox',
                      itemId: 'container'+numeroCateg+'-btn-extra-'+categoria.buttonIndex,
                      margin: '0 0 10 0',
                      items:[
                      {
                          xtype:'container',
                          html:getLocale('Boton')+' '+categoria.buttonIndex,
                          margin:'4 10 0 0',
                          width:70
                      },
                       {
                            xtype : 'combobox',
                            fieldLabel : 'Tipo',
                            itemId:'cat'+numeroCateg+'-extra-tipo-'+categoria.buttonIndex,
                            name:'cat'+numeroCateg+'-extra-tipo-'+categoria.buttonIndex,
                            store: [[0,getLocale('Oculto')],[1,getLocale('Evento')],[2,getLocale('Url')]],
                            ITERACION:categoria.buttonIndex,
                            labelWidth:80,
                            value:0,
                            listeners:{
                               change: function (combo, value) {
                                    var container = this.up('container')
                                   container.down('#cat'+numeroCateg+'-btn-nombre-'+this.ITERACION).show()
                                   if(value == 2) {
                                       container.down('#cat'+numeroCateg+'-btn-formato-'+this.ITERACION).hide()
                                       container.down('#cat'+numeroCateg+'-btn-url-'+this.ITERACION).show()
                                      // container.down('#btn-target-'+this.ITERACION).show()                                               
                                       
                                       container.down('#cat'+numeroCateg+'-btn-formato-'+this.ITERACION).setValue('')
                                   } else if(value == 1) {                                               
                                       container.down('#cat'+numeroCateg+'-btn-formato-'+this.ITERACION).show()
                                       container.down('#cat'+numeroCateg+'-btn-url-'+this.ITERACION).hide()
                                     //  container.down('#btn-target-'+this.ITERACION).hide()
                                       
                                       container.down('#cat'+numeroCateg+'-btn-url-'+this.ITERACION).setValue('')
                                      // container.down('#btn-target-'+this.ITERACION).setValue('')
                                   } else {
                                       container.down('#cat'+numeroCateg+'-btn-nombre-'+this.ITERACION).hide()
                                       container.down('#cat'+numeroCateg+'-btn-formato-'+this.ITERACION).hide()
                                       container.down('#cat'+numeroCateg+'-btn-url-'+this.ITERACION).hide()
                                      // container.down('#btn-target-'+this.ITERACION).hide()
                                       
                                       container.down('#cat'+numeroCateg+'-btn-nombre-'+this.ITERACION).setValue('')
                                       container.down('#cat'+numeroCateg+'-btn-formato-'+this.ITERACION).setValue('')
                                       container.down('#cat'+numeroCateg+'-btn-url-'+this.ITERACION).setValue('')
                                      // container.down('#btn-target-'+this.ITERACION).setValue('')
                                   }
                                   return false;
                               }
                           }
                        },{
                            xtype:'textfield',
                            fieldLabel : 'Nombre',
                            name:'cat'+numeroCateg+'-btn-nombre-'+categoria.buttonIndex,
                            itemId:'cat'+numeroCateg+'-btn-nombre-'+categoria.buttonIndex,
                            ITERACION:categoria.buttonIndex,
                            hidden:true,
                            labelWidth:80,
                            listeners:{
                               change: function (combo, value) {
                                   if(value != '') {
                                       var container = this.up('container')
                                       if(container.down('#cat'+numeroCateg+'-extra-tipo-'+this.ITERACION).getValue() <= 0) { 
                                        container.down('#cat'+numeroCateg+'-extra-tipo-'+this.ITERACION).setValue(1)
                                       }
                                   }
                               }
                            }
                        },{
                            xtype:'textfield',
                            fieldLabel : 'Formato',
                            labelWidth:80,
                            name:'cat'+numeroCateg+'-btn-formato-'+categoria.buttonIndex,
                            itemId:'cat'+numeroCateg+'-btn-formato-'+categoria.buttonIndex,
                            hidden:true,
                            margin:'0 0 0 10'
                        },{
                            xtype:'textfield',
                            fieldLabel : 'Url',
                            labelWidth:80,
                            name:'cat'+numeroCateg+'-btn-url-'+categoria.buttonIndex,
                            itemId:'cat'+numeroCateg+'-btn-url-'+categoria.buttonIndex,
                            hidden:true,
                            margin:'0 0 0 10'
                        },{
                            xtype : 'combobox',
                            fieldLabel : 'Abrir en',
                            store: [[0,getLocale('SmartPanics')],[1,getLocale('Navegador')]],
                            name:'cat'+numeroCateg+'-btn-target-'+categoria.buttonIndex,
                            itemId:'cat'+numeroCateg+'-btn-target-'+categoria.buttonIndex,
                            hidden:true,
                            labelWidth:80,
                            value:0
                        }
                      ]                        
            
        }));
        
    },
    onSaveClick: function(button){
        var controller = this;
        var view= button.up('smartpanicconfigview');
        var _ObjectId = 30;
        var _ObjectTypeName = 'UiApplication';
        var _restPath = (myQueryString.restPath != undefined) ? myQueryString.restPath : 'Rest';
        this.disableCategBeforeSave(view,false);
        var ArrJson = view.getForm().getFieldValues();
        if(!view.byDealer) {
            if(ArrJson["btn-url-1"] != ''){
                ArrJson["btn-url-1"] = encodeURIComponent(ArrJson["btn-url-1"]);
            }
            if(ArrJson["btn-url-2"] != ''){
                ArrJson["btn-url-2"] = encodeURIComponent(ArrJson["btn-url-2"]);
            }
            if(ArrJson["btn-url-3"] != ''){
                ArrJson["btn-url-3"] = encodeURIComponent(ArrJson["btn-url-3"]);
            }
            if(ArrJson["btn-url-4"] != ''){
                ArrJson["btn-url-4"] = encodeURIComponent(ArrJson["btn-url-4"]);
            }
            if(ArrJson["btn-url-5"] != ''){
                ArrJson["btn-url-5"] = encodeURIComponent(ArrJson["btn-url-5"]);
            }
            if(ArrJson["btn-url-6"] != ''){
                ArrJson["btn-url-6"] = encodeURIComponent(ArrJson["btn-url-6"]);
            }
            if(ArrJson["btn-url-7"] != ''){
                ArrJson["btn-url-7"] = encodeURIComponent(ArrJson["btn-url-7"]);
            }
            if(ArrJson["btn-url-8"] != ''){
                ArrJson["btn-url-8"] = encodeURIComponent(ArrJson["btn-url-8"]);
            }
            if(ArrJson["btn-url-9"] != ''){
                ArrJson["btn-url-9"] = encodeURIComponent(ArrJson["btn-url-9"]);
            }
            if(ArrJson["btn-url-10"] != ''){
                ArrJson["btn-url-10"] = encodeURIComponent(ArrJson["btn-url-10"]);
            }
            if(ArrJson["btn-url-11"] != ''){
                ArrJson["btn-url-11"] = encodeURIComponent(ArrJson["btn-url-11"]);
            }
            if(ArrJson["btn-url-12"] != ''){
                ArrJson["btn-url-12"] = encodeURIComponent(ArrJson["btn-url-12"]);
            }
        }                                    
        this.disableCategBeforeSave(view,true);
        if (!view.isValid()){
            notifyError('Campos inválidos, debe corregir antes de guardar.');
            console.log('Campos inválidos');
            console.log(view.query("field{isValid()==false}"));
            return false;
        }
 
        if (view.down('#LandingMobileURL').getValue()=='' && view.down('#NewLogin').getValue()==true){
            notifyError('Si "USAR LOGIN CON USUARIO Y CLAVE" es seleccionado');
            console.log('Campos inválidos');
            console.log(view.query("field{isValid()==false}"));
            return false;
        }
        
        /* Obtengo el texto del Contrato actual de la metadata y procedo a compararlo al momento de guardar para saber si hubo cambio.
         * En caso de no haber, guardo directamente llamando a la funcion forceSave(), caso contrario procedo a solicitar cambio de version
         */
        var contratoActual = Ext.JSON.decode(view.metadata.Config);
        
        if(contratoActual.AGREEMENT != ArrJson.AGREEMENT) {
            Ext.MessageBox.show({
                icon: Ext.Msg.WARNING,
                title: getLocale('Advertencia'),
                msg: getLocale('Si ha realizado algun tipo de cambio en el contrato de licencia y desea propagarlo a todos los usuarios, presione el boton "Confirmar", en caso contrario "Cancelar"'),
                buttons: Ext.MessageBox.YESNO,
                height: 200,
                width : 400,
                autoScroll: true,
                overflowY:'auto',
                bodyStyle:"padding:10px;background:#FFFFFF;background-color:#FFFFFF",
                buttonText:{ 
                    yes: getLocale('Confirmar'), 
                    no: getLocale('Cancelar') 
                },
                fn: function (btn) {
                    if(btn === 'yes') {
                        // Creo la window para la confirmacion de nueva version
                        var myWindow = Ext.widget('window',{
                            title: 'Seleccionar version',
                            height: 400,
                            width: 400,
                            closeAction : 'destroy',
                            modal: true,
                            bodyStyle:"padding:10px;background:#FFFFFF;background-color:#FFFFFF",
                            items: [
                                {
                                    xtype : 'panel',
                                    padding : 10,
                                    border : false,
                                    items : [
                                       {
                                            xtype : 'displayfield',
                                            value : 'Indique la nueva version del contrato correspondiente'
                                        },{
                                            xtype :'textfield',
                                            fieldLabel :'Version',
                                            itemId :'version',
                                            width :'100%',
                                            labelWidth : 50,
                                            value : ArrJson.LicenseVersion,
                                            validator : function(value){ 
                                                // Obtengo el nuevo valor de version
                                                var versionValue = ArrJson.LicenseVersion
                                                var newVersionValue = this.getValue();
                                                var buttonSave = myWindow.down('#save');
                                                
                                                if ( versionValue != newVersionValue ) {
                                                    buttonSave.setDisabled(false);
                                                    this.clearInvalid();
                                                    this.textValid = true;
                                                    view.LicenseVersionChange = false;
                                                } else {
                                                    this.markInvalid("Las versiones no pueden ser iguales");
                                                    this.textValid = false;
                                                    buttonSave.setDisabled(true);
                                                }
                                            }
                                        } 
                                    ]
                                }
                            ],
                            tbar:  [
                                {
                                    text : 'Guardar',
                                	iconCls : 'save',
                                    disabled : true,
                                    itemId : 'save',
                                    listeners : {
                                        click : function(e) {
                                            view.down('#LicenseVersion').setValue(myWindow.down('#version').getValue());
                                            ArrJson.LicenseVersion = myWindow.down('#version').getValue();
                                            controller.onForceSave(ArrJson, view, _ObjectId);
                                            myWindow.close();
                                        }
                                    }
                    		    },{
                                    text : 'Cancelar',
                        			iconCls : 'cancel',
                                    listeners : {
                                        click : function(button) {
                                            myWindow.close();
                                        }
                                    }
                    		    }
                            ]
                            
                        }).show();
                   }
                   else {
                       console.log('Ud NO confirmo.')
                   }
                }
            });
            
        } else {
            controller.onForceSave(ArrJson, view, _ObjectId);
        }
    },
    getCantBtnCateg : function(ArrJson,nroCateg){
        var cantBtn=0;
        for(key in ArrJson){
            if(key in ArrJson){
                if(key.indexOf('cat'+nroCateg+'-btn-nombre')>=0){
                    cantBtn++;
                }
            }
        }
        return cantBtn;
    },
    bindingCategoriaBotones: function(view,ArrJson){
        
        
        var cantCateg=0;
        var btnAddCateg=view.down('#addCategorias');
        var indexDesde;
        var indexHasta;
        for (key in ArrJson){
            if(key.indexOf('cat')>=0){
                indexHasta = key.indexOf('-');
                indexDesde = key.indexOf('cat')+3;
                cantCateg=key.substr(indexDesde,indexHasta-indexDesde);
            }
        }
            
        var cantBtnCateg=0;    
        for(var i=1;i<=cantCateg;i++){
            this.onAddCategoriaClick(btnAddCateg);
            let btnAddBtnEncategoria = view.down('#categoria'+i).down('#addBotonCategoria'); 
            cantBtnCateg=this.getCantBtnCateg(ArrJson,i);
            for(var j=1;j<=cantBtnCateg;j++){
                this.onAddBotonesEnCategoria(btnAddBtnEncategoria,i);
            }
        }
    },
    getJsonCategorias: function(view){
        var i,j;
        var json=[];
        var itemJson;
        var contenedorCateg = view.down('#cnt-btn-categoria');
        for(i=1;i<=contenedorCateg.cantCateg;i++){
            itemJson= {categoryId:i,categoryName:view.down('#categoria-nombre-'+i).getValue()
                ,categoryOptions:[]};
            for(j=1;j<=view.down('#categoria'+i).buttonIndex;j++){
                /**
                 *  "extra-tipo-1": 1,
                    "btn-nombre-1": "Boton 1",
                    "btn-formato-1": "formato xx",
                    "btn-url-1": "",
                    "btn-target-1": 0,
                 * 
                 */
                itemJson.categoryOptions.push(
                    {   
                        extra_tipo:view.down('#cat'+i+'-extra-tipo-'+j).getValue(),
                        btn_nombre: view.down('#cat'+i+'-btn-nombre-'+j).getValue(),
                        btn_url: view.down('#cat'+i+'-btn-url-'+j).getValue(),
                        btn_formato: view.down('#cat'+i+'-btn-formato-'+j).getValue(),
                        btn_target:view.down('#cat'+i+'-btn-target-'+j).getValue()
                    }
                );
            }
            json.push(itemJson);
        }
        return json;
    },
    validarCategoriaBotones: function(view){
        var i,j;
        
        var catBtnError=false;
        var contenedorCateg = view.down('#cnt-btn-categoria');
        
        for(i=1;i<=contenedorCateg.cantCateg;i++){
            if(view.down('#categoria-nombre-'+i).getValue() == '')
                catBtnError = true;
            for(j=1;j<=view.down('#categoria'+i).buttonIndex;j++){
                var nombre =view.down('#cat'+i+'-btn-nombre-'+j).getValue();
                var formato = view.down('#cat'+i+'-btn-formato-'+j).getValue();
                var url = view.down('#cat'+i+'-btn-url-'+j).getValue();
                var combo = view.down('#cat'+i+'-extra-tipo-'+j);
                if(combo.getValue() == 2) {
                    if(url == '') {                   
                        catBtnError = true;
                    }
                    if(nombre == '') {                   
                        catBtnError = true;
                    }
                } else if(combo.getValue() == 1) {                                               
                        if(formato == '') {                   
                            catBtnError = true;
                        }
                        if(nombre == '' ) {                   
                            catBtnError = true;
                        }
                }
            }
        }
        return catBtnError;
    },
    validarFuncionesPrincipales(view){
        /**
         * btnMisAlarmasNombre
            funcMisAlertasNombre
            funcMisCuentasNombre
            funcMiGrupoNombre
            funcMisMovilesNombre
            btnMisMensajesNombre
            funcMisCamarasNombre
            funcMiEntornoNombre
            funcMisComandosNombre
            modoVecinalNombre
            funcMiEntornoNombre
         * 
         */
        if(view.down('#btnMisAlarmasNombre').getValue().trim()==''){
            return true;
        }
        if(view.down('#funcMisAlertasNombre').getValue().trim()==''){
            return true;
        }
        if(view.down('#funcMisCuentasNombre').getValue().trim()==''){
            return true;
        }
        if(view.down('#funcMiGrupoNombre').getValue().trim()==''){
            return true;
        }
        if(view.down('#funcMisMovilesNombre').getValue().trim()==''){
            return true;
        }
        if(view.down('#btnMisMensajesNombre').getValue().trim()==''){
            return true;
        }
        
        if(view.down('#funcMisCamarasNombre').getValue().trim()==''){
            return true;
        }
        if(view.down('#funcMiEntornoNombre').getValue().trim()==''){
            return true;
        }
        
        if(view.down('#funcMisComandosNombre').getValue().trim()==''){
            return true;
        }
        if(view.down('#modoVecinalNombre').getValue().trim()==''){
            return true;
        }
        if(view.down('#funcMiEntornoNombre').getValue().trim()==''){
            return true;
        }
                                                                              
    },
    validarOrdenDupl : function(view){
        var arrOrden = [];
        let tieneDupl=false;
        arrOrden.push(view.down('#funcMisAlertasSort').getValue() );
        arrOrden.push(view.down('#funcMisCuentasSort').getValue() );
        arrOrden.push(view.down('#funcMiGrupoSort').getValue() );
        arrOrden.push(view.down('#funcMisMovilesSort').getValue() );
        arrOrden.push(view.down('#funcMisCamarasSort').getValue() );
        arrOrden.push(view.down('#funcMiEntornoSort').getValue() );
        arrOrden.push(view.down('#btnMisAlarmasSort').getValue() );
        arrOrden.forEach(function (value, index, arr){
            let first_index = arr.indexOf(value);
            let last_index = arr.lastIndexOf(value);
            if(first_index !== last_index){
                tieneDupl=true;
                return
            }
        });
        return tieneDupl;
    },
    disableCategBeforeSave : function(view,disable){
        var contenedorCateg = view.down('#cnt-btn-categoria');
        if(contenedorCateg.cantCateg<=0)
            return;
        for (var i= 1; i<=contenedorCateg.cantCateg;i++){
            contenedorCateg.down('#categoria'+i).setDisabled(disable);
        }
        if(disable)
            contenedorCateg.down('#categoria'+contenedorCateg.cantCateg).setDisabled(false);
        
    },
    bindingWesafe : function (view, ArrJson){
        var weSafe = view.down('#idsPublicidad');
        if(ArrJson.weSafe)
            if(ArrJson.weSafe.idsPublicidad){
                weSafe.setValue(ArrJson.weSafe.idsPublicidad);
            }
    },
    bindingBotonesHome : function (view,ArrJson){
        var fieldsetBotonHome = view.down('#fieldsetBotonHome');
        var addBtnHome = view.down('#agregarBotonHome'); 
        let controller = this;
        var cantBotones = 1, iterar = true;
        
        while(iterar){
            if (ArrJson['btnHome'+cantBotones]==undefined){
                iterar = false;
                break;
            }
            cantBotones++;
        }
        /**
         * 
         *   "btnHome1": 1,
            "btnHome1Tipo": 0,
            "CIDESOS1": "F5",
            "CIDRSOS1": "F5",
            "btnHome1Telefono": "",
            "btnHome1Url": "",
            "btnHome1Actividad": null,
         */
        for(var i=1 ; i<  cantBotones;i++){
            
                controller.onAddBotonHome(addBtnHome);
                view.down('#btnHome'+fieldsetBotonHome.cantBotones).setValue(ArrJson['btnHome'+i]);
                view.down("#btnHome"+fieldsetBotonHome.cantBotones+"Tipo").setValue(ArrJson['btnHome'+i+'Tipo']);
                view.down('#CIDESOS'+fieldsetBotonHome.cantBotones).setValue(ArrJson['CIDESOS'+i]);
                view.down('#CIDRSOS'+fieldsetBotonHome.cantBotones).setValue(ArrJson['CIDRSOS'+i]);
                view.down('#btnHome'+fieldsetBotonHome.cantBotones+'Telefono').setValue(ArrJson['btnHome'+i+'Telefono']);
                view.down('#btnHome'+fieldsetBotonHome.cantBotones+'Url').setValue(ArrJson['btnHome'+i+'Url']);
                view.down('#btnHome'+fieldsetBotonHome.cantBotones+'Actividad').setValue(ArrJson['btnHome'+i+'Actividad']);  
        }        
        /**
         * El còdigo de abajo es el que correspondía a la anterior configuración de metadata, cuando los botones home
         * estaban dentro de "funciones_principales"
         * 
         * 
        if(ArrJson.funciones_principales && ArrJson.funciones_principales.length>0){
            for(var i=0 ; i<  ArrJson.funciones_principales.length;i++){
                var btnHome = ArrJson.funciones_principales[i];
                if(btnHome.Function==""){
                    controller.onAddBotonHome(addBtnHome);
                    //view.down('#btnHome'+fieldsetBotonHome.cantBotones+'Nombre').setValue(btnHome.Nombre);
                    view.down("#btnHome"+fieldsetBotonHome.cantBotones+"Tipo").setValue(btnHome.Tipo);
                    //view.down('#btnHome'+fieldsetBotonHome.cantBotones+'Color').setValue(btnHome.Color);
                    view.down('#CIDESOS'+fieldsetBotonHome.cantBotones).setValue(btnHome.Formato);
                    view.down("#btnHome"+fieldsetBotonHome.cantBotones).setValue(btnHome.Status);
                    view.down('#CIDRSOS'+fieldsetBotonHome.cantBotones).setValue(btnHome.CIDRSOS);
                    view.down('#btnHome'+fieldsetBotonHome.cantBotones+'Telefono').setValue(btnHome.Telefono);
                    view.down('#btnHome'+fieldsetBotonHome.cantBotones+'Url').setValue(btnHome.Url);
                    view.down('#btnHome'+fieldsetBotonHome.cantBotones+'Actividad').setValue(btnHome.Actividad);                    
                }
            }
        }*/
    },
    addBotonesMenuInfArrJson: function(ArrJson,view){
        var menuInf = view.down('#btn-menuinferior-config');
        ArrJson.menu_inferior=[];
        for(i = 1 ; i<= 5; i++){
            ArrJson.menu_inferior.push({
                Tipo : menuInf.down("#btnMenuInf"+i+"Tipo").getValue(),
                Nombre : menuInf.down("#btnMenuInf"+i+'Nombre').getValue(),
                //Color: menuInf.down("#btnMenuInf"+i+'Color').getValue(),
                Formato : menuInf.down("#btnMenuInf"+i+'CIDESOS').getValue(),
                Restauracion : menuInf.down("#btnMenuInf"+i+'CIDRSOS').getValue(),
                Telefono : menuInf.down("#btnMenuInf"+i+'Telefono').getValue(),
                Url : menuInf.down("#btnMenuInf"+i+'Url').getValue()
            });
        }
    },
    addBotonesHomeArrJson: function(ArrJson,view){
        /********************************** */
        //https://basecamp.com/2249105/projects/16594557/todos/440533902
        var fieldsetBotonHome = view.down('#fieldsetBotonHome');
        var cantBotones = fieldsetBotonHome.cantBotones;
        for (var i = 1 ; i <= cantBotones; i++){
            ArrJson.funciones_principales.push(
                {   
                    Id: 0,//view.down('#btnMisAlarmas').getValue(),
                    //Nombre: view.down('#btnHome'+i+'Nombre').getValue(),//view.down('#btnMisAlarmasNombre').getValue(),
                    Sort:0,//view.down('#btnMisAlarmasSort').getValue(),
                    Function: '',//FuncMisAlarmas',
                    Tipo: view.down("#btnHome"+i+"Tipo").getValue(),
                    //Color: view.down('#btnHome'+i+'Color').getValue(),
                    Formato: view.down('#CIDESOS'+i).getValue(),
                    Status: view.down("#btnHome"+i).getValue(),
                    CIDRSOS: view.down('#CIDRSOS'+i).getValue(),
                    Telefono: view.down('#btnHome'+i+'Telefono').getValue(),
                    Url: view.down('#btnHome'+i+'Url').getValue(),
                    Actividad: view.down('#btnHome'+i+'Actividad').getValue()
                });            
        }
        /*************************************/
    },
    onForceSave : function(ArrJson, view, _ObjectId) {
        //evaluo que no se reptita ningun formato o restauracion en ningun boton  
        var camposEvaluar = []
        camposEvaluar.push('CIDEASSIST')
        camposEvaluar.push('CIDEFIRE')
        camposEvaluar.push('CIDESOS')
        camposEvaluar.push('CIDRASSIST')
        camposEvaluar.push('CIDRFIRE')
        camposEvaluar.push('CIDRSOS')
        camposEvaluar.push('CIDESOSDEMORADOI')
        camposEvaluar.push('CIDRSOSDEMORADOI')
        camposEvaluar.push('CIDESOSDEMORADO')
        camposEvaluar.push('CIDRSOSDEMORADO')
        camposEvaluar.push('CIDESOSDEMORADONOW')
        camposEvaluar.push('CIDESOSDEMORADOMIN')
        var catBtnError = false;
        var btnHomeError = false; 
        //valido botones de categoria
        catBtnError = this.validarCategoriaBotones(view);      
        btnHomeError = this.validarBotonesHome(view); 
        if(ArrJson.btnExtras > 0) {
            for (i = 1; i <= 12; i++) { 
                //si el campo no es oculto lo tomo considero para evaluarlo
                if(ArrJson['extra-tipo-'+i] > 0) {
                    camposEvaluar.push('btn-formato-'+i)
                }
            }
        }
        
        var isUsed = false;
        for (var key in camposEvaluar) {
            if (ArrJson.hasOwnProperty(camposEvaluar[key])) {
                //console.log(key + " -> " + ArrJson[camposEvaluar[key]]);
                if(ArrJson[camposEvaluar[key]] != '') {    
                    for (var keyObj in camposEvaluar) {
                        if (ArrJson.hasOwnProperty(camposEvaluar[keyObj])) {
                            //console.log(ArrJson[camposEvaluar[key]] + " -> " + ArrJson[camposEvaluar[keyObj]]);
                            if(ArrJson[camposEvaluar[key]] == ArrJson[camposEvaluar[keyObj]] && 
                                    camposEvaluar[key] != camposEvaluar[keyObj] &&
                                    ArrJson[camposEvaluar[keyObj]] != '' ) {
                                isUsed = true;
                                console.log(ArrJson[camposEvaluar[key]] + " -> " + ArrJson[camposEvaluar[keyObj]]);
                            }
                        }
                    }
                }              
            }
        }
        
        
        //evaluo los botnes extras que tengan lo necesario
        var btnextraError = false;
        for (i = 1; i <= 12; i++) { 
            var combo = view.down('#extra-tipo-'+i)
            if(combo.getValue() == 2) {
               if(view.down('#btn-url-'+i).getValue() == '') {                   
                   btnextraError = true;
               }
               if(view.down('#btn-nombre-'+i).getValue() == '') {                   
                   btnextraError = true;
               }
            } else if(combo.getValue() == 1) {                                               
               if(view.down('#btn-formato-'+i).getValue() == '') {                   
                   btnextraError = true;
               }
               if(view.down('#btn-nombre-'+i).getValue() == '' ) {                   
                   btnextraError = true;
               }
            }
        }
                
        if(btnextraError == true) {
            notifyError('Verifique que los botones extras cumplan con la especificación indicada.')
            return false;
        }
        /*********** */
        if(catBtnError==true){
            notifyError('Verifique que los botones de categoría cumplan con la especificación indicada');
            return false;
        }
        if(btnHomeError == true){
            notifyError('Recuerde que formato y restauración de "Botones Home" es ingreso obligatorio');
            return false;
        }
        //agrego al array la estructura de los botones por categoría
        ArrJson.btn_extras=this.getJsonCategorias(view);
        var ordenDupl = this.validarOrdenDupl(view);
        if(ordenDupl){
            notifyError('El orden en Funciones Principales no puede tener duplicados');
            return false;            
        }
        if(ArrJson.NewLogin)
            ArrJson.NewLogin = 1;
        else
            ArrJson.NewLogin = 0;
        /*********************************** */
        
        /*var funcionesPrincipales = false;
        funcionesPrincipales = this.validarFuncionesPrincipales(view);
        if(funcionesPrincipales==true){
            notify('Verifique que las funciones principales cumplan con la especificación indicada');
            return false;
        }*/
        
        //agrego al array la estructura de las funciones principales
        ArrJson.funciones_principales=[];
            //btnMisAlarmasNombre
            //funcMisAlertasNombre
            //funcMisCuentasNombre
            //funcMiGrupoNombre
            //funcMisMovilesNombre
            //btnMisMensajesNombre
            //funcMisCamarasNombre
            //funcMiEntornoNombre
            //funcMisComandosNombre
            //modoVecinalNombre
                    
        ArrJson.funciones_principales.push(
                {   
                    Id: view.down('#btnMisAlarmas').getValue(),
                    Nombre:view.down('#btnMisAlarmasNombre').getValue(),
                    Sort:view.down('#btnMisAlarmasSort').getValue(),
                    Function: 'FuncMisAlarmas',
                    Tipo: "",
                    Color: "",
                    Formato: "",
                    Status: "",
                    CIDESOS: "",
                    CIDRSOS: "",
                    Telefono: "",
                    Url: "",
                    Actividad: ""
                });
        ArrJson.funciones_principales.push(
            {
                Id:view.down('#funcMisAlertas').getValue(),
                Nombre:view.down('#funcMisAlertasNombre').getValue(),
                Sort: view.down('#funcMisAlertasSort').getValue(),
                Function: 'FuncMisAlertas',
                Tipo: "",
                Color: "",
                Formato: "",
                Status: "",
                CIDESOS: "",
                CIDRSOS: "",
                Telefono: "",
                Url: "",
                Actividad: ""
            });
        ArrJson.funciones_principales.push(
            {
                Id: view.down('#funcMisCuentas').getValue(),
                Nombre:view.down('#funcMisCuentasNombre').getValue(),
                Sort: view.down('#funcMisCuentasSort').getValue(),
                Function: 'FuncMisCuentas',
                Tipo: "",
                Color: "",
                Formato: "",
                Status: "",
                CIDESOS: "",
                CIDRSOS: "",
                Telefono: "",
                Url: "",
                Actividad: ""
            });
        ArrJson.funciones_principales.push(
            {
                Id: view.down('#funcMiGrupo').getValue(),
                Nombre:view.down('#funcMiGrupoNombre').getValue(),
                Sort: view.down('#funcMiGrupoSort').getValue(),
                Function: 'FuncMiGrupo',
                Tipo: "",
                Color: "",
                Formato: "",
                Status: "",
                CIDESOS: "",
                CIDRSOS: "",
                Telefono: "",
                Url: "",
                Actividad: ""
                
            });
        ArrJson.funciones_principales.push(
            {
                Id : view.down('#funcMisMoviles').getValue(),
                Nombre:view.down('#funcMisMovilesNombre').getValue(),
                Sort : view.down('#funcMisMovilesSort').getValue(),
                Function: 'FuncMisMoviles',
                Tipo: "",
                Color: "",
                Formato: "",
                Status: "",
                CIDESOS: "",
                CIDRSOS: "",
                Telefono: "",
                Url: "",
                Actividad: ""
            });
        ArrJson.funciones_principales.push(
            {
                Id : view.down('#btnMisMensajes').getValue(),//view.down('#funcMisMensajes').getValue(),
                Nombre:view.down('#btnMisMensajesNombre').getValue(),
                Sort : 0,//view.down('#funcMisMensajes').getValue(),
                Function: 'FuncMisMensajes',
                Tipo: "",
                Color: "",
                Formato: "",
                Status: "",
                CIDESOS: "",
                CIDRSOS: "",
                Telefono: "",
                Url: "",
                Actividad: ""
                
            });
        ArrJson.funciones_principales.push(
            {
                Id : view.down('#funcMisCamaras').getValue(),
                Nombre : view.down('#funcMisCamarasNombre').getValue(),
                Sort : view.down('#funcMisCamarasSort').getValue(),
                Function: 'FuncMisCamaras',
                Tipo: "",
                Color: "",
                Formato: "",
                Status: "",
                CIDESOS: "",
                CIDRSOS: "",
                Telefono: "",
                Url: "",
                Actividad: ""
                
            });
        ArrJson.funciones_principales.push(
            {
                Id : view.down('#funcMiEntorno').getValue(),
                Nombre : view.down('#funcMiEntornoNombre').getValue(),
                Sort : view.down('#funcMiEntornoSort').getValue(),
                Function: 'FuncMiEntorno',
                Tipo: "",
                Color: "",
                Formato: "",
                Status: "",
                CIDESOS: "",
                CIDRSOS: "",
                Telefono: "",
                Url: "",
                Actividad: ""
                
            });
        ArrJson.funciones_principales.push(
            {
                Id : view.down('#funcMisComandos').getValue(),
                Nombre:view.down('#funcMisComandosNombre').getValue(),
                Sort : 0,//view.down('#funcMisComandosSort').getValue(),
                Function : 'FuncMisComandos',
                Tipo: "",
                Color: "",
                Formato: "",
                Status: "",
                CIDESOS: "",
                CIDRSOS: "",
                Telefono: "",
                Url: "",
                Actividad: ""
                
            });
        ArrJson.funciones_principales.push(
            {
                Id : view.down('#modoVecinal').getValue(),
                Nombre:view.down('#modoVecinalNombre').getValue(),
                Sort : view.down('#modoVecinalSort').getValue(),
                Function: 'FuncModoVecinal',
                Tipo: "",
                Color: "",
                Formato: "",
                Status: "",
                CIDESOS: "",
                CIDRSOS: "",
                Telefono: "",
                Url: "",
                Actividad: ""
                
            });
        ArrJson.funciones_principales.push(
            {
                Id : view.down('#funcMiEntorno').getValue(),
                Nombre:view.down('#funcMiEntornoNombre').getValue(),
                Sort : 0,//view.down('#funcMiEntornoSort').getValue(),
                Function: 'FuncMiEntorno',
                Tipo: "",
                Color: "",
                Formato: "",
                Status: "",
                CIDESOS: "",
                CIDRSOS: "",
                Telefono: "",
                Url: "",
                Actividad: ""
                
            });
        
        /********************************** */
        //this.addBotonesHomeArrJson(ArrJson,view);
        //this.addBotonesMenuInfArrJson(ArrJson,view);
        
        if(isUsed) {
            notify('Formatos o Restauraciones duplicados.')
            button.setDisabled(false);
            return false
        }
        
        delete ArrJson['NOMBRECUENTA'];
        
         //meto en array el ip2
        ArrJson.remoteDesktopURLs = []
        ArrJson.remoteDesktopURLs.push({
            remoteUrl: ArrJson.remoteUrl
        })
        delete ArrJson.remoteUrl
        
        
        if(view.byDealer) {
            //TODO: borrar cuando ya no se necesario forzar el pisado de la pestaña conexion (ver en init el ajax)
            ArrJson.readerIp =  view.metadataGlobal.Config.readerIp
            ArrJson.images =  view.metadataGlobal.Config.images
            ArrJson.readerPort =  view.metadataGlobal.Config.readerPort // dedalo 2020/01/20 descomento para que tome el puerto global al guardar
            //ArrJson.remoteDesktopURLs =  view.metadataGlobal.Config.remoteDesktopURLs
                
            //ArrJson.smsTel =  view.metadataGlobal.Config.smsTel
            //ArrJson.email =  view.metadataGlobal.Config.email
            //ArrJson.TELCRA =  view.metadataGlobal.Config.TELCRA
            //ArrJson.googleKey =  view.metadataGlobal.Config.googleKey
            //ArrJson.DEFAULTIDCUENTA =  view.metadataGlobal.Config.DEFAULTIDCUENTA
         }
         ArrJson.weSafe = {};
         ArrJson.weSafe.idsPublicidad = view.down('#idsPublicidad').getValue();
       
        var json = Ext.encode(ArrJson);
        view.metadata.Config=json;
        
        if(!view.byDealer) {
            //esta configurcion es global
            var url = '/rest/UiApplication/'+ _ObjectId+'/Metadata';
            
            Ext.Ajax.request({
              url: url,
              method: 'POST',
              params: Ext.encode(view.metadata),
              scope: this,
              success: function(resp,operation) {
                notify('Los datos se guardaron con éxito');
              }
            });
        } else {
            //esta configuracion es por dealer
            if(view.currentConfig) {
                this.getM_dealer_spconfigModelModel().load(view.currentConfig.get('Id'), {callback:function (record) {
                    if(record) {
                        record.set('dsp_config',view.metadata.Config)
                        record.save({callback:function () {
                            notify('Configuracion guardada')
                        }})
                    } else {
                        notify('ocurrio un error al guardar.')
                    }
                }})
            } else {
                this.getM_dealer_spconfigModelModel().create({
                    dsp_config:view.metadata.Config,
                    dsp_cdealer: view.record.get('cue_clinea')?view.record.get('cue_clinea'):view.record.get('lin_ccodigo')
                }).save({callback:function () {
                    notify('Se creo nueva configuracion.')                
                }})
            }
        }
    }/*,
    onAgregarEventoClick: function (btn) {
        var view = btn.up('smartpanicconfigview');
        var recForm = view.getForm().getRecord()
        var myWindow = Ext.widget('window',{
            title: 'Selector de eventos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true, 
            items: [{
                xtype: 'eventselecterhelperview',
                eventSelected: view.down('#eventoshide').getValue(),
                caller: view
                
            }],
            layout: 'fit'
        }).show();
    },
    eventsSelected: function(records, view) {
          var textarea = view.down('#eventos');
       
        var text = '';
        
        var arrayEventos = [];
        Ext.Array.each(records.items, function(record){
            if (record){
                text = text + record.get('Descripcion')+'\r\n';
                arrayEventos.push(record.get('cod_ccodigo'));
            }
        })
    
        
        textarea.setValue(text);
     
        view.down('#eventoshide').setValue(arrayEventos.join(','))
    }*/    
    
});