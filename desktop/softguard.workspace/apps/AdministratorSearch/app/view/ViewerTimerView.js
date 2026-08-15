Ext.define('AdministratorSearch.view.ViewerTimerView', {
    extend : 'Ext.panel.Panel',
    alias : ['widget.viewertimer'],
    preventHeader: true,
    frame: true,
    border : 0,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    margin:'0 0 0 0',
	items : [
        {
          xtype:'fieldset',
          items:[{
                    xtype:'checkboxfield',
                    fieldLabel: 'Habilitar modo Debug',
                    labelWidth:160,
                    width:200,
                    itemId:'mododebug'
                }]
        },
        {
            xtype: 'grid',
            title: 'JOB',
            itemId: 'jobs',
            layout: 'anchor',
            //hideHeaders: true,
            margin:'0 0 10 0',
            columns: [						
				{
                    xtype : 'gridcolumn',            
                    header : 'Nombre',
                    dataIndex : 'Name',
                    renderer: function(v){
                        return getLocale(v);
                    },
                    flex:1
            	},{
                    xtype : 'gridcolumn',            
                    header : 'Estado',
                    dataIndex : 'Status',
                    renderer: function(value, object, record) {
                        if(value == 1) {
                            return getLocale('Normal');
                        } else if (value == 2){
                            object.tdAttr = "style='background-color: #ff0000; color: #fff'";
                            return getLocale('Problema en ejecucion');
                             
                        } else {
                            return getLocale('Inactivo');
                        }
                       
            		   
    		    	},
                    flex:1
        		},{
                    xtype : 'gridcolumn',            
                    header : 'Ultima Ejecucion',
                    dataIndex : 'LastExecutionDate',
                    renderer: function(value, object, record) {
                	    return Ext.Date.format(record.get('LastExecutionDate'),'D d-m-Y G:i:s') ;
    		    	},
                    flex:1
            	}
            ]
        },{
            xtype: 'grid',
            title: 'LOGS',
            itemId: 'logs',
            autoHeight : false,
            flex:1,
            autoScroll: true,
            columns: [    					
				{
                    xtype : 'gridcolumn',            
                    header : 'Date',
                    dataIndex : 'Date',
                    renderer: function(value, object, record) {
                        return Ext.Date.format(record.get('Date'),'D d-m-Y G:i:s') ;
    		    	},
                    width:200
            	},{
                    xtype : 'gridcolumn',            
                    header : 'Level',
                    dataIndex : 'Level',
                    flex:2
            	},{
                    xtype : 'gridcolumn',            
                    header : 'Logger',
                    dataIndex : 'Logger',
                    renderer: function(value, object, record) {
                        
                        var hash = 0;
                        for (var i = 0; i < value.length; i++) {
                            hash = value.charCodeAt(i) + ((hash << 5) - hash);
                        }
                        var colour = '#';
                        for (var i = 0; i < 3; i++) {
                            var valuex = (hash >> (i * 8)) & 0xFF;
                            colour += ('00' + valuex.toString(16)).substr(-2);
                        }
                        object.style = 'background-color:' + colour;
                        return value
    		    	},
                    flex:2
                },{
                    xtype : 'gridcolumn',            
                    header : 'Message',
                    dataIndex : 'Message',
                    flex:1
                },{
                    xtype : 'gridcolumn',            
                    header : 'Exception',
                    dataIndex : 'Exception',
                    flex:2
                },{
                    xtype : 'gridcolumn',            
                    header : 'DbProcId',
                    dataIndex : 'DbProcId',
                    flex:2
                },{
                    xtype : 'gridcolumn',            
                    header : 'DbSchema',
                    dataIndex : 'DbSchema',
                    flex:2
                },{
                    xtype : 'gridcolumn',            
                    header : 'DbServer',
                    dataIndex : 'DbServer',
                    flex:2
                },{
                    xtype : 'gridcolumn',            
                    header : 'LogModule',
                    dataIndex : 'LogModule',
                    flex:2
                }
            ]
        }
    ],

	initComponent : function() {
        
		this.callParent();
        
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.down('#logs').addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'x-tbar-loading',
                    text: 'Actualizar',
                    scope: this,
                    action: 'refresh',
                    itemId: 'refresh'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});