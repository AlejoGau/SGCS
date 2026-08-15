//MIGRADO2024
Ext.define('Common.controller.TripFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TripModel', 'UsuarioSearchModel', 'SoftguardCuentaModel', 'SoftguardUsuarioModel', 'GeocercaSearchModel', 'OrganizationSearchModel' ],
    views : [ 'TripFormView', 'DateTimeField' ],
    init : function(config) {
		this.control({
            'tripformview': {
                afterrender: this.initview
            },
            'tripformview button[action=save]' : {
                click : this.saveTrip
            },
            'tripformview button[action=start]' : {
                click : this.onStartClick
            },
            'tripformview button[action=end]' : {
                click : this.onEndClick
            },
            'tripformview #horahasta' : {
                select : this.checkEndHour
            },
        
            'tripformview #geoFenceStart' : {
                change : this.onGeoFenceStartChange,
                //keypress: this.onKeyPressGeoFenceStart,
                //select : this.onSelectGeoFenceStart
            },
            'tripformview #geoFenceFin' : {
                change : this.onGeoFenceFinChange
            },
            'tripformview #tgv_movil_transportista' : {
                change : this.onTransportistaChange
            }
        })
    },
    initview : function(view) {
        var controller = this;
        /** Obtengo los datos de la cuenta abierta (solapa) */
        var caller = view.caller
        var principalTab = caller.up('vehicleview');
        var recordCaller = caller.record;
        var record = view.record;
        /** Obtengo el cue_iid de la cuenta abierta (solapa), para filtrar los responsables */
        var cue_iid = record.get('tgv_cueiid');
        // carga combo clientes
        // carga combo cuentas
        view.loadRecord(record);
        /**
         * Verifico si es un nuevo registro o es una edición
         * Cargo el valor de Hora / Minuto en base a lo que vino de tabla y si existe en el record.
         * 
         */
        var fechaDesdeCombo = view.down('#fechadesde')
        var fechaHastaCombo = view.down('#fechahasta')
        var horaDesdeCombo = view.down('#horadesde')
        var horaHastaCombo = view.down('#horahasta')
        var fechaPrgDesdeCombo = view.down('#fechaprgdesde')
        var fechaPrgHastaCombo = view.down('#fechaprghasta')
        var horaPrgDesdeCombo = view.down('#horaprgdesde')
        var horaPrgHastaCombo = view.down('#horaprghasta')
        view.tripStatus = record.get('tgv_estado');
        if (record.get('tgv_cueiid') > 0) {
            let horaHasta = record.get('tgv_fechafin');
            let tgv_fechainicio = record.get('tgv_fechainicio');
            let tgv_fecha_prg_inicio = record.get('tgv_fecha_prg_inicio');
            let tgv_fecha_prg_fin = record.get('tgv_fecha_prg_fin');
            if (tgv_fechainicio && tgv_fechainicio.getFullYear()>1970){
                horaDesdeCombo.setValue(Ext.Date.format(tgv_fechainicio,'H:i'));
            } 
            if (tgv_fecha_prg_inicio && tgv_fecha_prg_inicio.getFullYear()>1970){
                horaPrgDesdeCombo.setValue(Ext.Date.format(tgv_fecha_prg_inicio,'H:i'));
            }  else{
                fechaPrgDesdeCombo.setValue('');
            }
            if (tgv_fecha_prg_fin && tgv_fecha_prg_fin.getFullYear()>1970){
                horaPrgHastaCombo.setValue(Ext.Date.format(tgv_fecha_prg_fin,'H:i'));
            } else{
                fechaPrgHastaCombo.setValue('');
            }
            
            if (horaHasta && horaHasta.getFullYear()>1970) {
                horaHastaCombo.setValue(Ext.Date.format(new Date(view.record.get('tgv_fechafin')),'H:i'));
                view.down('button[action=save]').disable(true);
            } 
            var estado = record.get('tgv_estado');
            if (estado == 0){
                view.down('#btnIniciar').enable();
                view.down('#btnFinalizar').disable();
            } else if (estado == 1){
                view.down('#btnIniciar').disable();
                view.down('#btnFinalizar').enable();
            } else {
                view.down('#btnIniciar').disable();
                view.down('#btnFinalizar').disable();
            }
            if (record.get('tgv_geofenseinicio')==0){
                view.down('#geoFenceStart').setValue('');
            }
            if (record.get('tgv_geofensefin')==0){
                view.down('#geoFenceFin').setValue('');
            }
            //view.down('#tgv_movil_transportista').setValue(record.get('tgv_movil_transportista'));
            //view.down('#tgv_cuenta_cliente').setValue(record.get('tgv_cuenta_cliente'));
        } else {
            //fechaDesdeCombo.setValue(new Date());
            //horaDesdeCombo.setValue(Ext.Date.format(new Date(),'H:i'));
            view.down('#responsable').setValue('');
            view.down('#geoFenceStart').setValue('');
            view.down('#geoFenceFin').setValue('');
            view.down('#btnFinalizar').disable();
            // Al iniciar un viaje nuevo, la fecha y hora de finalizacion, la dejo bloqueada y en blanco.
            fechaHastaCombo.disable(true);
            horaHastaCombo.disable(true);
        }
        
        // Agrego las geocercas, por ahora sin filtro puede ver todas las de su rango.
        /**
         *  Daniel O. Medina
         *  20/11/2020
         *  https://basecamp.com/2249105/projects/14758734/todos/400905262
         * 
         */
        var geoCercaEntrada =Ext.create('Ext.data.Store',{
            model: this.getGeocercaSearchModelModel(),
            remoteSort: true,
            remoteFilter: true,
            filters:[{property:'GeoType',value:'E'}]
        });
        var geoCercaSalida =Ext.create('Ext.data.Store',{
            model: this.getGeocercaSearchModelModel(),
            remoteSort: true,
            remoteFilter: true,
            filters:[{property:'GeoType',value:'I'}]
        });        
        
        /************************************************************************************* */
        view.down('#geoFenceStart').bindStore(geoCercaEntrada);
        view.down('#geoFenceFin').bindStore(geoCercaSalida);
        geoCercaEntrada.load();
        geoCercaSalida.load();
        this.activarDesactivarFechas(view);
        // busco parametro por datos extros
        var FORMULARIOVIAJE = getParametro('FORMULARIOVIAJE');
        if (FORMULARIOVIAJE){
            var _json = Ext.JSON.decode(FORMULARIOVIAJE);
            view.down('#datosextra').add(_json.items);
            // cargo los datos de la metadata.
            var datosextra = view.down('#datosextra');
            var _datosExtraData = record.get('tgv_metadata');
            if (_datosExtraData){
                var _datosExtraJSON = Ext.JSON.decode(_datosExtraData);
                if (datosextra.items && datosextra.items.length>0){
                    Ext.Array.each(datosextra.items.items, function(item, index, _items) {
                        if (item.xtype=='datetimefield'){
                            item.setValue(Ext.Date.parse(_datosExtraJSON[item.name], 'MS'));
                        } else{
                            item.setValue(_datosExtraJSON[item.name]);
                        }
                    })
                }
            }
        }
    },
    onSelectGeoFenceStart:function ( combo, records, eOpts ){
        console.log("Select event");
        var view = combo.up('tripformview');
        this.activarDesactivarFechas(view);        
    },
    /*** 
     * 
    onKeyPressGeoFenceStart: function( combo, e, eOpts ){
        
         * Daniel O. Medina
         * 20/11/2020
         * https://basecamp.com/2249105/projects/14758734/todos/400905262
         * 
         * 
         
        //var view = textField.up('tripformview');
        //var combo = view.down('geoFenceStart');
        console.log("Evento keyDown");
       var filters = Ext.clone(combo.getStore().filters.items);
        if(filters){
            filters.push({
                    property: 'g.[Name]:LIKE',
                    value: combo.getValue(),
                    id: 'Name'            
            });
            combo.getStore().clearFilter(true);        
            combo.getStore().filter(filters);
        }
    },*/
    onGeoFenceStartChange: function(combo){
        var view = combo.up('tripformview');
        this.activarDesactivarFechas(view);
    },
    onGeoFenceFinChange: function(combo){
        var view = combo.up('tripformview');
        this.activarDesactivarFechas(view);
    },
    onTransportistaChange: function(field, transportista){
        // lleno el combo de responsables con los usuarios del transportista.
        var view = field.up('tripformview');
        var cue_iid;
        if (Number.isInteger(transportista)){
            return;
        }
        else if (Array.isArray(transportista)){
            cue_iid = transportista[0].data.OwnerId; // selecter trae array o single segun en que momento se ejecuta el evento.
        } else{
            cue_iid = transportista.get('OwnerId');
        }
        
        /* Carga el combo de responsables */
        var responsablesStore = Ext.create('Ext.data.Store',{
            model: this.getSoftguardUsuarioModelModel(),
            autoload: false,
            remoteSort:true,
            sorters: [{
                 property: 'usu_cnombre',
                 direction: 'DESC'
             }],
             pageSize: 999
        });
        var comboResponsables = view.down('#responsable');
        comboResponsables.bindStore(responsablesStore);        
        responsablesStore.load({ObjectId : cue_iid});
    },
    activarDesactivarFechas: function(view){
        var record = view.record;
        var geoFenceStart = view.down('#geoFenceStart');
        var geoFenceFin = view.down('#geoFenceFin');
        var fechaDesdeCombo = view.down('#fechadesde')
        var fechaHastaCombo = view.down('#fechahasta')
        var horaDesdeCombo = view.down('#horadesde')
        var horaHastaCombo = view.down('#horahasta')
        var fechaPrgDesdeCombo = view.down('#fechaprgdesde')
        var fechaPrgHastaCombo = view.down('#fechaprghasta')
        var horaPrgDesdeCombo = view.down('#horaprgdesde')
        var horaPrgHastaCombo = view.down('#horaprghasta')
        var tgv_lugar_inicio = view.down('#tgv_lugar_inicio');
        var tgv_lugar_fin = view.down('#tgv_lugar_fin');
        var estado = record.get('tgv_estado');
        if (estado == 0){
            fechaHastaCombo.disable();
            horaHastaCombo.disable();
            geoFenceStart.enable();
            fechaPrgDesdeCombo.enable();
            horaPrgDesdeCombo.enable();
            fechaPrgHastaCombo.enable();
            horaPrgHastaCombo.enable();
            geoFenceFin.enable();
            if (geoFenceStart.getValue()>0){
                fechaDesdeCombo.disable();
                horaDesdeCombo.disable();
                tgv_lugar_inicio.hide(); // si elijo geocercas ocultu lugar de inicio y fin
                
            } else {
                fechaDesdeCombo.enable();
                horaDesdeCombo.enable();
                tgv_lugar_inicio.show();
            }
            if (geoFenceFin.getValue()>0){ 
                tgv_lugar_fin.hide();
            }
            else{
                tgv_lugar_fin.show();
            }
        }
        else if (estado == 1){
            fechaDesdeCombo.disable();
            horaDesdeCombo.disable();
            geoFenceStart.disable();
            fechaPrgDesdeCombo.disable();
            horaPrgDesdeCombo.disable();
            geoFenceFin.enable();
            fechaPrgHastaCombo.enable();
            horaPrgHastaCombo.enable();
            if (geoFenceFin.getValue()>0){
                fechaHastaCombo.disable();
                horaHastaCombo.disable();
                tgv_lugar_inicio.hide();
            } else {
                fechaHastaCombo.enable();
                horaHastaCombo.enable();
                tgv_lugar_inicio.show();
            }
            if (geoFenceFin.getValue()>0){ 
                tgv_lugar_fin.hide();
            }
            else{
                tgv_lugar_fin.show();
            }
        }
        else if (estado == 2){
            fechaDesdeCombo.disable();
            horaDesdeCombo.disable();
            geoFenceStart.disable();
            fechaPrgDesdeCombo.disable();
            horaPrgDesdeCombo.disable();
            geoFenceFin.disable();
            fechaPrgHastaCombo.disable();
            horaPrgHastaCombo.disable();
            fechaHastaCombo.disable();
            horaHastaCombo.disable();
            if (geoFenceFin.getValue()>0){
                tgv_lugar_inicio.hide();
            } else {
                tgv_lugar_inicio.show();
            }
            if (geoFenceFin.getValue()>0){ 
                tgv_lugar_fin.hide();
            }
            else{
                tgv_lugar_fin.show();
            }
        }
    },
    onStartClick : function(btn, e, eOpts) {
        var view = btn.up('tripformview');
        view.down('#geoFenceStart').setValue('');
        var now = new Date();
        view.down('#fechadesde').setValue(now);
        view.down('#horadesde').setValue(Ext.Date.format(now,'H:i'));
        view.record.set('tgv_fechainicio',now);
        view.record.set('tgv_estado',1);
        view.down('#tgv_estado').setValue(1);
        btn.disable();
        view.down('#btnFinalizar').enable();
    },
    onEndClick: function(btn, e, eOpts) {
        var view = btn.up('tripformview');
        view.down('#geoFenceFin').setValue('');
        var now = new Date();
        view.down('#fechahasta').setValue(now);
        view.down('#horahasta').setValue(Ext.Date.format(now,'H:i'));
        view.record.set('tgv_fechafin',now);
        view.record.set('tgv_estado',2);
        view.down('#tgv_estado').setValue(2);
        view.tripStatus = 1
        btn.disable();
    },
    saveTrip : function(btn, e, eOpts) {
        var controller = this;
        
        /* Obtengo el form y los datos del form dentro de la Window */
        var myform = btn.up('form').getForm();
        var view = btn.up('tripformview');
        var record = view.record;
        /* Hago el Update de record segun lo que esta en el formulario */
		myform.updateRecord(record);
        var fechaInicio = '';
        var fechaFin = '';
        
        if (record.get('tgv_idkey') == 0) {
            /** Al ser un alta nueva, debo asignar el cue_iid por lo tanto
             * Obtengo los datos de la cuenta abierta (solapa) 
             * */
            var recordCaller = view.caller.up('vehicleview').record;
            /** Obtengo el cue_iid de la cuenta abierta (solapa), y la seteo en el record a guardar */
            if (record.get('tgv_cueiid') == 0){
                var cue_iid = recordCaller.get('cue_iid');
                record.set('tgv_cueiid', cue_iid);
            }
        }
        /**
         * Manipulo los valores de las fechas, mas alla de que no se hayan modificado, realizo el chequeo.
         */
        var fechaInicio = view.down('#fechadesde').getValue();
        var fechaFin = view.down('#fechahasta').getValue();
        var horaDesde = view.down('#horadesde').getValue();
        var horaHasta = view.down('#horahasta').getValue();
        /*
        var fechaInicioMod = new Date(Ext.Date.format(new Date(fechaInicio),'Y-m-d')+" "+Ext.Date.format(new Date(horaDesde),'H:i'));
        var fechaFinMod = new Date(Ext.Date.format(new Date(fechaFin),'Y-m-d')+" "+Ext.Date.format(new Date(horaHasta),'H:i'));
        */
        var fechaInicioMod = fechaInicio;
        if (fechaInicio && horaDesde){
            fechaInicioMod.setHours(horaDesde.getHours());
            fechaInicioMod.setMinutes(horaDesde.getMinutes());
        }
        var fechaFinMod = fechaFin;
        if (fechaFin && horaHasta){
            fechaFinMod.setHours(horaHasta.getHours());
            fechaFinMod.setMinutes(horaHasta.getMinutes());
        }
        var fechaprgdesde = view.down('#fechaprgdesde').getValue();
        var horaprgdesde = view.down('#horaprgdesde').getValue();
        if (fechaprgdesde && horaprgdesde){
            fechaprgdesde.setHours(horaprgdesde.getHours());
            fechaprgdesde.setMinutes(horaprgdesde.getMinutes());
        }
        var fechaprghasta = view.down('#fechaprghasta').getValue();
        var horaprghasta = view.down('#horaprghasta').getValue();
        if (fechaprghasta && horaprghasta){
            fechaprghasta.setHours(horaprghasta.getHours());
            fechaprghasta.setMinutes(horaprghasta.getMinutes());
        }
        
        if (fechaInicioMod && fechaInicioMod.getFullYear() > 1970){
            record.set('tgv_fechainicio',fechaInicioMod);
            record.set('tgv_estado',1);
        }
        if (fechaFinMod && fechaFinMod.getFullYear() > 1970){
            record.set('tgv_fechafin',fechaFinMod);
            record.set('tgv_estado',2);
        }
        if (fechaprgdesde && fechaprgdesde.getFullYear() > 1970){
            record.set('tgv_fecha_prg_inicio',fechaprgdesde);
        }
        if (fechaprghasta && fechaprghasta.getFullYear() > 1970){
            record.set('tgv_fecha_prg_fin',fechaprghasta);
        }
        record.set('tgv_movil_transportista',view.down('#tgv_movil_transportista').getValue());
        record.set('tgv_cuenta_cliente',view.down('#tgv_cuenta_cliente').getValue());
        // si hay geocercas elegidas grabo como lugar de inicio y fin el nombre de la geocerca correspondiente
        var tgv_geofenseinicio = view.down('#geoFenceStart');
        if (record.get('tgv_geofenseinicio')>0){
            var lugar_inicio = tgv_geofenseinicio.getRawValue();
            record.set('tgv_lugar_inicio',lugar_inicio);
            view.down('#tgv_lugar_inicio').setValue(lugar_inicio);
        }
        var tgv_geofensefin = view.down('#geoFenceFin');
        if (record.get('tgv_geofensefin')>0){
            var lugar_fin = tgv_geofensefin.getRawValue();
            record.set('tgv_lugar_fin',lugar_fin);
            view.down('#tgv_lugar_fin').setValue(lugar_fin);
        }
        // guardo la metadata.
        var datosextra = view.down('#datosextra');
        var _datosExtraData = {};
        if (datosextra.items && datosextra.items.length>0){
            Ext.Array.each(datosextra.items.items, function(item, index, _items) {
                _datosExtraData[item.name] = item.getValue();
            })
            record.set('tgv_metadata',Ext.JSON.encode(_datosExtraData));
        }
        /**/
        if (myform.isValid()){
    		record.save({
    			scope : this,
                view: view,
    			callback : function(record, operation) {
                    if (operation.success) {
                        var win = view.up('window'); 
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('objectchanged', view.caller, record);
                        /**
                         * Hago el envio del evento de Inicio / Fin, en base a la fecha que se modifico
                         */
                        console.log(fechaInicioMod);
                        console.log(view.tripStatus);
                        if (fechaInicioMod && fechaInicioMod.getFullYear() > 1970 && view.tripStatus == 0) {
                            // Por fecha de inicio modificada, se envia evento de Inicio de Viaje - Flag 0
                            controller.eventGenerator(view, 0);
                        } else if (fechaFinMod && fechaFinMod.getFullYear() > 1970) {
                            // Por fecha de fin modificada, se envia evento de Inicio de Viaje - Flag 1
                            controller.eventGenerator(view, 1);
                        }
                        
                        if (win) {
                            win.close();
                        }
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
    			},
    			button : btn
    		});
        }
    },
    eventGenerator : function(view, viaje) {
        var controller = this;
        var params = {};
        var cue_iid = view.record.get('tgv_cueiid');
        var fechaInicio = view.down('#fechadesde').getValue();
        var fechaFin = view.down('#fechahasta').getValue();
        var horaDesde = view.down('#horadesde').getValue();
        var horaHasta = view.down('#horahasta').getValue();
        var identificador = view.down('#name').getValue();
        var idViaje = view.down('#codigoexterno').getValue();
        // Si viaje 0 = inicio, si viaje 1 = fin
        if(viaje == 0){
            params.fecha = new Date(Ext.Date.format(new Date(fechaInicio), 'Y/m/d')+' '+Ext.Date.format(new Date(horaDesde), 'H:i:s'))
            params.cAlarma = '_IV'
        } else {
            params.fecha = new Date(Ext.Date.format(new Date(fechaFin), 'Y/m/d')+' '+Ext.Date.format(new Date(horaHasta), 'H:i:s'))
            params.cAlarma = '_FV'
        }
        params.idCta = cue_iid;
        params.cUser = _UserData.UserId;
        params.rec_norigen = 3;
        params.cContenido = "{\"idViaje\":\""+idViaje+"\",\"identificador\":\""+identificador+"\"}"
        Ext.Ajax.request({
            url: '/rest/search/AlarmaGenerar',
            method: 'GET',
            params: params,
            success: function(resp,operation) {
                notify('El evento se generó con éxito');
                var responseRequest = Ext.JSON.decode(resp.responseText);
                var rec_iid = responseRequest.rows[0].iValor;
            },
            failure: function(resp, operation){
                console.log(resp)
            }
        });
    },
    checkEndHour : function(select, e, eOpts) {
        var controller = this;
        var view = select.up('tripformview');
        var horaHasta = view.down('#horahasta').getValue();
        var now = Ext.Date.format(new Date(), 'H:i:s')
        if (horaHasta > now) {
            console.log(horaHasta);
            console.log(now);
        }
    }
})