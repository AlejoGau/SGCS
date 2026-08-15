Ext.define('Common.model.HorarioToleranciaProxy', {
  extend: 'Ext.data.proxy.Rest',

  alias: 'proxy.horariotoleranciaproxy',
  url: '/Rest/Cuenta/{0}/HorarioTolerancia',
  replaceIdRegex: /\{0\}/,
  appendId: true,
  buildUrl: function (request) {
    var me = this
    var operation = request.config.operation
    var records = request.config.operation.config.records || []
    var record = records[0]
    var format = me.format
    var id = record ? record.getId() : operation._id
    var url = me.getUrl(request)
    if (request.config.operation.action == 'destroy') {
      //id = request.operation.records[0].internalId 
      url = '/Rest/HorarioTolerancia/' + id+'?_dc='+new Date().getTime()
    } else if (request.config.operation.action == 'create') {
      url = '/Rest/HorarioTolerancia/?_dc='+new Date().getTime();
    }else if(request.config.operation.action == 'update'){
      url = url+id+'?_dc='+new Date().getTime();
    } else {
      /*url = url.replace(me.replaceIdRegex, id)
      if (format) {
        if (!url.match(/\.$/)) {
          url += '.'
        }
        url += format
      }*/
      url = url+id+'?_dc='+new Date().getTime()
    }
    return url
    // return me.callParent(arguments);
  }
})
