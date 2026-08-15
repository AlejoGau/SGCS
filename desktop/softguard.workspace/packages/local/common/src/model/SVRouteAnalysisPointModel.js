Ext.define('Common.model.SVRouteAnalysisPointModel', {
    extend: 'Ext.data.Model',
    idProperty: 'sra_iid',
    fields: [
        {
            name: 'sra_iid',
            type: 'int',
            defaultValue: 0,
            persist: false,
            convert: function(value) {
                if (Ext.isEmpty(value)) { return 0; }
                if (Ext.isString(value)) {
                    var parsed = parseInt(value, 10);
                    return isNaN(parsed) ? 0 : parsed;
                }
                return value;
            }
        },
        {
            name: 'sra_iRouteId',
            type: 'int',
            defaultValue: 0,
            convert: function(value) {
                if (Ext.isEmpty(value)) { return 0; }
                if (Ext.isString(value)) {
                    var parsed = parseInt(value, 10);
                    return isNaN(parsed) ? 0 : parsed;
                }
                return value;
            }
        },
        {
            name: 'sra_iAnalysisPointId',
            type: 'int',
            defaultValue: 0,
            convert: function(value) {
                if (Ext.isEmpty(value)) { return 0; }
                if (Ext.isString(value)) {
                    var parsed = parseInt(value, 10);
                    return isNaN(parsed) ? 0 : parsed;
                }
                return value;
            }
        },
        {
            name: 'sra_iOrder',
            type: 'int',
            defaultValue: 0,
            convert: function(value) {
                if (Ext.isEmpty(value)) { return 0; }
                if (Ext.isString(value)) {
                    var parsed = parseInt(value, 10);
                    return isNaN(parsed) ? 0 : parsed;
                }
                return value;
            }
        },
        {
            name: 'sra_cReference',
            type: 'string',
            defaultValue: '',
            convert: function(value) {
                if (Ext.isEmpty(value)) {
                    return '';
                }
                return Ext.String.trim(value);
            },
            serialize: function(value) {
                if (Ext.isEmpty(value)) {
                    return '';
                }
                return Ext.String.trim(value);
            }
        },
        {
            name: 'Name',
            type: 'string',
            defaultValue: '',
            convert: function(value, rec) {
                var resolved = value;
                if (Ext.isEmpty(resolved)) {
                    var data = rec && rec.data ? rec.data : rec;
                    var ref = data ? data.sra_cReference : '';
                    resolved = Ext.isEmpty(ref) ? '' : ref;
                }
                return Ext.isEmpty(resolved) ? '' : Ext.String.trim(resolved);
            },
            serialize: function(value, rec) {
                var resolved = value;
                if (Ext.isEmpty(resolved)) {
                    var source = rec && rec.data ? rec.data : rec;
                    var refValue = source ? source.sra_cReference : '';
                    resolved = Ext.isEmpty(refValue) ? '' : refValue;
                }
                return Ext.isEmpty(resolved) ? '' : Ext.String.trim(resolved);
            }
        },
        { name: 'sra_cCameraType', type: 'string', defaultValue: '' },
        {
            name: 'sra_iCameraRefId',
            type: 'int',
            defaultValue: 0,
            convert: function(value) {
                if (Ext.isEmpty(value)) { return 0; }
                if (Ext.isString(value)) {
                    var parsed = parseInt(value, 10);
                    return isNaN(parsed) ? 0 : parsed;
                }
                return value;
            }
        },
        { name: 'sra_cConfig', type: 'string', defaultValue: '' }
    ],

    proxy: {
        type: 'rest',
        url: '/Rest/SV_Route_AnalysisPoints/',
        appendId: true,
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
