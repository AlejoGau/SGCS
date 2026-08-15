//MIGRADO2024
Ext.define('Common.controller.MapguardCuentaController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'MapguardCuentaView' ],
    init: function (config) {
        var me = this;
        // genero los eventos
        this.control({
            'mapguardcuentaview':{
               beforerender : this.initview,
                setrecord: this.initview
            }
        });
    },
    initview : function(view) {
        
        if (view.record){
            view.loadRecord(view.record);
            if(!view.record.get('cod_cdescripcion')) {
                view.down('#alarma').hide();
            }
        } else {
            notifyError('Operación no soportada');
        }
	}
    
});