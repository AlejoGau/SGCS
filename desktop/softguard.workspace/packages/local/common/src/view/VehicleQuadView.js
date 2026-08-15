//MIGRADO2024
Ext.define('Common.view.VehicleQuadView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.vehiclequadview',
    title : 'Quad Móviles',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    //autoScroll:true,
    /*layout: {
        type: 'table',
        columns: 2,
        tableAttrs: {
          style: {
             width: '100%',
             height: '100%'
          }
       }
    },*/
    /*
    items: [
        {
            xtype: 'container',
            height: 300,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {xtype: 'container', itemId: '11',flex: 1,layout:'fit'},
            ],
            flex: 1            
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {xtype: 'container', itemId: '12',flex: 1,layout:'fit'}
            ],
            flex: 1      
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {xtype: 'container', itemId: '13',flex: 1,layout:'fit'},                
            ],      
            flex: 1 
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {xtype: 'container', itemId: '21',flex: 1,layout:'fit'},
          
            ],
            flex: 1       
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {xtype: 'container', itemId: '22',flex: 1,layout:'fit'},
               
            ],
            flex: 1       
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                 {xtype: 'container', itemId: '23',flex: 1,layout:'fit'}                 
            ],
            flex: 1       
        }                              
    ],
    */
 
    
    items: [
        {
            xtype: 'container',
            itemId: 'row1',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {xtype: 'container', itemId: '11',flex: 1,layout:'fit'},
                {xtype: 'container', itemId: '12',flex: 1,layout:'fit'},
                {xtype: 'container', itemId: '13',flex: 1,layout:'fit'},
            ],
            flex: 1
        },{
            xtype: 'container',
            itemId: 'row2',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {xtype: 'container', itemId: '21',flex: 1,layout:'fit'},
                {xtype: 'container', itemId: '22',flex: 1,layout:'fit'},
                {xtype: 'container', itemId: '23',flex: 1,layout:'fit'}
            ],
            flex: 1
        }
        
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        var view = this;
        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
    		items : [
                 {
                    text: 'Guardar',
                    itemId: 'save',
                    iconCls:'icon-save'
                }
            ]
        }); 
        this.addDocked(toolbar);
    } // cierro init
});