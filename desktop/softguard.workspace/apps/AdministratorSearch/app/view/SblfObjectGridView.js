Ext.define('AdministratorSearch.view.SblfObjectGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.sblfobjectgridview',
    title : 'Data Applicacion',
    autoHeight : true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
        {
            xtype : 'gridcolumn',            
            header : 'Nombre',
            dataIndex : 'Name',
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'Alias del objeto',
        	dataIndex : 'AliasFromObject',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Relacion permitida',
			dataIndex : 'AllowRelation',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Ensamblador',
			dataIndex : 'Assembly',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Descripcion',
    		dataIndex : 'Description',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Nombre Completo',
    		dataIndex : 'FullName',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Namespace',
    		dataIndex : 'Namespace',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Nombre de tabla',
        	dataIndex : 'TableName',
            flex: 1
		}



    ],
    
    initComponent: function () {
       
        var comboSearch =  [
                             ['Description','Descripcion']
                           ];
        
                        
        this.callParent(arguments);   
        
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="dataapplicationdelete"]').setDisabled(selections.length == 0);
        };
        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                  {
                    iconCls: 'icon-add',
                    action: 'add',
                    scope: this,
                    text: 'Nuevo'
                                          
                }, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    disabled: true,
                    action: 'dataapplicationdelete'
                },"-",{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                        {
                                            
                                            xtype: 'combo',
                                            queryMode: 'local',
                                            itemId: 'fieldName',
                                            store: comboSearch,
                                            fieldLabel: 'Campo'
                                            
                                                            
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'query',
                                            fieldLabel: 'Valor'
                                          
                                        }
                                    ]
                                 }
                             ]
                	    }
                    
    			},{
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search'
                },'-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});