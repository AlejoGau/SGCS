Ext.define('Common.model.VehicleSearchProxy', {
  extend: 'Ext.data.proxy.Rest',

  alias: 'proxy.vehiclesearchproxy',
  buildUrl: function (request) {
    var me = this,
      operation = request.config.operation
    url = me.getUrl(request)

    urlextra = url
    if (request.config.params.sort) {
      urlextra += '?sort=' + request.config.params.sort
    }
    if (request.config.params.filter) {
      urlextra += '&filter=' + request.config.params.filter
    }
    if (operation.config.store) {
      operation.store.lastUrl = urlextra
    }

    return url
  }
})
