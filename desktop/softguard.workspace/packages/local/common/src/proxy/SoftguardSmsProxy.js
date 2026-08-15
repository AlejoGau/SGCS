Ext.define('Common.model.SoftguardSmsProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.softguardsmsproxy',
    buildUrl : function(request) {
        // console.log('buildurlmodel', request.operation);
        var me = this;
        var operation = request.config.operation;
        var records = operation.records || [];
        var record = records[0];
        var format = me.format;
        var id = record ? record.getId() : operation.ObjectId;
        var url = me.getUrl(request);
        if (request.config.operation.action == 'destroy') {
            id = request.config.operation.records[0].internalId;
            url = '/Rest/Sms/' + id;
        } else if (request.config.operation.action == 'create'){
            url = '/Rest/Sms/';
        } else {
            
            if (id === undefined){
                id = request.config.proxy.ObjectId;
            }
            
            url = url.replace(me.replaceIdRegex, id);
            if (format) {
                if (!url.match(/\.$/)) {
                    url += '.';
                }
                url += format;
            }
            request.config.url = url;
        }
        // console.log('url: ', url);
        return url;
        // return me.callParent(arguments);
    }
})