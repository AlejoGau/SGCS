//MIGRADO2024
Ext.define('Common.view.OrganizationHelperView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.organizationhelperview'],
    title : 'Organizaciones',
    autoHeight : true,
    stateful: false,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns : [{
        	xtype : 'gridcolumn',
			header : 'sId',
            dataIndex : 'sId',					
			hidden: true			
		},{
			xtype : 'gridcolumn',
			header : 'Nombre',
            dataIndex : 'o.Name',
            //width : 200,
            flex: 1,
            renderer: function(value, metadata, record, colIndex,store, view){
                return record.get('Name')
            },            
			sortable : true			
		},{
        	xtype : 'gridcolumn',
			header : 'País',
			dataIndex : 'pstate.pro_cdescripcion',
            renderer: function(value, metadata, record, colIndex,store, view){
                return record.get('CountryName')
            },             
            width : 100,
			sortable : true			
		},{
        	xtype : 'gridcolumn',            
			header : 'Provincia',
			dataIndex : 'pcountry.pro_cdescripcion',
            renderer: function(value, metadata, record, colIndex,store, view){
                return record.get('StateName')
            },             
            width : 100,
			sortable : true			        
		},{
    		xtype : 'gridcolumn',
			header : 'Dirección',
			dataIndex : 'Address',
			sortable : true,
            flex: 1
		}/*,{
			xtype : 'gridcolumn',            
			header : 'Código Postal',
			dataIndex : 'PostalCode',
            hidden: true,
			sortable : true
		},{
			xtype : 'gridcolumn',            
			header : 'Celular',
			dataIndex : 'Mobile',
			sortable : true,
            hidden: true,
			width : 100
		},{
            xtype : 'gridcolumn',            
    		header : 'Teléfono',
			dataIndex : 'Phone',			
            hidden: true
		},{
            xtype : 'gridcolumn',            
        	header : 'Email',
			dataIndex : 'Email',			
			width : 100,
            hidden: true
		},{
            xtype : 'gridcolumn',            
        	header : 'Web',
			dataIndex : 'Web',			
            hidden: true
		}*/
    ],
    
    initComponent: function () {
                
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype: 'container',
                    //width: 100,
                    bodyPadding: 6,
                    items:[
                        {
                            iconCls: 'icon-building',
                            text: 'Mi organizacion',
                            xtype: 'button',
                            scope: this,
                            action: 'miorganizacion',
                            itemId:'miorganizacion',
                            hidden: true
                        },{
                            text : 'Perfil',
                            itemId: 'taxonomySearch',
                            menu: {
                                xtype: 'menu',
                                layout: 'fit',
                                width: 420,
                                items: {
                                    xtype : 'taxonomiesmastertree',
                                    preventHeader: true,
                                    rootId: 0,
                                    height: 400,
                                    width: 414
                                }
                            }
                        },   
                        
                    ]
                },
                
                {
                    xtype:'container',
                    items:[
                        
                        {
                            xtype: 'textfield',
                            itemId: 'Name',
                            fieldLabel: 'Nombre',
                            labelWidth: 80
                        }  ,                                          
                   ]
                },            
                {
                    xtype: 'container',
                    bodyPadding: 10,
                    items:[
                            {
                                                    iconCls: 'icon-find',
                                                text: 'Buscar',
                                                
                                                xtype: 'button',
                                                scope: this,
                                                action: 'search'
                            },{
                                                iconCls: 'icon-find',
                                                
                                                text: 'Todos',
                                                xtype: 'button',
                                                scope: this,
                                                action: 'getall'
                            },{
                                                iconCls: 'icon-cancel',
                                                text: 'Remover organizacion',
                                                scope: this,
                                                action: 'removerorganizacion',
                                                itemId: 'removerorganizacion',
                                                hidden: true
                            }
                    ]
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});