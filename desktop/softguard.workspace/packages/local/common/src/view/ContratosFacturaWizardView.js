Ext.define( 'Common.view.ContratosFacturaWizardView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.contratosfacturawizardview' ],
    title: '',
    border: 0,
    layout: 'vbox',
    items: [
        {
            xtype: 'combo',
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Empresa Facturadora',
            lastQuery: '',
            itemId: 'organizacionfacturadora',
            multiSelect: false,
            displayField: 'org_cnombre',
            valueField: 'Id',
            labelWidth: 150,
            width: '100%',
            allowBlank: true,
            plugins: [ 'clearbutton' ]
        }, {
            xtype: 'fieldset',
            title: 'Envio',
            items: [ , {
                xtype: 'checkboxfield',
                fieldLabel: 'Enviar por mail',
                itemId: 'enviarpormail',
                //hidden:true
            }, {
                    xtype: 'combo',
                    fieldLabel: 'Template',
                    queryMode: 'local',
                    displayField: 'Name',
                    valueField: 'Id',
                    itemId: 'comboTemplate',
                    hidden: true
                }
            ]
        }, {
            xtype: 'fieldset',
            itemId: 'fsResultados',
            title: 'Resultados - (Se facturo)',
            width: '100%',
            hidden: true,
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Total de contratos a facturar',
                    itemId: 'totalContratos',
                    value: '10',
                     labelWidth: '100%',

                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Total de facturas generadas',
                    itemId: 'totalFacturas',
                    value: '10',
                     labelWidth: '100%',

                }
            ]
        }
    ],
    bbar: [

        '->', // greedy spacer so that the buttons are aligned to each side
        {
            itemId: 'facturar',
            text: 'Facturar'
        }
    ],

    initComponent: function() {
        this.callParent();
    }
});