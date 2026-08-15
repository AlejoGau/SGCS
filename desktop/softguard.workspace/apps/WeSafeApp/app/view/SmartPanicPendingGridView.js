Ext.define('WeSafe.view.SmartPanicPendingGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.smartpanicpendinggridview'],
    title : 'SmartPanic',
    autoHeight : true,
    selModel: Ext.create('Ext.selection.CheckboxModel',{
        showHeaderCheckbox: false,
        mode: 'SINGLE'
    }),
   /*
    viewConfig: {
        
        stripeRows: false,
        getRowClass: function(record) { 
            return record.get('CuentaId') == 0 ? 'nohabilitado' : ''; 
        } 
    },
    */
    columns : [
        {
            xtype : 'datecolumn',
        	header : 'Fecha Alta',
            dataIndex : 'fechaAlta',
            format:'d/m/Y',
			sortable : true			
		},
        {
            xtype : 'gridcolumn',
    		header : 'Usuario',
            dataIndex : 'Nombre',
            width : 300,
			sortable : true			
		},{
            xtype : 'gridcolumn',            
            header : 'Telefono',
    		dataIndex : 'Telefono',			
			flex:1          
		},{
    		xtype : 'gridcolumn',
			header : 'Id',
            dataIndex : 'Id',					
			hidden: true			
		},{
    		xtype : 'gridcolumn',
			header : 'Modelo',
			dataIndex : 'Modelo',
			sortable : true			
		},{
			xtype : 'gridcolumn',            
			header : 'Marca',
			dataIndex : 'Marca',
			sortable : true
		},{
			xtype : 'gridcolumn',            
			header : 'Version',
			dataIndex : 'Version',
			sortable : true,
			width : 100
		},{
            xtype : 'gridcolumn',            
    		header : 'Tipo',
			dataIndex : 'Tipo'
		},{
        	xtype : 'gridcolumn',
			header : 'Imei',
            dataIndex : 'Imei',
            width : 300,
			sortable : true			
		}



    ],
    
    initComponent: function () {
                
        this.callParent(arguments); 

        
        
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="asignarcuenta"]').setDisabled(selections.length == 0);
           
        };        
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                
                  {
                    text : 'Filtros',
                    itemId: 'filtrostr',
                    menu: {
                        xtype: 'menu',
                        width: 380,
                        style: {
                                backgroundColor: 'white'
                            },
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                        items: [               
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Telefono',
                                    padding: '2 0',
                                    anchor: '100%',
                                    itemId: 'telefonoId',
                                },
                                 {
                                    xtype: 'textfield',
                                    fieldLabel: 'Usuario',
                                    padding: '2 0',
                                    anchor: '100%',
                                    itemId: 'usuarioId',
                                },
                                 {
                                    xtype: 'textfield',
                                    fieldLabel: 'Imei',
                                    padding: '2 0',
                                    anchor: '100%',
                                    itemId: 'imeiId',
                                },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    bodyPadding: 5,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype:'container',
                                            layout:'hbox',
                                            width:270,
                                            margin:'0 0 5 0',
                                            items:[
                                                    {
                                                        xtype: 'datefield',
                                                        itemId: 'fechadesde',
                                                        emptyText:'Fecha Desde',
                                                        width:129
                                                        
                                                    },{
                                                        xtype: 'datefield',
                                                        itemId: 'fechahasta',
                                                        emptyText: 'Fecha Hasta',
                                                        width:128,
                                                        margin:'0 0 0 5'
                                                    }
                                                ]
                                        },
                                    ]
                                 },
                                 {
                                            xtype:'container',
                                            layout:'hbox',
                                            width:270,
                                            margin:'0 0 5 30',
                                            items:[
                                                {
                                                    xtype: 'button',
                                                    text: 'Buscar',
                                                    action: 'search',
                                                    itemId: 'search',
                                                    iconCls: 'icon-find'
                                                }
                                            ]
                                        }
                                    ]   
                                }
                             ]
                	    }
                    
    			},
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                },'-',
                {
                    iconCls: 'icon-cuenta',
                    text: 'Asignar Cuenta',
                    scope: this,
                    action: 'asignarcuenta',
                    itemId:'asignarcuenta',
                     disabled: true,
                     hidden:true
                },'-',
                {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',
                    itemId: 'delete',
                     hidden:true
                },'->',
            /*    {
                    iconCls: 'icon-cog',
                    text: 'Configurar servicio',
                    scope: this,
                    action: 'configurar'
                },'-',*/
                {
                    xtype: 'displayfield',
                    value: '',
                    scope: this,
                    itemId: 'toolbardisplayfield',
                    margin: '-10 10 0 10',
                }
                
            ],// cierro items
            
         }); 
        
        this.addDocked(toolbar);
        
    } 
});