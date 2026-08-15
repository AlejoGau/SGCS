Ext.define('AdministratorSearch.view.FormatosGridView', {
    extend : 'Ext.grid.Panel',
    alias : ['widget.formatosgridview','widget.formatosgridsearchview'],
    title : 'Formatos',
    autoHeight : true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
        // agregar una columna para abrir la lista de receptores del formato.
        {
    		xtype : 'gridcolumn',
			header : 'Formato',
            dataIndex : 'for_cformato',
            flex: 1
		},{
    		xtype : 'gridcolumn',
			header : 'Nombre',
            dataIndex : 'for_cnombre',
            hidden: true,
            flex: 1
		},{
        	xtype : 'gridcolumn',            
			header : 'Descripcion',
			dataIndex : 'for_cdescripcion',
            flex: 1
		},{
            xtype : 'gridcolumn',
			header : 'Alarma',
            dataIndex : 'for_calarma',
            width: 100
		},{
            xtype : 'gridcolumn',
    		header : 'Descripcion alarma asociada',
            dataIndex : 'cod_cdescripcion',
            flex: 1
		}
        
    ],
    
    initComponent: function () {
        this.callParent(arguments);     
        var me = this;
        
        
       /* this.getSelectionModel().on(
            'selectionchange', 
            function(selModel, selections, options){
                me.down('[action="delete"]').setDisabled(selections.length == 0)
            }
        );
        */
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.addDocked(pagingtoolbar);
        
       var comboSearch =  [
                             ['for_cdescripcion',getLocale('Descripcion')],
                             ['for_cformato',getLocale('Formato')],
                             ['for_cnombre',getLocale('Nombre')],
                             ['for_calarma',getLocale('Alarma')]
                          
                           ];
       
       
        var items= [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add'
                },{
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    scope: this,
                    action: 'delete'
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
                                          
                                        },{
                                            xtype: 'fieldset',
                                            layout: 'hbox',
                                            title: 'Alarma',
                                            margin:'0 0 5 0',
                                            items:[{
                                                        xtype: 'button',
                                                        text:'Seleccionar alarma',
                                                        iconCls: 'icon-bell',
                                                        itemId:'evento',
                                                        margin:'0 5 0 0'
                                                    },{
                                                        xtype:'displayfield',
                                                        itemId:'nombreevento',
                                                        width:220
                                                    },{
                                                        xtype:'button',
                                                        text:'',
                                                        itemId:'limpiarevento',
                                                        iconCls: 'icon-cancel'
                                                    },{
                                                        xtype:'displayfield',
                                                        itemId:'codevento',
                                                        hidden:true
                                                    }
                                                                                                        
                                                ]
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
                }];    
            
             
         
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: items
         });      
        
        this.addDocked(toolbar);
        
    } 
});