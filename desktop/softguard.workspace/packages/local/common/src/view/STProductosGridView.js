//MIGRADO2024
Ext.define('Common.view.STProductosGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.stproductosview'],
    title : 'Templates',
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
  //  plugins: [{ptype : '//pagingselectpersist'}],   
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    activeHelp:true,
    columns : [
       {
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-basket-edit',
                tooltip: getLocale('Editar'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('stproductosview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Nombre',
            dataIndex : 'Name',
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'Observacion',
            itemId: 'gridcolumnObservacion',
            /*listeners: {
             headerclick: function(){
                 
                 
             }
            }, */           
            sortable : false,
        	dataIndex : 'Body',
            flex: 1
		},{
                     
            header : 'Precio',
    		dataIndex : 'Price',
            renderer: function (value, obj, record){
                return Ext.util.Format.currency(value,record.get('mon_csymbol')?record.get('mon_csymbol')+' ':getParametro('SYSTEMCURRENCY',false,true).codigo+' ')
            },
            flex: 1
		},{
                     
            header : 'Estado',
        	dataIndex : 'Status',
            renderer : function(value, obj, record){
                return record.get('_Status');
            },
            flex: 1
            
		},{
                     
            header : 'Tipo',
        	dataIndex : 'pro_itipo',
            renderer: function (value){
                
                if(value == 0){
                    return getLocale('Otros')
                } else if(value == 1){
                    return getLocale('Productos')
                } else if(value == 2){
                    return getLocale('Servicios')
                } else {
                    return getLocale('No definido')
                }              
               
            },
            flex: 1
		}
        
        
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['Name',getLocale('Nombre')]
                           ];
        
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="delete"]').setDisabled(selections.length == 0);
        };
        
        
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-basket-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add'
                },"-", {
                    iconCls: 'icon-basket-delete',
                    text: 'Eliminar',
                    action: 'delete',                    
                    disabled: true,
                    scope: this
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