Ext.define('Common.model.EventImagesSearchProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.eventimagessearchproxy',
    buildUrl: function (action) {
        var url = '';
        var rec_iid = action.config.operation.rec_iid ? action.config.operation.rec_iid:action.config.operation.node.get('rec_iid');
        
        if (action.config.operation.rec_iid == 0)
        {
            console.log('sin rec_iid:',action.config.operation);
            return false;
        }
        else{
            var restPath = (myQueryString.restPath != undefined) ? myQueryString.restPath : 'Rest';
            url = '/' + restPath + '/search/TimelineQ4?IdEvento=' + rec_iid;
        }
        return url;
    }
});