Ext.define('Common.controller.MonitoreoGuiadoCargarObsController', {
    extend: 'Ext.app.Controller',

    views: [
        'MonitoreoGuiadoCargarObsView'
    ],

    refs: [
        {
            ref: 'monitoreoGuiadoCargarObsView',
            selector: 'monitoreoguiadocargarobsview'
        }
    ],

    init: function () {
        this.control({
                'monitoreoguiadocargarobsview': {
                    afterrender: this.initView,

                },
                'monitoreoguiadocargarobsview button[action=confirmar]':{ 
                    click: this.onConfirmar
                },
                'monitoreoguiadocargarobsview button[action=cancelar]': {
                    click: this.onCancelar
                }                
        });
    },

    initView: function(view) {
        // Initialization logic here
        console.log('Record enviado por parámetro:', view.recordEvento);
        //if(view.requiredObs == true)
        //    view.down('#observaciones').allowBlank = false;
        console.log('Observacionses permitidas:', view.down('#observaciones').allowBlank);
    },

    doNextStep: function(view,cargoObservacion/**parámetro que indica si el usuario cargó la observación del step */){
        var caller = view.caller;
        caller.listObservaciones.push('[Paso '+view.indexStep+'] '+view.down('#observaciones').getValue());        
        caller.fireEvent('updatestep',caller,view.recordNode,cargoObservacion, view.indicaNoRealizo);
    },

    closeWin: function(button) {
        var win = button.up('window');
        var view = button.up('monitoreoguiadocargarobsview')



        if (win) {
            
            win.close(); // Close the window

        }
    },


    onConfirmar: function(button) {
        var view = button.up('monitoreoguiadocargarobsview');
        var cargoObservacion = false;
        var form = view.getForm();
        if (!form.isValid()) {
            Ext.Msg.alert('Error', 'Por favor, complete los campos requeridos.');
            return;
        }
        if(view.down('#observaciones').getValue() != '')
            cargoObservacion = true;
        this.doNextStep(view,cargoObservacion);

        console.log('Acción anulada, [Paso '+view.indexStep+'] '+view.down('#observaciones').getValue());
        //saveObs: function(view, recordNode, status,observacion){
        //view.caller.saveObs(view,view.recordNode,3,view.down('#observaciones')); //llamo al saveObs en ModuleTreeWRGuiadoController
        view.caller.fireEvent('saveobs',view,view.recordNode,3,view.down('#observaciones').getValue())
    },
    onCancelar: function(button) {
        this.closeWin(button);
        /*var form = button.up('form');
        var view = button.up('monitoreoguiadocargarobsview');
        if (form.isValid()) {
            var observaciones = form.down('#observaciones').getValue();
            // Logic to handle confirmation with observaciones
            console.log('Observaciones confirmadas:', observaciones);
            this.doNextStep(view, true);
            this.closeWin(button);
        } */

    }   

}
)