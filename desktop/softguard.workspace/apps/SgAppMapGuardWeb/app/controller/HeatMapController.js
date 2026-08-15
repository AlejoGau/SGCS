Ext.define('SgAppMapGuardWeb.controller.HeatMapController', {
    extend : 'Ext.app.Controller',
    stores : [ 'TablaLineasStore' ],
    models : [ 'SoftguardCodigoAlarmaModel', 'TablasGruposSearchModel', 'TablasCodigosAlarmaSearchModel' ],
    views : [ 'HeatMapView' ],

    init : function(config) {
        this.control({
            'heatmapview' : {
                afterrender : this.initView
            },
            'heatmapview #heatmap' : {
                click : this.onHeatMapClick
            },
            'heatmapview #heatmapOff' : {
                click : this.onHeatMapOffClick
            },
            'heatmapview #grupos' : {
                select : this.onGrupoChange
            },
            'heatmapview #removeFilter' : {
                click : this.onRemoveFilter
            }
        })
    },

    initView: function(view) {
        var controller = this;
        
        
        /* Cargo el combo de CodigosAlarma */
        var codigoAlarmaStore = Ext.create('Ext.data.Store',{
            model: this.getSoftguardCodigoAlarmaModelModel(),
            autoload: false,
            sorters: [{
                 property: 'cod_cdescripcion',
                 direction: 'ASC'
             }],
             pageSize: 10000
        });
        var comboCodigoalarma = view.down('#codigoalarma');
        comboCodigoalarma.bindStore(codigoAlarmaStore);        
        codigoAlarmaStore.load();
        
        
        /* Cargo el combo de Grupo */
        var combostore = Ext.create('Ext.data.Store',{
            model: this.getTablasGruposSearchModelModel(),           
            pageSize: 200,
            remoteSort: true
        });   
        var comboGrupos = view.down('#grupos');
        comboGrupos.bindStore(combostore);        
        combostore.load({callback: function () {
           if(comboGrupos.getValue() == 0) {
               comboGrupos.setRawValue('')
           }
        }});
    },

    onHeatMapOffClick : function(btn, e, eOpts) {
        console.log('Oculto el HeatMap');
        
        var controller = this;
        var view = btn.up('mapguardgpsview');
        
        view.heatmap.setMap(null);
    },
    
    onGrupoChange : function(combo, records, options) {
        var form = combo.up('mapguardgpsview');
        var value = records[0].get('gru_ccodigo');
        var t = this;
        var codigosAlarmaStore = Ext.create('Ext.data.Store',{
            model: this.getSoftguardCodigoAlarmaModelModel(),           
            pageSize: 200,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property: 'cod_cGrupo',
                    value: value
                }
            ]
        });

        codigosAlarmaStore.load({
            callback : function(records, opciones, success) {
                if (opciones.success) {
                    var codigosalarma = form.down('#codigoalarma');
                    codigosalarma.clearValue();
                    codigosalarma.select(records);
                }
            }
        });
				
	},

    onHeatMapClick : function(btn, e, eOpts) {
        console.log('Actualizo el HeatMap');
        
        var controller = this;
        
        var viewCaller = btn.up('mapguardgpsview');
        var map = viewCaller.down('gmappanel6').getMap();
        var heatmap = viewCaller.heatmap;

        if (heatmap){
            heatmap.setMap(null);
        }
                
        /* genero la URL para filtrar el mapa del delito */
        var url = '/rest/search/mapadelito';
        
        /* Tomo los campos de la view del HeatMap */
        var view = btn.up('heatmapview');
        var dealer = view.down('#dealer').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();
        var fechadesde = view.down('#fechadesde').getValue();
        var horadesde = view.down('#horadesde').getValue();
        if(fechadesde)
            fechadesde = new Date(fechadesde.getTime()).setHours(horadesde.getHours());
        var fechahasta = view.down('#fechahasta').getValue();
        var horahasta = view.down('#horahasta').getValue();
        if(fechahasta)
            fechahasta = new Date(fechahasta.getTime()).setHours(horahasta.getHours());
        var codigoalarma = view.down('#codigoalarma').getValue();
        var grupo = view.down('#grupos').getValue();
        
        /* Genero el filter del Store de mapa del delito */
        var filter = [];
        
        if (dealer) {
            filter.push({
                property : 'cue_clinea',
                value : dealer
            })
        };
        if (cuentadesde) {
            filter.push({
                property : 'cue_ncuenta:GTESTRING',
                value : cuentadesde
            })
        };
        if (cuentahasta) {
            filter.push({
                property : 'cue_ncuenta:LTESTRING',
                value : cuentahasta
            })
        };
        if (fechadesde) {
            filter.push({
                property : 'rec_tfechahora:GTE',
                value : fechadesde
            })
        };
        if (fechahasta) {
            filter.push({
                property : 'rec_tfechahora:LTE',
                value : fechahasta
            })
        };
        if (codigoalarma) {
            var url = Ext.String.urlAppend(url, 'codigosalarma='+codigoalarma);
        }; 
        
        var url = Ext.String.urlAppend(url, 'filter='+Ext.encode(filter));    
        
        
        /* Para test de URL a filtrar
        console.log(url);
        */
        
        /* Cargo HeatMap */
        
        view.mask.show();
        Ext.Ajax.request({
          url: url,
          success: function(resp, operation) {
              
              // si la metadata del usuario tiene una provincia la sobre escribe para centrar el mapa
              if(resp.responseText)  {
                                          
                    var metadata = Ext.JSON.decode(resp.responseText);
                    if(metadata) {
                        var heatMapData = [];
                        if(metadata.rows && metadata.rows.length > 0){
                            Ext.Array.each(metadata.rows, function(row){
                                
                                heatMapData.push({
                                    location: new google.maps.LatLng(Number(row.gps_rLatitud),Number(row.gps_rLongitud)),
                                    weight: parseInt(row.weight)
                                })
                                
                            })
                            viewCaller.heatmap = new (window.__SgHeatmapLayer || google.maps.visualization.HeatmapLayer)({
                                data: heatMapData,
                                radius : 25
                            });
                            viewCaller.heatmap.setMap(map);
                        }else{
                            notify('No existe información para los filtros de búsqueda');
                        }  
                    }else{
                        notify('No existe información para los filtros búsqueda');
                    }
                    view.mask.hide();
                    
              }
        }})
        
        
    },
    
    onRemoveFilter : function (btn, e, eOpts) {
        console.log('ver todo en el mapa')
        var controller = this;
        
        var viewCaller = btn.up('mapguardgpsview');
        var map = viewCaller.down('gmappanel6').getMap();
        var heatmap = viewCaller.heatmap;
                
        /* genero la URL para filtrar el mapa del delito */
        var url = '/rest/search/mapadelito';
        
        /* Tomo los campos de la view del HeatMap */
        var view = btn.up('heatmapview');
        
        if (viewCaller.heatmap) {
            viewCaller.heatmap.setMap(null);
        }
        
        
        
        /* Cargo HeatMap */
        view.mask.show();
        Ext.Ajax.request({
          url: url,
          success: function(resp, operation) {
              
              // si la metadata del usuario tiene una provincia la sobre escribe para centrar el mapa
              if(resp.responseText)  {
                                          
                    var metadata = Ext.JSON.decode(resp.responseText);
                    if(metadata) {
                        var heatMapData = [];
                        Ext.Array.each(metadata.rows, function(row){
                            
                            heatMapData.push({
                                location: new google.maps.LatLng(Number(row.gps_rLatitud),Number(row.gps_rLongitud)),
                                weight: parseInt(row.weight)
                            })
                            
                        })
                        viewCaller.heatmap = new (window.__SgHeatmapLayer || google.maps.visualization.HeatmapLayer)({
                            data: heatMapData,
                            radius : 25
                        });  
                    }
                    view.mask.hide();
                    viewCaller.heatmap.setMap(map);
              }
        }})
    }


})