Ext.define('SGWebCrm.view.ContextPersonGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.contextpersongridview',
    autoHeight : true,
    columns : [{
            xtype : 'gridcolumn',            
            header : 'Empresa',
			dataIndex : 'Company',			
			width : 100            
        },{
        	xtype : 'gridcolumn',
			header : 'Id',
            dataIndex : 'Id',					
			hidden: true			
		},{
			xtype : 'gridcolumn',
			header : 'Nombre',
            dataIndex : 'Name',
            width : 200,
            //flex: 1
			sortable : true			
		},{
    		xtype : 'gridcolumn',
			header : 'Apellido',
            dataIndex : 'LastName',
            width : 300,
			sortable : true			
		},{
        	xtype : 'gridcolumn',
			header : 'País',
			dataIndex : 'Country',
            renderer: function(value, metadata, record){
                var store = Ext.data.StoreManager.lookup('GeographyStore');
                var place = store.findRecord('Id',value);
                if (place)
                    return place.get('Name');
                    else
                    return value;
            },
			sortable : true			
		},{
        	xtype : 'gridcolumn',            
			header : 'Provincia',
            renderer: function(value, metadata, record){
                var store = Ext.data.StoreManager.lookup('GeographyStore');
                var place = store.findRecord('Id',value);
                if (place)
                    return place.get('Name');
                    else
                    return value;
            },
			dataIndex : 'State',
			sortable : true			        
		},{
    		xtype : 'gridcolumn',
			header : 'Dirección',
			dataIndex : 'Address',
			sortable : true			
		},{
			xtype : 'gridcolumn',            
			header : 'Código Postal',
			dataIndex : 'PostalCode',
			sortable : true
		},{
			xtype : 'gridcolumn',            
			header : 'Celular',
			dataIndex : 'MobilePhone',
			sortable : true,
			width : 100
		},{
            xtype : 'gridcolumn',            
    		header : 'Teléfono Laboral',
			dataIndex : 'BusinessPhone',			
            hidden: true
		},{
            xtype : 'gridcolumn',            
        	header : 'Email',
			dataIndex : 'Email',			
			width : 100            
		},{
            xtype : 'gridcolumn',            
        	header : 'Web',
			dataIndex : 'Web',			
            hidden: true
		},{
            xtype : 'gridcolumn',            
        	header : 'Fecha nacimiento',
			dataIndex : 'Birthday',			
			width : 100,
            renderer: function (value) {
                if(value) {
                    return Ext.Date.format( new Date(value),'d/m/Y')
                } else {
                    return '';
                }
                
            }
    	},{
            xtype : 'gridcolumn',            
        	header : 'Trabajo',
			dataIndex : 'JobTitle',			
			width : 100            
    	},{
            xtype : 'gridcolumn',            
        	header : 'Estado',
			dataIndex : 'Status',			
			width : 100            
        },{
            xtype : 'gridcolumn',            
        	header : 'Email 2',
			dataIndex : 'Email2',			
			width : 100            
        },{
            xtype : 'gridcolumn',            
        	header : 'Ocupación',
			dataIndex : 'Occupation',			
			width : 100            
        },{
            xtype : 'gridcolumn',            
        	header : 'Ubicación',
			dataIndex : 'Location',			
			width : 100            
        },{
            xtype : 'gridcolumn',            
            header : 'Ultima Actualización',
			dataIndex : 'LastUpdate',			
			width : 100            
        },{
            xtype : 'gridcolumn',            
            header : 'AccountId',
			dataIndex : 'AccountId',			
            hidden: true	
        }/*,{
            xtype : 'gridcolumn',                 
            header : 'ObjectTypeName',
			dataIndex : 'ObjectTypeName',			
			width : 100            
		}*/
    ],
    
    initComponent: function () {
        var items= [
                /*{
                    text : 'Perfil',
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
                {
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
                                        store: [
                                            ['Name','Nombre'],
                                            ['LastName','Apellido'],
                                            ['Email','Email']
                                        ],
                                        fieldLabel: 'Campo',
                                        labelWidth: 80
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'query',
                                        fieldLabel: 'Valor',
                                        labelWidth: 80
                                    }
                                ]
                            }
                            
                        ]
                    }
				},'-',
                {
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search'
                },
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                }*/
            ];// cierro items
        
        
        // si la seleccion es multiple agrego los checkbox
        if (this.multiSelect){
            this.selModel = Ext.create('Ext.selection.CheckboxModel');
            
        }
        
        
        
        this.callParent(arguments);
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: items
         }); 
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.addDocked(toolbar);
        this.addDocked(pagingtoolbar);
    } // cierro init
});