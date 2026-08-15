Ext.define('AdministratorSearch.controller.t_serialConfiguracionPuertoController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 't_serialConfiguracionPuertoView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            't_serialconfiguracionpuertoview' : {
        		afterrender : this.initView               
			},
            't_serialconfiguracionpuertoview button[action="save"]' : {
        		click : this.onSaveClick               
			}
		});
	},

    initView : function(view) {
        var controller = this;
        var form = view.getForm();

        form.loadRecord(view.record);
        var record = view.record;

        if (record.get('Id') != 0) {
            /**
             * Cargo el record en el nuevo form para realizar modificaciones si es distinto de 0 (Nuevo)
             */
            var iprsc_config = record.get('iprsc_config');
            var formdata = Ext.JSON.decode(iprsc_config);

            view.down('#pue_nbaudrate').setValue(formdata.formdata.pue_nbaudrate);
            view.down('#pue_nparity').setValue(formdata.formdata.pue_nparity);
            view.down('#pue_ndatabits').setValue(formdata.formdata.pue_ndatabits);
            view.down('#pue_nstopbits').setValue(formdata.formdata.pue_nstopbits);
            view.down('#pue_nflowctrl').setValue(formdata.formdata.pue_nflowctrl);
            view.down('#pue_nbufferin').setValue(formdata.formdata.pue_nbufferin);
            view.down('#pue_nbufferout').setValue(formdata.formdata.pue_nbufferout);
            view.down('#pue_nrts').setValue(formdata.formdata.pue_nrts);
            view.down('#pue_ndtr').setValue(formdata.formdata.pue_ndtr);
        }        

    },

    onSaveClick : function(button, e, eOpts) {
        var controller = this;
        var view = button.up('t_serialconfiguracionpuertoview');
        var window = view.up('window');
        var form = view.getForm();
        var record = form.getRecord();

        form.updateRecord(record);

        /**
         * Guardo la informacion de la vista del form, en la del form original.
         * From : t_serialconfiguracionpuertoview TO : t_iprsconeccionesformnuevaview
         * Se encuentra en view.caller
         */
        var data = form.getValues();
        if (form.isValid()){
            view.caller.down('#pue_nbaudrate').setValue(data.pue_nbaudrate);
            view.caller.down('#pue_nparity').setValue(data.pue_nparity);
            view.caller.down('#pue_ndatabits').setValue(data.pue_ndatabits);
            view.caller.down('#pue_nstopbits').setValue(data.pue_nstopbits);
            view.caller.down('#pue_nflowctrl').setValue(data.pue_nflowctrl);
            view.caller.down('#pue_nbufferin').setValue(data.pue_nbufferin);
            view.caller.down('#pue_nbufferout').setValue(data.pue_nbufferout);
            view.caller.down('#pue_nrts').setValue(data.pue_nrts);
            view.caller.down('#pue_ndtr').setValue(data.pue_ndtr);

            window.close();
        } else {
            notify('Hay datos incompletos o faltantes. Verifique el formulario');          
        }
        
    }

})