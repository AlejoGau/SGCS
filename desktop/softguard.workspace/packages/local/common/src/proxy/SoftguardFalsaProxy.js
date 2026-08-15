Ext.define('Common.model.SoftguardFalsaProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.softguardfalsaproxy',
    buildUrl: function (request) {
        var me = this,
        operation = request.config.operation?request.config.operation:request._operation,
        records = operation.records || [],
        record = records[0],
        format = me.format,
        url = me.getUrl(request),
        id = record ? record.getId() : operation._id?operation._id:operation.id;
        if (operation.action == 'destroy') {
            id = operation.records[0].internalId;
            url = '/Rest/Falsa/' + id;
        }
        else {
            /*if (me.appendId && id) {
                url = url.replace(me.replaceIdRegex, id);
            }
            if (format) {
                if (!url.match(/\.$/)) {
                    url += '.';
                }
                url += format;
            }
            request.url = url;*/
            url = '/Rest/Falsa/' + id;
        }
        return url;
        // return me.callParent(arguments);
    }
})