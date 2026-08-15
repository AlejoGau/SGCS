Ext.define('AccessControl.view.AC_accesoPersonaView', {
	extend: 'Ext.form.Panel',
	alias: ['widget.ac_accesopersonaview'],
	border: 0,
	bodyPadding: 0,
    itemId: 'ac_accesopersonaview',
    height: 500,
    layout:{
        layout: {
            type:'hbox'
        }
    },
	items: [    
        {
            xtype: 'container',
            layout:'column',
            items:[
                {
                    columnWidth:'0.40',
                    itemId:'cuadro1'
                },{
                    columnWidth:'0.60',
                    itemId:'cuadro2'
                
                }
            ]
        },{
            xtype: 'container',
            layout:'column',
            items:[
                {
                    columnWidth:'0.40',
                    itemId:'cuadro3',
                },{

                    columnWidth:'0.60',
                    itemId: 'cuadro4'
                }
            ]
        }
        
    ],
    initComponent: function () {
        this.callParent();
	}
})