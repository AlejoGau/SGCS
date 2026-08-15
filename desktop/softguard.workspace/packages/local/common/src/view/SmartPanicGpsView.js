//MIGRADO2024
Ext.define( 'Common.view.SmartPanicGpsView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.smartpanicgpsview',
    layout: 'border',
    frame: false,
    shortToolbar: false,
    border: 0,
    items: [
        {
            xtype: 'gmappanel6',
            itemId: 'googlemap',
            region: 'center',
            zoomLevel: 14,
            //gmapType : 'map',
            mapConfOpts: [ 'enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging' ],
            mapControls: [ 'GSmallMapControl', 'GMapTypeControl', 'streetViewControl', 'NonExistantControl' ]/*{'GSmallMapControl':true,
                'GMapTypeControl':true,
                'streetViewControl':true,
                'NonExistantControl':true,
                'fullscreenControl':false}*///
        }],
    initComponent: function() {
        this.callParent();
        var record = this.record;
        var map = this.down( 'gmappanel6' );
        if( typeof this.center === "string" ) {
            var acenter = this.center.split( ',' );
            map.setCenter = { lat: acenter[ 0 ], lng: acenter[ 1 ] };
        }
        if( record && record.get( "gps_rLatitud" ) && record.get( "gps_rLongitud" ) ) {
            map.setCenter = { lat: record.get( "gps_rLatitud" ), lng: record.get( "gps_rLongitud" ) }
        }
        if( record && record.get( "gps_rlatitud" ) && record.get( "gps_rlongitud" ) ) {
            map.setCenter = { lat: record.get( "gps_rlatitud" ), lng: record.get( "gps_rlongitud" ) }
        }
        if( this.zoomLevel ) {
            map.zoomLevel = this.zoomLevel;
        }
        var items = [];
        if (!this.shortToolbar){
            items = [ {
                    text: 'Mostrar Seguimiento',
                    iconCls: 'icon-seguimiento',
                    enableToggle: true,
                    action: 'mostrarposiciones',
                    itemId: 'mostrarposiciones'
                }, {
                    text: 'Mostrar geocercas',
                    iconCls: 'icon-geocercas',
                    enableToggle: true,
                    action: 'mostrargeocercas',
                    itemId: 'mostrargeocercas'
                }, {
                    text: 'Mostrar Grupo',
                    iconCls: 'icon-group',
                    enableToggle: true,
                    action: 'mostrarsmartpanics',
                    itemId: 'mostrarsmartpanics'
                }
            ];
        }
        Ext.Array.push(items,[ {
            text: 'Cambiar a Manual',
            iconCls: 'icon-center',
            //  enableToggle: true,
            _pressed: true,
            itemId: 'center',
            action: 'center'
        }]);
        
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: items
        });
        this.addDocked( toolbar );
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            dock: 'bottom',
            items: [ {
                xtype: 'displayfield',
                fieldStyle: {
                    'font-weight': 'bold'
                },
                translate: false,
                itemId: 'direccion'
            }, "->",
                {
                    xtype: 'container',
                    itemId: 'iconosmapa'
                }
            ]
        });
        this.addDocked( toolbar );
    }
});