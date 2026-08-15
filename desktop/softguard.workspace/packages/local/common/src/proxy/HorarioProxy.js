Ext.define('Common.model.HorarioProxy', {
  extend: 'Ext.data.proxy.Rest',

  alias: 'proxy.horarioproxy',
  url: '/Rest/Cuenta/{0}/Horario',
  replaceIdRegex: /\{0\}/,
  appendId: true,
  buildUrl: function (request) {
    var me = this
    var operation = request.config.operation
    var records = request.config.operation.config.records  || []
    var record = records[0]
    var format = me.format
    var id = record ? record.getId() : operation._id
    var url = me.getUrl(request)
    if (request.config.operation.action == 'destroy') {

      url = '/Rest/Horario/' + id+'?_dc='+new Date().getTime()
    } else if (request.config.operation.action == 'create') {
      url = '/Rest/Horario/?_dc='+new Date().getTime()
    } else {

      url = url+id+'?_dc='+new Date().getTime()
    }

    return url

  }
})
