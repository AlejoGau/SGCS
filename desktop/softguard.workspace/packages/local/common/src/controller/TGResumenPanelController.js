//MIGRADO2024
Ext.define('Common.controller.TGResumenPanelController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'TGResumenPanelView' ],
    init : function(config) {
		this.control({
            'tgresumenview': {
                afterrender: this.initview
            }
        })
    },
    initview : function(view) {
        var TGTIEMPODETENIDO = 3;
        var record = view.record;
        var filters = [{
                property:'fechaDesde',
                value: Ext.Date.format(new Date(record.get('tgv_fechainicio')),'Y-m-d')+"T"+ Ext.Date.format(new Date(record.get('tgv_fechainicio')),'H:i:s')
            },{
                property:'fechaHasta',
                value: Ext.Date.format(new Date(record.get('tgv_fechafin')),'Y-m-d')+"T"+ Ext.Date.format(new Date(record.get('tgv_fechafin')),'H:i:s')
            },{
                property:'gps_idCuenta',
                value: record.get('cue_iid')
            }
            ,{
                property:'gps_cimei',
                value: record.get('cue_cimei')
            }
        ];
        
        Ext.Ajax.request({
          url: '/Rest/Search/TrackGuard_PosicionesGPS_resumen?detenidoLimit='+TGTIEMPODETENIDO+'&filter='+JSON.stringify(filters)+'&limit=10000',
          success: function(resp,operation) {
              if(resp.responseText)  {                 
                var json = Ext.JSON.decode(resp.responseText);
                //console.log(metadata)
                if (json && json.total > 0){
                    var r = json.rows[0];
                    
                    /**
                     * BC 368843218 : Se procede desde el lado de la UI a realizar la transformacion de Minutos a HH:MM y no desde el SP
                     */                    
                    var tDetenido = "";
                    var tMovimiento = "";
                    if (r.tiempodetenido > 60) {
                        var num = r.tiempodetenido;
                        var hours = (num / 60);
                        var rhours = Math.floor(hours);
                        var minutes = (hours - rhours) * 60;
                        var rminutes = Math.round(minutes);
                        tDetenido =  rhours + " " + getLocale("Horas") + " " + rminutes + " " +getLocale("Minutos");
                    } else {
                        tDetenido = r.tiempodetenido + " " +getLocale("Minutos")
                    }
                    
                    if ((r.tiempototal-r.tiempodetenido) > 60) {
                        var num = (r.tiempototal-r.tiempodetenido);
                        var hours = (num / 60);
                        var rhours = Math.floor(hours);
                        var minutes = (hours - rhours) * 60;
                        var rminutes = Math.round(minutes);
                        tMovimiento =  rhours + " " + getLocale("Horas") + " " + rminutes + " " +getLocale("Minutos");
                    } else {
                        tMovimiento = (r.tiempototal-r.tiempodetenido) + " " +getLocale("Minutos")
                    }
                    
                    view.down('#primer').setValue(r.horadesde);
                    view.down('#ultimo').setValue(r.horahasta);
                    view.down('#cantidad').setValue(r.total+" "+getLocale("eventos"));
                    view.down('#maxVel').setValue(r.velocidadmax+" "+getLocale("km/h"));
                    view.down('#minVel').setValue(r.velocidadmin+" "+getLocale("km/h"));
                    view.down('#promVel').setValue(r.velocidadprom+" "+getLocale("km/h"));
                    view.down('#tDetenido').setValue(tDetenido);
                    view.down('#tMovimiento').setValue(tMovimiento);
                    
                    if (r.distanciaOdometro > 0)
                        view.down('#distancia').setValue(r.distanciaOdometro+" "+getLocale("km"));
                    else
                        view.down('#distancia').setValue(r.distanciaPoints+" "+getLocale("km"));
                    
                } else {
                    
                    // Limpio panel de resultados si la busqueda no devuelve información, originalmente quedaban cargados los ultimos.
                    view.down('#primer').setValue('');
                    view.down('#ultimo').setValue('');
                    view.down('#cantidad').setValue('');
                    view.down('#maxVel').setValue('');
                    view.down('#minVel').setValue('');
                    view.down('#promVel').setValue('');
                    view.down('#tDetenido').setValue('');
                    view.down('#tMovimiento').setValue('');
                    view.down('#distancia').setValue('');
                }
              } 
          }
        });
    }
    
})