Ext.define('Common.model.TaxonomyMasterTreeProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.taxonomymastertreeproxy',
    buildUrl: function (action) {
        var url = '';
        var objectId = (action.config.operation.scope && action.config.operation.scope.ObjectId) ? action.config.operation.scope.ObjectId:action.config.operation.node.get('id');
        var ObjectTypeName = (action.config.operation.scope && action.config.operation.scope.ObjectTypeName) ?  action.config.operation.scope.ObjectTypeName : action.config.operation.node.get('ObjectTypeName');
        url = '/rest/taxonomy/?_dc=' + new Date().getTime() + '&Parent=' + objectId;
        return url;
    }
})
