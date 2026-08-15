Ext.define('Common.model.HorarioExcepcionCuentaProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.horarioexcepcioncuentaproxy',
    buildUrl : function(request) {
        var me = this;
        var operation = request.config.operation;
        var records = operation.records || [];
        var record = records[0];
        var format = me.format;
        var id = record ? record.getId() : operation.objectId;
        var url = me.getUrl(request);
        if (request.config.operation.action == 'destroy') {
            id = request.operation.records[0].internalId;
            url = '/Rest/HorarioExcepcion/' + id;
        } else if (request.config.operation.action == 'create'){
            url = '/Rest/HorarioExcepcion/?_dc='+new Date().getTime();
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
    }
});