Ext.define('WebMG.controller.CuentaCorrientePanelController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'CuentaCorrientePanelView' ],

    init : function(config) {
        // genero los eventos
    	this.control(
            {
			'cuentacorrientepanelview' : {
				afterrender : this.initView,
                refresh: this.onRefresh
			},
            'cuentacorrientepanelview #nuevopago' : {
                click: this.onNuevoPagoClick
            }
		});
	},
    
    
    onRefresh: function (view) {
        if (view.down('mgcomprobantesgridview')){
            view.down('mgcomprobantesgridview').fireEvent('refresh', view.down('mgcomprobantesgridview'))
        }
        if (view.down('comprobantesdepagogridview')){
            view.down('comprobantesdepagogridview').fireEvent('refresh', view.down('comprobantesdepagogridview'))
        }
    },
    
    
    onNuevoPagoClick: function (btn) {
        var view = btn.up('cuentacorrientepanelview')
        var myWindow = Ext.widget('window',{
            title: getLocale('Realizar pago'),
            height: 500,
            width: 1000,
            modal: true, 
            items: [{
                xtype:'pagoformview',
                record: view.record,
                caller: view
            }],
            layout: 'fit'
        }).show();
    },
    
    
	initView : function(view) {
        
        /*    var store =Ext.create('Ext.data.Store',{
                model: this.getOrganizationSearchModelModel(),
                pageSize: 50,
                filters: [{
                    property:'Id',
                    value: record.get('Id')
                }],
                remoteSort: true,
                remoteFilter: true,
            }).load({callback:function (records) {*/
                
                view.down('tabpanel').add(
                    
                    {
                        xtype: 'mg_movimientoscuentasgridview',
                        title:'Cuenta Corriente',
                        closable: false,
                        hideToolbar: true,
                        filters: [{ property: 'mgmc_ctipo',value: 'C'}],
                        record:view.record,
                        recordOrganizacion : view.record.recordOrganizacion
                    }
                    // esto ya esta en Comprobantes
                    // en el futuro agragar tab con grafico por ejemplo.
                    /*,
                    {
                        xtype: 'mgcomprobantesgridview',
                        title:'Facturas',
                        closable: false,
                        hideToolbar: true,
                        record:view.record,
                        recordOrganizacion : view.record.recordOrganizacion
                    },{
                        xtype: 'comprobantesdepagogridview',
                        title: 'Recibos',
                        filters: [{
                            property:'cbc_cestado',
                            value:1
                        },{
                            property:'cbt_ntipo',
                            value:7
                        }],
                        editorView: 'facturaprintview',
                        hideNew: true,
                        hideGroup: true,
                        record:view.record,
                        recordOrganizacion : view.record.recordOrganizacion
                    }*/)
            
           /* }})*/
        
	},
     


});