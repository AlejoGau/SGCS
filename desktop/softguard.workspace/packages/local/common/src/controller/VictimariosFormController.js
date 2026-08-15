//MIGRADO2024
Ext.define('Common.controller.VictimariosFormController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['VictimarioCuentSearchModel', 'VictimariosModel'],
    views: ['VictimariosFormView', 'VictimariosCuentasView', 'AspectoVictimariosView', 'DatosVictimarioView', 'AdicionalesVictimariosView'],

    init: function (config) {
        // genero los eventos
        this.control(
            {
                'victimariosformview': {
                    afterrender: this.initView,
                    cuentasSeleccionadasEvent: this.OnCuentasSeleccionadas
                },

                'victimariosformview button[action="map"]': {
                    click: this.onMapClick
                },

                '#mapWindow button[action="posicion"]': {
                    click: this.onPosicionClick
                },

                '#mapWindow button[action="saveMapa"]': {
                    click: this.onMapaSaveClick
                },

                'victimariosformview button[action="delete"]': {
                    click: this.onDeleteClick
                },

                'victimariosformview button[action="photo"]': {
                    click: this.onPhotoClick
                },

                'victimariosformview button[action="selecDoc"]': {
                    click: this.onDocuments
                },

                'victimariosformview button[action="save"]': {
                    click: this.onSaveClick
                },
                'victimarioscuentasview button[action="addcuenta"]': {
                    click: this.onAddCuentaClick

                },
                'victimarioscuentasview button[action="deletecuenta"]': {
                    click: this.onQuitarClick

                }

            });
    },


    initView: function (view) {

        var myPanel = view.down('tabpanel');
        var center = view.down('#center');
        var targetTab = view.targetTab;
        var record = view.record


        var datos = Ext.widget('datosvictimarioview', {
            title: 'Datos del agresor',
            targetTab: targetTab,
            closable: false,
            collapsible: true,
            autoScroll: true
        });

        view.datos = datos;
        //-------agrego store para asociación cuenta con victimario---
        var modelVicCue = this.getVictimarioCuentSearchModelModel()


        var vicCueStore = Ext.create('Ext.data.Store', {
            data: [],
            fields: ['vct_idkeycuenta', 'cue_iid', 'cue_clinea', 'cue_ncuenta', 'cue_cnombre', 'cue_ctelefono'],
            proxy: {
                type: 'memory'

            }

        });

        this.vicCueStore = vicCueStore;

        var gridasoc = datos.down('victimarioscuentasview');
        console.log(gridasoc)
        gridasoc.bindStore(vicCueStore);
        //-----------------------------------------------------------------
        //-------------configuración de filtro de cuentas asociadas-----------
        this.searchWebDealerModule();
        //--------------------------------------------------------------------
        var caracteristicas = Ext.widget('aspectovictimarioview', {
            title: 'Caracteristicas',
            targetTab: targetTab,
            collapsible: true,
            hideNew: true,
            closable: false,
            autoScroll: true
        });

        var adicional = Ext.widget('adicionalesvictimarioview', {
            title: 'Informacion adicional',
            targetTab: targetTab,
            hideNew: true,
            collapsible: true,
            closable: false,
            autoScroll: true
        });



        myPanel.add(datos);
        myPanel.add(caracteristicas);
        myPanel.add(adicional);


        myPanel.setActiveTab(datos);

        view.datosView = datos
        view.caracteristicasView = caracteristicas
        view.adicionalView = adicional



        datos.down('#datosApellido').setValue(record.get('vic_cApellido'))
        datos.down('#datosNombre').setValue(record.get('vic_cNombre'))
        datos.down('#datosDni').setValue(record.get('vic_cIdentificacion'))
        datos.down('#datosRestriccion').setValue(record.get('vic_iRestriccion'))
        datos.down('#datosCalle').setValue(record.get('vic_cCalle'))
        datos.down('#datosNumero').setValue(record.get('vic_cCalleNro'))
        datos.down('#datosPiso').setValue(record.get('vic_cCallePiso'))
        datos.down('#datosDpto').setValue(record.get('vic_cCalleDpto'))
        datos.down('#datosPartido').setValue(record.get('vic_cPartido'))
        datos.down('#datosLocalidad').setValue(record.get('vic_cLocalidad'))
        datos.down('#datosEstado').setValue(record.get('vic_iStatus'))
        caracteristicas.down('#AspectoEdad').setValue(record.get('vic_iEdad'))
        caracteristicas.down('#AspectoPeso').setValue(record.get('vic_iPeso'))
        caracteristicas.down('#AspectoAltura').setValue(record.get('vic_iAltura'))
        caracteristicas.down('#AspectoRaza').setValue(record.get('vic_iAspectoRaza'))
        caracteristicas.down('#AspectosTez').setValue(record.get('vic_iAspectoTez'))
        caracteristicas.down('#AspectosContextura').setValue(record.get('vic_iAspectoContextura'))
        caracteristicas.down('#AspectoTipoPelo').setValue(record.get('vic_iCabelloTipo'))
        caracteristicas.down('#AspectosColorPelo').setValue(record.get('vic_iCabelloColor'))
        caracteristicas.down('#AspectosEstiloPelo').setValue(record.get('vic_iCabelloEstilo'))
        caracteristicas.down('#AspectoFormaRostro').setValue(record.get('vic_iRostroForma'))
        caracteristicas.down('#AspectoFormaOjos').setValue(record.get('vic_iOjosForma'))
        caracteristicas.down('#AspectosColorOjos').setValue(record.get('vic_iOjosColor'))
        caracteristicas.down('#AspectofrenteNariz').setValue(record.get('vic_iNarizFrente'))
        caracteristicas.down('#AspectosPerfilNariz').setValue(record.get('vic_iNarizPerfil'))
        caracteristicas.down('#AspectosTamanoNariz').setValue(record.get('vic_iNarizSize'))
        caracteristicas.down('#AspectoLabiosBoca').setValue(record.get('vic_iBocaLabios'))
        caracteristicas.down('#AspectosTamanoBoca').setValue(record.get('vic_iBocaSize'))
        caracteristicas.down('#AspectoFormaMenton').setValue(record.get('vic_iMentonForma'))
        caracteristicas.down('#AspectoFormaOreja').setValue(record.get('vic_iOrejasForma'))
        caracteristicas.down('#AspectosTamanoOreja').setValue(record.get('vic_iOrejasSize'))
        caracteristicas.down('#AspectoFormaCeja').setValue(record.get('vic_iCejasForma'))
        caracteristicas.down('#AspectosTamanoCejas').setValue(record.get('vic_iCejasSize'))
        caracteristicas.down('#AspectoPilosidadTipo').setValue(record.get('vic_iPilosidadTipo'))
        caracteristicas.down('#AspectosFormaPilosidad').setValue(record.get('vic_iPilosidadForma'))
        adicional.down('#senas').setValue(record.get('vic_cObservaciones'))
        adicional.down('#sociales').setValue(record.get('vic_cCaractSocial'))
        adicional.down('#adicciones').setValue(record.get('vic_cAdicciones'));
        this.loadGridVictimarioCuentas(view);

        if (record.get('vic_cPathPicture')) {
            this.onPhotoClick(datos.down('#botonPhoto'))
        }

    },
    loadGridVictimarioCuentas: function (view) {
        if (isNaN(view.record.id)) {
            view.record.id = 0;
            view.record.data.Id = 0;
        }
        if (view.record.get('Id') == 0)
            return;
        var gridVictCue = view.down('victimarioscuentasview');
        var storeVictCue = gridVictCue.getStore();
        var controller = this;
        var filter = [{
            property: 'vct_idKeyVictimario',
            value: view.record.get('Id')
        }];
        Ext.Ajax.request({
            url: '/rest/search/VictimarioCuentaSearch',
            params: {
                filter: Ext.encode(filter)
            },
            method: 'GET',
            success: function (resp, operation) {
                var respArr = Ext.JSON.decode(resp.responseText);

                for (var i = 0; i < respArr.rows.length; i++) {
                    var r = respArr.rows[i];
                    controller.vicCueStore.insert(0,
                        //['vct_idkeycuenta','vct_idkeycuenta','cue_ncuenta','cue_cnombre','cue_ctelefono'],
                        {
                            cue_iid: r.cue_iid
                            , cue_clinea: r.cue_clinea
                            , cue_ncuenta: r.cue_ncuenta
                            , cue_cnombre: r.cue_cnombre
                            , cue_ctelefono: r.cue_ctelefono
                        });
                }
            }
        })
        console.log(view.datos.down('victimarioscuentasview').down('toolbar'))
    },
    onAddCuentaClick: function (button, event, options) {
        var controller = this;
        var view = button.up('victimariosformview');
        var filter = [];
        var gridVicCue = view.down('victimarioscuentasview');
        var strcuentas = '';
        gridVicCue.getStore().each(function (rec) {
            if (strcuentas != '') {
                strcuentas += ',' + rec.get('cue_iid');
            } else {
                strcuentas = '' + rec.get('cue_iid');
            }
        });
        var myWindow = Ext.widget('window', {
            title: 'Selector de Cuentas',
            height: 400,
            width: 900,
            closeAction: 'destroy',
            //autoScroll: true,
            modal: true,
            items: [{
                xtype: 'dealermultiselectionhelperview',
                eventSelected: strcuentas,
                limitEventSelect: 50,
                cuentasSeleccionadasEvent: 'cuentasSeleccionadasEvent',
                caller: view,
                filter: controller.dealerMultiSelecFilter
                //simpleSelect: simpleSelect,

                //limitEventSelect: view.limitEventSelect?view.limitEventSelect:0,
                //record: view.record,
                //ocultarCuentasPropias: view.ocultarCuentasPropias
            }],
            layout: 'fit'
        });
        myWindow.show();
    },
    OnCuentasSeleccionadas: function (records, view) {
        //var store = Ext.widget('datosvictimarioview').down('victimarioscuentasview').getStore();
        /* Ext.Array.each(selection, function (rec) {
         
             gridVicCue.getStore().remove(rec)   
         
         });   */
        var controller = this;
        controller.vicCueStore.removeAll();
        records.each(function (r) {

            controller.vicCueStore.insert(0,
                //['vct_idkeycuenta','vct_idkeycuenta','cue_ncuenta','cue_cnombre','cue_ctelefono'],
                {
                    vct_idkeycuenta: r.get('vct_idkeycuenta'), cue_iid: r.get('cue_iid')
                    , cue_clinea: r.get('cue_clinea'), cue_ncuenta: r.get('cue_ncuenta'), cue_cnombre: r.get('cue_cnombre')
                    , cue_ctelefono: r.get('cue_ctelefono')
                }
            );
        });
    },
    onMapClick: function (button, event, options) {
        console.log("Click en Mapa")
        var view = button.up('victimariosformview');
        var datos = view.datosView
        var record = view.record
        var calle = record.get('vic_cCalle');
        console.log(calle)
        var mylat = record.get('vic_cUbicacion').split(',')[0],
            myLong = record.get('vic_cUbicacion').split(',')[1],
            myAddr = calle + ', ' + record.get('vic_cCalleNro') + ' ,' + record.get('vic_cPartido');

        var mappanel = Ext.widget('gmappanel6', {
            zoomLevel: 5,
            width: '100%',
            flex: 1,
            gmapType: 'map',
            mapConfOpts: ['enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging'],
            mapControls: ['GSmallMapControl', 'GMapTypeControl', 'NonExistantControl'],
            geocodePosition: function (pos, infowindow) {
                var geocoder = this.getGeocoder();
                geocoder.geocode({
                    latLng: pos
                }, function (responses) {
                    if (responses && responses.length > 0) {
                        var address = responses[0].address_components;
                        win.down('#address').setText(address[0].long_name + ', ' + address[2].long_name + ', ' + address[3].long_name);
                    } else {
                        var msg = 'No se encontró una dirección válida.';
                        //updateMarkerAddress(msg);
                        win.down('#address').setText(msg);
                    }
                });
            }
        });
        if (mylat && myLong && (mylat != 0 || mylat != '') && (myLong != 0 || myLong != '')) {
            Ext.apply(mappanel, {
                zoomLevel: 14,
                setCenter: {
                    lat: mylat,
                    lng: myLong,
                    marker: {
                        draggable: true
                    },
                    listeners: {
                        dragend: function (e) {
                            var latlng = e.latLng;
                            //var field = myForm.findField('cue_cLatLng'), 
                            var lat = latlng.lat();
                            var long = latlng.lng();
                            //field.setValue(lat + ',' + long);
                            mappanel.getMap().setCenter(latlng, mappanel.zoomLevel);
                        }
                    }
                }
            });
        } else {
            Ext.apply(mappanel, {
                zoomLevel: 14,
                setCenter: {
                    geoCodeAddr: myAddr,
                    marker: {
                        draggable: true
                    },
                    listeners: {
                        dragend: function (e) {
                            var latlng = e.latLng;
                            //var field = myForm.findField('cue_cLatLng'), 
                            var lat = latlng.lat();
                            var long = latlng.lng();
                            //field.setValue(lat + ',' + long);
                            mappanel.getMap().setCenter(latlng, mappanel.zoomLevel);
                        }
                    }
                }
            });
        }

        var win = Ext.create('Ext.Window', {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            title: 'Mapa',
            record: record,
            closeAction: 'hide',
            itemId: 'mapWindow',
            width: 550,
            height: 550,
            border: true,
            modal: true,
            view: view,
            tbar: [
                { text: 'Posicionar', action: 'posicion', itemId: 'posicion' },
                { text: 'Guardar', action: 'saveMapa' }
            ],
            items: [
                {
                    xtype: 'form',
                    itemId: 'mapAddress',
                    width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Calle',
                            value: calle,
                            name: "calle",
                            itemId: 'calle'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Ciudad',
                            value: record.get('vic_cPartido'),
                            name: "localidad"
                        }
                    ]
                },
                mappanel
            ]
        });
        win.show();
        console.log(mappanel)

    },
    onPosicionClick: function (button, event, options) {
        var win = button.up('#mapWindow');
        var view = win.view;
        var record = view.record;
        var form = win.down('form').getForm();
        var map = win.down('gmappanel6');
        var calle = form.findField('calle').getValue();
        var localidad = form.findField('localidad').getValue();
        console.log(localidad, calle)
        var myAddr = calle + ', ' + localidad;
        map.geoCodeLookup(myAddr, map.setCenter.marker, true, true, map.setCenter.listeners);
    },
    onMapaSaveClick: function (button, event, options) {
        var win = button.up('#mapWindow');
        var view = win.view;
        var record = view.record;
        var map = win.down('gmappanel6');
        // importante para guardar los datos de lat y lng en el form y luego posicionar la cuenta.
        var latlng = map.getCenterLatLng();
        var field = record.get('vic_cUbicacion'),
            lat = latlng.lat,
            long = latlng.lng;
        record.set('vic_cUbicacion', lat + ',' + long)
        console.log(record)
        win.close();
        notify('Posición establecida. Debe guardar.');
    },
    onPhotoClick: function (button, event, options) {

        var view = button.up('victimariosformview');
        var record = view.record;
        var photo = record.get('vic_cPathPicture');
        var name = record.get('vic_cNombre');
        var tbar = [];
        var controller = this;
        tbar = [Ext.create('Common.view.UploadButton', {
            itemId: 'dragupload',
            text: 'Subir Foto',
            plugins: [{
                ptype: 'uploadwindow',
                title: 'Subir Foto',
                width: 350,
                height: 150
            }
            ],
            uploader:
            {
                url: '/rest/upload/new?search=softguardMiscFile',
                uploadpath: '',
                multi_selection: false,
                autoStart: true,
                maxFileSize: '50mb',
                dropElement: 'cuentaFotoImage',
                statusQueuedText: getLocale('Listo para subir'),
                statusUploadingText: getLocale('Subiendo') + ' ({0}%)',
                statusFailedText: '<span style="color: red">Error</span>',
                statusDoneText: '<span style="color: green">Completo</span>',
                statusInvalidSizeText: 'Archivo demasiado largo',
                statusInvalidExtensionText: 'Formato inválido'
            },
            listeners:
            {
                filesadded: function (uploader, files) {
                    return true;
                },
                beforeupload: function (uploader, file) {
                    var url = '/rest/upload/new?search=softguardMiscFile';
                    if (this.path) {
                        url = url + '&Path=' + me.path
                    }
                    uploader.uploader.settings.url = url
                },
                fileuploaded: function (uploader, file) {
                    //console.log('fileuploaded');
                },
                uploadcomplete: function (uploader, success, failed) {
                    var file = success.pop();
                    w.down('image').setSrc('/gallery/' + file.name);
                    record.set('vic_cPathPicture', file.name);
                    record.save({
                        callback: function (record, operation) {
                            if (operation.success) {
                                notify('Los datos se guardaron con éxito');
                            }
                        }
                    });
                },
                scope: this
            }
        }),
        {
            text: 'eliminar',
            iconCls: 'icon-delete',
            itemId: 'fotodelete',
            handler: function () {
                var win = this.up('window');

                record.set('vic_cPathPicture', '');
                record.save();
                win.down('image').setSrc('/gallery/');
                win.close();
            }
        }
        ]
        var w = Ext.widget('window', {
            title: 'Foto: ',
            maxHeight: 500,
            height: 250,
            maxWidth: 500,
            width: 250,
            closeAction: 'destroy',
            border: false,
            layout: 'fit',
            record: record,
            tbar: tbar,
            items: [
                {
                    xtype: 'image',
                    src: '/gallery/' + photo,
                    id: 'victimarioFotoImage',
                    scaletofit: true,
                    listeners: {
                        render: function () {
                            this.mon(this.getEl(), 'load', function (e) {
                                var naturalHeight = this.dom.naturalHeight
                                var naturalWidth = this.dom.naturalWidth
                                controller.ajustarImagen(naturalHeight, naturalWidth, w)
                                w.center();
                            });
                        }
                    },
                    renderTo: w
                }
            ],
            autoShow: true,
            modal: true
        });
        if (view.subirFotoHide) {
            w.down('#dragupload').hide();
            w.down('#fotodelete').hide();
        }

    },
    ajustarImagen: function (alto, ancho, win) {
        var controller = this;
        if (alto > win.maxHeight || ancho > win.maxWidth) {
            alto = alto / 1.3;
            ancho = ancho / 1.3;
            controller.ajustarImagen(alto, ancho, win)
        } else {
            win.setSize(ancho, alto);
        }

    },
    setDealerMultiSelecHelpFilter: function (userId) {
        var filter = [
            { property: "dwm_idModules", value: 0 },
            { property: "dwm_idWeb", value: userId }
        ];
        //[{"property":"dwm_idModules","value":0},{"property":"dwm_idWeb","value":22799}]
        /**
         * 
         * {
          "success": true,
          "total": 1,
          "rows": [
            {
              "RowNumber": "1",
              "Id": "106563",
              "dwm_idKey": "106563",
              "dwm_idWeb": "22799",
              "dwm_idModules": "0",
              "dwm_idTabla": "",
              "dwm_dealer": "MAU",
              "dwm_cuenta_desde": "0000",
              "dwm_cuenta_hasta": "ZZZZ",
              "dwm_data": "",
              "lin_crazonsocial": "Mauro Dealer"
            }
          ]
        }
         * 
         */
        var controller = this;
        Ext.Ajax.request({
            url: '/Rest/Search/UsersDesktopWebModulosSearch',
            params: {
                filter: Ext.encode(filter)
            },
            method: 'GET',
            success: function (resp, operation) {
                var respArr = Ext.JSON.decode(resp.responseText);
                if (respArr.rows[0]) {
                    var r = respArr.rows[0];
                    controller.dealerMultiSelecFilter =
                        [
                            {
                                property: 'cue_clinea',
                                value: r.dwm_dealer
                            },
                            {
                                property: 'cue_ncuentaGET',
                                value: r.dwm_cuenta_desde
                            },
                            {
                                property: 'cue_ncuentaLET',
                                value: r.dwm_cuenta_hasta
                            }
                        ];
                }

            }
        });
    },
    searchWebDealerModule: function () {
        var userId = _UserData.udw_idKey;
        var controller = this;
        Ext.Ajax.request({
            url: '/Rest/Search/DesktopModulesByUser',
            params: {
                Id: userId
            },
            method: 'GET',
            success: function (resp, operation) {
                var respArr = Ext.JSON.decode(resp.responseText);
                for (var i = 0; i < respArr.rows.length; i++) {
                    var r = respArr.rows[i];
                    if (r.udm_idKey == 5) {
                        controller.setDealerMultiSelecHelpFilter(userId);
                    }
                }
                // controller.dealerMultiSelecFilter = [];
            }
        });
    },
    guardarVictimarioCuentas: function (idVictimario) {
        var array = [];
        var store = this.vicCueStore;
        store.each(function (r) {
            if (typeof r.get('cue_iid') === 'string') {
                array.push({ cue_iid: parseInt(r.get('cue_iid')) });
            } else {
                array.push({ cue_iid: r.get('cue_iid') });
            }

        });
        Ext.Ajax.request({
            url: '/rest/search/InsertVictimarioCuentaSearch',
            params: {
                'arrayjson': Ext.encode(array),
                idVictimario: idVictimario
            },
            method: 'GET',
            success: function (resp, operation) {
                notify('Datos Guardados Exitosamente');
            }
        });
    },
    onSaveClick: function (button, event, options) {
        var view = button.up('victimariosformview');
        var record = view.record
        var controller = this;
        var datos = view.datosView
        var caracteristicas = view.caracteristicasView
        var adicional = view.adicionalView
        var apellido = datos.down('#datosApellido').getValue()
        var nombre = datos.down('#datosNombre').getValue()
        var dni = datos.down('#datosDni').getValue()
        var restriccion = datos.down('#datosRestriccion').getValue()
        var calle = datos.down('#datosCalle').getValue()
        var numero = datos.down('#datosNumero').getValue()
        var piso = datos.down('#datosPiso').getValue()
        var departamento = datos.down('#datosDpto').getValue()
        var partido = datos.down('#datosPartido').getValue()
        var localidad = datos.down('#datosLocalidad').getValue()
        var estado = datos.down('#datosEstado').getValue()
        var aspEdad = caracteristicas.down('#AspectoEdad').getValue()
        var aspPeso = caracteristicas.down('#AspectoPeso').getValue()
        var aspaAltura = caracteristicas.down('#AspectoAltura').getValue()
        var aspRaza = caracteristicas.down('#AspectoRaza').getValue()
        var aspTez = caracteristicas.down('#AspectosTez').getValue()
        var aspContextura = caracteristicas.down('#AspectosContextura').getValue()
        var aspTipoPelo = caracteristicas.down('#AspectoTipoPelo').getValue()
        var aspColorPelo = caracteristicas.down('#AspectosColorPelo').getValue()
        var aspEstiloPelo = caracteristicas.down('#AspectosEstiloPelo').getValue()
        var aspFormaRostro = caracteristicas.down('#AspectoFormaRostro').getValue()
        var aspFormaOjos = caracteristicas.down('#AspectoFormaOjos').getValue()
        var aspColorOjos = caracteristicas.down('#AspectosColorOjos').getValue()
        var aspFrenteNariz = caracteristicas.down('#AspectofrenteNariz').getValue()
        var aspPerfilNariz = caracteristicas.down('#AspectosPerfilNariz').getValue()
        var aspTamañoNariz = caracteristicas.down('#AspectosTamanoNariz').getValue()
        var aspLabiosBoca = caracteristicas.down('#AspectoLabiosBoca').getValue()
        var aspTamañoBoca = caracteristicas.down('#AspectosTamanoBoca').getValue()
        var aspFormaMenton = caracteristicas.down('#AspectoFormaMenton').getValue()
        var aspFormaOreja = caracteristicas.down('#AspectoFormaOreja').getValue()
        var aspTamañoOreja = caracteristicas.down('#AspectosTamanoOreja').getValue()
        var aspFormaCeja = caracteristicas.down('#AspectoFormaCeja').getValue()
        var aspTamañoCeja = caracteristicas.down('#AspectosTamanoCejas').getValue()
        var aspPilosidadTipo = caracteristicas.down('#AspectoPilosidadTipo').getValue()
        var aspPilosidadForma = caracteristicas.down('#AspectosFormaPilosidad').getValue()
        var señas = adicional.down('#senas').getValue()
        var sociales = adicional.down('#sociales').getValue()
        var adicciones = adicional.down('#adicciones').getValue()


        if (apellido == '' || apellido == '') {
            notify('Debe completar los campos obligatorios');
        } else if (!adicional.down('#senas').isValid() || !adicional.down('#senas').isValid() || !adicional.down('#senas').isValid()) {
            notify('Excedio el maximo de caracteres');
        } else {
            record.set('vic_cApellido', apellido)
            record.set('vic_cNombre', nombre)
            record.set('vic_cIdentificacion', dni)
            record.set('vic_iRestriccion', restriccion)
            record.set('vic_cCalle', calle)
            record.set('vic_cCalleNro', numero)
            record.set('vic_cCallePiso', piso)
            record.set('vic_cCalleDpto', departamento)
            record.set('vic_cPartido', partido)
            record.set('vic_cLocalidad', localidad)
            record.set('vic_iStatus', estado)
            record.set('vic_iEdad', aspEdad)
            record.set('vic_iPeso', aspPeso)
            record.set('vic_iAltura', aspaAltura)
            record.set('vic_iAspectoRaza', aspRaza)
            record.set('vic_iAspectoTez', aspTez)
            record.set('vic_iAspectoContextura', aspContextura)
            record.set('vic_iCabelloTipo', aspTipoPelo)
            record.set('vic_iCabelloColor', aspColorPelo)
            record.set('vic_iCabelloEstilo', aspEstiloPelo)
            record.set('vic_iRostroForma', aspFormaRostro)
            record.set('vic_iOjosForma', aspFormaOjos)
            record.set('vic_iOjosColor', aspColorOjos)
            record.set('vic_iNarizFrente', aspFrenteNariz)
            record.set('vic_iNarizPerfil', aspPerfilNariz)
            record.set('vic_iNarizSize', aspTamañoNariz)
            record.set('vic_iBocaLabios', aspLabiosBoca)
            record.set('vic_iBocaSize', aspTamañoBoca)
            record.set('vic_iMentonForma', aspFormaMenton)
            record.set('vic_iOrejasForma', aspFormaOreja)
            record.set('vic_iOrejasSize', aspTamañoOreja)
            record.set('vic_iCejasForma', aspFormaCeja)
            record.set('vic_iCejasSize', aspTamañoCeja)
            record.set('vic_iPilosidadTipo', aspPilosidadTipo)
            record.set('vic_iPilosidadForma', aspPilosidadForma)
            record.set('vic_cObservaciones', señas)
            record.set('vic_cCaractSocial', sociales)
            record.set('vic_cAdicciones', adicciones)
            record.save({
                scope: this,
                callback: function (record, operation) {
                    if (operation.success) {
                        //notify( 'Datos Guardados Exitosamente' );
                        controller.guardarVictimarioCuentas(record.get('Id'));
                    }
                }
            });
        }
    },
    onDocuments: function (button) {
        var view = button.up('victimariosformview');
        var record = view.record
        var win = Ext.create('Ext.Window', {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            title: 'Selector de documentos',
            record: record,
            closeAction: 'hide',
            itemId: 'SelDoc',
            width: 900,
            height: 700,
            border: true,
            modal: true,
            view: view,
            items: [
                {
                    xtype: 'documentosgridview',
                    record: record
                }
            ]
        });
        win.show();

    },
    onQuitarClick: function (btn) {
        var view = btn.up('victimariosformview');
        var gridVicCue = view.down('victimarioscuentasview');
        var selection = gridVicCue.getSelectionModel().getSelection()
        var controller = this;
        if (gridVicCue) {

            Ext.Array.each(selection, function (rec) {

                gridVicCue.getStore().remove(rec)

            });
        }
    },
    //Federico V. Agrego funcion para eliminar victimario a pedido de la tarea DK-149
    onDeleteClick: function (button, event, options) {
        var view = button.up('victimariosformview');
        var record = view.record;

        var controller = this;

        if (!record) {
            notify('No hay un registro seleccionado para eliminar.');
            return;
        }

        Ext.Msg.confirm('Confirmación', '¿Estás seguro de que quieres eliminar este registro?', function (btn) {
            if (btn === 'yes') {

                // Mostrar mensaje de espera
                Ext.Msg.wait('Eliminando victimario...', 'Por favor espere');

                var recordId = record.get('Id');

                Ext.Ajax.request({
                    url: '/rest/m_Victimarios/' + recordId + '?_dc=' + new Date().getTime(),
                    method: 'DELETE',
                    success: function(response) {
                        Ext.Msg.hide();
                        notify('Registro eliminado exitosamente.');
                        view.close();

                        var gridView = Ext.ComponentQuery.query('victimariosview')[0];
                        if (gridView) {
                            gridView.getStore().load();
                        }
                    },
                    failure: function(response) {
                        Ext.Msg.hide();
                        var errorMsg = 'Error al eliminar el registro.';
                        if (response.responseText) {
                            try {
                                var error = Ext.decode(response.responseText);
                                errorMsg = error.message || errorMsg;
                            } catch(e) {
                                errorMsg = 'Error al eliminar el registro. Status: ' + response.status;
                            }
                        }
                        notify(errorMsg);
                        console.error('Error al eliminar victimario:', response);
                    }
                });
            }
        }, controller);
    },

});