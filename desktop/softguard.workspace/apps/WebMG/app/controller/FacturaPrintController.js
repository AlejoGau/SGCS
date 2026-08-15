Ext.define('WebMG.controller.FacturaPrintController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.TipoComprobanteStore' ],
    models : [ 'SmartMailTemplateSearchModel', 'm_comprobantes_cab_fcSearchModel', 'MoneyguardClientSearchModel', 'OrganizationModel', 'm_comprobantes_item_fcSearchModel', 't_comprobantes_fcSearchModel', 'm_clientes_fcSearchModel' ],
    views : [ 'FacturaPrintView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'facturaprintview' : {
                afterrender : this.initView
            }
            ,'facturaprintview button[action="print"]' : {
                click : this.onPrintClick
            }
    	});
        
	}, // cierro init
    
    initView: function(view){
        
        var controller = this;
        var record = view.record;
        var parentorderid = record.get('Id');
        var cliente = record.get('cbc_icliente')
        
        //view.baseurl = '/handler/FacturaPrint2Html';
        view.baseurl = '/handler/ComprobantePdfMG';

        //view.down('#Iframe').setSrc(view.baseurl+'?idComprobante='+parentorderid)
        var target = view.down('#Iframe');
        target.load({
            src: view.baseurl+'?idComprobante='+parentorderid
        });
    },

    onPrintClick: function(btn){
        var controller = this;
        var view = btn.up('facturaprintview');
        var record = view.record;
        var templateStore = Ext.create('Ext.data.Store',{
            model: this.getSmartMailTemplateSearchModelModel()
        });

        var win = Ext.widget('window',{
            title: 'Envío de correo',
            bbar: ['->',
                { 
                    xtype: 'button', 
                    text: 'Enviar',
                    iconCls : 'icon-email',
                    handler: function(){
                        Ext.Ajax.request({
                            url: '/rest/search/Mg_EnviarComprobantePorMail',
                            method : 'GET',
                            params:{
                                idComprobante:record.get('Id'),
                                idTemplate: win.down('#comboTemplate').getValue(),
                                email: win.down('#mail').getValue()
                            },
                            success: function(resp,operation) {
                                notify('El envío fue programado.');
                                win.close();
                            }
                        })
                    }
                }
            ],
            items: [
                {
                    xtype: 'combo',
                    margin: 5,
                    fieldLabel: 'Template',
                    queryMode: 'local',
                    displayField: 'Name',
                    valueField: 'Id',
                    itemId: 'comboTemplate',
                    store: templateStore
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Mail',
                    itemId: 'mail',
                    margin: 5
                }
            ],
            width: 300,
            height: 150
        }).show();

        templateStore.load();
    }
    
});