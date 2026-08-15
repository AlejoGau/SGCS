try {
Ext.define('AdministratorSearch.view.MoneyGuardOrganizacionFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.moneyguardorganizacionformview'],
    autoScroll: true,
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 120,
        enforceMaxLength: true,
        anchor:'100%'
    },
	items : [
		{
			xtype : 'textfield',
			name : 'org_cnombre',
            fieldLabel: 'Nombre'
		}, {
    		xtype : 'combo',
			fieldLabel : 'Provincia / Estado',
			store : 'ProvinciasStore',
			name : "org_cprovinciafiscal",
			displayField : 'pro_cdescripcion',
            itemId: 'comboProvincia',
			valueField : 'pro_ccodigo',
            editable: false
		},{
    		xtype : 'textfield',
			name : 'org_clocalidadfiscal',
            fieldLabel: 'Localidad'
		},{
    		xtype : 'textfield',
			name : 'org_ccodigopostalfiscal',
            fieldLabel: 'Código postal'
		},{
        	xtype : 'textfield',
			name : 'org_ccallefiscal',
            fieldLabel: 'Calle'
		},{
    		xtype : 'textfield',
			name : 'org_ctelefono',
            fieldLabel: 'Telefono'
		},{
    		xtype : 'textfield',
			name : 'org_cmail',
            fieldLabel: 'Email'
		},{
    		xtype : 'combo',
			fieldLabel : 'Categoría imp.',
			name : "org_ccategoriaimpositiva",
			displayField : 'cat_cdescripcion',
			valueField : 'cat_ccodigo',
            editable: false,
            itemId:'categoriaimpositiva',
            disabled: true,
            allowBlank: false
		},{
    		xtype : 'textfield',
			name : 'org_cidentificacion',
            fieldLabel: 'Identificación'
		},{
        	xtype : 'datefield',
			name : 'org_cinicioactividades',
            fieldLabel: 'Inicio actividades'
		},{
        	xtype : 'textfield',
			name : 'org_cempresacb',
            fieldLabel: 'Código barras',
            hidden:true
		},{
        	xtype : 'textareafield',
			name : 'org_cheadercbte',
            fieldLabel: 'Encabezado cbte'
		},
        {
            xtype: 'container',
            layout: 'hbox',
            items:[
                {
                    xtype : 'displayfield',
            		name : '_logo',
                    fieldLabel: 'Logo',
                    maxLength: 60
        		},{
                	xtype : 'button',
        			text : 'Seleccione un archivo',
        			iconCls : 'icon-photo',
        			action: 'logo'
        		}
            ]
        },  
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            itemId:'organizacioncontainer',
            items:[
                {
                    xtype : 'displayfield',    
                    fieldLabel : 'Entidad',
                    name : '_organization',
                    itemId:'organizacion',
                    flex: 1
                },
                {
                    xtype: 'button',
                    action: 'organizationChange',
                    text: 'Seleccionar organización'
                }/*,{
                    xtype: 'button',
                    margin: '0 0 0 5',
                    text: 'Nueva Organización',
                    tooltip: 'Nueva Organización',
                    iconCls : 'icon-add',
            		action : 'createorganization'
            	}*/
            ]
        },{
            xtype:'selecterfield',
            itemId:'moneda',
            simpleSelect: true,
            config: {
                disponible: {
                    title:'Moneda',
                    field:'_nombre',
                    searchField: 'mon_cnombre'
                },
                selecionado: {
                    title:'Moneda',
                    field:'_nombre'
                },
                valueField:'mon_ccodigo',
                modelItems: 'AdministratorSearch.model.t_monedasSearchModel'
                    
            },
            title:'Moneda'
        
        },
        {
            xtype:'container',
            layout: {
            type: 'hbox',
            align: 'top'
        },
            items:[
                {
                xtype : 'combo',
                fieldLabel : 'Facturación',
                name : "org_factelect",
                editable: false,
                flex: 1,
                store:[
                    ['',getLocale('Sin integración')],
                    ['AfipCae',getLocale('Afip electrónica')]
                ]
                },{
                    xtype:'button',
                    itemId: 'btnConfigurar',
                    text: 'Configurar',
                    margin:'0 0 0 5',
                    width:70
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: getLocale('Configuración de Factura'),
            itemId: 'facturaConfig',
            collapsible: true,
            collapsed: true,
            defaults: {
                labelAlign: 'left',
                labelWidth: 160,
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'textareafield',
                            name: 'observaciones_template',
                            itemId: 'observaciones_template',
                            fieldLabel: getLocale('Observaciones'),
                            flex: 1,
                            height: 80,
                            emptyText: getLocale('Ingrese observaciones con variables {{variable}}')
                        },
                        {
                            xtype: 'button',
                            text: getLocale('Insertar Variable'),
                            iconCls: 'x-fa fa-plus-circle',
                            action: 'insertVariable',
                            margin: '0 0 0 5',
                            width: 130
                        }
                    ]
                },
                {
                    xtype: 'textareafield',
                    name: 'footer_fijo',
                    itemId: 'footer_fijo',
                    fieldLabel: getLocale('Footer fijo'),
                    height: 60,
                    emptyText: getLocale('Texto fijo para pie de factura')
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'displayfield',
                            name: '_factura_logo',
                            itemId: 'factura_logo_display',
                            fieldLabel: getLocale('Logo factura'),
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            text: getLocale('Subir logo'),
                            iconCls: 'x-fa fa-image',
                            action: 'facturaLogo',
                            width: 130
                        }
                    ]
                },
                {
                    xtype: 'checkboxfield',
                    name: 'mostrar_qr_afip',
                    itemId: 'mostrar_qr_afip',
                    fieldLabel: getLocale('Mostrar QR AFIP'),
                    inputValue: true,
                    uncheckedValue: false
                },
                {
                    xtype: 'fieldset',
                    title: getLocale('Integraciones de pago'),
                    itemId: 'integraciones_pago',
                    defaults: {
                        anchor: '100%',
                        labelWidth: 160
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            title: getLocale('Transferencia bancaria'),
                            defaults: {
                                anchor: '100%',
                                labelWidth: 160
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    name: 'transferencia_habilitado',
                                    itemId: 'transferencia_habilitado',
                                    action: 'toggleIntegration',
                                    integrationKey: 'transferencia',
                                    fieldLabel: getLocale('Habilitado'),
                                    inputValue: true,
                                    uncheckedValue: false
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'transferencia_banco',
                                    itemId: 'transferencia_banco',
                                    fieldLabel: getLocale('Banco')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'transferencia_cbu',
                                    itemId: 'transferencia_cbu',
                                    fieldLabel: getLocale('CBU')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'transferencia_alias',
                                    itemId: 'transferencia_alias',
                                    fieldLabel: getLocale('Alias')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'transferencia_titular',
                                    itemId: 'transferencia_titular',
                                    fieldLabel: getLocale('Titular')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'transferencia_cuit_titular',
                                    itemId: 'transferencia_cuit_titular',
                                    fieldLabel: getLocale('CUIT titular')
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: getLocale('Mercado Pago'),
                            defaults: {
                                anchor: '100%',
                                labelWidth: 160
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    name: 'mercadopago_habilitado',
                                    itemId: 'mercadopago_habilitado',
                                    action: 'toggleIntegration',
                                    integrationKey: 'mercadopago',
                                    fieldLabel: getLocale('Habilitado'),
                                    inputValue: true,
                                    uncheckedValue: false
                                },
                                {
                                    xtype: 'combo',
                                    name: 'mercadopago_tipo',
                                    itemId: 'mercadopago_tipo',
                                    fieldLabel: getLocale('Tipo de enlace'),
                                    editable: false,
                                    queryMode: 'local',
                                    forceSelection: true,
                                    store: [
                                        ['link_fijo', getLocale('Link fijo')]
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'mercadopago_url',
                                    itemId: 'mercadopago_url',
                                    fieldLabel: getLocale('URL de pago')
                                },
                                {
                                    xtype: 'checkboxfield',
                                    name: 'mercadopago_mostrar_qr',
                                    itemId: 'mercadopago_mostrar_qr',
                                    fieldLabel: getLocale('Mostrar QR'),
                                    inputValue: true,
                                    uncheckedValue: false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: getLocale('Pago Fácil'),
                            defaults: {
                                anchor: '100%',
                                labelWidth: 160
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    name: 'pagofacil_habilitado',
                                    itemId: 'pagofacil_habilitado',
                                    action: 'toggleIntegration',
                                    integrationKey: 'pagofacil',
                                    fieldLabel: getLocale('Habilitado'),
                                    inputValue: true,
                                    uncheckedValue: false
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'pagofacil_codigo_entidad',
                                    itemId: 'pagofacil_codigo_entidad',
                                    fieldLabel: getLocale('Código entidad')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'pagofacil_template_codigo',
                                    itemId: 'pagofacil_template_codigo',
                                    fieldLabel: getLocale('Template código'),
                                    emptyText: '{{codigo_entidad}}{{cliente_numero}}'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: getLocale('Rapipago'),
                            defaults: {
                                anchor: '100%',
                                labelWidth: 160
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    name: 'rapipago_habilitado',
                                    itemId: 'rapipago_habilitado',
                                    action: 'toggleIntegration',
                                    integrationKey: 'rapipago',
                                    fieldLabel: getLocale('Habilitado'),
                                    inputValue: true,
                                    uncheckedValue: false
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'rapipago_codigo_entidad',
                                    itemId: 'rapipago_codigo_entidad',
                                    fieldLabel: getLocale('Código entidad')
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'rapipago_template_codigo',
                                    itemId: 'rapipago_template_codigo',
                                    fieldLabel: getLocale('Template código'),
                                    emptyText: '{{codigo_entidad}}{{cliente_numero}}'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: getLocale('Débito automático'),
                            defaults: {
                                anchor: '100%',
                                labelWidth: 160
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    name: 'debitoautomatico_habilitado',
                                    itemId: 'debitoautomatico_habilitado',
                                    action: 'toggleIntegration',
                                    integrationKey: 'debito_automatico',
                                    fieldLabel: getLocale('Habilitado'),
                                    inputValue: true,
                                    uncheckedValue: false
                                },
                                {
                                    xtype: 'textareafield',
                                    name: 'debitoautomatico_texto',
                                    itemId: 'debitoautomatico_texto',
                                    fieldLabel: getLocale('Texto informativo'),
                                    height: 60,
                                    emptyText: getLocale('El importe será debitado automáticamente de su cuenta.')
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: getLocale('Preview Factura'),
                    iconCls: 'x-fa fa-file-pdf-o',
                    action: 'previewFactura',
                    margin: '5 0 0 0',
                    width: 150
                }
            ]
        }
    ],
    
    
	initComponent : function() {
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});
} catch (e) {
    console.error('[FormView DEFINE ERROR]', e && e.message, e && e.stack);
}
