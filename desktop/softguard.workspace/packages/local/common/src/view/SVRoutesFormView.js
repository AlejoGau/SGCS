Ext.define('Common.view.SVRoutesFormView', {
    extend : 'Ext.form.Panel',
    alias  : 'widget.svroutesformview',
    bodyPadding: 10,
    border : 0,
    autoScroll: false,
    defaults: {
        anchor: '100%',
        labelAlign: 'left',
        labelWidth: 140,
        allowBlank: false
    },

    items: [
        {
            xtype: 'hiddenfield',
            name: 'svr_iid',
            allowBlank: true
        },
        {
            xtype: 'textfield',
            name: 'svr_cName',
            fieldLabel: 'Nombre',
            maxLength: 150
        },
        {
            xtype: 'textareafield',
            name: 'svr_cDescripcion',
            fieldLabel: 'Descripción del plan',
            allowBlank: true,
            grow: true,
            maxLength: 500
        },
        {
            xtype: 'hiddenfield',
            name: 'svr_cRouteType',
            fieldLabel: 'Tipo de ruta',
            allowBlank: true,
            maxLength: 50
        },
        {
            xtype: 'hiddenfield',
            name: 'svr_dDateStart',
            fieldLabel: 'Fecha de inicio',
            format: 'd/m/Y',
            submitFormat: 'c',
            allowBlank: true
        },
        {
            xtype: 'checkboxfield',
            name: 'svr_iParallel',
            fieldLabel: 'Ejecucion paralela',
            inputValue: 1,
            uncheckedValue: 0,
            allowBlank: true,
            hidden: true,
            value: 0,
            listeners: {
                beforerender: function(field) {
                    field.setValue(0);
                }
            }
        }
    ],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            iconCls: 'icon-table-save',
            text: 'Guardar',
            action: 'save',
            formBind: true
        }, '->', {
            iconCls: 'icon-delete',
            text: 'Eliminar',
            action: 'deleteRoute',
            itemId: 'deleteRouteBtn',
            hidden: true,
            disabled: true,
            tooltip: 'Eliminar plan de control'
        }]
    }],

    setRecord: function(record) {
        this.record = record;
        if (record) {
            this.getForm().loadRecord(record);
        }
        this.fireEvent('routechange', this, record);
    }
});

