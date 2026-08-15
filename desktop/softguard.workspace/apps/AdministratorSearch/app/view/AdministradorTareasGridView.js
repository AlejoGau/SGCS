Ext.define('AdministratorSearch.view.AdministradorTareasGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.administradortareasgridview','widget.administradortareasgridsearchview'],
    title : 'Templates',
    autoHeight : true,
    /*selModel: Ext.create('Ext.selection.CheckboxModel'),*/
       
    viewConfig: {
        trackOver: true,
        stripeRows: false,
        getRowClass: function(record) { 
            return record.get('StatusNombre') == "ERROR" ? 'nohabilitado' : ''; 
        } 
    },

    columns : [
       {
            xtype : 'gridcolumn',            
            header : 'Nombre',
            dataIndex : 'Name',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Estado',
            dataIndex : 'StatusNombre',
            //sortable: false,
            flex: 1
    	},{
            xtype : 'datecolumn',            
            header : 'Ultima ejecución',
			dataIndex : 'LastExecutionDate',
            format: 'd/m/Y H:i:s',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Minutos',
    		dataIndex : 'Repetition',
            flex: 1
		}
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['tpa_icodigo','Codigo'],
                             ['tpa_cdealer','Descripcion']
                           ];
        
                
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add'
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
        
       // this.addDocked(toolbar);
        
    } 
});