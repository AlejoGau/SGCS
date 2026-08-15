Ext.define('Common.model.PersonSearchProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.personsearchproxy',
    buildUrl : function(request) {
        var me = this, 
        operation = request.config.operation;
        url = me.getUrl(request);
        
        if (operation.store) {
            
            urlextra = url;
            if(request.config.params.sort) {
                 urlextra+="?sort="+request.config.params.sort
            }
            if(request.config.params.filter){
                urlextra+="&filter="+request.config.params.filter
            }
            operation.store.lastUrl = urlextra;
            
        }
            
        return url;
    },
})