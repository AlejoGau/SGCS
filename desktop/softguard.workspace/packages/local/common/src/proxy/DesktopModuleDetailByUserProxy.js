Ext.define('Common.model.DesktopModuleDetailByUserProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.desktopmoduledetailbyuserproxy',
    buildUrl: function (request) {
        var operation = request.config.operation;
        var id = operation.ObjectId;
        var _module = operation.Module;
        var url = '/Rest/Search/DesktopModuleDetailByUser';
        if (id){url = Ext.urlAppend(url,'Id='+id);}
        if (_module){url = Ext.urlAppend(url,'Module='+_module);}
        
        return url;
    }
});