Ext.define('WebMG.view.PagoGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.pagogridview'],
    title : 'Pagos',
    autoHeight : true,
    activeHelp:true,//trae el help
    columns : [/*{
            xtype:'actioncolumn',
            header: '',
            width: 30,
            items: [
                {
                    iconCls: 'icon-money-dollar',
                    tooltip: 'Modificar',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('contratogridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit',rec,view);
                    }
                }
            ]
        },*/{
            xtype : 'datecolumn',
            header : 'Comprobante',
            dataIndex : 'cbc_iNumeroCbte',					
            flex:1,
            renderer: function (v,metadata,r) {
                return  r.get('cbc_cPrefijoCbte') +'-'+Ext.String.leftPad(r.get('cbc_iNumeroCbte'),5,'0');
            }
		},{
            xtype : 'gridcolumn',
            header : 'Fecha',
            dataIndex : 'cbc_dFecha',
            flex:1
            
		},{
            xtype : 'gridcolumn',
            header : 'Total',
            dataIndex : 'cbc_yTotal',    
            renderer: Ext.util.Format.usMoney,        		
            flex:1
		},{
            xtype : 'gridcolumn',
            header : 'Importe del pago',
            dataIndex : 'pag_yImporte',    
            renderer: Ext.util.Format.usMoney,            	
            flex:1
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
            items: [
                {
                    text:'Nuevo pago',
                    itemId:'nuevopago'
                },
                {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 310,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                        {
                                            xtype:'fieldset',
                                            title: 'Fecha',
                                            layout:'vbox',
                                            items:[
                                                    {
                                                        xtype: 'datefield',
                                                        itemId: 'datedesde',
                                                        fieldLabel: 'Desde'
                                                    },{
                                                        xtype: 'datefield',
                                                        itemId: 'datehasta',
                                                        fieldLabel: 'Hasta'
                                                    }
                                                ]
                                        },{
                                            xtype:'fieldset',
                                            title: 'Fecha de vencimiento',
                                            layout:'vbox',
                                            items:[
                                                    {
                                                        xtype: 'datefield',
                                                        itemId: 'datevencimientodesde',
                                                        fieldLabel: 'Desde'
                                                    },{
                                                        xtype: 'datefield',
                                                        itemId: 'datevencimientohasta',
                                                        fieldLabel: 'Hasta'
                                                    }
                                                ]
                                        },{
                                            xtype: 'combo',
                                            store:[
                                                [0, getLocale('Pendiente')],
                                                [1, getLocale('Activo')],
                                                [2, getLocale('Cancelado')]
                                                ],
                                            editable: false,
                                            queryMode: 'local',
                                            fieldLabel: 'Estado',
                                            lastQuery: '',
                                            itemId:'estado'
                                        },{
                                            xtype:'textfield',
                                            fieldLabel:'Cliente',
                                            itemId:'cliente'
                                        }, {
                                    		xtype : 'combo',			
                                			name : "cue_cprovincia",
                                			displayField : 'org_cnombre',
                                            queryMode: 'local',
                                            itemId: 'organizaciones',
                                			valueField : 'Id',
                                            editable: false,
                                            fieldLabel:'Empresa'
                                                
                                		},{
                                            xtype: 'combo',           
                                            editable: false,
                                            queryMode: 'local',
                                            fieldLabel: 'Forma de pago',
                                            lastQuery: '',
                                            name:'cnt_formapago',
                                            itemId:'formadepago',
                                            displayField: 'fpg_cdescripcion',
                                            valueField: 'fpg_ccodigo'
                                        },{
                                            xtype: 'combo',
                                            store:[
                                                [30, getLocale('30 dias')],
                                                [60, getLocale('60 dias')],
                                                [120, getLocale('120 dias')]
                                                ],
                                            editable: false,
                                            queryMode: 'local',
                                            fieldLabel: 'Mostrar hasta',
                                            lastQuery: '',
                                            itemId:'proximovencimientosdias',
                                            hidden:true
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
        
        this.addDocked(pagingtoolbar);
    } 
});