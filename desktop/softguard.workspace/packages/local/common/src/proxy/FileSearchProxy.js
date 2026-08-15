Ext.define('Common.model.FileSearchProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.filesearchproxy',
    buildUrl: function (action) {
        var url = '';
        var folder = '';
        var searchName = '';
        var type = '';
        
        if (action.config.operation.scope){
            searchName = action.config.operation.scope.searchName;
            type = 'Type='+action.config.operation.scope.type;
            folder = action.config.operation.scope.path?'Path='+action.config.operation.scope.path:'';
        }
        
        url = '/Rest/Search/'+searchName;
        
        if (type){
            url = Ext.urlAppend( url, type )
        }
        
        if (action.config.operation.node && action.config.operation.node.get('Name')){
            folder = 'Path='+action.config.operation.node.get('Path')+'/'+action.config.operation.node.get('Name');
        }
        
        if (folder){
            url = Ext.urlAppend( url, folder )
        }
        
        return url;
    }
});