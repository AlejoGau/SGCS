//MIGRADO2024
Ext.define('Common.view.VehicleHistoricoMapView', {
    extend : 'Ext.panel.Panel',
    alias: 'widget.vehiclehistoricomap',
    itemId: 'historicoMapView',
    layout : 'fit',
    velocidad: 1000,
    items : [
        {
            xtype: 'gmappanel6',
        	zoomLevel : 14,
            anchor: '100% 100%',
			gmapType : 'map',
            setCenter : {
    			lat : 0,
				lng : 0
			},
			mapConfOpts : ['enableScrollWheelZoom',	'enableDoubleClickZoom', 'enableDragging'],
			mapControls : ['GSmallMapControl', 'GMapTypeControl','NonExistantControl']
		}
    ]
    ,initComponent: function(){
        this.callParent();
        var viewGps = this;
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
		    items : [
                {
                    iconCls: 'icon-control-start',
                    pressed: false,
                    //toggleGroup: 'control',
                    action: 'start',
                    handler: function(btn, pressed){
                        var view = btn.up('#historicoMapView');
                        var mappanel = view.down('gmappanel6');
                        if (view.playerPosition)
                            view.playerPosition = 0;
                            var markers = mappanel.cache.marker;
                            var qtty = store.count();
                            var flecha= view.down('#btnFlechas').pressed;
                            Ext.Array.each(markers,function(m, index){
                                m.setIcon(controller.getMarkerIcon(index,qtty,false, m,flecha));
                            });
                            mappanel.getMap().setCenter(markers[0].getPosition());
                    }
                },
                {
                    iconCls: 'icon-control-play',
                    action: 'play',
                    itemId: 'play',
                    pressed: false,
                    toggleGroup: 'control'
                },
                {
                    iconCls: 'icon-control-stop',
                    pressed: true,
                    toggleGroup: 'control',
                    action: 'stop',
                    toggleHandler: function(btn, pressed){
                        var view = btn.up('#historicoMapView');
                        var mappanel = view.down('gmappanel6');
                        view.down('#btnFlechas').enable();
                        Ext.Array.each(mappanel.cache.marker, function(marker){
                            marker.setMap(mappanel.getMap());
                        });
                        if (view.playerMarker)
                            view.playerMarker.setMap(null);
                        if (view.player)
                            view.player.stop();
                    }
                },
                {
                    xtype: 'slider',
                    itemId: 'velocidad',
                    width: 50,
                    value: 1000,
                    increment: 100,
                    minValue: 100,
                    maxValue: 2000,
                    listeners: {
                        change: function(slider, newvalue){
                            var view = slider.up('#historicoMapView');
                            view.velocidad = newvalue;
                            if (view.player)
                                view.player.restart(newvalue);
                        }
                    }
                },'-',
                {
                    text: 'Detenido',
                    itemId: 'detenido',
                    iconCls:'icon-tg-stop',
                    pressed: true,
                    enableToggle: true,
                    toggleHandler: function(btn,pressed){
                        var view = btn.up('#historicoMapView');
                        var mappanel = view.down('gmappanel6');
                        mappanel.fireEvent('mapready', mappanel);
                    }
                },
                {
                    xtype:'numberfield'
                    ,fieldLabel: 'Vel Max.'
                    ,minValue: 20
                    ,itemId: 'velMax'
                    ,width: 120
                    ,labelWidth: 60
                },
                {
                    xtype:'displayfield',
                    itemId: 'posicionField'
                },'-',
                {
                    text : 'Exportar KML',
                    iconCls : 'icon-page-white-world',
                    action : 'exportKml',
                    itemId: 'exportKml'
                },
                {
                    text: 'Flechas',
                    enableToggle: true,
                    toggleGroup: 'tipoPunto',
                    pressed: true,
                    itemId: 'btnFlechas', 
                    toggleHandler: function(btn,pressed){
                        var view = btn.up('#historicoMapView');
                        var mappanel = view.down('gmappanel6');
                        if (!pressed){
                            //view.down('#btnPuntos').toggle(true,true);
                        }
                        mappanel.fireEvent('mapready', mappanel);
                    }
                },'-',
                {
                    text: 'Linea',
                    enableToggle: true,
                    toggleGroup: 'linea',
                    pressed: true,
                    itemId: 'btnLineas', 
                    toggleHandler: function(btn,pressed){
                        var view = btn.up('#historicoMapView');
                        var mappanel = view.down('gmappanel6');
                        mappanel.fireEvent('mapready', mappanel);
                    }
                },'-',
                {
                    text: 'Geocercas',
                    iconCls:'icon-geocerca',
                    enableToggle: true,
                    toggleGroup: 'geocercas',
                    itemId: 'btnGeocercas', 
                    toggleHandler: function(btn,pressed){
                        var view = btn.up('#historicoMapView');
                        var mappanel = view.down('gmappanel6');
                        mappanel.fireEvent('mapready', mappanel);
                    }
                },'->'
                ,{
                    text : 'Puntos de Interés',
                    iconCls : 'icon-poi',
                    menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        width: 420,
                        items: {
                            xtype : 'poigridview',
                            preventHeader: true,
                            height: 400,
                            gmap:viewGps.down('gmappanel6'),
                            width: 414,
                            listeners:{
                                selectionchange: function(selectionModel, record, options){
                                    var view = this.up('#historicoMapView');
                                    var gmap = view.down('gmappanel6');
                                    var pois = selectionModel.selected.items;
                                    view.fireEvent('poiChanged',pois, gmap);
                                    return false;
                                }
                            }
                        }
                    }
                }
            ]
        })
        this.addDocked(toolbar);
    }
})