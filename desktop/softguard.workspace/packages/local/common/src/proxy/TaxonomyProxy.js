Ext.define('Common.model.TaxonomyProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.taxonomyproxy',
    buildUrl: function(request){
        var url = '/Rest/Taxonomy/';
        var action = request.config.action;
        var operation = request.config.operation;
        
        if (action != 'read' && action != 'create')
            url = url+operation.records[0].get('Id');
            
        return url;
    }
})