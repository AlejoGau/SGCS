// SofIA Route Program model
Ext.define('Common.model.SVRouteProgramModel', {
    extend: 'Ext.data.Model',
    idProperty: 'srp_iid',

    fields: [
        {
            name: 'srp_iid',
            type: 'int',
            allowNull: true,
            convert: function(value) {
                if (value === undefined || value === null) { return value; }
                if (value === '') { return 0; }
                if (Ext.isString(value)) {
                    var intVal = parseInt(value, 10);
                    return isNaN(intVal) ? 0 : intVal;
                }
                return value;
            }
        },
        {
            name: 'srp_iRouteId',
            type: 'int',
            defaultValue: 0,
            convert: function(value) {
                return Ext.Number.from(value, 0);
            }
        },
        { name: 'srp_cProgramType', type: 'string', defaultValue: '' },
        {
            name: 'srp_iStartHour',
            type: 'int',
            defaultValue: 0,
            convert: function(value) {
                return Ext.Number.from(value, 0);
            }
        },
        {
            name: 'srp_iStartMinutes',
            type: 'int',
            defaultValue: 0,
            convert: function(value) {
                return Ext.Number.from(value, 0);
            }
        },
        {
            name: 'srp_iDayOfWeek',
            type: 'int',
            defaultValue: 0,
            convert: function(value) {
                return Ext.Number.from(value, 0);
            }
        },
        {
            name: 'srp_iDayOfMonth',
            type: 'int',
            defaultValue: 0,
            convert: function(value) {
                return Ext.Number.from(value, 0);
            }
        },
        { name: 'Summary', type: 'string', defaultValue: '' }
    ],

    proxy: {
        type: 'rest',
        url: '/Rest/SV_Route_Programs/',
        appendId: true,
        writer: {
            type: 'json',
            writeAllFields: true,
            allowSingle: true
        }
    }
});

