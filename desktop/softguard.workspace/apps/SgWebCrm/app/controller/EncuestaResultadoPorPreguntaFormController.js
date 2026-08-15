Ext.define('SGWebCrm.controller.EncuestaResultadoPorPreguntaFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'EncuestaResultadoPorPreguntaSearchModel' ],
    views : [ 'EncuestaResultadoPorPreguntaFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
            	'encuestaresultadoporpregunta' : {
					afterrender : this.initView,
				}
            });
	}, // cierro init

    initView : function(view) {
        var controller = this;

        view.store = Ext.create('Ext.data.Store',{
            model: this.getEncuestaResultadoPorPreguntaSearchModelModel(),
            pageSize: 50
        })
        view.store.proxy.extraParams = {
            epr_cuser: view.record.get('Imei'),
            enc_idkey: view.record.get('enr_encidkey'),
            epr_enridkey: view.record.get('enr_idkey')
        }
        view.store.load({ callback: function(records) {
            Ext.Array.each(records, function(record){
                view.add({
					xtype : 'displayfield',
					fieldLabel: record.get('Resultado').replace('<br>','')
				})
            })
        }});

     }

})