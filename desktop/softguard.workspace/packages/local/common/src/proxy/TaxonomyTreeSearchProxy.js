Ext.define('Common.model.TaxonomyTreeSearchProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.taxonomytreesearchproxy',
    buildUrl: function (action) {
        var url = '';
        var objectId = (action.operation.scope && action.operation.scope.ObjectId) ? action.operation.scope.ObjectId:action.operation.node.get('ObjectId');
        var ObjectTypeName = (action.operation.scope && action.operation.scope.ObjectTypeName) ?  action.operation.scope.ObjectTypeName : action.operation.node.get('ObjectTypeName');
        url = '/Rest/'+ObjectTypeName+'/'+ objectId + '/taxonomies';
        return url;
    }
})