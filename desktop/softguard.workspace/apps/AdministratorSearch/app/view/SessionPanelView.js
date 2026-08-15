Ext.define('AdministratorSearch.view.SessionPanelView', {
    extend : 'Ext.panel.Panel',
    alias : ['widget.sessionpanelview'],
    preventHeader: true,
    autoScroll : false,
    frame: false,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 250,
        fieldWidth : 350,
        enforceMaxLength: true
    },
    layout: 'fit',
    margin : 0,
    padding : 0,    
    
    items : [
        {
            
            xtype: 'tabpanel',
            region: 'center',
            itemId: 'dmtab',
            autoScroll : false,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin : 0,
            padding: 0,
            items: [
                    {
                        xtype:'form',
                        title:'Sesiones Activas' ,
                        autoScroll : true,
                        fieldDefaults : {
                            labelAlign : 'left',
                            labelWidth : 250,
                            fieldWidth : 350,
                            enforceMaxLength: true
                        },
                        items: [
                                {
                                    xtype : 'displayfield',
                                    itemId:'cantidadusuariosconectados',
                                    fieldLabel: 'Cantidad de usuarios conectados'
                                    
                                },{
                                    xtype : 'fieldset',
                                    itemId:'modulos',
                                    title:'Modulos'
                                },{
                                    xtype: 'uxiframe',
                                    itemId: 'Iframe',
                                    height: 0,
                                    border : false,
                                    width:'100%',
                                    //hidden:true
                                },{
                                    xtype : 'sessiongridview'
                                }
                            ]
                    },{
                        xtype:'grid',
                        itemId: 'tasks',
                        title:'Tareas',                         
                        columns: [
                                {
                                    xtype:'actioncolumn',
                                    itemId: 'actioncolumn',
                                    width:40,
                                    items: [{
                                        iconCls: 'icon-delete',
                                        tooltip: 'Eliminar tarea',
                                        getClass : function(v, meta, rec) {
                                            var status = rec.data.Status;
                                            if(status != 1) {
                                                return 'icon-delete'
                                            }
                            	    	},
                                        handler: function(grid, rowIndex, colIndex,item, event) {
                                            var view = grid.up('sessionpanelview');
                                            var rec = grid.getStore().getAt(rowIndex);
                                            view.fireEvent('objectedit', rec, view);
                                        }
                                    }]
                                },{
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
                                	    return Ext.Date.format(record.data.LastExecutionDate,'D d-m-Y G:i:s') ;
                    		    	},
                                    flex:1
                            	}
                            ]
                    },{
                        xtype:'systemtestgridview',
                        title:'Test del sistema',
                        itemId: 'systemtestgridview'
                    },{
                        xtype:'panel',
                        title:'Rendimiento',
                        itemId: 'rendimiento'
                    },{
                    
                        xtype:'grid',
                        itemId: 'reporte',
                        title:'Reporte Sumario', //llamada a getlocale PARCHE, no entiendo por que no se localiza
                        hideHeaders:true,
                        
                       /* plugins: [
                            Ext.create('Ext.grid.plugin.CellEditing', {
                                clicksToEdit: 1
                            })
                        ],*/
                        columns: [
                            {
                                xtype : 'gridcolumn',            
                                header : '',
                                dataIndex : 'clave',
                                renderer: function (value) {
                                    return getLocale(value)
                                },
                                flex:1
                    		},{
                                xtype : 'gridcolumn',            
                                header : '',
                                dataIndex : 'valor',
                                flex:1
                    		}
                        ]
                    }
                
                ]
        }
       
       
    ],

	initComponent : function() {
        
		this.callParent();

        this.down('sessiongridview').caller = this;
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'x-tbar-loading',
                    text: 'Refresh',
                    scope: this,
                    action: 'refresh'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});