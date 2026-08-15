Ext.define('Common.model.CuentaSearchProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.cuentasearchproxy',
    buildUrl: function( request ) {
        var me = this,
            operation = request.config.operation || request._operation,
            params = request.config.params || request._params;
        url = me.getUrl( request );
        if( operation.store ) {
            urlextra = url;
            if( params.sort ) {
                urlextra += "?sort=" + params.sort
            }
            if( params.filter ) {
                console.log( params.filter )
                urlextra += "&filter=" + params.filter
            }
            if( params.fieldlist ) {
                urlextra += "&fieldlist=" + params.fieldlist
            }
            operation.store.lastUrl = urlextra;
        }
        return url;
    }
});
