Ext.define( 'AdministratorSearch.controller.LicenciaHelperController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'OrganizationSearchModel' ],
    views: [ 'LicenciaHelperView' ],

    init: function(config ) {
        // genero los eventos
        this.control(
            {
                'licenciaview': {
                    afterrender: this.initView
                },
                'licenciaview #inputfile': {
                    change: this.onChangeUploadFile
                }, 'licenciaview button[action=actualizar]': {
                    click: this.onActualizarClick
                }
            }
        );
    },
        
    mostrarDatosLicencia: function (view ) {
        Ext.Ajax.request( {
            url: '/rest/search/SystemData',
            method: 'GET',
            success: function( resp, operation ) {
                if( resp.responseText && resp.responseText != '' ) {
                    var sdt_fecha = Ext.JSON.decode( resp.responseText ).rows[ 0 ].sdt_fecha
                    view.down( '#ultimafechadelicencia' ).setValue( sdt_fecha )
                }
            }
        });

        Ext.Ajax.request( {
            url: '/handler/FingerPrint',
            method: 'GET',
            success: function( resp, operation ) {
                if( resp.responseText && resp.responseText != '' ) {
                    view.down( '#FingerPrint' ).setValue( resp.responseText )
                }
            }
        });

        view.mystore.load();
    },
        
    onActualizarClick: function (button, event, options ) {
        var view = button.up( 'licenciaview' );
        this.mostrarDatosLicencia( view );
    },
        
    onChangeUploadFile: function(uploadfield ) {
        console.log( uploadfield.fileInputEl.dom.files )
        var view = uploadfield.up( 'licenciaview' );
        // agrego loader

        view.setLoading( getLocale( 'Cargando datos' ) );

        var controller = this;
        var reader = new FileReader();
        reader.onload = (
            function( aImg ) {
                return function( e ) {
                    Ext.Ajax.request( {
                        url: '/handler/LicenseHelper?action=showXml',
                        method: 'POST',
                        params: { key: e.target.result.trim() },
                        success: function( resp, operation ) {
                            uploadfield.reset();
                            var parser = new DOMParser()
                            var keytest = parser.parseFromString( resp.responseText, "application/xml" )
                            var node = Ext.DomQuery.select( 'Data', keytest );
                            var modules = Ext.DomQuery.select( 'Module', node );
                            console.log( Ext.DomQuery.select( 'Module', node ) )

                            var msg = "<ul style='overflow:  auto;height: 400;'>";
                            if( node.length <= 0 ) {
                                notify( 'Verifique que el archivo sea una llave.' )
                                return false;
                            } else {

                                Ext.Array.each( modules, function( v, k ) {
                                    var name = "";
                                    var date = "";
                                    Ext.Array.each( v.attributes, function( n, k ) {
                                        if( n.name == 'Name' ) {
                                            name = n.value
                                        }
                                        if( n.name == 'DueDate' ) {
                                            date = n.value;
                                            if( date == 'Perpetual' ) {
                                                date = getLocale( 'Liberado' );
                                            } else {
                                                // cambio el formato de la fecha
                                                var d = new Date( date );
                                                date = Ext.Date.format( d, 'd/m/Y' );
                                            }
                                        }
                                    })

                                    msg += '<li>' + name + ' (' + date + ')</li>'
                                })

                            }
                            msg += '</ul>'

                            console.log( e.target.result )
                            view.setLoading( false );
                            Ext.MessageBox.show( {
                                title: getLocale( 'Subir nueva licencia' ),
                                msg: getLocale( 'Esta intentando subir una nueva licencia que tiene los siguientes modulos:' ) + msg,
                                buttons: Ext.MessageBox.YESNO,
                                height: 400,
                                autoScroll: true,
                                overflowY: 'auto',
                                buttonText: {
                                    yes: getLocale( 'Si' ),
                                    no: getLocale( 'No' )
                                },
                                fn: function( btn ) {
                                    if( btn === 'yes' ) {
                                        controller.updateLicence( e.target.result.trim(), view )
                                    }
                                    else {
                                        //some code
                                    }
                                }
                            });

                            /*    Ext.MessageBox.confirm(getLocale('Subir nueva licencia'), getLocale('Esta intentando subir una nueva licencia que tiene los sigueintes modulos:')+msg, function(btn){
                                    if(btn === 'yes'){
                                        controller.updateLicence(e.target.result)
                                    }
                                    else{
                                    //some code
                                    }
                                });*/
                        }
                    })
                };
            }
        )( uploadfield.fileInputEl.dom.files[ 0 ] );
        reader.readAsText( uploadfield.fileInputEl.dom.files[ 0 ] );
        console.log( reader )
    },
        
    updateLicence: function (licencia, view ) {
        var controller = this;
        //traigo lo que esta en base
        Ext.Ajax.request( {
            url: '/rest/search/SystemData',
            method: 'GET',
            success: function( resp, operation ) {
                var systemdata = {};
                if( resp.responseText && resp.responseText != '' ) {
                    systemdata = Ext.JSON.decode( resp.responseText );
                }

                console.log( systemdata )

                var sdt_log = { actions: [] };
                var ssdt_log = "";
                try {
                    if( systemdata.rows ) {
                        ssdt_log = systemdata.rows[ 0 ].sdt_log;
                        if( ssdt_log != "" ) {
                            sdt_log = Ext.JSON.decode( ssdt_log );
                        }
                    }
                } catch( e ) {
                    console.log( 'Error al decodificar el log' );
                }


                sdt_log.actions.push( {
                    action: 'update',
                    date: Ext.Date.format( new Date(), 'd-m-Y H:i:s' ),
                    userId: _UserData.UserId
                })

                console.log( ssdt_log );

                //pego toda la info en base

                Ext.Ajax.request( {
                    url: '/handler/SearchPost?search=SystemDataUpdate',
                    method: 'POST',
                    params: { sdt_data: licencia, sdt_log: Ext.encode( sdt_log ) },
                    success: function( resp, operation ) {
                        var systemdata = Ext.JSON.decode( resp.responseText );
                        console.log( systemdata )
                        Ext.Ajax.request( {
                            url: '/handler/securityRebuildKeyData',
                            method: 'GET',
                            success: function( resp, operation ) {
                                Ext.MessageBox.alert( 'Licencia', 'La licencia ya esta lista.', function() { });
                                controller.mostrarDatosLicencia( view );
                            }
                        });
                    }
                });
            }
        });
    },

    initView: function(view ) {
        var me = this;
        Ext.define( 'infoUser', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'Company', type: 'string' },
                { name: 'FirstName', type: 'string' },
                { name: 'LastName', type: 'string' },
                { name: 'UserId', type: 'string' }
            ]
        });

        var filters = [];
        filters.push( {
            property: 'o.Id',
            value: this.application.UserData.Company
        });

        var store = Ext.create( 'Ext.data.Store', {
            model: this.getOrganizationSearchModelModel(),
            pageSize: 50,
            filters: filters,
            remoteSort: true,
            remoteFilter: true,
        });

        store.load( {
            callback: function( records ) {

                var empresa = '';

                if( records[ 0 ] ) {
                    empresa = records[ 0 ].get( 'LegalName' );
                    //view.down('#company').setValue(empresa);

                }

                var record = Ext.create( 'infoUser', {
                    Company: empresa,
                    FirstName: _UserData.FirstName,
                    LastName: _UserData.LastName,
                    UserId: _UserData.UserId
                });


            }
        })

        view.down( '#nombre' ).setValue( _UserData.FirstName )
        view.down( '#apellido' ).setValue( _UserData.LastName )
        view.down( '#Email' ).setValue( _UserData.UserId )
        view.down( '#QtyAccounts' ).setValue( KeyCustomerInfo.QtyAccounts == 0 ? getLocale( "Ilimitadas" ) : KeyCustomerInfo.QtyAccounts )
        //view.down('#company').setValue(KeyCustomerInfo.Name)
        view.down( '#serial' ).setValue( KeyCustomerInfo.Serial )

        Ext.define( 'Abouts', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'DueDate', type: 'date', dateFormat: 'MS' },
                { name: 'Module' },
                { name: 'IsPerpetual', type: 'boolean' },
                { name: 'QuantityOfUsers' },
                { name: 'ConcurrentInstances', type: 'int' }

            ]
        });

        view.mystore = Ext.create( 'Ext.data.Store', {
            model: 'Abouts',
            proxy: {
                type: 'rest',
                url: '/Rest/Security/KeyModules',
                batchActions: false,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            autoLoad: true
        });
        view.down( '#modulegrid' ).bindStore( view.mystore );
        this.mostrarDatosLicencia( view )
    }
});