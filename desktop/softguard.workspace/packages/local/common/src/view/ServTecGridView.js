//MIGRADO2024
Ext.define('Common.view.ServTecGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.servtecgridview',
    title : 'Cuentas',
    autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'), 
	columns : [
        {
            xtype:'actioncolumn',
            width:50,
            items: [{
                iconCls: 'icon-exclamation',
                tooltip: getLocale('Reclamos'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('servtecgridview');
                    var tabpanel = view.up('tabpanel');
                    var rec = grid.getStore().getAt(rowIndex);
                    var title = getLocale('Reclamo')+' ('+rec.get('stc_inumero')+')';
                    var newTab = Ext.widget('sertecreclamosformview',{
                        //record: record,
                        title: title,
                        translate: false,
                        record: rec,
                        closeAction: 'destroy',
                        caller: view
                        });
                    var win = Ext.create('Ext.Window', {
                        layout: 'fit',
                        translate: false,
                        title : title,
                        closeAction : 'hide',            			
                        border : true,
                        modal: false,
                        view: view,
                        height: 350,
                        width: 600,
                        items : newTab,  
                    });
                    
                    win.show();
                }
            },{
                iconCls: 'icon-printer',
                tooltip: 'Orden',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('servtecgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    var title = 'Orden ('+rec.get('stc_inumero')+')';
                 
                    
                     var filters = [{
                            property: 'stc_iid',
                            value:rec.get('stc_iid')
                            
                        }];
                     var newTab = Ext.widget('ordenservtecview',{
                            record: rec,
                            title: title,
                            filters: filters,
                            closeAction: 'destroy'
                        });
                    var win = Ext.create('Ext.Window', {
                        layout: 'fit',
                        title : title,
                		closeAction : 'hide',            			
            			border : true,
                        modal: false,
                        view: view,
            			items : newTab,                        
                        maximized: true
            		});
                    
                    win.show();
                    
                    
                }
            }]
        },
        
        {
			xtype : 'gridcolumn',
			header : 'Id',
			sortable : false,
			dataIndex : 'stc_inumero',
    		width : 80
		},
        {
           
        	header : 'Fecha de alta',
			sortable : true,
			dataIndex : 'stc_dfecha_modificacion',
            width : 150,
            xtype : 'datecolumn',
        		//format : 'D d-m-Y G:i:s',
                renderer : function(value, object, record) {
                    
                    var date  = Ext.Date.format(record.get('stc_dfecha_modificacion'),'d/m/Y G:i:s') ;
                   
            		if(date != '01/01/1900 0:00:00') {
            		    return date ;
                    } else {
                        return '';
                    }
                   
    			}
		}, 
        {
    		xtype : 'gridcolumn',
			header : 'Estado',
			dataIndex : '_stc_estadodescripcion',
			sortable : true,
			width : 120
		}, {
			xtype : 'gridcolumn',
			header : 'Descripción',
			dataIndex : 'tip_cdescripcion',
			sortable : true,
			width : 150
		},// cue_clinea                
        {
			xtype : 'gridcolumn',
			header : 'Observaciones',
			dataIndex : 'stc_mobservaciones',
			sortable : false,
			flex: 1
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);
               
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.addDocked(pagingtoolbar);
        
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    text : 'Nuevo servicio tecnico',
                    iconCls : 'icon-date',
                    view : 'sertecformview',
                    itemId: 'nuevoservicio',
                    action: 'new',
                    closable: true
            	},"-", 
                {
                    xtype: 'combo',
                    queryMode: 'local',
                    itemId: 'estado',
                    store: 'ServTecEstadoStore',
                    displayField: 'Name',
                    valueField: 'Value',
                    fieldLabel: 'Estado',
                    labelWidth: 40
                },{
                    xtype: 'button',
                    iconCls: 'icon-find',
                    action: 'search'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
    } // cierro init
});