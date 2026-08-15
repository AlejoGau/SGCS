Ext.define('Common.model.EstadoItemProxy', {
    extend: 'Ext.data.proxy.Rest',
  
    alias: 'proxy.estadoitemproxy',
    buildUrl: function( request ) {
        var me = this;
        var operation = request.config.operation ? request.config.operation : request._operation;
        var records = operation.records || [];
        var record = records[ 0 ];
        var format = me.format;
        var id = record ? record.getId() : operation.ObjectId;
        var url = me.getUrl( request );
        if( operation.action == 'destroy' ) {
            id = operation.records[ 0 ].get( 'Id' );
            url = '/Rest/EstadoItem/' + id;
        } else if( operation.action == 'create' ) {
            url = '/Rest/EstadoItem/';
        } else {
            url = url.replace( me.replaceIdRegex, id );
            if( format ) {
                if( !url.match( /\.$/ ) ) {
                    url += '.';
                }
                url += format;
            }
            request.config.url = url;
        }
        // console.log('url: ', url);
        return url;
        // return me.callParent(arguments);
    }
});