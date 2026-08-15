Ext.define('Common.model.SoftguardZonaProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    
    alias: 'proxy.softguardzonaproxy',
    buildUrl: function (request) {
        //console.log(arguments);
        var me = this;
        var operation = request.config.operation?request.config.operation:request._operation;
        
        var records = operation.records?operation.records:operation._records || [];
        var record = records[0];
        var format = me.format;
        var id = record ? record.getId() : operation.ObjectId;
        
        if (id == undefined && operation.id>0){
            id = operation.id;
        }
        var url = me.getUrl(request);
;
        if(operation.action) {
            if (operation.action == 'destroy') {
                id = record.get('Id');
                url = '/Rest/Zona/' + id+'?_dc='+new Date().getTime();
            } else if (operation.action == 'create'){
                url = '/Rest/Zona/?_dc='+new Date().getTime();
            } else if (operation.action == 'load'){
                //console.log('aaaa',id);
                url = '/Rest/Zona/' + id+'?_dc='+new Date().getTime();
            } else if (operation.action == 'read'){
                //console.log('aaaa',id);
                id = request._params.id+'?_dc='+new Date().getTime();
                url = '/Rest/Zona/' + id;
            } else if (operation.action == 'update'){
                //console.log('aaaa',id);
                url = '/Rest/Zona/' + id+'?_dc='+new Date().getTime();
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
        } else {
            if (record.crudState == 'D') {
                id = operation.records[0].internalId;
                url = '/Rest/Zona/' + id;
            } else if (record.crudState == 'C'){
                url = '/Rest/Zona/';
            } else if (record.crudState == 'R'){
                //console.log('aaaa',id);
                url = '/Rest/Zona/' + id;
            } else if (record.crudState == 'U'){
                //console.log('aaaa',id);
                url = '/Rest/Zona/' + id;
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
        }
        // console.log('url: ', url);
        return url;
        // return me.callParent(arguments);
    }
});