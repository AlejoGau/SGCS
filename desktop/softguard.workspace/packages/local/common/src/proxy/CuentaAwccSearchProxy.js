Ext.define('Common.model.CuentaAwccSearchProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.cuentaawccsearchproxy',

    buildUrl : function(request) {
        var me = this, 
        operation = request.config.operation || request._operation,
        params = request.config.params || request._params;
        url = me.getUrl(request);
        
        if (operation.store) {
            
            urlextra = url;
            if(params.sort) {
                 urlextra+="?sort="+params.sort
            }
            if(params.filter){
                urlextra+="&filter="+params.filter
            }
            
            if(params.fieldlist){
                urlextra+="&fieldlist="+params.fieldlist
            }
            operation.store.lastUrl = urlextra;
            
        }
            
        return url;
    }
    
});