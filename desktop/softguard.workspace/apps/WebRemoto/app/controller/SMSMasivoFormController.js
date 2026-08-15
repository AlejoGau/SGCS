Ext.define('WebRemoto.controller.SMSMasivoFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'TablaModemsSmsStore' ],
    models : [  ],
    views : [ 'SMSMasivoFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
            'smsmasivoformview' : {
                afterrender : this.initview,                      
                headerclick: function (grid, col, e) {
                    console.log(arguments)
                    if (col.fullColumnIndex == 0) {
                        grid.store.each(function(rec){
                            rec.set(col.dataIndex, true);
                        });                          
                    }
                }
            },
        
            'smsmasivoformview #send' : {
                click : this.onSendClick
            }
        });
    }, 

    initview : function(view) {
        if (view.cuentas){
            var cuentas = view.cuentas;
            view.down('#modemsms').select(view.down('#modemsms').getStore().getAt(0), true);
        } 
        
    },

    onSendClick: function(button, object, options){
        var view = button.up('smsmasivoformview');
        var cuentasArr = [];
        var cuentaStr = '';
        if(view.cuentas != "allSelected"){
            Ext.Array.each(view.cuentas, function (v,k) {
                cuentasArr.push(v.get('cue_iid'));
            })
            
            cuentaStr = cuentasArr.join(',')
        } else {
            cuentaStr = view.cuentas;
        }
        
        var modem = view.down('#modemsms').getValue()
        var myform = view.getForm();
        if(!myform.isValid()){
            notifyError('Complete los campos obligatorios');
            return;
        }
        Ext.Ajax.request({
            url: '/rest/search/SMSMasivo',
            params: { 
                'asunto': view.down('#textosms').getValue(),
                'cuentas':cuentaStr,
                'modem':modem
            },
            method: 'GET',
            scope: this,
            success: function(response){
                notify('Se se enviaron los SMS')
                view.up('window').close();
            }
                
        });
    }
});