Ext.define('Common.model.SoftguardTestProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.softguardtestproxy',
    buildUrl: function (request) {
        var me = this,
        operation = request.config.operation,
        records = operation.records || [],
        record = records[0],
        format = me.format,
        url = me.getUrl(request),
        id = record ? record.getId() : operation.id;
        if (request.config.operation.action == 'destroy') {
            id = request.config.operation.records[0].internalId;
            url = '/Rest/Test/' + id;
        }
        else {
            if (me.appendId && id) {
                url = url.replace(me.replaceIdRegex, id);
            }
            if (format) {
                if (!url.match(/\.$/)) {
                    url += '.';
                }
                url += format;
            }
            request.config.url = url;
        }
        return url;
        // return me.callParent(arguments);
    }
})    