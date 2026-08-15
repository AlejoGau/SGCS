var navigate = function(panel, direction){
    
    var layout = panel.getLayout();
    layout[direction]();
    Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
    Ext.getCmp('move-next').setDisabled(!layout.getNext());
    
    Ext.getCmp('move-next').setDisabled(true);
    panel.up('pagoformview').fireEvent('calcularContadores',panel.up('pagoformview'))
};

Ext.define('WebMG.view.PagoFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.pagoformview'],
    title : '',  
    
    
    items : [ 
            
            {
                xtype:'container',
                items:[{
                    xtype:'displayfield',
                    fieldLabel:'Total recibido',
                    itemId:'totaldepagos',
                    renderer: function (value){
                        if(this.up('pagoformview').moneySymbol) {
                            return Ext.util.Format.currency(value,this.up('pagoformview').moneySymbol)
                        } else {
                           return ''
                        }                       
                    },
                },{
                    xtype:'displayfield',
                    fieldLabel:'Imputado',
                    itemId:'imputado',
                    renderer: function (value){
                        if(this.up('pagoformview').moneySymbol) {
                            return Ext.util.Format.currency(value,this.up('pagoformview').moneySymbol)
                        } else {
                           return ''
                        } 
                    },
                }]
            },
            {
                xtype:'panel',
                itemId:'cardspanel',
                flex:1,
                layout:'card',  
                activeItem: 0,
                height:300,
                items:[{
                        itemId: 'card-0',
                        layout:'vbox',
                        items:[
                                {
                                    xtype:'container',
                                    layout:'hbox',
                                    items:[
                                    
                                    {
                                        xtype: 'combo',
                                        allowBlank: false,
                                        queryMode: 'local',
                                        displayField: 'fpg_cdescripcion',
                                        valueField: 'fpg_ccodigo',
                                        itemId:'forma',
                                        emptyText:'Forma de pago',
                                        flex:2
                                    },{
                                        xtype:'numberfield',
                                        emptyText:'Importe', 
                                        name:'importe',
                                        itemId:'importe',
                                        decimalPrecision:2,
                                        allowDecimals: true,
                                        flex:3
                                    },{
                                        xtype:'numberfield',
                                        emptyText:'Numero', 
                                        name:'numerocheque',
                                        itemId:'numerocheque',
                                        flex:3,
                                        hidden:true
                                    },{
                                        xtype: 'combo',
                                        allowBlank: false,
                                        queryMode: 'local',
                                        displayField: 'bco_cnombre',
                                        valueField: 'bco_ccodigo',
                                        itemId:'bancos',
                                        name:'bancos',
                                        emptyText:'Banco',
                                        flex:2,
                                        hidden:true
                                    },{
                                        xtype: 'combo',
                                        allowBlank: false,
                                        queryMode: 'local',
                                        displayField: 'fir_cnombre',
                                        valueField: 'fir_ccodigo',
                                        itemId:'firmantes',
                                        name:'firmantes',
                                        emptyText:'Firmantes',
                                        flex:3,
                                        hidden:true
                                    },{
                                        xtype:'datefield',
                                        name: 'vencimiento',
                                        itemId: 'vencimiento',
                                        emptyText:'Vencimiento',                                        
                                        hidden:true
                                    },{
                                        xtype:'button',
                                        text:'Agregar',
                                        itemId:'agregar'
                                    }]
                                }, {
                                    xtype:'grid',
                                    flex:1,
                                    width:'100%',
                                    itemId:'pagos',
                                    plugins:[Ext.create('Ext.grid.plugin.CellEditing', {
                                        clicksToEdit: 1
                                    })],
                                    listeners: {
                                        edit: function (grid, row) {                                                   
                                            var view = grid.view.up('pagoformview'); 
                                            view.fireEvent('calcularContadores',view)
                                        }
                                    },
                                    columns:[{
                                        xtype : 'gridcolumn',
                                        header : 'Importe',
                                        dataIndex : 'importe',  
                                        flex:1,
                                        renderer: function (value){
                                            if(this.up('pagoformview').moneySymbol) {
                                                return Ext.util.Format.currency(value,this.up('pagoformview').moneySymbol)
                                            } else {
                                               return ''
                                            } 
                                        },
                                        editor: {
                                            xtype: 'numberfield',
                                            allowBlank: false,
                                            minValue: 0,
                                            maxValue: 100000,
                                        }
                                                                               
                                    },{
                                        xtype : 'gridcolumn',
                                        header : 'Forma de pago',
                                        dataIndex : 'formaDescripcion',
                                        flex:1                                
                                    },{
                                        xtype : 'gridcolumn',
                                        header : 'Numero cheque',
                                        dataIndex : 'numeroCheque',
                                        flex:1,
                                        hidden:true
                                    },{
                                        xtype : 'gridcolumn',
                                        header : 'Banco',
                                        dataIndex : 'bancoNombre',
                                        flex:1,
                                        hidden:true                             
                                    },{
                                        xtype : 'gridcolumn',
                                        header : 'Firmante',
                                        dataIndex : 'firmanteNombre',
                                        flex:1,
                                        hidden:true                             
                                    },{
                                        xtype : 'gridcolumn',
                                        header : 'Vencimiento',
                                        dataIndex : 'vencimiento',
                                        flex:1,
                                        hidden:true                             
                                    },{
                                            xtype:'actioncolumn',
                                            header: '',
                                            width: 30,
                                            items: [
                                                {
                                                    iconCls: 'icon-money-delete',
                                                    tooltip: 'Eliminar pago',
                                                    handler: function(grid, rowIndex, colIndex,item, event) {
                                                        var view = grid.up('pagoformview');
                                                        var rec = grid.getStore().getAt(rowIndex);
                                                        
                                                        grid.getStore().remove(rec)
                                                        
                                                        view.fireEvent('calcularContadores',view)
                                                       
                                                        
                                                    }
                                                }
                                            ]
                                        }]
                                }
                            ]
                    },{
                        itemId: 'card-1',
                        
                                    layout:'fit',
                        items:[{
                                    xtype:'grid',
                                    flex:1,
                                    width:'100%',
                                    autoScroll:true,
                                    itemId:'comprobantes',
                                    plugins:[Ext.create('Ext.grid.plugin.CellEditing', {
                                        clicksToEdit: 1
                                    })],
                                    features : [
                                        {
                                            ftype : 'grouping',
                                            groupHeaderTpl: [
                                                
                                                '{[this.getTitle(values)]}',
                                                {
                                                    getTitle: function (values) {  
                                                        return values.name
                                                    }
                                                }
                                                
                                            ],
                                            groupByText : getLocale('Agrupar'),
                                            collapsible: false,
                                            enableGroupingMenu: false,
                                            showGroupsText : getLocale('Mostrar en grupos')
                                		}
                                    ],
                                    listeners: {
                                                edit: function (grid, row) {
                                                   
                                                    var view = grid.view.up('pagoformview');                                                        
                                                        
                                                    view.fireEvent('agregarimputacion',view, row.record, false)
                                                }
                                    },
                                    stateId:'comprobantesimpagos4',
                                    columns:[{
                                            xtype : 'gridcolumn',
                                            header : 'N Comporbante',
                                            dataIndex : 'cbc_inumerocbte',                	
                                            width:150,
                                            sortable : true,
                                            renderer: function(value, metadata, record){
                                                return record.get('_ncomprobante')
                                            }            
                                		}/*,{
                                            xtype : 'gridcolumn',
                                            header : 'Organizacion',
                                            dataIndex : 'nombreOrganizacion',                	
                                            flex:1
                                		}*/,{
                                            xtype : 'gridcolumn',
                                        	header : 'Tipo',
                                            dataIndex : 'cbc_cTipoCbte',					
                                            flex:1,
                                            renderer: function(value, metadata, record){
                                                
                                                var tipo = this.up('pagoformview').TipoComprobanteStore.findRecord('cbt_ccodigo',value);
                                                if(tipo) {
                                                    return tipo.get('cbt_cdescripcion')
                                                } else {
                                                    return '';
                                                }
                                            }
                                             
                                		},{
                                            xtype : 'datecolumn',
                                            header : 'Fecha',
                                            dataIndex : 'cbc_dFecha',
                                            hidden: false,    				
                                            flex:1,
                                            sortable : true,
                                            renderer: function (v,metadata,r) {
                                                return  Ext.Date.format(new Date(r.get('cbc_dFecha')),'d/m/Y') ;
                                            }
                                    	},{
                                            xtype : 'gridcolumn',
                                            header : 'Cuota',
                                            dataIndex : 'cta_nCuota', 
                                            renderer: function (value){
                                                return value + 1
                                            },                                           
                                    	},{
                                            xtype : 'gridcolumn',
                                            header : 'Total',
                                            dataIndex : 'cta_yTotal',
                                            renderer: function (value){
                                                if(this.up('pagoformview').moneySymbol) {
                                                    return Ext.util.Format.currency(value,this.up('pagoformview').moneySymbol)
                                                } else {
                                                   return ''
                                                } 
                                            },
                                            sortable : true
                                		},{
                                            xtype : 'gridcolumn',
                                            header : 'Saldo',
                                            dataIndex : 'cta_ySaldo',
                                            renderer: function (value){
                                                if(this.up('pagoformview').moneySymbol) {
                                                    return Ext.util.Format.currency(value,this.up('pagoformview').moneySymbol)
                                                } else {
                                                   return ''
                                                } 
                                            },
                                            sortable : true
                                    	}/*,{
                                            xtype : 'gridcolumn',
                                            header : 'Estado',
                                            dataIndex : 'cbc_cestado',  
                                            renderer: function (v,metadata,r) {
                                                if(r.get('cbc_cestado') ==0 ) {
                                                    return getLocale('Pendiente')
                                                } else if(r.get('cbc_cestado') ==1 ) {
                                                    return getLocale('Activo')
                                                } else if(r.get('cbc_cestado') ==2 ) {
                                                    return getLocale('Cancelado')
                                                }
                                            },
                                            flex:1,
                                            sortable : true
                                        }*/,{
                                            xtype : 'gridcolumn',
                                            header: 'Imputar',
                                            dataIndex: 'imputar',
                                            width: 70,
                                            align: 'right',
                                            renderer: function (value){
                                                if(this.up('pagoformview').moneySymbol) {
                                                    return Ext.util.Format.currency(value,this.up('pagoformview').moneySymbol)
                                                } else {
                                                   return ''
                                                } 
                                            },
                                            editor: {
                                                xtype: 'numberfield',
                                                allowBlank: false,
                                                minValue: 0,
                                                maxValue: 100000,
                                                
                                            }
                                        },{
                                            xtype:'actioncolumn',
                                            header: '',
                                            width: 30,
                                            items: [
                                                {
                                                    iconCls: 'icon-money-add',
                                                    tooltip: 'Todo el valor',
                                                    handler: function(grid, rowIndex, colIndex,item, event) {
                                                        var view = grid.up('pagoformview');
                                                        var rec = grid.getStore().getAt(rowIndex);
                                                        
                                                        view.fireEvent('agregarimputacion',view, rec, true)
                                                       
                                                        
                                                    }
                                                }
                                            ]
                                        }]
                                }]
                        
                    },{
                        itemId: 'card-2',
                        items:[{
                            xtype:'displayfield',
                            fieldLabel:'Cantidad de recibos',
                            itemId:'cantidadrecibos'
                                
                        },{
                            xtype:'displayfield',
                            fieldLabel:'Cantidad de comprobantes imputados',
                            itemId:'cantidadcomprobantesimputados'
                                
                        },{
                            xtype:'datefield',
                            name: 'fecharecibo',
                            itemId: 'fecharecibo',
                            fieldLabel:'Fecha recibo',
                            value:new Date()
                        },{
                            xtype: 'combo',
                            allowBlank: false,
                            queryMode: 'local',
                            displayField: 'cbt_cdescripcion',
                            valueField: 'cbt_ccodigo',
                            itemId:'recibos',
                            fieldLabel:'Recibo a emitir',
                            flex:2
                        },{
                            xtype:'button',
                            text:'Realizar pago',
                            itemId:'realizarpago'
                        }]
                    }
                    ]
            }
            
       
    ],
    bbar: [
        {
            id: 'move-prev',
            text: 'Back',
            handler: function(btn) {
                navigate(btn.up('pagoformview').down("#cardspanel"), "prev");
            },
            disabled: true
        },
        '->', // greedy spacer so that the buttons are aligned to each side
        {
            id: 'move-next',
            text: 'Next',
            handler: function(btn) {
                navigate(btn.up('pagoformview').down("#cardspanel"), "next");
            }
        }
    ],
   
	initComponent : function() {
		this.callParent();

        
        if(this.record.recordOrganizacion) {
            this.moneySymbol = this.record.recordOrganizacion.get('mon_csymbol')
        }
        
       /*  var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                },{
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    scope: this,
                    action: 'delete'
                }
            ]
         }); 
         this.addDocked(toolbar);*/
	} 

});