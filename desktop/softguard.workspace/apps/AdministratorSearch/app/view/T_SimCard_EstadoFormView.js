Ext.define( 'AdministratorSearch.view.T_SimCard_EstadoFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.t_simcard_estadoformview' ],
    preventHeader: true,
    frame: true,
    border: 0,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 100,
        enforceMaxLength: true
    },
    items: [
        {
            xtype: 'textfield',
            name: 'tse_cDescripcion',
            fieldLabel: 'Descripcion',
            allowBlank: false,
            maxLength: 150,
            anchor: '100%'
        }
    ],

    initComponent: function() {
        
        this.callParent();

        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
        });
        this.addDocked( toolbar );
    } // cierro init
});