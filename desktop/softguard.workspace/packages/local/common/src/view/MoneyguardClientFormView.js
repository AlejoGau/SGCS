//MIGRADO2024
Ext.define('Common.view.MoneyguardClientFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.moneyguardclientformview',
    preventHeader: true,
    layout: 'anchor',
    autoScroll: true,
    bodyPadding : 5,    
    fieldDefaults : {
        labelWidth : 120,
		anchor : '100%',
		labelAlign: 'left'					
	},
	items : [
        {
            xtype: 'fieldset',
            title: getLocale('Opciones'),
            items:[
                {
                    xtype: 'button',
                    text: 'Crear Organización'
                },{
                    xtype: 'button',
                    text: 'Asignar Organización'
                }
            ]
        }
        /*{
            xtype: 'fieldset',
            layout: {
                 type: 'vbox',
                align: 'stretch'
            },
            items:[
                {
                    xtype : 'displayfield',
                    name : 'cli_icodigo_ID',    
                    fieldLabel : 'Id'
            	},{
                    xtype : 'displayfield',
                    name : 'cli_cnombre',
        			fieldLabel : 'Nombre',
                    flex: 1,
        			allowBlank : false
        		},{
                    xtype : 'displayfield',
                    fieldLabel : 'Telefono',
                    name : 'cli_ctelefono',
                    flex: 1,
                    allowBlank : false
                },{
                    xtype: 'fieldset',
                    title: 'Datos de localizacion',
                    layout: {
                         type: 'vbox',
                        align: 'stretch'
                    },
                    items:[
                       {
                            xtype : 'displayfield',
                            name : 'cli_czona',
                        	fieldLabel : 'Zona',
                            flex: 1,
                			allowBlank : false
            	    	},{
                            xtype : 'displayfield',
                            name : 'cli_ccallefiscal',
                    		fieldLabel : 'Direccion fiscal',
                            flex: 1,
                			allowBlank : false
                		},{
                            xtype : 'displayfield',
                            name : 'cli_clocalidadfiscal',
                        	fieldLabel : 'Localidad',
                            flex: 1,
                			allowBlank : false
                		},{
                            xtype : 'displayfield',
                            name : 'cli_cprovinciafiscal',
                            fieldLabel : 'Id provincia',
                            flex: 1,
                			allowBlank : false
                		},{
                            xtype : 'displayfield',
                            name : 'cli_ccodigopostalfiscal',
                            fieldLabel : 'Codigo postal',
                            flex: 1,
                    		allowBlank : false
                		}
                        
                    ]
                },{
                    xtype: 'fieldset',
                    title: 'Datos de facturacion',
                    layout: {
                         type: 'vbox',
                        align: 'stretch'
                    },
                    items:[
                       {
                            xtype : 'displayfield',
                            name : 'cli_ccallecobranza',
                    		fieldLabel : 'Direccion',
                            flex: 1,
                			allowBlank : false
                		},{
                            xtype : 'displayfield',
                            name : 'cli_clocalidadcobranza',
                        	fieldLabel : 'Localidad',
                            flex: 1,
                			allowBlank : false
                		},{
                            xtype : 'displayfield',
                            name : 'cli_cprovinciacobranza',
                            fieldLabel : 'Id provincia',
                            flex: 1,
                			allowBlank : false
                		},{
                            xtype : 'displayfield',
                            name : 'cli_ccodigopostalcobranza',
                            fieldLabel : 'Codigo postal',
                            flex: 1,
                    		allowBlank : false
                		},{
                            xtype: 'fieldset',
                            title: 'Dias de cobro',
                            //collapsible: true,
                            layout: {
                                 type: 'vbox',
                                align: 'stretch'
                            },
                            items:[
                               {
                                    xtype : 'displayfield',
                                	fieldLabel : '',
                                    itemId: 'dias',
                                    flex: 1,
                        			allowBlank : false
                        		},
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Horas',
                                    name : 'cli_chora',
                                    flex: 1,
                        			allowBlank : false
                        		}
                                
                            ]
                        },{
                            xtype : 'displayfield',
                            fieldLabel : 'Id servicio',
                            name : 'cli_cservicio',
                            flex: 1,
                    		allowBlank : false
                		},{
                            xtype : 'displayfield',
                            fieldLabel : 'Proxima factura',
                            name : 'cli_dproximafactura',
                            flex: 1,
                        	allowBlank : false
                		},{
                            xtype : 'displayfield',
                            fieldLabel : 'Id formato impresion',
                            name : 'cli_cformatoimpresion',
                            flex: 1,
                            allowBlank : false
                		},{
                            xtype : 'displayfield',
                            fieldLabel : 'Id condicion pago',
                            name : 'cli_ccondicionpago',
                            flex: 1,
                            allowBlank : false
                    	},{
                            xtype : 'displayfield',
                            fieldLabel : 'Nombre de contacto',
                            name : 'cli_ccontacto',
                            flex: 1,
                            allowBlank : false
                        },{
                            xtype : 'displayfield',
                            fieldLabel : 'Observaciones',
                            name : 'cli_cobservacion',
                            flex: 1,
                            allowBlank : false
                        },{
                            xtype : 'displayfield',
                            fieldLabel : 'Situacion',
                            name : 'cli_nsituacion',
                            flex: 1,
                            allowBlank : false
                        },{
                            xtype : 'displayfield',
                            fieldLabel : 'Numero',
                            name : 'cli_inumero',
                            flex: 1,
                            allowBlank : false
                        },{
                            xtype : 'displayfield',
                            fieldLabel : 'Documento CAE',
                            name : 'cli_nDocCAE',
                            flex: 1,
                            allowBlank : false
                        },{
                            xtype : 'displayfield',
                            fieldLabel : 'Datos Extra',
                            name : 'cli_cDatosExtra',
                            flex: 1,
                            allowBlank : false
                        }
                        
                    ]
                },{
                    xtype: 'fieldset',
                    title: 'Datos Comerciales',
                    //collapsible: true,
                    layout: {
                         type: 'vbox',
                        align: 'stretch'
                    },
                    items:[
                       {
                            xtype : 'displayfield',
                            name : 'cli_ccategoriaimpositiva',
                			fieldLabel : 'Categoria Impositiva',
                            flex: 1,
                			allowBlank : false
                		},{
                            xtype : 'displayfield',
                            name : 'cli_ivendedor',
                    		fieldLabel : 'Id vendedo',
                            flex: 1,
                			allowBlank : false
                		},{
                            xtype : 'displayfield',
                            name : 'cli_icobrador',
                        	fieldLabel : 'Id cobrador',
                            flex: 1,
                			allowBlank : false
                		}
                    ]
                }
                
                
               
            ]
        }*/
    ],
	initComponent : function() {
		/*this.callParent();
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-cuentaAdd',
                    text: 'Asignar cuenta',
                    scope: this,
                    action: 'asignar',
                    itemId: 'asignarbtn'
                }, {
                    iconCls: 'icon-cuentaDelete',
                    text: 'Eliminar asignación',
                    action: 'delete',
                    scope: this,
                    itemId: 'deletebtn'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);*/
	} // cierro init
});