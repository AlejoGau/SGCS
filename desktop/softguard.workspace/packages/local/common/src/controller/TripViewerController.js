//MIGRADO2024
Ext.define('Common.controller.TripViewerController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [  ],
    init : function(config) {
		this.control({
            'tripviewerview': {
                afterrender: this.initview
            }
        })
    },
    initview : function(view) {
        var controller = this;
        /** Obtengo los datos de la cuenta abierta (solapa) */
        var caller = view.caller
        var record = view.record;
        /** Obtengo el cue_iid de la cuenta abierta (solapa), para filtrar los responsables */
        var cue_iid = record.get('tgv_cueiid');
        var triproview = view.down('triproview');
        triproview.record = record;
        triproview.loadRecord(record);
    }
})