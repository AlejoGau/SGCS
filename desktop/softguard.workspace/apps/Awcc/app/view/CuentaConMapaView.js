Ext.define('Awcc.view.CuentaConMapaView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.cuentaconmapaview',
    preventHeader: true,
    frame : false,
    fieldDefaults : {
        labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
    layout:'border',
	items : [
        {
            xtype:'awcccuentagridview',
            region:'center',
            mostrarparticion: true,
            preventHeader: true,  
            idTargetPanel: 'awcctabpanel',     
            autoRefresh: 60000,
            pageSize: 200,
            noShowPaginator: true,
            securityId: 11,
            width:'50%',
            fireSelectionChange: false, // BC 383011806 : Configuracion que en cada evento de click de la grilla, ejecuta el evento markersDealerChange. Se pasa a false.
            feireSelectionChangeCaller:'cuentaconmapaview',
            initAllSelected: false, // BC 383011806 : Configuracion que, siendo checkbox hace que seleccione todos al iniciar. Se pasa a false, se quitan checkbox y se pasa a GeoJSON
            soloAccesoWeb: true
            
        },{
            xtype: 'gmappanel6',
            cls: 'gmappanel6',
            id: 'googlemap',
            //anchor: '100% 100%',
            //region: 'center',
            zoomLevel : 2,
            gmapType : 'map',
            mapConfOpts:  { 
                scrollwheel: true, 
                disableDoubleClickZoom: false, 
                draggable: true, 
                streetViewControl: false, 
                overviewMapControl: true,
                overviewMapControlOptions: {
                    opened: true
                }
            },
            region:'east',
            width:'50%'
           
        }],

	initComponent : function() {
	    this.callParent(arguments);
        this.down('awcccuentagridview').caller = this.down('#googlemap')
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [              
               {
                   text:'Eventos',
                   itemId:'todoseventos',                   
                   enableToggle: true
               },{
        			text : 'Cambiar a Manual',
					iconCls : 'icon-center',
                    _pressed: true,
                    itemId: 'center',
					action : 'center'
				}
            ]// cierro items
         }); 
         
        
       // this.down('#googlemap').addDocked(toolbar);

	} // cierro init

});
