//MIGRADO2024
Ext.define( 'Common.controller.ServTecReclamosFormController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'ServTecHistoricoModel', 'ServTecHistoricoSearchModel', 'm_st_cabeceraModel' ],
    views: [ 'ServTecReclamosFormView' ],
    init: function(config ) {
        this.control( {
            'sertecreclamosformview': {
                beforerender: this.initview,
            },
            'sertecreclamosformview button[action=save]': {
                click: this.onSaveClick
            }
        });
    },
    initview: function(view ) {
        view.store = Ext.create('Ext.data.Store', {
            model : this.getServTecHistoricoSearchModelModel(),
            remoteFilter: true,
            remoteSort: true,
            autoload: false,
            filters: [
                {
                    property: 'stl_iServicio',
                    value: view.record.get('Id')
                },
                {
                    property:'stl_cAccion',
                    value: 'Reclamo'
                }
            ],
        });
        
        view.store.load({callback:function (recordx,operation,success) {           
            Ext.Ajax.request({
                url : '/rest/security/UserData',    	
                success: function(response, action){
                        var infoUser = Ext.JSON.decode(response.responseText);
                        view.userdata = infoUser;                    
                }    		
            });       
            
            let reclamos = "";
            for (elemento of recordx){
                let email = elemento.data.stl_cObservacion.split("]")[0] + "]";
                let observacion = elemento.data.stl_cObservacion.split("]")[1].trim();
                let fecha = Ext.Date.format(elemento.data.stl_tFechaHora, 'd-m-Y H:i:s' );
                reclamos += email + "[" + fecha + "] " + observacion + "<br/><br/>";
            }
            reclamos.slice(0, -10);
            view.down('#observaciones').setValue(reclamos);
            //view.cabeceraRecord = recordx;
        }});
    },
        
    onSaveClick: function(button, event, options ) {
        var view = button.up( 'sertecreclamosformview' );
        var win = button.up( 'window' );
        
        let reclamo = win.down('#reclamos').getValue();
        if(win.down('#reclamos').getValue() != '') {
            var reclamoRecord = this.getServTecHistoricoModelModel().create({
                    stl_iServicio : view.record.get('Id'),
                    stl_tFechaHora : new Date(),
                    stl_cAccion : 'Reclamo',
                    stl_cObservacion :"["+view.userdata.UserId+"] "+ win.down('#reclamos').getValue(),
                    stl_iUsuarioDSS: _UserData.udw_idKey
            });
            reclamoRecord.set("Id",0);
            reclamoRecord.save({callback:function () {
                notify( 'Los datos se guardaron con éxito.' )
                view.up( 'window' ).close();
            }});
        } else {
            notifyError( 'No ingreso ningun reclamo' )
        }
    }
});