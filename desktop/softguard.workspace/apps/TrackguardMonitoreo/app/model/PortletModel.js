Ext.define('TrackguardMonitoreo.model.PortletModel', {
	extend : 'Ext.data.Model',
	idProperty : 'Id',
	fields : [{
				name : 'Id',
				type : 'int'
			}, {
				name : 'Name',
				type : 'string'
			}, {
				name : 'iconCls',
				type : 'string'
			}, {
				name : 'Column',
				type : 'int'
			}, {
				name : 'Position',
				type : 'int'
			}, {
				name : 'Config',
				type : 'string'
			}, {
				name : 'View',
				type : 'string'
			}, {
				name : 'Panel',
				type : 'string'
			}, {
				name : 'PanelId',
				type : 'int'
			}],

	proxy : {
		type : 'rest',
		url : '/Rest/dashboardpanel/{0}/portlet',
		replaceIdRegex : /\{0\}/,
		appendId : true,
		buildUrl : function(request) {

			var me = this
			var action = request.operation.action;
			var records = request.operation.records || [];
			var operation = request.operation;
			var record = records[0];
			var format = me.format;
			var url = me.getUrl(request);
			//console.log('Portlet operation:', operation);
			switch (action) {
				case 'destroy' :
					id = request.operation.records[0].get('Id');
					url = '/Rest/portlet/{0}';
					break;
				case 'update' :
					id = request.operation.records[0].get('Id');
					url = '/Rest/portlet/{0}';
					break;
				case 'create' :
					id = request.operation.records[0].get('PanelId');
					break;
				default :
					id = operation.panelId;

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
			request.url = url;
			//console.log('Portlet:', url);
			return url;
			// return me.callParent(arguments);
		}
	}
});
