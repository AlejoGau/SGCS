Ext.define('Common.model.SoftguardNotaProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.softguardnotaproxy',
    buildUrl : function(request) {
        var me = this;
        var operation = request.config.operation;
        var records = operation.records || [];
        var record = records[0];
        var format = me.format;
        var id = record ? record.getId() : operation.id;
        var url = me.getUrl(request);
        if (request.config.operation.action == 'destroy') {
            id = request.config.operation.records[0].internalId;
            url = '/Rest/Nota/' + id;
        } else if (request.config.operation.action == 'create'){
            url = '/Rest/Nota/';
        } else {
            url = url.replace(me.replaceIdRegex, id);
            if (format) {
                if (!url.match(/\.$/)) {
                    url += '.';
                }
                url += format;
            }
        }
        return url;
        // return me.callParent(arguments);
    }
})
