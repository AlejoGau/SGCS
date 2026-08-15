//MIGRADO2024
Ext.define('Common.view.BundleGridView', {
    extend : 'Ext.grid.Panel',
    alias : 'widget.bundlegridview',
    title : 'Versiones',
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    /*plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2
        })
    ],*/
    columns : [
        {
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-brick-go',
                tooltip: 'Ejecutar versión',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('bundlegridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    var name = rec.get('Name');
                    var version= rec.get('Version');
                    var iframe = Ext.create('Ext.ux.IFrame', {
            			//title : name+': '+version,
    					border : false,
    					src : '/a/'+name+'?Version='+version,
    					closable : false,
                        closeAction: 'destroy',
                        autoDestroy: true
    				});
                    Ext.create('Ext.window.Window',{
                        width: 800,
                        height: 600,
                        layout: 'fit',
                        title: name+': '+version,
                        items: iframe
                    }).show();
                }
            }]
        }, {
			xtype : 'gridcolumn',
			header : 'Versión',
			dataIndex : 'Version',
			sortable : true,
			width : 60
		}, {
    		xtype : 'datecolumn',
			header : 'Fecha',
			dataIndex : 'DateCreated',
            format: 'd/m/Y',
			sortable : true,
			width : 80
		},
        {
        	xtype : 'gridcolumn',
			header : 'Comentario',
			dataIndex : 'Description',
			flex: 1
            
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="bundledelete"]').setDisabled(selections.length == 0);
        };
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
        items: [              
             {
                iconCls: 'icon-delete',
                text: 'Eliminar',
                disabled: true,
                action: 'bundledelete'
            }]// cierro items
        }); 
        this.addDocked(toolbar);
        
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
    } // cierro init
});