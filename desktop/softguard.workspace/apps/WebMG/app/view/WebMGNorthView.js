Ext.define('WebMG.view.WebMGNorthView', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.moduletoolbar',
    id: 'north',
    itemId: 'north',
    border: 0,
    items: [
        {
            text : 'Contratos',
            iconCls : 'icon-page-white-text',
            closable: true,
            menu: {
                xtype: 'menu',
                //width: 310,
                items: [
                    {
                        text : 'Lista',
                        itemId:'contratorfull',
                        closable: true
                    },
                    {
                        text : 'Facturar',
                        itemId:'facturadorContrato',
                        closable: true
                    },
                    {
                        text : 'Cuentas sin contrato',
                        itemId:'cuentassincontrato',
                        closable: true
                    }
                ]
            }
        },{
            text : 'Comprobantes',
            iconCls : 'icon-page-white',
            itemId : 'comprobantes',
            closable: true
        },{
            text : 'Facturación',
            iconCls : 'icon-page-gear',
            menu: {
                xtype: 'menu',
                //width: 310,
                items: [
                    {
                        text : 'Contratos',
                        itemId:'facturadorContrato',
                        closable: true
                    },
                    {
                        text : 'Novedades',
                        itemId:'facturadorwizard',
                        closable: true
                    },
                    {
                        text : 'Exportación TXT mensual',
                        iconCls : 'icon-page-white-text',
                        itemId:'exportTxt',
                        closable: true
                    }
                ]
            }
        },{
            text : ' Cobranzas',
            iconCls : 'icon-money-add',
            menu: {
                xtype: 'menu',
                //width: 310,
                items: [
                    {
                        text : 'Generar archivos',
                        iconCls : 'icon-page-white-put',
                        itemId:'remesaExport',
                        closable: true
                    }
                ]
            }
        },{
            text : 'Productos',
            iconCls : 'icon-basket',       
            itemId:'productos',
            closable: true
        },'->',{
            text : 'Configuración',
            menu: {
                xtype: 'menu',
                width: 310,
                items: [
                    {
                        text : 'Plantillas de contrato',
                        iconCls : 'icon-page-white-code',
                        leaf : true,
                        viewConfig: '{tipo:1}',
                        view : 'contratotemplategridview',
                        itemId : 'contratotemplategridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Plantillas de Aviso',
                        iconCls : 'icon-email-edit',
                        leaf : true,
                        viewConfig: '{tipo:2}',
                        itemId : 'avisotemplategridview',
                        view : 'contratotemplategridview',
                        closable: true,
                        closeAction: 'destroy'
                    },{
                        text : 'Maestro de cuentas',
                        iconCls : 'icon-report',
                        leaf : true,
                        view : 'mg_maestrocuentasgridview',
                        itemId:'mg_maestrocuentasgridview',
                        closable: true,
                        closeAction: 'destroy'
                    }
                ]
            }             
        },{
            xtype:'displayfield',
            itemId:'nombreorganizacion'
        },{
                    xtype: 'combo',
                    editable: false,
                    queryMode: 'local',
                    fieldLabel: 'Organización',
                    lastQuery: '',
                    name:'org_organizacionId',
                    itemId:'org_organizacionId',
                    displayField : 'org_cnombre',
                    valueField : 'Id',
                    width: 350
                }
    ]
})