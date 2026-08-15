Ext.define('AdministratorSearch.controller.FormatosController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'FormatosSearchModel', 'FormatosModel', 'TablasCodigosAlarmaSearchModel' ],
    views : [ 'FormatosView' ],

    init : function(config) {
		// genero los eventos

		this.control({
					'formatosview' : {
						beforerender : this.initview
					}
                });
	}, // cierro init

	initview : function(view) {
        if (!view.record){
            var model = this.getFormatosModelModel();
            view.record= Ext.create(model,{

            })
        }
        
        
        var combostore =Ext.create('Ext.data.Store',{
            model: this.getTablasCodigosAlarmaSearchModelModel(),
            pageSize: 1000,
            remoteSort: false,
            remoteFilter: false,
            filters: [{
                property: 'cod_ccodigo', value:view.record.get('for_calarma')
            }]
        })
        combostore.load({callback:function (records) {
            view.down('#alarma').setValue(records[0].get('cod_ccodigo')+" - "+records[0].get('cod_cdescripcion'))
        }});

        view.loadRecord(view.record);
	}
});