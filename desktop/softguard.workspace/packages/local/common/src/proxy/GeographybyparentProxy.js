Ext.define('Common.model.GeographybyparentProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.geographybyparentproxy',
    buildUrl: function(request) {
        var me        = this,
            operation = request.config.operation,
            records   = operation.records || [],
            record    = records[0],
            format    = me.format,
            url       = me.getUrl(request),
            id        = record ? record.getId() : operation.id;

        if (me.appendId && me.isValidId(id)) {
            if (!url.match(/\/$/)) {
                url += '/';
            }

            url += id;
        }

        if (format) {
            if (!url.match(/\.$/)) {
                url += '.';
            }

            url += format;
        }
        var char = /\?/.test(url) ? "&" : "?";

        request.config.url = url + char + "limit=9999";

        return request.config.url;
    }
})