Ext.define('Common.view.SVRouteProgramFormView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.svrouteprogramformview',
    bodyPadding: 10,
    border: false,
    defaults: {
        anchor: '100%',
        labelAlign: 'left',
        labelWidth: 160
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'srp_iid'
        },
        {
            xtype: 'hiddenfield',
            name: 'srp_iRouteId'
        },
        {
            xtype: 'combo',
            name: 'srp_cProgramType',
            itemId: 'programTypeField',
            fieldLabel: 'Repetición',
            store: [
                ['1', 'Todos los días'],
                ['2', 'Lunes a viernes'],
                ['3', 'Día específico de la semana'],
                ['4', 'Día específico del mes']
            ],
            queryMode: 'local',
            forceSelection: true,
            editable: false,
            allowBlank: false
        },
        {
            xtype: 'combo',
            name: 'srp_iDayOfWeek',
            itemId: 'dayOfWeekField',
            fieldLabel: 'Día de la semana',
            hidden: true,
            store: [
                [0, 'Domingo'],
                [1, 'Lunes'],
                [2, 'Martes'],
                [3, 'Miércoles'],
                [4, 'Jueves'],
                [5, 'Viernes'],
                [6, 'Sábado']
            ],
            queryMode: 'local',
            forceSelection: true,
            editable: false
        },
        {
            xtype: 'numberfield',
            name: 'srp_iDayOfMonth',
            itemId: 'dayOfMonthField',
            fieldLabel: 'Día del mes',
            hidden: true,
            minValue: 1,
            maxValue: 31,
            allowDecimals: false
        },
        {
            xtype: 'timefield',
            itemId: 'startTimeField',
            fieldLabel: 'Horario',
            format: 'H:i',
            increment: 5,
            allowBlank: false,
            width: 220
        },
        {
            xtype: 'hiddenfield',
            name: 'srp_iStartHour',
            itemId: 'startHourField'
        },
        {
            xtype: 'hiddenfield',
            name: 'srp_iStartMinutes',
            itemId: 'startMinutesField'
        }
    ],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            iconCls: 'icon-table-save',
            text: 'Guardar',
            action: 'save'
        }]
    }],

    setRecord: function(record) {
        this.record = record;
        if (record) {
            this.getForm().loadRecord(record);
            this.fireEvent('recordloaded', this, record);
        }
    }
});
