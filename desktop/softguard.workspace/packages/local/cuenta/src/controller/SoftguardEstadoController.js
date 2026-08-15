Ext.define('Cuenta.controller.SoftguardEstadoController', {
    extend: 'Ext.app.Controller',
        stores : [],
		models : [],
		views : ['SoftguardEstadoView'],

    init: function (config) {
        var me = this;
        this.control({
            'estadoformview':{
                beforerender: this.initformview,
                dirtychange: this.onFormChange
            },
            'estadoview':{
                beforerender: this.initview
            },
            'estadoformview button[action=save]':{
                click: this.onSaveClick
            },
            'estadoformview button[action=deshabilitar]':{
                click: this.onDeshabilitarClick
            },
            'estadoformview button[action=habilitar]':{
                click: this.onHabilitarClick
            },
            'estadoformview button[action=prueba]':{
                click: this.onPruebaClick
            },
            'estadoformview button[action=xzonas]':{
                click: this.onZonasClick
            },
            'estadoformview button[action=delete]':{
                click: this.onDeleteClick
            },
            'estadoformview #duracion':{
                change: this.onDuracionChange
            },
            'estadoformview #tipo':{
                select: this.onTipoSelect
            },
            'estadoformview #parcialevento':{
                change: this.onEventosChange
            }
        });
    },
    
    onEventosChange: function (field,values) {
        
        var view = field.up('estadoformview')        
        view.down('#save').setDisabled(false)
    },    
    
    onFormChange: function (view, dirty) {
        if(dirty) {
            view.owner.down('#save').setDisabled(false)
        } else {
            view.owner.down('#save').setDisabled(true)
        }
    },
    
    initview : function(view) {
        var module = view.module;
        var profile = module.profile?module.profile:module.get('profile');
        var form = view.down('estadoformview');
        view.profile = profile;
        
        
        
        if (view.hideControls){
            Ext.Array.each(view.hideControls, function(control){
                view.down(control).hide();
            })
        }
        
        form.profile = profile;
        form.module = module;
        form.rights = view.rights;
        
        // en TG la cuenta llega en view.cuenta
        var item = view.down('estadoitemgridview');
        if (view.cuenta){
            form.cuenta = view.cuenta;
            item.record = view.cuenta;
            item.cuenta = view.cuenta;
        }else {
            item.record = view.record;
            item.cuenta = view.record;
            view.cuenta = view.record;
        }
        
        if(this.application._nameModule  == 'VigiControl') {
            view.down('#btnxzonas').hide();
        }

        if (profile < 2){
            view.down('toolbar').hide();
            view.down('#btndeshabilitar').hide();
            view.down('#btnhabilitar').hide();
            view.down('#btnprueba').hide();
            view.down('#btnxzonas').hide();
            view.down('#btnEliminar').hide();
        }
        
    },
    
    
    initformview : function(view) {
        var cuenta = view.cuenta?view.cuenta:view.record;
        var controller = this;
        
        view.onInit = true;
        
        var btnEliminar = view.down('#btnEliminar');
        
        if (view.rights && !view.rights.delete && btnEliminar)
            btnEliminar.hide();
    
        var objectId = cuenta.get('cue_iid');
		this.getSoftguardEstadoModelModel().load(objectId, {
			success : function(record,operation) {
                var desdeTime = view.down('#desdeTime');
                var hastaTime = view.down('#hastaTime');
                var estado = record.get('est_nestado');
                
                if (!record){
                    controller.createRecord(operation.view);
                } else {
                    view.recordEstado=record;
                    if (record.get('est_dfechadesde').getFullYear()< 1900){
                        var desde = new Date();
                        var hasta = new Date();
                        
                        record.set('est_dfechadesde', desde);
                        record.set('est_dfechahasta', hasta);
                    };
                    
                    if (record.get('est_nduracion')==0){
                        record.set('est_nduracion',1);
                    }
                    
                    
                    if (record.get('est_nestado')==0  || record.get('est_ntipo') == 0){
                        view.down('#duracion').hide();
                    }
                    
                    //view.down('#duracion').hide();
                    
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
                            view.down('#btnxzonas').hide();
                            view.down('#parcialevento').show();
                        break;
                    }
                    
                    view.loadRecord(view.recordEstado);
                     
                    if (estado == 0 || estado == 2|| estado == 4){
                        controller.hideHabilitadoFields(view.up('estadoview'));
                    } else {
                        controller.showHabilitadoFields(view.up('estadoview'));
                        if (estado == 3){
                            var combo = view.down('#tipo');
                            var store = combo.getStore();
                            if (store.find('Value',0) == 0)
                                store.removeAt(0)
                        }
                    }

                }
                
                if(estado == 3) {
                
                   var storeParticiones =Ext.create('Ext.data.Store',{
                        model: controller.getM_estado_cuenta_itemModelModel(),
                        remoteFilter: true,                        
                        filters: [{
                            property:'est_iidcuenta',
                            value:record.get('Id')
                        }]
                    }).load({callback:function (records) {
                            if(records.length>0) {
                                view.down('#parcialevento').setValue(records[0].get('est_cData'))                            
                            }
                    }})
                    
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
        
        //@if (ViewBag.UIMetadata.ExtPath != "ext-6.2.0" && ViewBag.UIMetadata.ExtPath != "ext-6.5.1"){
        //   @Html.Raw("cuenta.setDirty()")
        //}
        
        var storeTipo =Ext.create('Ext.data.Store',{
            model: controller.getNameValueIntModelModel(),
            
        })
        storeTipo.add([
            {Name:getLocale('Permanente'), Value: 0},
    		{Name:getLocale('Minutos'), Value: 1},
    		{Name:getLocale('Horas'), Value: 2},
    		{Name:getLocale('Dias'), Value: 3},
    		{Name:getLocale('Meses'), Value: 4}
    	])
        view.down('#tipo').bindStore(storeTipo)
	},
    
    createRecord: function(view){
        var model = this.getSoftguardEstadoModelModel();
        var cuenta = view.cuenta;
        var desdeTime = view.down('#desdeTime');
        var hastaTime = view.down('#hastaTime');
        view.recordEstado = model.create({
            Id: cuenta.get('Id'),
            est_dfechadesde: new Date(),
            est_dfechahasta: new Date()
        });
        view.loadRecord(view.recordEstado);
        desdeTime.setValue(view.recordEstado.get('est_dfechadesde'));
        hastaTime.setValue(view.recordEstado.get('est_dfechahasta'));
    },
    
    onDeleteClick : function(button, event, options) {
        var view =button.up('estadoview');
        var form = button.up('estadoformview').getForm();
        var record = form.getRecord();
        var controller = this;
        
        record.set('est_nestado', 4);
        
        view.down('#btnhabilitar').show();
        view.down('#btnprueba').show();
        view.down('#btndeshabilitar').show();
        view.down('#parcialevento').hide();
        
        if(this.application._nameModule  == 'VigiControl') {
            view.down('#btnxzonas').hide();
        } else {
            view.down('#btnxzonas').show();    
        }

        view.down('#btnEliminar').hide();
        
        form.loadRecord(record);
        this.hideHabilitadoFields(view);
        
        this.onFormChange(form,true)
    },
    
    cerrarWin: function (view) {
        if(view.up('window')){
            view.up('window').close()
        }
    },
    
	onSaveClick : function(button, event, options) {
        var estadoview = button.up('estadoview');
        var view =button.up('form');
        var cuenta = estadoview.cuenta;
        var myform = view.getForm();
        var record = myform.getRecord();
        myform.updateRecord(record);
        var hastaField = myform.findField('est_dfechahasta');
        var hastaValue = hastaField.getValue();
        var controller = this;
        
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
        
        console.log(myform.isDirty())
        
        if (myform.isValid()){
            record.set('token',Ext.util.Cookies.get('OAuth_Token'))
        /*    
            Ext.Ajax.request({
                  url: '/Rest/search/EstadoUpd',
                  params: record.data,
                  method: 'GET',
                  scope: this,
                  success: function(response){*/

                //  var record = controller.getSoftguardEstadoModelModel().create(Ext.JSON.decode(response.responseText).rows[0])
                 
    		record.save({
                controller: this,
                failure : function(record,operation) {
                    console.log(arguments)
                },// cierro function
                success : function(record,operation) {
                    notify('El estado se guardó con éxito');

                    // si tenia forceZona le agrego el item
                    if (estadoview.forceZona && record.get('est_nestado') == 3){
                        var model = controller.getEstadoItemModelModel();
                        var item = model.create({
                            est_czona: estadoview.forceZona,
                            est_iidcuenta: cuenta.get('cue_iid')
                        });
                        
                        item.save();
                    }
                    
                    if (record.get('est_nestado') == 3){
                        var model = controller.getM_estado_cuenta_itemModelModel();
                        
                        var storeParticiones =Ext.create('Ext.data.Store',{
                            model: model,
                            remoteFilter: true,
                            filters:[
                                {
                                    property:'est_iidcuenta',
                                    value:record.get('Id')
                                }
                            ],
                            /*
                            listeners: {
                                beforeload: function(store, operation){
                                    operation.ObjectId= record.get('Id');
                                }
                            }
                            */
                        }).load({callback:function (records) {
                            Ext.Array.each(records, function (record) {
                                if(Ext.util.Format.trim(record.get('est_czona')) == '_COD_') {
                                    record.destroy()
                                }
                            })

                            var recordItem = model.create({
                                est_czona: '_COD_',
                                est_iidcuenta: cuenta.get('cue_iid'),
                                est_cData: view.down('#parcialevento').getValue()
                            }); 
                            
                            recordItem.save();
                            controller.cerrarWin(view);
                        }})
                    }
                    if(record.get('est_nestado') == 1) {
                        //guardo en eventostimeline
                        if(estadoview.rec_iid) {
                            controller.getEventosTiemLineModelModel().create({
                                etl_icuenta: cuenta.get('cue_iid'),
                                etl_tfechahora: new Date(),
                                etl_caccion: '%PoneAPrueba%',
                                etl_cobservacion: '%PoneAPrueba%',
                                etl_cowner: '%MWR%',
                                etl_ioperador: estadoview.operadorId,
                                etl_irecid: estadoview.rec_iid
                            }).save();
                        }
                        controller.cerrarWin(view);
                    } 
                    //else if(record.get('est_nestado') == 0 || record.get('est_nestado') == 2) {
                        // si se pasa a deshabilitada o habilitada le pongo el mismo estado a las particiones
                    
                    var storeParticiones =Ext.create('Ext.data.Store',{
                        model: controller.getZonaByCuentaSearchModelModel(),
                        remoteFilter: true,
                        listeners: {
                            beforeload: function(store, operation){
                                operation.params = {cuentaId:cuenta.get('cue_iid')};
                            }
                        },
                        filters: [{
                            property: 'zon_ccodigo:like',
                            value: 'PAR'
                            } 
                        ]
                    })

                    //@if (ViewBag.UIMetadata.ExtPath == "ext-6.2.0" || ViewBag.UIMetadata.ExtPath == "ext-6.5.1"){  
                    //    @Html.Raw(@" storeParticiones.proxy.setExtraParams({cuentaId:cuenta.get('cue_iid')});")                     
                    //} else {
                    //    @Html.Raw(@"storeParticiones.proxy.extraParams = {cuentaId:cuenta.get('cue_iid')}")                     
                    //}

                    storeParticiones.load({callback:function (records) {
                        if(records.length > 0) {
                            var _msg = getLocale('La cuenta tiene particiones quiere que tomen el mismo estado de la cuenta madre?');
                            if (record.get('est_nestado') == 4){
                                _msg = getLocale('La cuenta tiene particiones, quiere eliminarlas? Las particiones no eliminadas se modificaran a cuentas principales.');
                            }

                            Ext.MessageBox.confirm(getLocale('Confirm'), _msg, function (btn) {
                                if(btn == 'yes') {
                                    var win = Ext.create('Ext.Window', {
                                        iconCls: 'icon-table-add',
                                        layout : 'fit',
                                        title : 'Seleccione las particiones',
                                        width : 450,
                                        height : 500,
                                        border : false,
                                        modal:true,
                                        tbar:[
                                                {
                                                    text:'Cambiar estado',
                                                    handler: function () {
                                                        var win = this.up('window');
                                                        var selection  = win.down('#particionesgrid').getSelectionModel().getSelection()
                                                        Ext.Array.each(selection, function (recordParticion) {
                                                            controller.getSoftguardEstadoModelModel().load(recordParticion.get('cue_iid'), {
                                                                success : function(recordEstadoParticion,operation) {
                                                                    if (!recordEstadoParticion){
                                                                            controller.createRecord(view);
                                                                    } else {
                                                                        recordEstadoParticion.set('est_dfechadesde', record.get('est_dfechadesde'));
                                                                        recordEstadoParticion.set('est_dfechahasta', record.get('est_dfechahasta'));
                                                                        recordEstadoParticion.set('est_nduracion',record.get('est_nduracion'));
                                                                        recordEstadoParticion.set('est_nestado',record.get('est_nestado'))
                                                                        
                                                                        recordEstadoParticion.save()
                                                                        /*
                                                                        // no uso el llamado del search porque no deja AUDIT, resolver el usuario de otra forma.
                                                                        recordEstadoParticion.set('token',Ext.util.Cookies.get('OAuth_Token'))
                                                                        
                                                                        Ext.Ajax.request({
                                                                            url: '/Rest/search/EstadoUpd',
                                                                            params: recordEstadoParticion.data,
                                                                            method: 'GET',
                                                                            scope: this
                                                                        })  
                                                                        */                                                                                     
                                                                        win.close()
                                                                    }
                                                                    
                                                                    controller.cerrarWin(view);
                                                                    notify('Se cambio el estado a la particion:');
                                                                }
                                                            })
                                                        })
                                                    }
                                                },'->',{
                                                    text:'Cancelar',
                                                    handler: function () {
                                                        this.up('window').close()
                                                        controller.cerrarWin(view);
                                                    }
                                                }
                                            ],
                                        items : [
                                                {
                                                    xtype:'grid',
                                                    selModel: Ext.create('Ext.selection.CheckboxModel'),
                                                    title: '',                                                	
                                                    itemId:'particionesgrid',
                                                    setLoading: getLocale('Cargando...'),
                                                    autoScroll:true,
                                                    columns: [{
                                                        header: getLocale('Particion'),
                                                        dataIndex: 'zon_cdescripcion',                                                                            
                                                        flex: 1
                                                    }]
                                                }
                                            ]
                                    });
                                    win.down('#particionesgrid').bindStore(storeParticiones)
                                    win.show();
                                }
                            });
                        }
                    }});
                    //} if de tipo de cambio de estado para particiones
                }// cierro function
            });// cierro save
        }
	},
    
    onDeshabilitarClick: function(button, event, options) {
        var view =button.up('estadoview');
        var form = button.up('estadoformview').getForm();
        var record = form.getRecord();
        var combo = view.down('#tipo');
        var tipo = {Name:'Permanente', Value: 0};
        var store = combo.getStore();
        var controller = this;
        
        record.set('est_nestado', 2);
        record.set('est_ntipo', 0); // pongo permanente
        form.loadRecord(record);
        
        this.hideHabilitadoFields(view); // esto aca no va... 
        
        view.down('#btnhabilitar').show();
        view.down('#btnprueba').show();
        view.down('#btndeshabilitar').hide();
        view.down('#btnxzonas').hide();
        view.down('#parcialevento').hide();  
        view.down('#nohabilitado').hide();
        
        // BC 374641740 : Se agrega ver el boton de solicitar eliminacion una vez que desapareció.
        view.down('#btnEliminar').show();

        if (view.hideControls){
            Ext.Array.each(view.hideControls, function(control){
                view.down(control).hide();
            })
        }
        
        if(store.find('Value',0) == -1){
            store.insert(0, tipo);
            combo.select(0);
        }
        
        Ext.create('Ext.data.Store',{
                model: controller.getEventosPendientesSearchModelModel(),
            remoteGroup: false,
            remoteSort: true,
            pageSize: 1000,
            remoteFilter:true,
            filters:[
                {
                    property:'rec_iidCuenta',
                    value: view.cuenta.get('cue_iid')
                }, {
                    property:'rec_nestado',
                    value:0
                }
            ]
        }).load({callback:function (records) {
            
            if(records.length > 0) {
                Ext.MessageBox.alert('Eventos pendientes', 'La cuenta tiene eventos pendientes y serán autoprocesados.', function(){
                   //action to complete when user clicks ok.
                }); 
            }
            
        }})
        
        if (record.get('est_ntipo')==0){
            view.down('#duracion').hide();
        }

        this.onFormChange(form,true)
    },

    onHabilitarClick: function(button, event, options) {
        var view =button.up('estadoview');
        var form = button.up('estadoformview').getForm();
        var record = form.getRecord();
        //var store = combo.getStore();
        
        view.down('#btnhabilitar').hide();
        view.down('#btnprueba').show();
        view.down('#btndeshabilitar').show();
        view.down('#parcialevento').hide();
        
        // BC 374641740 : Se agrega ver el boton de solicitar eliminacion una vez que desapareció.
        view.down('#btnEliminar').show();
        
        if(this.application._nameModule  == 'VigiControl') {
            view.down('#btnxzonas').hide();
        } else {
            view.down('#btnxzonas').show();    
        }
        
        if (view.hideControls){
            Ext.Array.each(view.hideControls, function(control){
                view.down(control).hide();
            })
        }
        
        record.set('est_nestado', 0);
        record.set('est_ntipo', 0); // pongo permanente
        form.loadRecord(record);
        this.hideHabilitadoFields(view);
        this.onFormChange(form,true)
    },
    
    
    
    onPruebaClick: function(button, event, options) {
        var view =button.up('estadoview');
        var form = button.up('estadoformview').getForm();
        var record = form.getRecord();
        var combo = view.down('#tipo');
        var store = combo.getStore();
        
        view.down('#btnhabilitar').show();
        view.down('#btnprueba').hide();
        view.down('#btndeshabilitar').show();
        view.down('#parcialevento').hide();

        // BC 374641740 : Se agrega ver el boton de solicitar eliminacion una vez que desapareció.
        view.down('#btnEliminar').show();
        
        if(this.application._nameModule  == 'VigiControl') {
            view.down('#btnxzonas').hide();
        } else {
            view.down('#btnxzonas').show();    
        }
        
        if (view.hideControls){
            Ext.Array.each(view.hideControls, function(control){
                view.down(control).hide();
            })
        }
        
        record.set('est_nestado', 1);
        record.set('est_ntipo', 1);
        record.set('est_dfechadesde',new Date());
        form.loadRecord(record);
        this.showHabilitadoFields(view);
        this.onTipoSelect(button); // recalculo las fechas
        
        if(store.find('Value',0) >= 0){
            store.removeAt(0);
            combo.select(1);
        }
        
        this.onFormChange(form,true)
        
    },
    onZonasClick: function(button, event, options) {
        var view =button.up('estadoview');
        var form = button.up('estadoformview').getForm();
        var record = form.getRecord();
        var combo = view.down('#tipo');
        var store = combo.getStore();
        
        view.down('#btnhabilitar').show();
        view.down('#btnprueba').show();
        view.down('#btndeshabilitar').show();
        view.down('#btnxzonas').hide();    
        view.down('#parcialevento').show();
        
        // BC 374641740 : Se agrega ver el boton de solicitar eliminacion una vez que desapareció.
        view.down('#btnEliminar').show();
        
        if (view.hideControls){
            Ext.Array.each(view.hideControls, function(control){
                view.down(control).hide();
            })
        }
        
        record.set('est_nestado', 3);
        record.set('est_ntipo', 1);
        record.set('est_dfechadesde',new Date());
        form.loadRecord(record);
        this.showHabilitadoFields(view);
        
        this.onTipoSelect(button); // recalculo las fechas
        
        if(store.find('Value',0) >= 0){
            store.removeAt(0);
            combo.select(1);
        }
        this.onFormChange(form,true)
        
    },
    hideHabilitadoFields: function(view){
        view.down('#nohabilitado').hide();
        if (view.down('estadoitemgridview'))
            view.down('estadoitemgridview').hide();
    },
    
    showHabilitadoFields: function(view){
        var formview = view.down('estadoformview');
        if (formview){
            var record = formview.getForm().getRecord();
            if (record.get('est_nestado') == 3 && !view.forceZona){
                view.down('estadoitemgridview').show();
            }else{
                view.down('estadoitemgridview').hide();
            }
            
            if (view.forceZona && record.get('est_nestado') == 3){
                view.down('#forceZona').show();
                view.down('#forceZona').setValue(view.forceZona);
            } else {
                view.down('#forceZona').hide();
            }
        }
            
        view.down('#nohabilitado').show();
    },
   
    onTipoSelect: function(combo, records, options){
        var view = combo.up('form');
        var record = view.recordEstado;
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
                view.down('#duracion').hide();
            break;
            case 1:
                hastaTime.setValue(Ext.Date.add(desde, Ext.Date.MINUTE, duracion));
                hasta.setValue(Ext.Date.add(desde, Ext.Date.MINUTE, duracion));
                view.down('#duracion').show();
            break;
            case 2:
                hastaTime.setValue(Ext.Date.add(desde, Ext.Date.HOUR, duracion));
                hasta.setValue(Ext.Date.add(desde, Ext.Date.HOUR, duracion));
                view.down('#duracion').show();
            break;
            case 3:
                hasta.setValue(Ext.Date.add(desde, Ext.Date.DAY, duracion));
                hastaTime.setValue(Ext.Date.add(desde, Ext.Date.DAY, duracion));
                view.down('#duracion').show();
            break;
            case 4:
                hasta.setValue(Ext.Date.add(desde, Ext.Date.MONTH, duracion));
                hastaTime.setValue(Ext.Date.add(desde, Ext.Date.MONTH, duracion));
                view.down('#duracion').show();
            break;
        }
    },
    
    onDuracionChange: function(field, newValue, oldValue, options){
        var view = field.up('form');
        var form = view.getForm();
        var record = view.recordEstado;
        
        var desde = new Date();
        if(view.onInit) {
            desde = record.get('est_dfechadesde')
            view.onInit = false
        }
        
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