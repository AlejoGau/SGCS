Ext.define('Common.model.SoftguardTelefonoProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.softguardtelefonoproxy',
    buildUrl : function(request) {
        // console.log('buildurlmodel', request.operation);
        var me = this;
        var operation = request.config.operation?request.config.operation:request._operation;
        var records = operation.config.records || [];
        var record = records[0];
        var format = me.format;
        var id = record ? record.get('Id') : operation.config.ObjectId;
        var url = me.getUrl(request);
        if (request._action == 'destroy' || request._action == 'update') {
            //id = operation.config.records[0].internalId;
            url = '/rest/Telefono/' + id+'?_dc='+new Date().getTime();
        } else if (request._action == 'create'){
            url = '/rest/Telefono?_dc='+new Date().getTime()
        } else {
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
    },
    
})