//MIGRADO2024
Ext.define('Common.view.MGServiciosContratadosGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.mgservicioscontratadosview'],
    title : 'Servicios contratados',
    autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns : [{
        	xtype : 'gridcolumn',
			header : 'Nº de contrato',
            dataIndex : 'cnt_iid',					
		
		},{
			xtype : 'datecolumn',
			header : 'Fecha de Inicio',
            dataIndex : 'cnt_fechaalta',
			format:'d/m/Y h:i',
			autoSizeColumn: true,            
		
		},{
        	xtype : 'datecolumn',
			header : 'Fecha de vto.',
			dataIndex : 'cnt_fechavto',
			format:'d/m/Y h:i',
			autoSizeColumn: true,		
		},{
        	xtype : 'gridcolumn',            
			header : 'Artículo',
			dataIndex : 'Code',
		        
		},{
    		xtype : 'gridcolumn',
			header : 'Nombre',
			dataIndex : 'Description',
		},{
			xtype : 'gridcolumn',            
			header : 'Cantidad',
			dataIndex : 'Quantity',
		},{
            xtype : 'gridcolumn',
            header : 'Estado',
            dataIndex : 'cnt_estado',
            renderer : function (value, metaData, record){
                switch (value) {
                    case 0: 
                        return 'Pendiente';
                        break
                    case 1:
                        return 'Activo';
                        break;
                    case 2:
                        return "Cancelado";
                        break;
                    case 3:
                        return  'Vencido';
                        break;                    
                }
            }
        }
        
        /*,{
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
                    xtype: 'button',
                    text: 'Agregar servicio',
                    action: 'agregarservicio',
                    
                }
                /*{
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
                }*/
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});