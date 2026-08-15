Ext.define('Common.model.GeographyOrgGridProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.geographyorggridproxy',
    buildUrl: function(request){
        var url = '/Rest/Geography/';
        var action = request.config.action;
        var operation = request.config.operation;
        
        if (action != 'read' && action != 'create')
            url = url+operation.records[0].get('Id');
            
        return url;
    }
})