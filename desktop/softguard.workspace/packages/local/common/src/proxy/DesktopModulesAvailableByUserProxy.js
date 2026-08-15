Ext.define('Common.model.DesktopModulesAvailableByUserProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.desktopmodulesavailablebyuserproxy',
    buildUrl: function (request) {
        var operation = request.config.operation;
        var id = operation.ObjectId;
        request.config.url = '/Rest/Search/DesktopModulesAvailableByUser?Id='+id;
        return request.config.url;
    }
})