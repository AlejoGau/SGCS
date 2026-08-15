Ext.define('TrackguardMonitoreo.controller.TrackguardMonitoreoPortletController', {
	extend : 'Ext.app.Controller',
	stores : [  ],
	models : [  ],
	views : [ 'TrackguardMonitoreoPortletView' ],

	refs : [{
				ref : 'myPanel',
				selector : 'slbfstat'
			}],

	init : function(config) {
		// genero los eventos
		this.control({
					'trackguardmonitoreoportleview' : {
						//beforerender : this.initView,
						afterrender : this.initCard
					}

				})
	}, // cierro init

	initView : function(panel) {
		var myportlet = panel.up('portlet');
		var record = myportlet.record;
		var myConfig = Ext.JSON.decode(record.get('Config'));
		var mygraph = panel.down('chart');
		if (myConfig.Title) {
			myportlet.setTitle(myConfig.Title);
		};

		// mygraph.axes.items[0].title= myConfig.Metric1
		/*var mystore = Ext.create('TrackguardMonitoreo'+'.store.SlbfInlineStore');
		mystore.load({
					scope : this,
					panel : panel,
					chart : mygraph,
					config : myConfig,
					callback : function(record, operation) {
						if (record) {
							var c = operation.chart;
							c.bindStore(record[0].store);
							c.url = operation.request.url; //Para el botón preview y export
						}
					}
				});*/

		/*
		 * var myConfig
		 * =Ext.JSON.decode(panel.previousNode().record.get('Config'));
		 * panel.items.items[0].store =
		 * Ext.create('Dashboard.store.SlbfStatStore');
		 * panel.items.items[0].store.load({scope: this, config:
		 * myConfig});
		 */
	},

	initCard : function(panel) {
		panel.getLayout().setActiveItem(0);
	}
});
