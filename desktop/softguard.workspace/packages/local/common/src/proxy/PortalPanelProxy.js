Ext.define('Common.model.PortalPanelProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.portalpanelproxy',
    buildUrl : function(request) {
        var me = this;
        var operation = request.config.operation;
        //var app = operation.scope;
        var action = request.config.operation.action;
        var records = operation.records || [];
        var record = records[0];
        var format = me.format;
        var url = me.getUrl(request);
        var id = 0;
        

        switch (action) {
            case 'destroy' :
                id = record.get('Id');
                url = '/Rest/dashboardpanel/{0}';
                break;
            case 'update' :
                id = record.get('Id');
                url = '/Rest/dashboardpanel/{0}';
                break;
            case 'create' :
                id = operation.objectId;
                break;
            case 'read' :
                id = operation.objectId;

        }
        
        if (me.appendId && id) {
            url = url.replace(me.replaceIdRegex, id);
        }

        if (format) {
            if (!url.match(/\.$/)) {
                url += '.';
            }

            url += format;
        }
        request.config.url = url;
        //console.log('portalPanelModel:',url, this,record, operation);
        return url;
        // return me.callParent(arguments);
    }
});