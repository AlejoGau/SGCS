Ext.define('Common.model.HorarioAlternativoProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.horarioalternativoproxy',
    buildUrl : function(request) {
        var me = this;
        var operation = request.config.operation;
        var records = request.config.operation.config.records  || [];
        var record = records[0];
        var format = me.format;
        var id = record ? record.getId() : operation._id;
        var url = me.getUrl(request);
        if (request.config.operation.action == 'destroy') {
            //id = request.config.operation.records[0].internalId;
            url = '/Rest/HorarioAlternativo/' + id+'?_dc='+new Date().getTime();
        } else if (request.config.operation.action == 'create'){
            url = '/Rest/HorarioAlternativo/?_dc='+new Date().getTime();
        } else {
            /*
            url = url.replace(me.replaceIdRegex, id);
            if (format) {
                if (!url.match(/\.$/)) {
                    url += '.';
                }
                url += format;
            }
            request.config.url = url;
            */
            url = url+'/'+id+'?_dc='+new Date().getTime();
        }
        // console.log('url: ', url);
        return url;
        // return me.callParent(arguments);
    }
});