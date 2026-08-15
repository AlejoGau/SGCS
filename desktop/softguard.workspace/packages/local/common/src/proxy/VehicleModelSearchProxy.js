Ext.define('Common.model.VehicleModelSearchProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.vehiclemodelsearchproxy',
    buildUrl : function(request) {
        var me = this;
        var operation = request.config.operation;
        var format = me.format;
        var url = me.getUrl(request);
        var id = request.config.params.query;
        switch (operation.action) {
            case 'destroy' :
                url = '/Rest/VehicleModel/';
                me.appendId = true;
                var record = operation.records[0];
                id = record.get('Id');
                break;
            case 'update' :
                url = '/Rest/VehicleModel/';
                var record = operation.records[0];
                id = record.get('Id');
                me.appendId = true;
                break;
        }
        if (me.appendId){url = url + '{0}';}
        if (id) {
            url = url.replace(me.replaceIdRegex, id);
        }
        else {
            id = 1;
        }
        if (operation.limit) {
            Ext.urlAppend(url, "limit=" + operation.limit);
        }
        if (operation.page) {
            Ext.urlAppend(url, "page=" + operation.page);
        }
        if (format) {
            if (!url.match(/\.$/)) {
                url += '.';
            }
            url += format;
        }
        //console.log(arguments,url);
        me.appendId = false;
        return url;
    }
})