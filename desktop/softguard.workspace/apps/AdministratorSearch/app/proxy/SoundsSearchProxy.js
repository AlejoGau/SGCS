Ext.define('Common.model.SoundsSearchProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.soundssearchproxy',
    buildUrl: function (action) {
        var url = '';
        var folder = '';
        var searchName = '';
        var type = '';
        
        if (action.operation.scope){
            searchName = action.operation.scope.searchName;
            type = 'Type='+action.operation.scope.type;
            folder = action.operation.scope.path?'Path='+action.operation.scope.path:'';
        }
        
        url = '/Rest/Search/'+searchName;
        
        if (type){
            url = Ext.urlAppend( url, type )
        }
        
        if (action.operation.node && action.operation.node.get('Name')){
            folder = 'Path='+action.operation.node.get('Path')+'/'+action.operation.node.get('Name');
        }
        
        if (folder){
            url = Ext.urlAppend( url, folder )
        }
        

        return url;
    }
})