Ext.define('iOT.view.iOTSolicitudesAccesoFormView', {
    extend : 'Ext.container.Container',
    alias : 'widget.iotsolicitudesaccesoformview',    
    title: 'Información de Solicitud de Acceso',
    forceClose: false,
    layout: 'border',
    height: 600,
    items: [
        {
            xtype: 'form',
            itemId: 'formcuenta',
            region: 'north',
            collapsible: true,
            split: true,
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            flex: 5,
                            items:[
                                {
                                    xtype: 'box',
                                    html: '<h1>Datos de la Solicitud: </h1>'
                                },
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    items:[
                                        {
                                            xtype: 'displayfield',
                                            name: 'pdl_cRequested',
                                            fieldLabel: 'Solicitante'
                                        },{
                                            xtype: 'datefield',
                                            readOnly: true,
                                            name: 'pdl_tReqFechaHora',
                                            format:'d/m/Y H:m',
                                            fieldLabel: 'Fecha solicitud'
                                        },{
                                            xtype: 'displayfield',
                                            name: 'pdl_cLockName',
                                            fieldLabel: 'ID'
                                        },
                                        {
                                            xtype: 'textareafield',
                                            name: 'pdl_cReqObservacion',
                                            readOnly: true,
                                            fieldLabel: 'Mensaje',
                                            itemId: 'obs',
                                            width: 400                                   
                                        }
                                    ],
                                }
                            ]
                        },
                        ,{
                            xtype: 'container',
                            layout: 'vbox',
                            flex: 4,
                            items: [
                                {
                                    xtype: 'box',
                                    html: '<h1>Comentario: </h1>'
                                },
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    flex: 3,
                                    width: 400,
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            name: 'pdl_cAutObservacion',
                                            itemId: 'obsRes',
                                            width: 300                                  
                                        },{
                                            xtype:'container',
                                            itemId: 'AcepRechContainer',
                                            layout: 'hbox',
                                            style: 'margin-top: 10px;',
                                            width: 300,
                                            items:[
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    items:[
                                                        {
                                                            xtype: 'button',
                                                            text: 'Aceptar',
                                                            itemId: 'aceptar',
                                                            iconCls: 'icon-tick',
                                                            action: 'aceptarsol',
                                                            width:100
                                                        },
                                                    ],
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex:1,
                                                    items:[
                                                        {
                                                            xtype: 'button',
                                                            text: 'Rechazar',
                                                            itemId: 'rechazar',
                                                            readOnly: false,
                                                            iconCls: 'icon-cross',
                                                            action: 'rechazarsol',
                                                            style:'margin-left: 50px',
                                                            width:100
                                                        }
                                                    ]
                                                }
                                            ],
                                        }  
                                    ]
                                }
                            ]
                        }
                    ]    
                }
            ]
        },
        {
            xtype: 'gmappanel6',
            itemId: 'googlemap',
            //height: 500,
            layout: 'fit',
            region: 'center',
            zoomLevel : 3,
			gmapType : 'map',
			mapConfOpts : ['enableScrollWheelZoom','enableDoubleClickZoom', 'enableDragging'],
			mapControls : ['GSmallMapControl', 'GMapTypeControl','NonExistantControl']

        },       
    ],
    
    // cierro items
    initComponent: function(){
        this.callParent();
        if (this.readOnly){
            this.down('#AcepRechContainer').hide();
            this.down('#obsRes').setReadOnly(true);
        }
    }
});