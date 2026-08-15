


Ext.define('iOT.view.iOTCuentaView', {
    extend: 'Ext.container.Container',
    alias : 'widget.iotcuentaview', 
	fullscreen: true,
    //height: 600,
	
	items:[

			{
				xtype: 'tabpanel',
				//height: 500,

				items: [
					{
						xtype: 'iotcuentagridgmapview',
					    //height: 500,
	
						title: 'Cuentas'
					},{
						xtype: 'iotsolicitudesaccesoview',
						
						height: 600,

						title: 'Solicitudes de Acceso'
					}
				]
			}

	],
    initComponent: function () {   
        


		this.callParent(arguments);

    }

});

																
