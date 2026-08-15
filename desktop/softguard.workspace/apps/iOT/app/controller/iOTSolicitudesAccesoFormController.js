Ext.define('iOT.controller.iOTSolicitudesAccesoFormController', {
    extend: 'Ext.app.Controller',
    views: ['iOTSolicitudesAccesoFormView'],
            
    init: function (config) {
        // genero los eventos
        this.control({
            'iotsolicitudesaccesoformview': {
                afterrender: this.initView,

            },
            'iotsolicitudesaccesoformview gmappanel6':{
                mapready: this.onGmapReady
            },            
            'iotsolicitudesaccesoformview button[action="aceptarsol"]': {
                click: this.onAceptarClick
            },
            'iotsolicitudesaccesoformview button[action="rechazarsol"]': {
                click: this.onRechazarClick
            },                                       
        });
    },

    initView: function (view) {
        var record = view.record;
        var form = view.down('#formcuenta');
        form.loadRecord(view.record);

    },
    onGmapReady: function(view, width, height){
        //this.addLocation(marker,view);
        var controller = this;
        
        var gmap = view;
        var _view = gmap.up('iotsolicitudesaccesoformview');

        var markers = [];
        markers.push(controller.newMarker(_view.record));
        gmap.addMarkers(markers); 
               
    
      
    },
    newMarker: function (record){
        var controller = this;
        const latlng = record.get('cue_cLatLng').split(',');
        return {
            lat : latlng[0],
            lng : latlng[1],
            //record: marker,
            icon: controller.getMarkerIcon(),
            title : record.get('_lineacuenta'),
            infoWindow: {
                content: '<h4>'+record.get('_lineacuenta')+'</h4><br><h5>'+record.get('cue_cnombre')+'</h5>', 
                listener:'mouseover',
                disableAutoPan: true
            },
            draggable : false
        }
    },
    getMarkerIcon: function(){

        var iconUrl = '/resources/softguard/images/start.png';
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48,48),
            new google.maps.Point(0,0),
            new google.maps.Point(24,48)
        );
        
        return image;
    },  
    onAceptarClick: function(button, event, options){
        var controller = this;
        var view = button.up('iotsolicitudesaccesoformview');
        var record = view.record;
        var id = record.get('Id');
        var status = 2;
        var obs = view.down('#obsRes').getValue();
        Ext.Msg.show({
            title: 'Confirmación',
            message: '¿Enviar modificación?',
            buttons: Ext.Msg.YESNO,
            buttonText: {
                yes: 'Si',
                no: 'No',
                
            },
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    controller.updateSolicitud(view,record.get('Id'),2,obs);
                } 
            }
        });
    },
    onRechazarClick: function(button, event, options){
        var controller = this;
        var view = button.up('iotsolicitudesaccesoformview');
        var record = view.record;
        var id = record.get('Id');
        var status = 2;
        var obs = view.down('#obsRes').getValue();
        Ext.Msg.show({
            title: 'Confirmación',
            message: '¿Enviar rechazo?',
            buttons: Ext.Msg.YESNO,
            buttonText: {
                yes: 'Si',
                no: 'No',
                
            },
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {

                    controller.updateSolicitud(view,record.get('Id'),3,obs);
                } 
            }
        });
    },
    updateSolicitud: function(view,id,status,obs){
        var udw_idKey = _UserData.UserId;
        view.down('#aceptar').disable();
        view.down('#rechazar').disable();
        Ext.Ajax.request({
            url: '/Rest/search/p_PadLocksUpdSearch',
            method: 'GET',
            params: {
/**
 * 										@Id Int,
										@pdl_cAuthorized Int=0,
										@pdl_cAutObservacion NVarChar (max) = '',
										@pdl_iStatus Int = 0
 *  */                
                Id: id,
                pdl_cAuthorized: udw_idKey,
                pdl_cAutObservacion: obs,
                pdl_iStatus: status

            },
            success: function (response) {

                Ext.Ajax.request({
                    url: '/handler/CreatePadlockKey',
                    method: 'GET',
                    params: {
                        LockId: id,
                        status: status
                    },
                    scope: this,
                    success: function (response) {
                       
                        var json = Ext.JSON.decode(response.responseText);
                        if(json.success){
                            
                            
                            notify('Solicitud confirmada con éxito');
                        }else{
                            notifyError('Error al confirmar la solicitud');
                        }
                     
                        if (view.caller) {
                            view.caller.fireEvent('refresh', view.caller);
                        }										
													
                        var win = view.up('window');
                        win.close();   
                    }
                });



            }
        });
    }


});
