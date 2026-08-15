Ext.define('Common.model.UiApplicationProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.uiapplicationproxy',
    buildUrl: function (request) {
        var me        = this;
        var operation = request.operation,
            records   = operation.records || [],
            action    = operation.action,
            record    = records[0];
        var id        = record ? record.getId() : operation.id;

        var restPath = (myQueryString.restPath != undefined) ? myQueryString.restPath : 'Rest';
        
        if (action == 'create'){
            var url = '/' + restPath + '/Uiapplication/';
        } else {
            var url = '/' + restPath + '/Uiapplication/' + id;
        }
        
        
        return url
    }  
})