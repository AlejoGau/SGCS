Ext.define('Common.model.EventObservacionesSearchProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.eventobservacionessearchproxy',
    buildUrl: function (action) {
        var url = '';
        var operation = action.config.operation ? action.config.operation : action._operation;
        var rec_iid = operation.rec_iid ? operation.rec_iid:operation.node.get('rec_iid');
        
        if (operation.rec_iid == 0)
        {
            console.log('sin rec_iid:',operation);
            return false;
        }
        else{
            var restPath = (myQueryString.restPath != undefined) ? myQueryString.restPath : 'Rest';
            url = '/' + restPath + '/search/TimelineQ6?IdEvento=' + rec_iid;
        }
        return url;
    }
});