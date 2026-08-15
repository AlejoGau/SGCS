Ext.define('Common.model.SVRoutesSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'svr_iid',
    fields: [
        {
            name: 'svr_iid',
            type: 'int',
            allowNull: false,
            convert: function (value) {
                if (Ext.isEmpty(value)) {
                    return 0;
                }
                if (Ext.isString(value)) {
                    var parsed = parseInt(value, 10);
                    return isNaN(parsed) ? 0 : parsed;
                }
                return value;
            },
            serialize: function (value) {
                if (Ext.isEmpty(value)) {
                    return 0;
                }
                if (Ext.isString(value)) {
                    var parsed = parseInt(value, 10);
                    return isNaN(parsed) ? 0 : parsed;
                }
                return value;
            }
        },
        {
            name: 'Id',
            type: 'int',
            mapping: 'svr_iid',
            persist: false,
            convert: function (value, rec) {
                if (!Ext.isEmpty(value)) {
                    return value;
                }
                return rec && rec.data ? rec.data.svr_iid || 0 : 0;
            }
        },
        {
            name: 'Name',
            type: 'string',
            mapping: 'svr_cName',
            persist: false,
            convert: function (value, rec) {
                if (!Ext.isEmpty(value)) {
                    return value;
                }
                return rec && rec.data ? rec.data.svr_cName || '' : '';
            }
        },
        {
            name: 'svr_cName',
            type: 'string'
        },
        {
            name: 'svr_cDescripcion',
            type: 'string'
        },
        {
            name: 'svr_cRouteType',
            type: 'string'
        },
        {
            name: 'svr_dDateStart',
            type: 'date',
            dateFormat: 'MS',
            defaultValue: null
        },
        {
            name: 'svr_iParallel',
            type: 'int',
            defaultValue: 0,
            convert: function (value) {
                if (Ext.isBoolean(value)) {
                    return value ? 1 : 0;
                }
                if (Ext.isString(value)) {
                    return value === 'true' || value === '1' ? 1 : 0;
                }
                return value ? 1 : 0;
            },
            serialize: function (value) {
                if (Ext.isBoolean(value)) {
                    return value ? 1 : 0;
                }
                if (Ext.isString(value)) {
                    return value === 'true' || value === '1' ? 1 : 0;
                }
                return value ? 1 : 0;
            }
        },
        {
            name: 'svr_iCuentaId',
            type: 'int',
            defaultValue: 0
        },
        {
            name: 'ObjectTypeId',
            type: 'int',
            defaultValue: 3301
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'SV_Routes'
        }
    ],

    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/Rest/SV_Routes/',
        appendId: true
    }
});
