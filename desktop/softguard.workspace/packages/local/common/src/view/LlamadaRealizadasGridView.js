//MIGRADO2024
Ext.define('Common.view.LlamadaRealizadasGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.llamadarealizadasgridview',
    title : 'Llamadas realizadas',
    ignoreDirty: true,
    autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns : [
        /*{
            xtype : 'gridcolumn',
			header : 'Fecha',
			dataIndex : 'rec_tfechahora',
            width : 150,
            renderer: function(value,metadata,record){
                return Ext.Date.format(new Date(value), 'd/m/Y H:i:s');
            }
		},{
    		xtype : 'gridcolumn',
			header : 'Telefono',
			sortable : false,
			dataIndex : 'rec_cContenido',
        	width : 250
		},*/
       /* {
        	xtype : 'gridcolumn',
			header : 'Observacion',
			sortable : false,
			dataIndex : 'rec_cObservaciones',
            flex:1,
            renderer : function(value, object, record) {
                
                
                
                    object.style = "white-space: normal";
                
                
        		return value;
			}
		},*/
        {
            xtype : 'gridcolumn',
        	header : 'Fecha',
			sortable : false,
			dataIndex : 'rec_tfechahora',
            renderer : function(value, object, record) {
                
                
            	return Ext.Date.format(value,'d/m/Y H:i:s');
			},
            flex:1
		}, {
            xtype : 'gridcolumn',
			header : 'Nombre',
			sortable : false,
			dataIndex : '_nombre_llamado',
            flex:1,
		},
        {
            xtype : 'gridcolumn',
    		header : 'Telefono',
			sortable : false,
			dataIndex : '_telefono_llamado',
            flex:1,
		},
        {
            xtype : 'gridcolumn',
			header : 'Operador',
			sortable : false,
			dataIndex : 'ope_cnombre',
            flex:1
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype: 'button',
                    action: 'abrir',
                    itemId: 'abrir',
                    text: 'Abrir',
                    hidden: true
                },{
                    text : 'Filtros',
                    itemId: 'filtros',
                    menu: {
                        width: 280,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    
                                  
                                    
                                    {
                                		xtype : 'datefield',
                    					fieldLabel : 'Desde',
                    					name : "fdesde",
                    					bindToModel : false,
                    					itemId : 'fechadesde',
                                        labelWidth: 100
                    				}, {
                    					xtype : 'datefield',
                    					fieldLabel : 'Hasta',
                    					itemId : 'fechahasta',
                    					bindToModel : false,
                    					name : "fhasta",
                                        labelWidth: 100
                    				},{
                                        fieldLabel: 'Telefono',
                                        xtype: 'textfield',
                                        itemId: 'telefono',                                        
                                        labelWidth: 100
                                        
                                    },{
                                        fieldLabel: 'Nombre',
                                        xtype: 'textfield',
                                        itemId: 'nombre',                                        
                                        labelWidth: 100
                                        
                                    },{
                                        xtype: 'button',
                                        text:'Buscar',
                                        iconCls: 'icon-find',
                                        itemId:'buscarrealizadas'
                                       // action: 'search'
                                    }
                                ]
                            }
                
                        ]
                    }
                },{
                    xtype: 'button',
                    text:'Ver Todos',
                    iconCls: 'icon-find',
                //    action: 'todos',
                    itemId:'todosrealizadas'
                },
            ]// cierro items
         }); 
         this.addDocked(toolbar);
       
         
    } // cierro init
});