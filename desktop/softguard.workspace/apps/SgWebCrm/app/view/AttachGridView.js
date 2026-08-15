Ext.define('SGWebCrm.view.AttachGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.attachsearchview','widget.attachgridview'],
    title : 'Archivos',
    autoHeight : true,
    viewConfig: {
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'folderDDGroup'
            }
        },
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns : [{
            xtype:'actioncolumn',
            header: '',
            width: 40,
            items: [
                {
                    iconCls: 'icon-Attach',
                    tooltip: 'Modificar archivo',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('attachsearchview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit',rec,view);
                    }
                }
            ]
        },{
            xtype : 'gridcolumn',
			header : 'Id',
            dataIndex : 'Id',					
			hidden: false			
		},{
			xtype : 'gridcolumn',
			header : 'Nombre',
            dataIndex : 'Name',
            width : 200,
            //flex: 1
			sortable : true			
		},{
            xtype : 'gridcolumn',            
        	header : 'ObjectTypeId',
			dataIndex : 'ObjectTypeId',			
            hidden: true
		},{
            xtype : 'gridcolumn',            
        	header : 'ObjectTypeName',
			dataIndex : 'ObjectTypeName',			
            hidden: true
		},{
    		xtype : 'gridcolumn',            
			header : 'Epígrafe',
			dataIndex : 'SmallComment',
			sortable : true			        
		},{
			xtype : 'gridcolumn',            
			header : 'Tipo',
			dataIndex : 'Format',
			sortable : true,
			width : 100
		},{
            xtype : 'gridcolumn',            
        	header : 'Tamaño',
			dataIndex : 'width',			
			width : 100,
            renderer: function(value,metadata, record){
                return record.get('Width')+'x'+record.get('Height')
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Peso',
			dataIndex : 'Weight',			
			width : 100            
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);        
        this.view.targetTab = this.targetTab;
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [ {
                    text : 'Crear',
        			iconCls : 'icon-add',
                    action: 'create'
        		},'-',{
                    xtype: 'textfield',
                    itemId: 'query',
                    fieldLabel: 'Nombre',
                    labelWidth: 50
                },{
                    xtype: 'textfield',
                    itemId: 'queryid',
                    fieldLabel: 'Id',
                    labelWidth: 20
                },
                {
                    xtype: 'button',
                    text: 'Buscar',
                    itemId: 'btnBuscar'
                }
            ]// cierro items
         }); 

         this.addDocked(toolbar);
        
        this.addDocked(pagingtoolbar);

    },
    setFolder: function(folder){
        var store = this.getStore();
        var name = folder.get('Name');
        var path = folder.get('Path')?folder.get('Path')+'/':'';
        this.setTitle('Archivos: '+path+name);
        store.folder = folder;
        this.folder = folder;
        store.filter({
            property: 'FolderId',
            value: folder.get('Id'),
            id: 'FolderId'
        });
    }
});