Ext.define( 'Common.controller.MGServiciosContratadosGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'MGServiciosContratadosSearchModel', 'ContratoItemModel', 'crm_contratoModel', 't_condiciones_pago_fcSearchModel', 'm_clientes_fcSearchModel', 'm_clientes_fcModel' ],
    views : [ 'MGServiciosContratadosGridView' ],

    init: function(config ) {
        // genero los eventos
        this.control(
            {
                'mgservicioscontratadosview': {
                    afterrender: this.initView,
                    itemdblclick: this.onItemClick,//En principio no hay doble click  aquí
                    objectedit: this.onObjectEdit,
                    objectchange: this.onObjectChange,
                    generarnovedad: this.onGenerarNovedad

                },
                'mgservicioscontratadosview button[action=agregarservicio]':{
                    click: this.onAgregarServicioClick
                },
                'mgservicioscontratadosview button[action=search]': {
                    click: this.onSearchClick
                },
                'mgservicioscontratadosview button[action=getall]': {
                    click: this.onGetAllClick
                },
                'mgservicioscontratadosview button[action="new"]': {
                    click: this.onNewOrderClick
                },
                'mgservicioscontratadosview button[action=groupStatus]': {
                    click: this.onGroupStatusClick
                },
                'mgservicioscontratadosview button[action="template"]': {
                    click: this.onTemplateClick
                }
            });
    },
    onAgregarServicioClick: function (button){
        var view = button.up('mgservicioscontratadosview');
        var model = this.getContratoItemModelModel();

        var controller =this;
            var storeCliente = Ext.create('Ext.data.Store',{
                model: controller.getM_clientes_fcSearchModelModel(),
                remoteFilter: true,           
                filters:[{
                    property: 'cli_icodigo_ID',
                    value: view.record.get('Account')
                    }
                ]
            }).load({callback:function (records) {
                if(records.length<=0 || !view.record.get('Account')) {
                    var CondicionPagoStore = Ext.create('Ext.data.Store',{
                        model: controller.getT_condiciones_pago_fcSearchModelModel(),
                        pageSize: 50,
                        remoteSort: true,
                        remoteFilter: true,
                    });
                    Ext.MessageBox.alert('Falta configuración','La organización seleccionada debe tener información contable'
                        ,function(){

                            CondicionPagoStore.load({callback:function (recordsCondicionPago) {
                                if(recordsCondicionPago.length <= 0) {
                                        Ext.MessageBox.alert('Falta configuracion', 'Es necesario tener creadas las las condiciones de pago. Ingrese a AdministratorSearch para crearlas.', function(){});
                                        return false;                                  
                                }
                                var recordCliente = controller.getM_clientes_fcModelModel().create({
                                    cli_cnombre: view.record.get('Name'),
                                    cli_cidentificacion:null,
                                    cli_ccategoriaimpositiva:null,
                                    cli_ivendedor:null,
                                    cli_icobrador:null,
                                    cli_czona:null,
                                    cli_ccallefiscal: view.record.get('Address'),
                                    cli_clocalidadfiscal: view.record.get('City'),
                                    cli_cprovinciafiscal: view.record.get('State'),
                                    cli_ccodigopostalfiscal: view.record.get('Zip'),
                                    cli_ccallecobranza: '',//view.record.get('Name'),
                                    cli_clocalidadcobranza: view.record.get('City'),
                                    cli_cprovinciacobranza: view.record.get('State'),
                                    cli_ccodigopostalcobranza: view.record.get('Zip'),
                                    cli_nlunes:0,
                                    cli_nmartes:0,
                                    cli_nmiercoles:0,
                                    cli_njueves:0,
                                    cli_nviernes:0,
                                    cli_nsabado:0,
                                    cli_ndomingo:0,
                                    cli_chora:'',
                                    cli_cservicio: null,
                                    cli_cformatoimpresion:null,
                                    cli_ccondicionpago:recordsCondicionPago[0].get('con_ccodigo'),
                                    cli_ctelefono: view.record.get('Phone'),
                                    cli_ccontacto: '',
                                    cli_cobservacion:null,
                                    cli_nsituacion:1,
                                    cli_inumero:0,
                                    cli_nDocCAE:0,
                                    cli_cdatosextra:null
                                })

                                var win = Ext.create('Ext.Window', {
                                    title : getLocale('Información contable'),
                                    closeAction : 'hide',
                                    width : 800,
                                    height : 500,
                                    layout:'fit',
                                    border : true,
                                    modal: true,                
                                    items : [{
                                        xtype:'clienteformview',
                                        recordCliente: recordCliente,
                                        recordOrganizacion: view.record,//view.record,
                                        caller:view
                                    }],
                                    listeners: {
                                        close: function(){
                                            view.up('mgcuentaview').close();
                                            notify('Por favor, acceda de nuevo a la opción');
                                        }
                                    }
                                }).show()
                            }});


                            
                        }
                    );



                } else {
                    //--------------mostrando form para agregar servicio----------
                    var record = Ext.create(model,{

                        Name: getLocale('Seleccione un servicio...'),
                        Status: '1',
                        Quantity: 1,
                        idcontrato: 0
                    });
                    var viewform = Ext.widget('mgservicioscontratadosformview',{
                        caller: view,
                        height: 500,
                        width: 400,
                        record: record,
                        recordOrganizacion : view.record,     
                        recordCuenta : view.recordCuenta     
                        
                    });
                    var myWindow = Ext.widget('window',{
                        title: 'Alta de servicio contratado',
                        height: 500,
                        width: 400,
                        modal: true, 
                        items: viewform,
                        resizable: false,
                        
                        caller: view
                    }).show();
                    //----------------------
                }
        }});


                



    },
        
    onGenerarNovedad: function (record, view ) {
        Ext.Ajax.request( {
            url: '/rest/search/MG_ContratoANovedad',
            method: 'GET',
            params: {
                IdContrato: record.get( 'Id' )
            },
            success: function( resp, operation ) {
                if( resp.responseText ) {
                    var metadata = Ext.JSON.decode( resp.responseText );
                    notify( 'Se genero la novedad del contrato' )
                }
            }
        })
    },
        
    onObjectChange: function (view ) {
        view.getStore().load()
    },

    normalizeContextValue: function (value) {
        if (value === undefined || value === null) {
            return '';
        }

        var normalized = String(value).replace(/^[\s\u00a0]+|[\s\u00a0]+$/g, '');
        if (normalized === '' || normalized === '0') {
            return '';
        }

        return normalized;
    },

    resolveClienteIdFromRecord: function (record) {
        if (!record || !record.get) {
            return '';
        }

        return this.normalizeContextValue(record.get('Account'))
            || this.normalizeContextValue(record.get('cli_icodigo_ID'))
            || this.normalizeContextValue(record.get('cnt_idcliente'));
    },

    resolveBillingOrganizationIdFromRecord: function (record) {
        if (!record || !record.get) {
            return '';
        }

        return this.normalizeContextValue(record.get('cli_iOrganizacion'))
            || this.normalizeContextValue(record.get('cli_iorganizacion'))
            || this.normalizeContextValue(record.get('cnt_org_fc'));
    },

    initView: function(view ) {
        var record = view.record;
        var clienteId = this.resolveClienteIdFromRecord(record);
        if( !view.filters ) {
            view.filters = [];
        }

        if( !view.sorters ) {
            view.sorters = []
        }
        //record.get('Id')
        if (record){
            if(record.get('Id') && clienteId){
                view.filters.push({property: 'cnt_idcliente',value: clienteId});
            }
        }
        var store = Ext.create('Ext.data.Store',{
            model: this.getMGServiciosContratadosSearchModelModel(),
            remoteFilter: true,
            remoteSort: true,
            filters: view.filters,
            sorters: view.sorters,
            autoload: true
        });

        view.bindStore(store);
        store.load();
        var toolbar = view.down( 'pagingtoolbar' );
        toolbar.bindStore( store );
       
        /*var record = view.record;

        if( view.hidebuttons ) {
            Ext.Array.each( view.hidebuttons, function( button ) {
                view.down( button ).hide();
            })
        }

        if( view.showProximosVencimientoDias ) {
            view.down( '#proximovencimientosdias' ).show()
            view.down( '#proximovencimientosdias' ).setValue( 30 )
        }

        var objectTypeId = 0
        if( record ) {
            //si no tiene account relacionada a la organizacion no dejo continuar
            if( !record.get( 'Account' ) ) {
                Ext.MessageBox.alert( 'Falta configurar', 'Necesita configurar la informacion de facturacion.', function() {
                    view.up( 'tabpanel' ).remove( view )
                });
                return false;
            }

            view.filters = [
                {
                    property: 'cnt_idcliente',
                    value: record.get( 'Account' )
                }
            ]

            var col = view.down( '[dataIndex=idOrganizacion]' );
            if( col ) {
                view.down( '[dataIndex=idOrganizacion]' ).setVisible( false );
            }

        }

        if( !view.filters ) {
            view.filters = [];
        }

        if( !view.sorters ) {
            view.sorters = []
        }

        var store = Ext.create( 'Ext.data.Store', {
            model: this.getCrm_contratoSearchModelModel(),
            remoteFilter: true,
            remoteSort: true,
            filters: view.filters,
            sorters: view.sorters,
            autoload: false
        });


        


        var store = Ext.create( 'Ext.data.Store', {
            model: this.getTablasFormaDePagoSearchModelModel(),
            remoteFilter: true,
            autoload: false
        });

        var formadepago = view.down( '#formadepago' );
        formadepago.bindStore( store );
        store.load();


        var store = Ext.create( 'Ext.data.Store', {
            model: this.getT_organizacion_fcSearchModelModel(),
            remoteFilter: true,
            autoload: false
        });

        var organizaciones = view.down( '#organizaciones' );
        organizaciones.bindStore( store );
        store.load();
        */
    },

    onGetAllClick: function(button, event, options ) {
        var view = button.up( 'contratogridview' );
        var store = view.getStore();
        store.clearFilter( true );

        view.down( '#datedesde' ).setValue( '' )
        view.down( '#datehasta' ).setValue( '' )
        view.down( '#datevencimientodesde' ).setValue( '' )
        view.down( '#datevencimientohasta' ).setValue( '' )
        view.down( '#estado' ).setValue( '' )
        view.down( '#cliente' ).setValue( '' )
        view.down( '#organizaciones' ).setValue( '' )
        view.down( '#formadepago' ).setValue( '' )

        store.filter( view.filters )
    },
        
        
    onTemplateClick: function(button, event, options ) {
        var panel = button.up( 'tabpanel' );
        var view = button.up( 'contratogridview' );
        var title = getLocale( 'Templates contrato' );
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down( '[title="' + title + '"]' );



        if( !mytab ) {
            var newTab = Ext.widget( 'contratotemplategridview', {
                translate: false,
                targetTab: newTab,
                title: title,
                closable: true,
                layout: 'fit'
            });

            panel.add( newTab );
            panel.setActiveTab( newTab );
        }
        // el existe, lo activo
        else {
            mytab.show();
        }
    },
        
    onNewOrderClick: function(button, event, options ) {
        var panel = button.up( 'tabpanel' );
        var view = button.up( 'mgservicioscontratadosview' ) || button.up( 'contratogridview' );

        var model = this.getCrm_contratoModelModel();

        var record = Ext.create( model, {
            Id: 0,
            cnt_fechaalta: new Date()
        });

        var title = getLocale( 'Nuevo Contrato' );
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down( '[title="' + title + '"]' );
        var clienteId = '';
        var facturadoraId = '';

        if( view.record ) {
            clienteId = this.resolveClienteIdFromRecord( view.record );
            facturadoraId = this.resolveBillingOrganizationIdFromRecord( view.record );

            if( clienteId ) {
                record.set( 'cnt_idcliente', clienteId );
            }

            if( facturadoraId ) {
                record.set( 'cnt_org_fc', facturadoraId );
            }
        }


        if( !mytab ) {
            var newTab = Ext.widget( 'contratoformview', {
                record: record,
                translate: false,
                targetTab: newTab,
                title: title,
                record: record,
                closable: true,
                clienteId: clienteId,
                facturadoraId: facturadoraId,
                caller: view,
                organizacionId: view.record ? view.record.get( 'Id' ) : false,
                recordOrganizacion: view.record
            });

            panel.add( newTab );
            panel.setActiveTab( newTab );
        }
        // el existe, lo activo
        else {
            mytab.show();
        }
    },
        
        
    onSearchClick: function(button, event, options ) {
        var view = button.up( 'contratogridview' );
        var store = view.getStore();
        var query = view.down( '#query' );
        var field = view.down( '#fieldName' );
        var filters = Ext.Array.clone( view.filters );
        var fechadesde = view.down( '#datedesde' ).getValue();
        var fechahasta = view.down( '#datehasta' ).getValue();
        var fechavencimientodesde = view.down( '#datevencimientodesde' ).getValue();
        var fechavencimientohasta = view.down( '#datevencimientohasta' ).getValue();
        var estado = view.down( '#estado' ).getValue();
        var cliente = view.down( '#cliente' ).getValue();
        var organizaciones = view.down( '#organizaciones' ).getValue();
        var formadepago = view.down( '#formadepago' ).getValue();
        var proximovencimientosdias = view.down( '#proximovencimientosdias' ).getValue()

        if( fechadesde ) {

            filters.push( {
                property: 'cnt_fechaalta:GTEDATESTRING',
                value: Ext.Date.format( fechadesde, 'Y-m-d' ),
                id: 'fechadesde'
            });

        }

        if( fechahasta ) {

            filters.push( {
                property: 'cnt_fechaalta:LTEDATESTRING',
                value: Ext.Date.format( fechahasta, 'Y-m-d' ),
                id: 'fechahasta'
            });

        }

        if( fechavencimientodesde ) {

            filters.push( {
                property: 'cnt_fechavto:GTEDATESTRING',
                value: Ext.Date.format( fechavencimientodesde, 'Y-m-d' ),
                id: 'fechavencimientodesde'
            });

        }

        if( fechavencimientohasta ) {

            filters.push( {
                property: 'cnt_fechavto:LTEDATESTRING',
                value: Ext.Date.format( fechavencimientohasta, 'Y-m-d' ),
                id: 'fechavencimientohasta'
            });

        }


        if( proximovencimientosdias && view.showProximosVencimientoDias ) {
            filters.push( {
                property: 'cnt_fechavto:LT',
                value: Ext.Date.add( new Date(), Ext.Date.DAY, proximovencimientosdias ),
                id: 'fechavencimientohasta'
            });
        }

        if( estado != null ) {

            filters.push( {
                property: 'cnt_estado',
                value: estado,
                id: 'estado'
            });

        }

        if( cliente ) {

            filters.push( {
                property: 'orgs.[Name]:LIKE',
                value: cliente,
                id: 'cliente'
            });

        }

        if( organizaciones ) {

            filters.push( {
                property: 'cnt_org_fc',
                value: organizaciones,
                id: 'organizaciones'
            });

        }


        if( formadepago ) {

            filters.push( {
                property: 'cnt_formapago',
                value: formadepago,
                id: 'formadepago'
            });

        }



        store.clearFilter( true );
        if( filters )
            store.filter( filters );


    },
        
    onGroupStatusClick: function(button, event, options ) {
        var view = button.up( 'contratogridview' );
        var grid = view.view;
        store = view.getStore();

        if( button.pressed ) {

            store.group( 'cnt_estado', 'ASC' );
        } else {
            store.clearGrouping();
        }

    },
        
    onItemClick: function(grid, record, item, index, e, options ) {
        var id = record.get( 'cnt_iid' );
        var model = this.getCrm_contratoModelModel();
        var proxy = model.getProxy();
        //panel = grid.up( 'tabpanel' )
        var title = getLocale( 'Contrato' ) + ': ' + record.get( 'cnt_iid' );
        // me fijo si el tab existe, si es nuevo lo creo
        //var mytab = panel.down( '[title="' + title + '"]' );
        var view = grid;//.up( 'contratogridview' )

        model.load(id,{
            callback: function(record,operation,success){
                    //if( !mytab ) {
                        var newTab = Ext.widget( 'mgservicioscontratadosestadoformview', {
                            record: record,
                            translate: false,
                            targetTab: newTab,
                            caller: view,
                        });
                        var window = Ext.widget('window',{
                            title: title,
                            modal: true,
                            items:[newTab]
                        });
                        window.show();
                    //   panel.add( newTab );
                    //    panel.setActiveTab( newTab );
                    //}
                    // el existe, lo activo
                    //else {
                    //    mytab.show();
                    //}

            }
        });


    },    
        
    onObjectEdit: function(record, view ) {
        this.onItemClick( view, record );
    },
        
    openObjectTab: function(tabpanel, objectId, objectTypeName, title ) {
        var title = object.get( 'Name' );
        var newTab = tabpanel.down( '[title="' + title + '"]' );
        if( !newTab ) {
            var newTab = Ext.widget( container, {
                title: title,
                border: false,
                closable: true,
                objectId: objectId,
                targetTab: tabpanel,
                autoDestroy: true
            });

            tabpanel.add( newTab );
        }

        tabpanel.setActiveTab( newTab );
    },
        
    onContentCreated: function(view ) {
        var record = view.record;
        var grid = view.caller;
        var paging = view.down( 'pagingtoolbar' );

        paging.moveFirst();
        paging.doRefresh();
        this.onItemClick( grid, record );
    },
        
    openObjectTab: function(targetTab, object ) {
        var objectId = object.get( 'Id' );
        var title = object.get( 'Name' );

        var newTab = Ext.widget( 'contratoformview', {
            title: title,
            border: false,
            closable: true,
            record: object,
            objectId: objectId,
            targetTab: targetTab,
            autoDestroy: true
        });

        targetTab.add( newTab );
        targetTab.setActiveTab( newTab );
    }
});