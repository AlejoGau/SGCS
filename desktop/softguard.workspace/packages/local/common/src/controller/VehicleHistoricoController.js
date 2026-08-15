//MIGRADO2024
function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}
Ext.define('Common.controller.VehicleHistoricoController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.SoftguardAlarmasMovilStore' ],
    models : [ 'VehicleDetenidoSearchModel', 'TablaHistoricoPosicionesSearchModel', 'GeocercaMapModel', 'GpsHistoricoSearchModel', 'SoftguardCodigoAlarmaModel' ],
    views : [ 'VehicleHistoricoView' ],
    init : function(config) {
    	this.control({
            'vehiclehistorico':{
                //expand: this.loadData,
                afterrender : this.initview,
                setrecord: this.onSetRecord,
                expand: this.onExpand
            },
            'flotagpsview' : {
                vehicleSelected: this.onVehicleSelected
            },
            'vehiclehistorico button[action=Mostrar]' : {
                click: this.onMostrarClick
            },
            'vehiclehistorico button[action=Buscar]' : {
                click: this.onBuscarClick
            },
            'vehiclehistorico button[action=Exportar]' : {
                click: this.onExportarClick
            },
            'vehiclehistorico button[action=openwindow]' : {
                click: this.onOpenWindowClick
            },
            'vehiclehistorico button[action=minutos-15]' : {
                click: this.onMinutos15Click
            },
            'vehiclehistorico button[action=minutos-30]' : {
                click: this.onMinutos30Click
            },
            'vehiclehistorico button[action=minutos-45]' : {
                click: this.onMinutos45Click
            },
            'vehiclehistorico button[action=minutos-60]' : {
                click: this.onMinutos60Click
            },
            'vehiclehistorico button[action=pdf]' : {
                click: this.onExportarClick
            },
            'vehiclehistorico #combohistorico' : {
                select: this.onComboHistoricoSelect,
                change: this.onComboHistoricoChange
            }
        });
    
    }, // cierro init
    onComboHistoricoSelect: function(combo, records, eOpts ){
        var view = combo.up('vehiclehistorico');
        var value = combo.getValue();
        var fechadesde = view.down('#fechaDesde');
        var fechahasta = view.down('#fechaHasta');
      
        if(value != view.dateSelected) {
            fechadesde.setValue('');
            fechahasta.setValue('');
            
            // Al limpiar el combo de Historico, bloqueo los mes en curso del reporte
            view.down('#fechaDesde').setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            view.down('#fechaHasta').setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
        }
      
      if(value) {
          var fechahistorico = value.match(/\d{4}/g) + "-" + value.match(/\d{2}$/g);
          var month = value.match(/\d{2}$/g) - 1;
          
          var fechahistoricodesde = Ext.Date.getFirstDateOfMonth(new Date(value.match(/\d{4}/g),month));
          var fechahistoricohasta = Ext.Date.getLastDateOfMonth(new Date(value.match(/\d{4}/g),month));
          
          /*
          fechadesde.setValue(fechahistoricodesde);
          fechahasta.setValue(fechahistoricohasta);
          */
          
          fechadesde.setMinValue(fechahistoricodesde);
          fechadesde.setMaxValue(fechahistoricohasta);
          fechahasta.setMinValue(fechahistoricodesde);
          fechahasta.setMaxValue(fechahistoricohasta);
          if(fechadesde.getValue() || fechahasta.getValue()) {
              
              if( fechadesde.getValue() && new Date(fechadesde.getValue()).getTime() < fechahistoricodesde) {
                  fechadesde.markInvalid("Se encuentra fuera de rango");
              }
              
              if( fechahasta.getValue() && new Date(fechahasta.getValue()).getTime() > fechahistoricohasta) {
                  fechahasta.markInvalid("Se encuentra fuera de rango");    		  
              }
              
          } else {
              fechadesde.setValue(fechahistoricodesde);
              fechahasta.setValue(fechahistoricohasta);
          }
      }
      
      view.dateSelected = value;
    },
    onComboHistoricoChange: function(combo, records, eOpts ){
        var controller = this;
        var view = combo.up('vehiclehistorico');
        var value = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#fechadesde');
        var fechahasta = view.down('#fechahasta');
        
        if(!value) {
            fechadesde.setValue('');
            fechahasta.setValue('');
            
            // Seteo el Min y Max a ambos combo.
            fechadesde.setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            fechadesde.setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
            fechahasta.setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            fechahasta.setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
            
            // Seteo la fecha en los combo del primer dia del mes y el de hoy
            fechadesde.setValue(Ext.Date.getFirstDateOfMonth(new Date()));
            fechahasta.setValue(new Date());
            
        }
    },
    DosDigitos: function (valor) {
        if (valor < 10) {
            return ("0" + valor.toString());
        } else {
            return valor.toString();
        }  
    },
    
    onMinutos15Click: function (button) {
        var view = button.up('vehiclehistorico');
        var now = new Date();
        view.down('#fechaHasta').setValue(now);
        view.down('#tiempoHasta').setValue(this.DosDigitos(now.getHours())+":"+this.DosDigitos(now.getMinutes()));
        now.setMinutes(now.getMinutes() - 15)
        view.down('#tiempoDesde').setValue(this.DosDigitos(now.getHours())+":"+this.DosDigitos(now.getMinutes()));    
        
        view.down('#fechaDesde').setValue(now); 
        this.onBuscarClick(button);
    },
    
    onMinutos30Click: function (button) {
        var view = button.up('vehiclehistorico');
        var now = new Date();
        view.down('#fechaHasta').setValue(now);
        view.down('#tiempoHasta').setValue(this.DosDigitos(now.getHours())+":"+this.DosDigitos(now.getMinutes()));
        now.setMinutes(now.getMinutes() - 30)
        view.down('#tiempoDesde').setValue(this.DosDigitos(now.getHours())+":"+this.DosDigitos(now.getMinutes()));    
        
        view.down('#fechaDesde').setValue(now); 
        
        this.onBuscarClick(button);
    },
    
    onMinutos45Click: function (button) {
        var view = button.up('vehiclehistorico');
        var now = new Date();
        view.down('#fechaHasta').setValue(now);
        view.down('#tiempoHasta').setValue(this.DosDigitos(now.getHours())+":"+this.DosDigitos(now.getMinutes()));
        now.setMinutes(now.getMinutes() - 45)
        view.down('#tiempoDesde').setValue(this.DosDigitos(now.getHours())+":"+this.DosDigitos(now.getMinutes()));    
        
        view.down('#fechaDesde').setValue(now); 
        
        this.onBuscarClick(button);
    },
    
    onMinutos60Click: function (button) {
        var view = button.up('vehiclehistorico');
        var now = new Date();
        view.down('#fechaHasta').setValue(now);
        view.down('#tiempoHasta').setValue(this.DosDigitos(now.getHours())+":"+this.DosDigitos(now.getMinutes()));
        now.setMinutes(now.getMinutes() - 60)
        view.down('#tiempoDesde').setValue(this.DosDigitos(now.getHours())+":"+this.DosDigitos(now.getMinutes()));    
        
        view.down('#fechaDesde').setValue(now); 
        
        this.onBuscarClick(button);
    },
    
    initview: function(view) {
        var me = this;
        this.view = view;
        if (!view.record){
            view.record = Ext.getCmp('viewport').record;
        }
        var record = view.record;
        var tool = view.down('#maximizer');
        
        if (!tool && view.tools){
            view.addTool({
                type: 'maximize', 
                itemId: 'maximizer',
                handler: function(event,img,view,tool){
                    me.onOpenWindowClick(tool)
                }
                
            });
        }
        view.down('#TGTIEMPODETENIDO').setValue(getParametro('TGTIEMPODETENIDO'));
        var historicoStore = Ext.create('Ext.data.Store',{
            model: this.getTablaHistoricoPosicionesSearchModelModel(),
            autoload: false,
            sorters: [{
                    property: 'c_periodo',
                    direction: 'DESC'
                }],
                pageSize: 10000
        });
        var comboHistorico = view.down('#combohistorico');
        comboHistorico.bindStore(historicoStore);
        historicoStore.load();
    },

    onExpand: function(view) {
        // Bug MapGuardWeb: este panel se crea colapsado dentro del accordion
        // "Informe" del detalle de movil (vehicleslavegpsview #datapanel).
        // Los hbox de las filas Desde/Hasta calculan su layout mientras el
        // panel todavia esta colapsado (ancho 0), y ese calculo queda
        // pisado: al expandir, los campos (combo/fecha/hora) terminan
        // superpuestos todos en el mismo x en vez de uno al lado del otro,
        // por lo que el trigger de "Desde" queda inalcanzable. Forzar un
        // recalculo de layout al expandirse soluciona la superposicion.
        view.updateLayout();
    },

    getStore: function(view){
        var controller = this;
        view.controller = this;
        var o = Ext.create('Ext.data.Store',{
            model: this.getGpsHistoricoSearchModelModel(),
            view: view,
            remoteFilter: true,
            pageSize: 500,
            listeners: {
                //datachanged: controller.updateResumen
            }
        });
        var p = o.getProxy();
        p.on('exception', function(){
            if (controller.view)
            controller.view.setLoading(false);  
        });
        return o;
    },
    
    onSetRecord: function(record,view){
        view.record = record;
        this.loadData(view);
    },
    
    onVehicleSelected: function(record, flotagpsview){
        var dataPanel = flotagpsview.down('#datapanel');
        
        if (dataPanel)
            var view = dataPanel.down('vehiclehistorico');
        
        var me = this;
        
        if (view){
            view.record = record;
            view.down('image').hide();
            view.down('grid').hide();
            
            
            if (!view.collapsed){
                this.loadData(view);
            }
        }
    },
    
    loadData: function (view) {
        var grid = view.down('grid');
        var store = grid.getStore();
        var eventosCombo = view.down('#comboeventos');
        var eventos = '';
        
        Ext.Array.each(eventosCombo.getValue(), function(value,index){
            if (index == 0){
                eventos = '\''+value+'\'';
            } else
            {
                eventos = eventos +',\''+value+'\'';
            }
        });
        
        //view.setLoading(true);
        
        if (store.storeId == 'ext-empty-store')
        {
            var st = this.getStore(view);
            
            if (!view.collapsed){
                grid.bindStore(st);
            }
            
            view.down('pagingtoolbar').bindStore(st);
            store = grid.getStore();
        }
        
        var fechaDesde = view.down('#fechaDesde').getValue();
        var fechaHasta = view.down('#fechaHasta').getValue();
        var tiempoDesde = view.down('#tiempoDesde').getValue();
        var tiempoHasta = view.down('#tiempoHasta').getValue();
        var comboHistorico = view.down('#combohistorico').getValue();
        // Bug MapGuardWeb: en un store recien creado (primera busqueda de la
        // sesion para este vehiculo) store.filters todavia no existe: la
        // FilterCollection se crea de forma lazy recien dentro de getFilters().
        // Acceder a store.filters directo tira "Cannot read properties of
        // null (reading 'clear')" y aborta loadData antes de llegar a
        // store.filter(filters) mas abajo, por lo que la grilla nunca llega
        // a pedir posiciones (aunque el resumen, que es un request aparte,
        // se actualiza igual).
        store.getFilters().clear();
        store.currentPage = 1;
        var qty = view.down('#qty').getValue();
        store.pageSize = qty;
        if(comboHistorico)
            store.proxy.extraParams = {
                tabla:comboHistorico
            };
        var filtersbase = [{
                property:'fechaDesde',
                value: Ext.Date.format(fechaDesde, 'Y-m-d ')+Ext.Date.format(tiempoDesde, 'H:i:s')
            },{
                property:'fechaHasta',
                value: Ext.Date.format(fechaHasta, 'Y-m-d ')+Ext.Date.format(tiempoHasta, 'H:i:s')
            },{
                property:'pos_cimei',
                value: view.record.get('cue_cimei')
            },{
                property:'pos_idCuenta',
                value: view.record.get('cue_iid')
            }
        ];
        var filters= Ext.Array.clone(filtersbase);
        
        if (eventos){
            filters.push({
                property:'alarmas',
                value: eventos
            })
        }
        var params;
        var TGTIEMPODETENIDO = view.down('#TGTIEMPODETENIDO').getValue();
        if (TGTIEMPODETENIDO>0){
            params={detenidoLimit:TGTIEMPODETENIDO}
        }
        store.filter(filters);
        view.storeDetenido = Ext.create('Ext.data.Store',{
            model: this.getVehicleDetenidoSearchModelModel(),
            remoteSort: true,
            remoteFilter: true,
            filters: filtersbase,
            pageSize: 500
        });
        if (comboHistorico){
            view.storeDetenido.proxy.extraParams = {
                tabla:comboHistorico
            };
            
        }
        view.down('#griddetenido').bindStore(view.storeDetenido);
        view.storeDetenido.load({params:params});
    },
    updateResumen2: function(view){
        view.down('#btnMostrar').enable();
        view.down('#btnExportar').enable();
        view.down('#btnPdf').enable();
        var fechaDesde = view.down('#fechaDesde').getValue();
        var fechaHasta = view.down('#fechaHasta').getValue();
        var tiempoDesde = view.down('#tiempoDesde').getValue();
        var tiempoHasta = view.down('#tiempoHasta').getValue();
        var comboHistorico = view.down('#combohistorico').getValue();
        var TGTIEMPODETENIDO = view.down('#TGTIEMPODETENIDO').getValue();
        var paramtabla='';
        if(comboHistorico)
            paramtabla='&tabla='+comboHistorico
        
        var filters = [{
                property:'fechaDesde',
                value: Ext.Date.format(fechaDesde, 'Y-m-d ')+Ext.Date.format(tiempoDesde, 'H:i:s')
            },{
                property:'fechaHasta',
                value: Ext.Date.format(fechaHasta, 'Y-m-d ')+Ext.Date.format(tiempoHasta, 'H:i:s')
            },{
                property:'pos_idCuenta',
                value: view.record.get('cue_iid')
            }
            ,{
                property:'pos_cimei',
                value: view.record.get('cue_cimei')
            }
        ];
        
        Ext.Ajax.request({
          url: '/Rest/Search/TrackGuard_PosicionesGPS_resumen_hist?detenidoLimit='+TGTIEMPODETENIDO+'&filter='+JSON.stringify(filters)+paramtabla+'&limit='+view.down('#qty').getValue(),
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
    },
    
    updateResumen: function(store){
        var view = store.view;
        var cantidad = store.getCount();
        var maxVel = 0; 
        var minVel = 1000; 
        var sumVel = 0;
        var promVel = 0;
        var tDetenido = 0;
        var tMovimiento = 0;
        var distancia = 0;
        
        if (cantidad > 0){
            var first = store.getAt(0);
            var last = store.getAt(cantidad-1);
            var fechaAnterior = null;
            var velAnterior = 0;
            var tDetenido = 0;
            var tMovimiento = 0;
            var lat1 = 0;
            var lon1 = 0;
            var controller = this;
            var odometroinicial = 0;
            
            view.down('#btnMostrar').enable();
            view.down('#btnExportar').enable();
            view.down('#btnPdf').enable();
            view.down('#primer').setValue(Ext.Date.format(first.get('gps_isorawfechahora'),'Y-m-d H:i:s'));
            view.down('#ultimo').setValue(Ext.Date.format(last.get('gps_isorawfechahora'),'Y-m-d H:i:s'));
            view.down('#cantidad').setValue(cantidad + ' '+getLocale('Eventos'));
            
            store.each(function(rec, index, total){
                var vel = rec.get('gps_iVelocidad');
                var distDiferencial = 0;
                
                // calculo la distancia entre puntos y la sumo
                var lat2 = toRad(rec.get('gps_rLatitud'));
                var lon2 = toRad(rec.get('gps_rLongitud'));
                var R = 6371; // km radio medio de la tierra
                // verifico que no sea el primer punto
                var odometro = parseInt(rec.get('gps_iOdometro'))/1000;
                if (index>0){
                    
                    // me fijo si tiene odometro
                    if (odometro > 0){
                        distDiferencial = odometro - odometroinicial;
                        odometroinicial = odometro;
                    } else {
                        var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
                        var y = (lat2-lat1);
                        distDiferencial = Math.sqrt(x*x + y*y) * R;
                    }
                    
                    distancia = distancia + distDiferencial;
                    rec.set('_distancia',distDiferencial);
                } else {
                    odometroinicial = odometro;
                }
                lat1 = lat2;
                lon1 = lon2;
                
                
                
                if (vel > maxVel) {
                    maxVel = vel;     
                }
                
                if (vel < minVel) {
                    minVel = vel;
                }
                
                sumVel = sumVel + vel;
                if (index > 0 && vel > 10){
                    var elapsed = rec.get('gps_isorawfechahora') - fechaAnterior; // milisegundos
                    var horas = (elapsed / 1000) / 3600;
                    var minutos = elapsed/60000;
                    
                    tMovimiento = tMovimiento + minutos;
                    
                } else if (index > 0) {
                    var elapsed = rec.get('gps_isorawfechahora') - fechaAnterior; // milisegundos
                    var horas = (elapsed / 1000) / 3600;
                    var minutos = elapsed/60000;
                    
                    tDetenido = tDetenido + minutos;
                }
                //console.log(distancia,minutos,tDetenido, tMovimiento, index, vel);
                fechaAnterior = rec.get('gps_isorawfechahora');
                velAnterior = vel;
            });
            
            promVel = Ext.util.Format.round(sumVel / cantidad,0);
            
            view.down('#maxVel').setValue(maxVel + ' Km/h');
            view.down('#minVel').setValue(minVel + ' Km/h');
            view.down('#promVel').setValue(promVel + ' Km/h');
            view.down('#tDetenido').setValue(Ext.util.Format.round(tDetenido,0) + ' '+getLocale('minutos'));
            view.down('#tMovimiento').setValue(Ext.util.Format.round(tMovimiento,0) + ' '+getLocale('minutos'));
            view.down('#distancia').setValue(Ext.util.Format.round(distancia,0) + ' Km');
            view.controller.onMostrarClick(view.down('#btnMostrar'));
                
        }else{
            view.down('#btnMostrar').disable();
            view.down('#btnExportar').disable();
            view.down('#primer').setValue('');
            view.down('#ultimo').setValue('');
            view.down('#cantidad').setValue(0);
            view.down('#maxVel').setValue('');
            view.down('#minVel').setValue('');
        }
        
        view.setLoading(false);
    },
    
    doBindStore: function(records,operation,success){
        if (success){
            var view = operation.view;
            view.bindStore(operation.store);     
            view.down('pagingtoolbar').bindStore(store);
        }
    },
    
    onBuscarClick: function(button){
        var view = button.up('vehiclehistorico');
        this.updateResumen2(view);
        this.loadData(view);
    },
    onExportarClick: function(button){
        var view = button.up('vehiclehistorico');
        var grid = view.down('grid');
        var store = grid.getStore();
        var filters = store.filters;
        var record = view.record;
        var comboHistorico = view.down('#combohistorico').getValue();
        
        // Id de vehiculo
        var idVehicle = record.get('Id')
        
        var min = [],
            length = filters.getCount(),
            i = 0;
        for (; i < length; i++) {
            min[i] = {
                property: filters.get(i).property,
                value   : filters.get(i).value
            };
        }
        
        // var url = '/Rest/Search/TGReporteGPS.xls'; //cambio reporte pedido CEO
        var url = '/handler/TGReporteGPS'
        url = Ext.String.urlAppend(url, 'oauth_token='+Ext.util.Cookies.get('OAuth_Token'));
        url = Ext.urlAppend(url,'filter='+Ext.encode(min));
        url = Ext.urlAppend(url,'Id='+idVehicle);
        if(comboHistorico)
            url = Ext.urlAppend(url,'tabla='+comboHistorico)
        
        var qty = view.down('#qty').getValue();
        url = Ext.urlAppend(url,'limit=' + qty);
        
        if (button.action == "pdf") {
            var URLDESKTOP = getParametro('URLDESKTOP');
            url = '/handler/Html2PdfNreco?oauth_token=8CDCD4D5-8284-48C0-B75A-4D3AAF379C87&url='+URLDESKTOP+encodeURIComponent(url);
            window.open(url,'_blank');
        } else {
            url = Ext.urlAppend(url,'exportToExcel=true');
            location.target = '_blank';
            location.href = url; 
        }
    },
    
    onOpenWindowClick: function(button){
        var view = button.up('vehiclehistorico');
        var record = view.record;
        var win = Ext.create('Ext.Window', {
        	layout : 'fit',
			title : 'Histórico de posiciones',
			closeAction : 'destroy',
            maximizable: true,
			width : 800,
			height : 600,
			border : false,
			items : [
                {
                    xtype: 'vehiclehistorico',
                    record: record
                }
            ]
        });
        view.win = win;
        win.show();
    },
    
    mostrarGeocerca: function(record,index, array){
        var controller = this.controller;
        var me = this.controller;
        var map = this.gmappanel6;
        var gmappanel6 = this.gmappanel6;
        var metadata = Ext.create(me.getGeocercaMapModelModel());
        var tipo = record.get('GeoType');
        var color = '';
        
        if (tipo == 'E') {
            color = 'Red';
        } else {
            color = 'Green';
        }
        
        metadata.data = Ext.JSON.decode(record.get('MetaData'));
        
        if (metadata.get('Type') == 'circle'){
            var newShape = new google.maps.Circle({
                strokeColor: color,
                fillColor: color
            });
            
            var center = new google.maps.LatLng(
                metadata.get('CenterLat'),
                metadata.get('CenterLng')
            );
            newShape.setCenter(center);
            newShape.setRadius(metadata.get('Radius'));
            newShape.setMap(map.getMap());
            gmappanel6.geocerca = newShape;
            var bounds = newShape.getBounds();
            map.getMap().fitBounds(bounds);
        }
        
        if (metadata.get('Type') == 'polygon'){
            var newShape = new google.maps.Polygon({
                strokeColor: color,
                fillColor: color
            });
            var pathArray = Ext.JSON.decode(metadata.get('Path'));
            var path = new google.maps.MVCArray();
            
            Ext.Array.each(pathArray,function(item){
                var latlng = new google.maps.LatLng(
                    item.lat,
                    item.lng
                )
                path.push(latlng);
            });
            
            newShape.setPath(path);
            newShape.setMap(map.getMap());
            gmappanel6.geocerca = newShape;
            var bounds = newShape.getBounds();
            //map.fitBounds(bounds);
        }
    },
    
    onMostrarClick: function(button){
        var view = button.up('vehiclehistorico');
        var vehicle = view.record;
        var grid = view.down('grid');
        var store = grid.getStore();
        var controller = this; 
        var velocidad = 1000;
        var win = Ext.create('Ext.Window', {
            itemId: 'historicoWin',
            maximizable: true,
    		layout : 'fit',
			closeAction : 'destroy',
			width : 700,
			height : 450,
			border : false,
            items : [
                {
                    xtype:'vehiclehistoricomap',
                    _store: store,
                    _storeDetenidos : view.storeDetenido,
                    vehicle: vehicle,
                    velocidad: 1000
                }
            ]
        }).show();	
    },
    
    getMarkers: function(store, vehicle, flecha){
        var points = new Array();
        var markers = new Array();
        var controller = this;
        store.each(function(record, index, total){
            // filtro puntos para moviles autos (no mascotas ni personas
            if (record.get('tip_nTipo')==1&&record.get('gps_iVelocidad')<10 && record.get('_distancia')<0.08 && index != 0 && index != total-1){
                //console.log(record.get('gps_iVelocidad'),record.get('_distancia'));
                return;
            }
            else{
                points.push({lat: record.get('gps_rLatitud'), lng: record.get('gps_rLongitud'),fecha: record.get('gps_isorawfechahora')});
                markers.push(new google.maps.Marker(
                    {
                        position: new google.maps.LatLng(record.get('gps_rLatitud'),record.get('gps_rLongitud')),
                        lat : record.get('gps_rLatitud'),
                        lng : record.get('gps_rLongitud'),
                        record: record,
                        title : Ext.Date.format(record.get('gps_isorawfechahora'),'Y-m-d H:i:s'),
                        icon: controller.getMarkerIcon(index, total,false,{record:record}, flecha),
                        infoWindow: {
                            content: controller.getVehicleInfoWindowHtml(vehicle,record), 
                            listener:'click'
                        },
                        draggable : false
                    }
                ));
            }
        });
        
        return {points:points, markers:markers}
    },
    getMarkerIcon: function(i,total,old,marker,flecha){
        var selected = '';
        var iconUrl = '';
        var record = marker?marker.record:null;
        
        switch (i)
        {
            case 0:
                iconUrl = '/resources/softguard/images/start.png';
                var image = new google.maps.MarkerImage(
                    iconUrl,
                    new google.maps.Size(32,37),
                    new google.maps.Point(0,0),
                    new google.maps.Point(16,37)
                );
                break;
            case total-1:
                iconUrl = '/resources/softguard/images/finish.png';
                var image = new google.maps.MarkerImage(
                    iconUrl,
                    new google.maps.Size(32,37),
                    new google.maps.Point(0,0),
                    new google.maps.Point(16,37)
                );
                break;
            default:
                var rotation = 0;
                var path = google.maps.SymbolPath.FORWARD_CLOSED_ARROW;
                if (record && record.get('gps_Rumbo')){
                    switch (record.get('gps_Rumbo'))
                    {
                        case 'up':
                            rotation = 0;
                            break;
                        case 'upright':
                            rotation = 45;
                            //rotation = 0;
                            break;
                        case 'right':
                            rotation = 90;
                            //rotation = 0;
                            break;
                        case 'downright':
                            rotation = 135;
                            //rotation = 0;
                            break;
                        case 'down':
                            rotation = 180;
                            //rotation = 0;
                            break;
                        case 'downleft':
                            rotation = 225;
                            //rotation = 0;
                            break;
                        case 'left':
                            rotation = 270;
                            //rotation = 0;
                            break;
                        case 'upleft':
                            rotation = 315;
                            //rotation = 0;
                            break;
                        case 'stop':
                            rotation = 0;
                            path = google.maps.SymbolPath.CIRCLE;
                            break;
                    }
                }
                
                if (record.get('gps_iVelocidad') == 0){
                    rotation = 0;
                    path = google.maps.SymbolPath.CIRCLE;
                }
                // me fijo si mostrar flechas o circulos
                if (flecha){
                    var image = {
                        path: path,
                        scale: 4,
                        rotation: rotation,
                        fillColor : 'red',
                        fillOpacity : 0.5,
                        strokeWeight: 1,
                        strokeColor: 'red'
                    };
                }else {
                    iconUrl = old?'/resources/softguard/images/icon_dot_verde.gif':'/resources/softguard/images/icon_dot-nonew.gif';
                    var image = new google.maps.MarkerImage(
                        iconUrl,
                        new google.maps.Size(10,10),
                        new google.maps.Point(0,0),
                        new google.maps.Point(5,5)
                    );
                }
                break;
            
        }
        return image;
    },
    
    getVehicleInfoWindowHtml: function(vehicle, gps){
        var html = '\
            <H1>{dealer}-{ncuenta} {cuenta}</H1>\
            <span style="font-weight:bold;">'+getLocale('Velocidad')+':</span><span> {velocidad}km/h</span><br/>\
            <span style="font-weight:bold;">'+getLocale('Fecha recepción')+':</span><span>  {fecha}</span><br/>\
            <span style="font-weight:bold;">'+getLocale('Fecha GPS')+':</span><span>  {fechaRaw}</span><br/>\
            <span style="font-weight:bold;">'+getLocale('Dirección')+':</span><span>  {direccion}</span><br/>\
            <span style="font-weight:bold;">'+getLocale('Evento')+':</span><span>  {evento}</span><br/>\
            <span style="font-weight:bold;">'+getLocale('Odómetro')+':</span><span>  {odometro}</span><br/>\
            <!-- span style="font-weight:bold;">'+getLocale('Rumbo')+':</span><span>  {rumbo}</span><br/-->';
        
        html = html.replace(/\{dealer\}/, vehicle.get('cue_clinea'));
        html = html.replace(/\{ncuenta\}/, vehicle.get('cue_ncuenta'));
        html = html.replace(/\{nombre\}/, vehicle.get('Domain'));
        html = html.replace(/\{cuenta\}/, vehicle.get('cue_cnombre'));
        html = html.replace(/\{velocidad\}/, gps.get('gps_iVelocidad'));
        html = html.replace(/\{rumbo\}/, gps.get('gps_Rumbo'));
        html = html.replace(/\{direccion\}/, gps.get('gps_cDireccion'));
        html = html.replace(/\{fechaRaw\}/, Ext.Date.format(gps.get('gps_isorawfechahora'), 'd-m-Y H:i:s'));
        html = html.replace(/\{fecha\}/, Ext.Date.format(gps.get('gps_isofechahora'), 'd-m-Y H:i:s'));
        html = html.replace(/\{evento\}/, gps.get('cod_cdescripcion'));
        html = html.replace(/\{odometro\}/, gps.get('gps_iOdometro'));
        return html
    },
    
    getBounds: function(markers) {
        var bounds = new google.maps.LatLngBounds();
        Ext.each(markers, function (marker,index,array) {
            var point = new google.maps.LatLng(marker.lat, marker.lng);
            bounds.extend(point);
        });
        return bounds
    },
    
    getVehicleIcon: function(record){
        var color = '';
        if (record.get('gps_iVelocidad') == 0){
            iconUrl = '/resources/softguard/images/stop'+color+'.png';
        }
        else{
            iconUrl = '/resources/softguard/images/direction_'+record.get('gps_Rumbo')+color+'.png';
        }
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(32,37),
            new google.maps.Point(0,0),
            new google.maps.Point(16,37)
        );
        
        return image;
    }
});