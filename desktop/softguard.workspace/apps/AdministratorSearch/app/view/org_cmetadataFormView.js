Ext.define('AdministratorSearch.view.org_cmetadataFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.orgcmetadataformview'],
    preventHeader: true,
    activeHelp:true,
    frame: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 160,
        enforceMaxLength: true
    },
    items : [
        {
            xtype: 'fieldset',
            itemId: 'Impresión',
            title: 'Impresión',
            height: 160,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            hidden:false,
            items:[
                {
                    xtype : 'textarea',
                    name : 'informacionExtra',
                    itemId:'informacionExtra',
                    fieldLabel: 'Información extra'
                }
            ]
        },
        {
            xtype: 'fieldset',
            itemId: 'AfipCae',
            title: 'Configuración Afip',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            flex: 2,
            hidden:true,
            items:[
                {
                    xtype : 'textfield',
                    name : 'Cuit',
                    itemId:'cuit',
                    fieldLabel: 'cuit'
                },
                {
                    xtype : 'combo',
                    fieldLabel : 'Modo Debug',
                    store : 'SiNoStore',
                    displayField : 'Name',
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    value: 0,
                    valueField : 'Value',
                    name : 'debug',
                    hidden: false,
                    itemId: 'debug'
                },{
                    xtype:'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    flex:1,
                    items:[
                        {
                            xtype : 'textareafield',
                            name : 'csr',
                            itemId:'csr',
                            labelAlign: 'top',
                            fieldLabel: 'Certificado (CSR)',
                            flex:1
                        },{
                            xtype: 'button',
                            text:'Obtener CSR',
                            itemId:'btnObtenerCSR',
                            margin:'15 0 10 0',
                            handler: function(button){
                                var view = button.up('orgcmetadataformview');
                                var csr = view.down('#csr');
                                var cuit = view.down('#cuit').getValue();
                                Ext.Ajax.request({
                                    url: '/handler/CSRCerficateHandler?action=getCSR',
                                    params: {
                                        cuit: cuit
                                    },
                                    success: function(response){
                                        csr.setValue(response.responseText);
                                    }
                                });
                            }
                        }
                    ]
                },{
                    xtype:'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    flex:1,
                    items:[
                        {
                            xtype : 'textareafield',
                            name : 'x509',
                            itemId : 'x509',
                            labelAlign: 'top',
                            fieldLabel: 'Certificado (AFIP, PEM)',
                            flex:1
                        },{
                            xtype: 'button',
                            text:'Generar PFX',
                            itemId:'btnGenerarPFX',
                            margin:'15 0 10 0',
                            handler: function(button){
                                var view = button.up('orgcmetadataformview');
                                var x509 = view.down('#x509').getValue();
                                var cuit = view.down('#cuit').getValue();
                                Ext.Ajax.request({
                                    url: '/handler/CSRCerficateHandler?action=generarPFX',
                                    params: {
                                        cuit: cuit,
                                        x509: x509
                                    },
                                    success: function(response){
                                        csr.setValue(response.responseText);
                                    }
                                });
                            }
                        }
                    ]
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