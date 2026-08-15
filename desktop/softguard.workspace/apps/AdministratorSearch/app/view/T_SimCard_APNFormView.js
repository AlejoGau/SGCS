Ext.define( 'AdministratorSearch.view.T_SimCard_APNFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.t_simcard_apnformview' ],
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
            name: 'tsa_cDescripcion',
            fieldLabel: 'Descripcion',
            allowBlank: false,
            maxLength: 150,
            anchor: '100%'
        }, {
            xtype: 'textfield',
            name: 'tsa_cURL',
            fieldLabel: 'URL',
            allowBlank: false,
            maxLength: 200,
            anchor: '100%'
        }, {
            xtype: 'textfield',
            name: 'tsa_cUser',
            fieldLabel: 'User',
            allowBlank: false,
            maxLength: 100,
            anchor: '100%'
        }, {
            xtype: 'textfield',
            name: 'tnd_cPassword',
            fieldLabel: 'Password',
            allowBlank: false,
            maxLength: 100,
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