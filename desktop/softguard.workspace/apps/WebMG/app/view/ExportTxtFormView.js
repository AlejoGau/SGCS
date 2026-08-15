Ext.define('WebMG.view.ExportTxtFormView', {
    extend: 'Ext.form.Panel',
    alias: ['widget.exporttxtformview'],
    title: '',
    frame: false,
    bodyPadding: 5,
    fieldDefaults: {
        labelWidth: 150,
        labelAlign: 'left',
        editable: false,
        anchor: '100%'
    },
    items: [
        {
            xtype: 'combo',
            name: 'orgId',
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Empresa Facturadora',
            lastQuery: '',
            itemId: 'organizacionfacturadora',
            displayField: 'org_cnombre',
            valueField: 'Id',
            labelWidth: 150,
            allowBlank: false
        },
        {
            xtype: 'datefield',
            name: 'periodo',
            itemId: 'periodo',
            fieldLabel: 'Período',
            format: 'm/Y',
            submitFormat: 'm/Y',
            allowBlank: false
        },
        {
            xtype: 'combo',
            name: 'tipoCbte',
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Tipo de comprobante',
            lastQuery: '',
            itemId: 'tipocomprobante',
            displayField: '_cbt_cdescripcion',
            valueField: 'cbt_ccodigo',
            emptyText: 'Todos',
            allowBlank: true,
            disabled: true
        },
        {
            xtype: 'combo',
            name: 'catIva',
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Categoría impositiva',
            lastQuery: '',
            itemId: 'categoriaiva',
            displayField: 'cat_cdescripcion',
            valueField: 'cat_ccodigo',
            emptyText: 'Todas',
            allowBlank: true,
            disabled: true
        },
        {
            xtype: 'displayfield',
            value: 'Genera un archivo TXT mensual con encabezado, detalle y totales para importar en sistemas contables.'
        }
    ],

    initComponent: function() {
        this.callParent();

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-page-white-put',
                    text: 'Exportar TXT',
                    scope: this,
                    action: 'export',
                    itemId: 'export',
                    disabled: true
                }
            ]
        });
        this.addDocked(toolbar);
    }
});
