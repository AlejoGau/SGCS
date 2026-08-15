Ext.define( 'WebMG.view.RemesaExportFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.remesaexportformview' ],
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
            name: 'cli_iorganizacion',
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Empresa Facturadora',
            lastQuery: '',
            itemId: 'organizacionfacturadora',
            displayField: 'org_cnombre',
            valueField: 'Id',
            labelWidth: 150
        }, {
            xtype: 'combo',
            name: 'cli_ccondicionpago',
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Condicion de pago',
            lastQuery: '',
            //name:'',
            itemId: 'condicionpago',
            displayField: '_con_cdescripcion',
            valueField: 'con_ccodigo'
        }
    ],

    initComponent: function() {
        this.callParent();

        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-page-white-put',
                    text: 'Exportar',
                    scope: this,
                    action: 'export',
                    itemId: 'export',
                    disabled: true
                }
            ]
        });
        this.addDocked( toolbar );
    }
});