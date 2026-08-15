//MIGRADO2024
Ext.define('Common.controller.MapguardNewMovilController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_asignacion_movilModel', 'EventosTiemLineModel', 'TablasMovilesPatrullaModel' ],
    views : [ 'MapguardNewMovilView' ],
    init: function (config) {
        var me = this;
        // genero los eventos
        this.control({
            'mapguardnewmovilview':{
                afterrender : this.initview,
                setrecord: this.initview,
                destroy: function (view) {
                    Ext.TaskManager.stop(view.verificarAsignacionTask);
                }
            },
            'mapguardnewmovilview button[action=asignar]': {
                click: this.onAsignarClick
            },
            'mapguardnewmovilview button[action=liberar]': {
                click: this.onLiberarClick
            },
            'mapguardnewmovilview button[action=email]': {
                click: this.onEmailClick
            },
            'mapguardnewmovilview button[action=sms]': {
                click: this.onSmsClick
            }
        });
    },
    initview : function(view) {
        console.log('Nuevo movil controller')
        
        var record = view.record;
        var recordCuenta = view.up('mapguardeventosview').cuentaSelected;
        var controller = this;
        
        
        
        if(!recordCuenta) {
            notify('Seleccione el evento.')
            return false;
        }
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getM_asignacion_movilModelModel(),
            pageSize:1,
            remoteFilter:true,
            remoteSorter:true,
            sorters: [{
                property:'amv_prioridad',
                direction:'DESC'
            }],
            filters:[{
                        property:'amv_objecttypeid',
                        value: record.get('ObjectTypeId')
                    },{
                        property:'amv_objectid',
                        value:record.get('Id')
                    },{
                        property:'amv_rec_iid',
                        value:recordCuenta.get('rec_iid')
                    },{
                        property:'amv_estado:ININT',
                        value:'1,11,12'
                    }
                ]
        });
        if(recordCuenta) {
            view.loadRecord(recordCuenta);
        }
       
       
        store.load({callback:function (records) {
            
            
            view.recordAsignacion = records[0];
            
            var estadoAsignacion = records[0]?records[0].get('amv_estado'):0;
            var estadoDesc = '';
            switch (estadoAsignacion){
                case 0:
                    estadoDesc = 'Disponible'
                    break;
                case 1:
                    estadoDesc = 'Asignado';
                    break;
                case 11:
                    estadoDesc = 'En camino';
                    break;
                case 12:
                    estadoDesc = 'Arrivado';
                    break;
                case 2:
                    estadoDesc = 'Cancelado';
                    break;
                case 3:
                    estadoDesc = 'Completado';
                    break;
            } 
            
            //if(records.length >0) {     
                if(view.down('#_cestado')) {
                    view.down('#_cestado').setValue(estadoDesc);//view.down('#_cestado').setValue(records[0].get('_amv_estado'))
                }
            //}
                        
            if (record){
                
                // veo el estado y oculto el boton que corresponde
                
                /**
                 * 0 - disponible 
                 * 1 - asingado
                 * 11 - en camino
                 * 12 - arrivado
                 * 2 - cancelado
                 * 3 - completado
                 */
                
                // disponible
                if (estadoAsignacion == 0 || estadoAsignacion == 2 || estadoAsignacion == 3){
                    if(view.down('#asignar')) {
                        view.down('#asignar').show();
                    }
                    if(view.down('#liberar')) {
                        view.down('#liberar').hide();
                    }
                    if(view.down('#email')) {
                        view.down('#email').hide();
                    }
                    if(view.down('#sms')) {
                        view.down('#sms').hide();
                    }
                }
                
                // asignado
                if (estadoAsignacion == 1){
                    
                    if(view.down('#asignar')) {
                        view.down('#asignar').hide();
                    }
                    if(view.down('#liberar')) {
                        view.down('#liberar').show();
                    }
                    if(view.down('#email')) {
                        view.down('#email').show();
                    }
                    if(view.down('#sms')) {
                        view.down('#sms').show();
                    }
                }
                
                
                
                if (!recordCuenta){
                                        
                    if(view.down('#asignar')) {
                        view.down('#asignar').hide();
                    }
                    if(view.down('#_end')) {
                        view.down('#_end').hide();
                    }
                    if(view.down('#_routeTime')) {
                        view.down('#_routeTime').hide();
                    }
                    if(view.down('#instrucciones')) {
                        view.down('#instrucciones').hide();
                    }
                    
                }
    
                controller.showRoute(view);
            } else {
                notifyError('Operación no soportada');
                view.close();
            }
            
            
            
            //veo si cambio el estado
            if(!view.verificarAsignacionTask) {
                
                view.verificarAsignacionTask =  Ext.TaskManager.start({
                   
                    run: function () {
                        var store =Ext.create('Ext.data.Store',{
                            model: controller.getM_asignacion_movilModelModel(),
                            pageSize:1,
                            remoteFilter:true,
                            remoteSorter:true,
                            sorters: [{
                                property:'amv_prioridad',
                                direction:'DESC'
                            }],
                            filters:[{
                                        property:'amv_objecttypeid',
                                        value: record.get('ObjectTypeId')
                                    },{
                                        property:'amv_objectid',
                                        value:record.get('Id')
                                    },{
                                        property:'amv_rec_iid',
                                        value:recordCuenta.get('rec_iid')
                                    }
                                ]
                        }).load({callback:function (records) {
                            
                            if(records.length>0) {
                                var estado = records[0].get('amv_estado');
                                
                                //si esta libre, cancealado o finalizado
                                if (estado == 0 || estado == 2 || estado == 3){
                                    
                                    if(view.recordAsignacion) {
                                        
                                      var mapguardgpsview = view.up('mapguardeventosview');
                                      mapguardgpsview.fireEvent('vehicleRefresh', mapguardgpsview,view.recordAsignacion);
                      
                                      controller.initview(view);
                                      notify('La asignacion cambio')
                                    } 
                               }
                            }               
                        
                        }})                    
                    
                    },
                    interval: 2000
                });
            
            
            }
        
        
        }});
        
        
        
    },
    
    
    onAsignarClick: function (button,event,options) {
        var controller = this;
        var view = button.up('mapguardnewmovilview');
        var mapguardgpsview = button.up('mapguardeventosview');
        var recordCuenta = mapguardgpsview.cuentaSelected;
        var recordMovil = view.record;
        view.recordCuenta = recordCuenta;
        
        
        
        var filterAsignacion = []
        if(view.recordCuenta.get('rec_iid')) {
            filterAsignacion = [
                    {
                        property:'amv_rec_iid',
                        value: view.recordCuenta.get('rec_iid')
                    },{
                        property:'amv_estado',
                        value: 1
                    }
                ]
        } else {
            filterAsignacion  = [
                    {
                        property:'amv_objecttypeid',
                        value: view.recordAsignacion.get('amv_objecttypeid')
                    },{
                        property:'amv_objectid',
                        value: view.recordAsignacion.get('amv_objectid')
                    },{
                        property:'amv_estado',
                        value: 1
                    }
                ]
        }
        
        //verifico que no hay otro movil asignado
        var store =Ext.create('Ext.data.Store',{
            model: this.getM_asignacion_movilModelModel(),
            pageSize:1,
            remoteFilter:true,
            filters:filterAsignacion
        });
       
                
            store.load({callback:function (records) {
                
                if(records.length>0) {
                    notify('No puede asignar otro movil.')
                    return false;
                }
                
                
                recordMovil.set('selected', true);
                recordMovil.set('tmp_iAsignado',recordCuenta.get('cue_iid'));
                recordMovil.set('tmp_nestado',3);
                
                
                recordCuenta.set('cue_cLatLng', recordCuenta.get('lat')+","+recordCuenta.get('long'))
                
                // como no tengo un model de movil lo cargo para luego guardar los cambios.
                var model = controller.getM_asignacion_movilModelModel().create({    
                    amv_objecttypeid: recordMovil.get('ObjectTypeId'),
                    amv_objectid: recordMovil.get('Id'),
                    amv_rec_iid:  recordCuenta.get('rec_iid'),
                    amv_estado: 1,
                    amv_prioridad:0
                });
                model.set('Id',0);
                model.save({callback:function (record) {
                    
                        //guardo estado del movil
                        /**
                         * se saco 29-8-2017 por epdido de rodrigo
                         * controller.getTablasMovilesPatrullaModelModel().load(recordMovil.get('tmp_idKey'),{
                            callback:function (record) {
                                record.set('tmp_nestado',recordMovil.get('tmp_nestado'))
                                record.save()
                            }
                        
                        })
                        */
                        
                        
                        view.recordAsignacion = record;
                    
                        notify('El móvil se asignó con éxito');
                        
                        // cambio el evento y mensaje segun lo que se esta asignando
                        
                        var etl_caccion = '%AsignacionDeMovil%';
                        var etl_cobservacion = '%AsignacionDeMovil%';
                        var cAlarma = '_DM'
                        var usu_iid = 0;
                        
                        if (recordMovil.get('ObjectTypeId') == 3113){
                            etl_caccion = '%AsignacionDeVigilador%';
                            etl_cobservacion = '%AsignacionDeVigilador% ('+recordMovil.get('Nombre')+')';
                            cAlarma = '_DV';
                            usu_iid = recordMovil.get('usu_iid');
                        }
                        
                        
                        //guardo en eventostimeline
                        controller.getEventosTiemLineModelModel().create({
                            etl_icuenta: recordCuenta.get('cue_iid'),
                            etl_tfechahora: new Date(),
                            etl_caccion: etl_caccion,
                            etl_cobservacion: etl_cobservacion,
                            etl_cowner: '%MWR%',
                            etl_ioperador: view.operadorId,
                            etl_irecid: recordCuenta.get('rec_iid')
                        }).save();
                            
                            
                        // genero el evento
                        Ext.Ajax.request({
                          url: '/rest/search/AlarmaGenerar',
                          method: 'GET',
                          params: {
                            idCta:recordMovil.get('cue_iid'),
                            cAlarma: cAlarma,
                            idUsuario: usu_iid,
                            rec_norigen: 5,
                            cObservaciones: getLocale('Se asigno el móvil')+ ' '+recordMovil.get('Name'),
                            cRoute:'https://www.google.com/maps/dir/'+recordMovil.get('cLatLng')+'/'+recordCuenta.get('cue_cLatLng'),
                            cdata:recordCuenta.get('cue_iid') // pongo el id de la cuenta a la que lo asigne
                          },
                          success: function(resp,operation) {
                            notify('El evento se generó con éxito en el móvil');
                            mapguardgpsview.fireEvent('vehicleRefresh', mapguardgpsview,record);
                          }
                        });
                        
                        //envio los push
                        Ext.Ajax.request({
                          url: '/handler/sendPushFromQueue',
                          method: 'GET'
                        });
                        
                        // tambien lo genero en la cuenta de la alarma
                        // genero el evento
                        Ext.Ajax.request({
                          url: '/rest/search/AlarmaGenerar',
                          method: 'GET',
                          params: {
                            idCta:recordCuenta.get('cue_iid'),
                            rec_norigen: 5,
                            cAlarma: cAlarma,
                            cObservaciones: getLocale('Se asigno el móvil')+ ' '+recordMovil.get('Name'),
                            cRoute:'https://www.google.com/maps/dir/'+recordMovil.get('cLatLng')+'/'+recordCuenta.get('cue_cLatLng')
                          },
                          success: function(resp,operation) {
                            notify('El evento se generó con éxito en la cuenta');
                          }
                        });
                        
                        controller.initview(view);
                }})
                
                
            }})
    
    },
    
    onLiberarClick: function (button,event,options) {
        var controller = this;
        var view = button.up('mapguardnewmovilview');
        var mapguardgpsview = button.up('mapguardeventosview');
        var recordCuenta = mapguardgpsview.cuentaSelected;
        var recordMovil = view.record;
        //var cuentaAlarma = recordMovil.get('tmp_iAsignado');
        
        // como no tengo un model de movil lo cargo para luego guardar los cambios.
        recordMovil.set('selected', false);
       // recordMovil.set('tmp_iAsignado',0);
       // recordMovil.set('tmp_nestado',1);
        
        controller.cleanVehicleSelected(mapguardgpsview);
        
       // var model = this.getTablasMovilesPatrullaModelModel();
      //  var movil = model.load(recordMovil.get('tmp_idKey'),{
        //    callback: function(record){
        
        
       /* var store =Ext.create('Ext.data.Store',{
            model: this.getM_asignacion_movilModelModel(),
            pageSize:1,
            remoteFilter:true,
            filters:[{
                        property:'amv_objecttypeid',
                        value: recordMovil.get('ObjectTypeId')
                    },{
                        property:'amv_objectid',
                        value: recordMovil.get('Id')
                    },{
                        property:'amv_rec_iid',
                        value:recordCuenta.get('rec_iid')
                    }
                ]
        });
       */
       /* store.load({callback:function (records) {*/
        
             
                view.recordAsignacion.set('amv_estado',2);
                view.recordAsignacion.save({callback: function(){
                    
                    
                    //guardo estado del movil
                  /*
                  se saco  29-08-2017 a pedido de rodrigo
                  controller.getTablasMovilesPatrullaModelModel().load(recordMovil.get('tmp_idKey'),{
                        callback:function (record) {
                            record.set('tmp_nestado',1)
                            record.save()
                        }
                    
                    })
                    */
                    
                    
                    notify('El móvil se liberó con éxito');
                    mapguardgpsview.fireEvent('vehicleRefresh', mapguardgpsview,view.recordAsignacion);
                    
                    
                    //guardo en eventostimeline
                    controller.getEventosTiemLineModelModel().create({
                        etl_icuenta: recordCuenta.get('cue_iid'),
                        etl_tfechahora: new Date(),
                        etl_caccion: '%AsignacionDeMovil%',
                        etl_cobservacion: '%AsignacionDeMovil%',
                        etl_cowner: '%MWR%',
                        etl_ioperador: view.operadorId,
                        etl_irecid: view.rec_iid
                    }).save();
                    
                    
                    // genero el evento
                    Ext.Ajax.request({
                      url: '/rest/search/AlarmaGenerar',
                      method: 'GET',
                      params: {
                        idCta:recordMovil.get('tmp_icuenta'),
                        cAlarma: '_LM',
                        cObservaciones: getLocale('Se liberó el móvil')+ ' '+recordMovil.get('Name')
                      },
                      success: function(resp,operation) {
                        notify('El evento se generó con éxito en el móvil');
                      }
                    });
                    
                    // genero el evento
                    Ext.Ajax.request({
                      url: '/rest/search/AlarmaGenerar',
                      method: 'GET',
                      params: {
                        idCta: recordMovil.get('tmp_icuenta'),
                        cAlarma: '_LM',
                        cObservaciones: getLocale('Se liberó el móvil')+ ' '+recordMovil.get('Name')
                      },
                      success: function(resp,operation) {
                        notify('El evento se generó con éxito en la cuenta');
                      }
                    });
                    //envio los push
                    Ext.Ajax.request({
                      url: '/handler/sendPushFromQueue',
                      method: 'GET'
                    });
                    controller.initview(view);
                }});
          /*  }})*/
      //  })
        
    },
    
    cleanVehicleSelected: function(view, prevent){
        var gmappanel6 = view.down('gmappanel6');
        var vehicleSelected = view.vehicleSelected;
        var datapanel = view.down('#datapanel');
        
        if (vehicleSelected){
            vehicleSelected.set('selected',false);
            //var movilwidget = datapanel.down('mapguardnewmovilview');
            //if (movilwidget)
           // movilwidget.close();
            //gmappanel6.directionsDisplay.setMap(null)
            view.vehicleSelected = null;
        }
    },
    
    
    
    onEmailClick: function (button,event,options) {
        var controller = this;
        var view = button.up('mapguardnewmovilview');
        var recordMovil = view.record;
        
        // busco el mail de la cuenta del movil
        var to = recordMovil.get('cue_cemail');
        
        
        
        // preparo el mail
        var ipanel = view.down('#instrucciones');
        var mailbody = this.getEmailBody(view);
        
        mailbody += '<BR><b>Instrucciones:</b><BR>';
        
        mailbody+=ipanel._routeHtml;
        
        // abro el formulario para modificar / enviar
        
        Ext.Ajax.request({
              url: '/Rest/t_parametros/',
              params: { filter:'[{"property":"par_ccodigo", "value":"MAILSENDER"}]'},
              method: 'GET',
              scope: this,
              success: function(response){
                  var from = Ext.JSON.decode(response.responseText).rows[0].par_cvalor;
                    var mail = Ext.widget('mailformview',{
                        mailbody: mailbody,
                        from: from,
                        to: to,
                        autoScroll: false,
                        subject: getLocale('Aviso a móvil asignado')
                    });
                    
                    var win = Ext.widget('window',{
                        title: 'Envío de correo',
                        layout: 'fit',
                        items: mail,
                        autoScroll: false,
                        width: 600,
                        height: 600
                    }).show();
              }
        });
        
    },
    
    
    onSmsClick: function (button,event,options) {
        var controller = this;
        var view = button.up('mapguardnewmovilview');
        var recordMovil = view.record;
        
        // busco el telefno de la cuenta del movil
        var to = recordMovil.get('cue_ctelefono');
        
        
        
        // preparo el sms
        var ipanel = view.down('#instrucciones');
        var mailbody = this.getSmsBody(view);
        
        // abro el formulario para modificar / enviar
        Ext.Ajax.request({
              url: '/Rest/t_parametros/',
              params: { filter:'[{"property":"par_ccodigo", "value":"MAILSENDER"}]'},
              method: 'GET',
              scope: this,
              success: function(response){
                  var from = Ext.JSON.decode(response.responseText).rows[0].par_cvalor;
                    var sms = Ext.widget('smsenvioformview',{
                        record: view.record,
                        from: from,
                        to: to,
                        autoScroll: true,
                        subject: mailbody
                    });
                    
                    var win = Ext.widget('window',{
                        title: 'Envío de sms',
                        layout: 'fit',
                        items: sms,
                        width: 600,
                        height: 400
                    }).show();
              }
        });
        
    },
    
    showRoute: function(view){
        var gmappanel6 = view.gmappanel6;
        var record= view.record;
        var route = record.route;
        var me = this;
        if (route && route.status != "ZERO_RESULTS"){
            route = route.routes[0]
            var leg = route.legs[0];
            
            if (view.down('#_start')){
                 view.down('#_start').setValue(leg.start_address);
            }
            if(view.down('#_end')) {
                view.down('#_end').setValue(leg.end_address);
            }
            
            if(view.down('#_routeTime')) {
                view.down('#_routeTime').setValue(leg.duration.text);
            }
            record._endAddress = leg.end_address;
            var ipanel = view.down('#instrucciones');
            if(ipanel) {
                var ihtml ='<ul>';
                Ext.Array.each(leg.steps,function(step){
                    //console.log(step.instructions);
                    ihtml+= '<li>'+step.instructions+'</li>';
                })
                ihtml += '</ul>';
                ipanel.update(ihtml);
                ipanel._routeHtml = ihtml;
                ipanel.expand();
            }
        } 
    },
    
    getEmailBody: function(view){
        var record = view.record;
        
        var mapguardgpsview = view.up('mapguardeventosview');
        var eventrecord = mapguardgpsview.record;
        var recordCuenta = mapguardgpsview.cuentaSelected;
        
        var latLong = record.get('cLatLng');
        if(!record.get('cLatLng')) {
            latLong = record.get('gps_rLatitud')+', '+record.get('gps_rLongitud')
        }
        
        
        var linkroute='https://www.google.com/maps/dir/'+latLong+'/'+recordCuenta.get('cue_cLatLng')
        
        var html = '\
            <table>\
                <tr>\
                    <td style="padding:5px; font-size:13px;">\
                       <span style="font-weight:bold;">{lblcuenta}:</span><span> {cuenta}</span><br/>\
                    </td>\
                </tr>\
                <tr>\
                    <td style="padding:5px; font-size:13px;">\
                       <span style="font-weight:bold;">{lbldireccion}:</span><span> {direccion}</span><br/>\
                    </td>\
                </tr>';
        if (eventrecord){
            html += '<tr>\
                    <td style="padding:5px; font-size:13px;">\
                       <span style="font-weight:bold;">{lblevento}:</span><span> {evento}</span><br/>\
                    </td>\
                </tr>\
                <tr>\
                    <td style="padding:5px; font-size:13px;">\
                       <span style="font-weight:bold;">{lblfechahora}:</span><span> {fechahora}</span><br/>\
                    </td>\
                </tr>';
        }
                
            html += '<tr>\
                    <td style="padding:5px; font-size:13px;">\
                       <span style="font-weight:bold;">{lblcontacto}:</span><span> {contacto}</span><br/>\
                    </td>\
                </tr>\
             </table>\
             <BR><b>Ruta:</b><BR>\
             <a href="{linkroute}">Abrir mapa</a><br>\
             ';
        
        
        
        if (eventrecord){
            html = html.replace(/\{evento\}/, eventrecord.get('_eventDescripcion'));
            html = html.replace(/\{fechahora\}/, eventrecord.get('_FechaHora'));
        }
        
        
        
        html = html.replace(/\{cuenta\}/, recordCuenta.get('cue_cnombre'));
        html = html.replace(/\{direccion\}/, record._endAddress);
        html = html.replace(/\{linkroute\}/, linkroute);
        html = html.replace(/\{contacto\}/, recordCuenta.get('cue_ctelefono'));
      
        html = html.replace(/\{lblcuenta\}/, getLocale('Cuenta'));
        html = html.replace(/\{lbldireccion\}/, getLocale('Dirección'));
        html = html.replace(/\{lblevento\}/, getLocale('Evento'));
        html = html.replace(/\{lblfechahora\}/, getLocale('Hora del evento'));
        html = html.replace(/\{lblcontacto\}/, getLocale('Contacto'));
        return html;
    },
    
    getSmsBody: function(view){
        var record = view.record;
        
        var mapguardgpsview = view.up('mapguardeventosview');
        var eventrecord = mapguardgpsview.record;
        var recordCuenta = mapguardgpsview.cuentaSelected;
        var linkroute='https://www.google.com/maps/dir/'+record.get('cLatLng')+'/'+recordCuenta.get('cue_cLatLng')
        
        var txt = '{cuenta}\r\n';
        txt += '{direccion}\r\n';
        
        if (eventrecord){
            txt += '{evento}\r\n';
            txt += '{fechahora}\r\n';
        }
        
        txt += '{lblcontacto}:{contacto}\r\n{linkroute}';
        
        if (eventrecord){
            txt = txt.replace(/\{evento\}/, eventrecord.get('_eventDescripcion'));
            txt = txt.replace(/\{fechahora\}/, eventrecord.get('_FechaHora'));
        }
        
        
        
        txt = txt.replace(/\{cuenta\}/, recordCuenta.get('cue_cnombre'));
        txt = txt.replace(/\{direccion\}/, record._endAddress);
        txt = txt.replace(/\{linkroute\}/, linkroute);
        txt = txt.replace(/\{contacto\}/, recordCuenta.get('cue_ctelefono'));
      
        txt = txt.replace(/\{lblcuenta\}/, getLocale('Cuenta'));
        txt = txt.replace(/\{lbldireccion\}/, getLocale('Dirección'));
        txt = txt.replace(/\{lblevento\}/, getLocale('Evento'));
        txt = txt.replace(/\{lblfechahora\}/, getLocale('Hora del evento'));
        txt = txt.replace(/\{lblcontacto\}/, getLocale('Contacto'));
        return txt;
    }
    
});