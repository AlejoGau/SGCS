Ext.define('Common.model.RelationSearchProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.relationsearchproxy',

    buildUrl: function (action) {
        var url = '';
        
        if (action.config.operation.ObjectId == 0)
        {
            console.log('sin objectID:',action.config.operation);
            return false;
        }
        else{
            var objectId = action.config.operation.ObjectId ? action.config.operation.ObjectId:action.config.operation.node.get('ObjectId');
            var ObjectTypeName = action.config.operation.ObjectTypeName ?  action.config.operation.ObjectTypeName : action.config.operation.node.get('ObjectTypeName');
            var restPath = (myQueryString.restPath != undefined) ? myQueryString.restPath : 'Rest';
            url = '/' + restPath + '/' +ObjectTypeName+'/'+ objectId + '/relations';
        }
        return url;
    }

});