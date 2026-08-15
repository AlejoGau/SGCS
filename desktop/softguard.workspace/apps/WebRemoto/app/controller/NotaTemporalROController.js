Ext.define('WebRemoto.controller.NotaTemporalROController', {
    extend: 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SoftguardNotaModel', 'NotaSearchModel' ],
    views : [ 'NotaTemporalROView' ],

	init : function(config) {
		// genero los eventos

		this.control({
				
					'notatemporalroview' : {
						beforerender : this.initview
					}
				});

	}, // cierro init

	initview : function(view) {
        var cuenta = view.record;
        view.cuenta = cuenta;
        var module = view.module;
        var profile = module.get('profile');
        view.profile = profile;
        var controller = this;
        
        if (profile < 2){
            view.down('toolbar').hide();
        }
        
        var objectId = cuenta.get('cue_iid');
        
        
		/*this.getSoftguardNotaModelModel().load(objectId, {
            view: view,
            scope: this,
			success : function(record,operation) {
                var controller = operation.scope;
                var view = operation.view;
                
                if (!record){
                     record = this.createRecord(operation.view);
                };
                
                view.nota=record;
                this.setRecord(view);
			},
			failure : function() {
				console.log('error:', arguments);
			}// cierro function
		}); // cierro load
        */
        
        
        view.record.loadNotaTemporal(function (record) {
            if (!record){
                 record = controller.createRecord(operation.view);
            };
            
            view.nota=record;
            controller.setRecord(view);
        })
	},
    
    createRecord: function(view){
        var model = this.getSoftguardNotaModelModel();
        var cuenta = view.cuenta;
        var desde = new Date();
        var hasta = Ext.Date.add(desde, Ext.Date.MONTH, 1);

        var record = model.create({
            not_iidcuenta: cuenta.get('Id'),
            not_dtemporaldesde: desde,
            not_dtemporalhasta: hasta,
        });
        
        return record;
    },
    
    setRecord: function(view){
        var record = view.nota;
        var form = view.getForm();
        //var desdeTime = view.down('#desdeTime');
        //var hastaTime = view.down('#hastaTime');
        
        
        
		if (!record.get('not_dtemporaldesde') || record.get('not_dtemporaldesde').getFullYear()< 1900 ){
			var desde = new Date();
			var hasta = new Date();

			record.set('not_dtemporaldesde', desde);
			record.set('not_dtemporalhasta', hasta);
		}
        
        
        //desdeTime.setValue(record.get('not_dtemporaldesde'));
        //hastaTime.setValue(record.get('not_dtemporalhasta'));
        
        if (record.get('not_mnotatemporal') == ''){
            var fdesde = form.findField('not_dtemporaldesde');
            var fhasta = form.findField('not_dtemporalhasta');
            
            fdesde.disable();
            fhasta.disable();
            //desdeTime.disable();
            //hastaTime.disable();
        }
    
        view.loadRecord(record);
    }
});