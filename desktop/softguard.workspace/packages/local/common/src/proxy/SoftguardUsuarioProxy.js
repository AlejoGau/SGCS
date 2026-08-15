Ext.define('Common.model.SoftguardUsuarioProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.softguardusuarioproxy',
    url: '/Rest/Cuenta/{0}/Usuario',
    replaceIdRegex: /\{0\}/,
    appendId: true,
    buildUrl: function (request) {
        var me = this,
        operation = request.config.operation?request.config.operation:request._operation,
        app = operation.scope,
        records = operation.config.records || [],
        record = records[0],
        format = me.format,
        url = me.getUrl(request),
        id = record ? record.getId() : operation.config.ObjectId;
        if (request._action == 'destroy' || request._action == 'update') {
            //id = operation.config.records[0].internalId;
            url = '/Rest/Usuario/' + id+'?_dc='+new Date().getTime();
        } else if (request._action == 'create'){
            url = '/Rest/Usuario/'+'?_dc='+new Date().getTime();
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
});