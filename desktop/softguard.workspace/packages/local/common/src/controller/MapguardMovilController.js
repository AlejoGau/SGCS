//MIGRADO2024
Ext.define('Common.controller.MapguardMovilController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasMovilesPatrullaModel', 'EventosTiemLineModel' ],
    views : [ 'MapguardMovilView' ],
    init: function (config) {
        var me = this;
        // genero los eventos
        this.control({
            'mapguardmovilview':{
                afterrender : this.initview,
                setrecord: this.initview
            },
            'mapguardmovilview button[action=asignar]': {
                click: this.onAsignarClick
            },
            'mapguardmovilview button[action=liberar]': {
                click: this.onLiberarClick
            },
            'mapguardmovilview button[action=email]': {
                click: this.onEmailClick
            },
            'mapguardmovilview button[action=sms]': {
                click: this.onSmsClick
            }
        });
    },
    initview : function(view) {
        var record = view.record;
        var recordCuenta = view.up('mapguardeventosview').cuentaSelected;
        
        
        
        if (record){
            view.loadRecord(record);
            view.down('#_start').setValue(record.address);
            
            // veo el estado y oculto el boton que corresponde
            
            // disponible
            if (record.get('tmp_nestado') == 1){
                view.down('#asignar').show();
                view.down('#liberar').hide();
                view.down('#email').hide();
                view.down('#sms').hide();
            }
            
            // asignado
            if (record.get('tmp_nestado') == 3){
                view.down('#asignar').hide();
                view.down('#liberar').show();
                view.down('#email').show();
                view.down('#sms').show();
            }
            
            // no disponible
            if (record.get('tmp_nestado') == 2){
                view.down('#asignar').hide();
                view.down('#liberar').hide();
                view.down('#email').hide();
                view.down('#sms').hide();
            }
            
            if (!recordCuenta){
                view.down('#asignar').hide();
                view.down('#_end').hide();
                view.down('#_routeTime').hide();
                
                view.down('#instrucciones').hide();
            }
            this.showRoute(view);
        } else {
            notifyError('Operación no soportada');
            view.close();
        }
        
    },
    
    
    onAsignarClick: function (button,event,options) {
        var controller = this;
        var view = button.up('mapguardmovilview');
        var mapguardgpsview = button.up('mapguardeventosview');
        var recordCuenta = mapguardgpsview.cuentaSelected;
        var recordMovil = view.record;
        view.recordCuenta = recordCuenta;
        
        recordMovil.set('selected', true);
        recordMovil.set('tmp_iAsignado',recordCuenta.get('cue_iid'));
        recordMovil.set('tmp_nestado',3);
        
        
        recordCuenta.set('cue_cLatLng', recordCuenta.get('lat')+","+recordCuenta.get('long'))
        
        // como no tengo un model de movil lo cargo para luego guardar los cambios.
        var model = this.getTablasMovilesPatrullaModelModel();
        var movil = model.load(recordMovil.get('tmp_idKey'),{
            callback: function(record){
                record.set('tmp_iAsignado',recordCuenta.get('cue_iid'));
                record.set('tmp_nestado',3);
                
                record.save({callback: function(){
                   
                    notify('El móvil se asignó con éxito');
                    
                    // genero el evento
                    Ext.Ajax.request({
                      url: '/rest/search/AlarmaGenerar',
                      method: 'GET',
                      params: {
                        idCta:recordMovil.get('tmp_icuenta'),
                        cAlarma: '_DM',
                        cObservaciones: getLocale('Se asigno el móvil')+ ' '+recordMovil.get('Name'),
                        cRoute:'https://www.google.com/maps/dir/'+recordMovil.get('cLatLng')+'/'+recordCuenta.get('cue_cLatLng')
                      },
                      success: function(resp,operation) {
                        notify('El evento se generó con éxito en el móvil');
                        mapguardgpsview.fireEvent('vehicleRefresh', mapguardgpsview,record);
                        
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
                        
                      }
                    });
                    
                    // tambien lo genero en la cuenta de la alarma
                    // genero el evento
                    Ext.Ajax.request({
                      url: '/rest/search/AlarmaGenerar',
                      method: 'GET',
                      params: {
                        idCta:recordCuenta.get('cue_iid'),
                        cAlarma: '_DM',
                        cObservaciones: getLocale('Se asigno el móvil')+ ' '+recordMovil.get('Name'),
                        cRoute:'https://www.google.com/maps/dir/'+recordMovil.get('cLatLng')+'/'+recordCuenta.get('cue_cLatLng')
                      },
                      success: function(resp,operation) {
                        notify('El evento se generó con éxito en la cuenta');
                      }
                    });
                    
                    controller.initview(view);
                }});
            }
        })
        
        
    },
    
    onLiberarClick: function (button,event,options) {
        var controller = this;
        var view = button.up('mapguardmovilview');
        var mapguardgpsview = button.up('mapguardeventosview');
        var recordCuenta = mapguardgpsview.cuentaSelected;
        var recordMovil = view.record;
        var cuentaAlarma = recordMovil.get('tmp_iAsignado');
        
        // como no tengo un model de movil lo cargo para luego guardar los cambios.
        recordMovil.set('selected', false);
        recordMovil.set('tmp_iAsignado',0);
        recordMovil.set('tmp_nestado',1);
        
        controller.cleanVehicleSelected(mapguardgpsview);
        
        var model = this.getTablasMovilesPatrullaModelModel();
        var movil = model.load(recordMovil.get('tmp_idKey'),{
            callback: function(record){
                record.set('tmp_iAsignado',0);
                record.set('tmp_nestado',1);
                
                record.save({callback: function(){
                    
                    notify('El móvil se liberó con éxito');
                    mapguardgpsview.fireEvent('vehicleRefresh', mapguardgpsview,record);
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
                        idCta: cuentaAlarma,
                        cAlarma: '_LM',
                        cObservaciones: getLocale('Se liberó el móvil')+ ' '+recordMovil.get('Name')
                      },
                      success: function(resp,operation) {
                        notify('El evento se generó con éxito en la cuenta');
                      }
                    });
                    
                    //controller.initview(view);
                }});
            }
        })
        
    },
    
    cleanVehicleSelected: function(view, prevent){
        var gmappanel6 = view.down('gmappanel6');
        var vehicleSelected = view.vehicleSelected;
        var datapanel = view.down('#datapanel');
        
        if (vehicleSelected){
            vehicleSelected.set('selected',false);
            var movilwidget = datapanel.down('mapguardmovilview');
            if (movilwidget)
            movilwidget.close();
            gmappanel6.directionsDisplay.setMap(null)
            view.vehicleSelected = null;
        }
    },
    
    
    
    onEmailClick: function (button,event,options) {
        var controller = this;
        var view = button.up('mapguardmovilview');
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
              params: { filter:'[{"property":"par_ccodigo", "value":"MAILSENDERNAME"}]'},
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
        var view = button.up('mapguardmovilview');
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
        if (route){
            route = route.routes[0]
            var leg = route.legs[0];
            view.down('#_end').setValue(leg.end_address);
            view.down('#_routeTime').setValue(leg.duration.text);
            record._endAddress = leg.end_address;
            var ipanel = view.down('#instrucciones');
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
    },
    
    getEmailBody: function(view){
        var record = view.record;
        
        var mapguardgpsview = view.up('mapguardeventosview');
        var eventrecord = mapguardgpsview.record;
        var recordCuenta = mapguardgpsview.cuentaSelected;
        var linkroute='https://www.google.com/maps/dir/'+record.get('cLatLng')+'/'+recordCuenta.get('cue_cLatLng')
        
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