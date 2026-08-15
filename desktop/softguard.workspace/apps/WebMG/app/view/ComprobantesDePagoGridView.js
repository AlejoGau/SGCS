Ext.define('WebMG.view.ComprobantesDePagoGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.comprobantesdepagogridview'],
    title : 'Pedidos',
    autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    features : [
        {
            ftype : 'groupingsummary',
            id: 'groupingsummary',
            groupByText : getLocale('Agrupar'),
            startCollapsed: false,
            enableGroupingMenu: true,
            showGroupsText : getLocale('Mostrar en grupos')
        }
    ],
    columns : [{
            xtype:'actioncolumn',
            header: '',
            width: 30,
            items: [
                {
                    iconCls: 'icon-money-dollar',
                    tooltip: 'Ver',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('comprobantesdepagogridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit',rec,view);
                    }
                }
            ]
        }/*,{
            xtype:'actioncolumn',
            header: '',
            width: 30,
            renderer : function( value, meta, record, row, column, store, view ) {
                if ( record.get('cbc_cestado') == 0 ) {
                    this.iconCls    = '';
                    this.tooltip    = '';
                    this.handler    = function( view, rowIndex, colIndex, item, e, record, row ) {
                        return false;
                    }
                } else {
                    this.iconCls    = 'icon-money-add';
                    this.tooltip    = 'Realizar pago';
                    this.handler    = function( view, rowIndex, colIndex, item, e, record, row ) {
                        var view = grid.up('comprobantegridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('realizarpago',rec,view);
                    }
                }
            }
           
        }*/,{
            xtype : 'gridcolumn',
            header : 'N Comporbante',
            dataIndex : 'cbc_inumerocbte',                	
            width:150,
            sortable : true,
            renderer: function(value, metadata, record){
                return record.get('_ncomprobante')
            }            
		},{
            xtype : 'gridcolumn',
            header : 'Organizacion',
            dataIndex : 'nombreOrganizacion',                	
            flex:1
		},{
            xtype : 'gridcolumn',
        	header : 'Tipo',
            dataIndex : 'cbc_ctipocbte',					
            flex:1,
            renderer: function(value, metadata, record){
                
                var tipo = this.TipoComprobanteStore.findRecord('cbt_ccodigo',value);
                if(tipo) {
                    return tipo.get('cbt_cdescripcion')
                } else {
                    return '';
                }
            }
             
		},{
            xtype : 'datecolumn',
            header : 'Fecha',
            dataIndex : 'cbc_dfecha',
            hidden: false,    				
            flex:1,
            sortable : true,
            renderer: function (v,metadata,r) {
                return  Ext.Date.format(new Date(r.get('cbc_dfecha')),'d/m/Y') ;
            }
    	},{
            xtype : 'gridcolumn',
            header : 'Subtotal',
            dataIndex : 'cbc_ysubtotal',
            renderer: function (value){
                
                if(this.moneySymbol) {
                    return Ext.util.Format.currency(value,this.moneySymbol)
                } else {
                   return ''
                } 
            },
            sortable : true
    	},{
            xtype : 'gridcolumn',
            header : 'Total',
            dataIndex : 'cbc_ytotal',
            renderer: function (value){
                if(this.moneySymbol) {
                    return Ext.util.Format.currency(value,this.moneySymbol)
                } else {
                   return ''
                } 
            },
            sortable : true
		},{
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
        }
    
    ],
    
    initComponent: function () {

        this.callParent(arguments); 
        this.view.targetTab = this.targetTab;
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        
        if(this.record.recordOrganizacion) {
            this.moneySymbol = this.record.recordOrganizacion.get('mon_csymbol')
        }
        
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls : 'icon-printer',
                    text    : 'Nuevo comprobante',
                    itemId: 'new',
                    action  : 'new'
                },{
                    iconCls: 'icon-application-view-list',
                    text: 'Agrupar por estado',
                    enableToggle: true,
                    toggleGroup: 'group',
                    action: 'groupStatus',
                    itemId: 'groupStatus'
                },"-",{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 320,
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
                                            xtype: 'combo',
                                           
                                            editable: false,
                                            queryMode: 'local',
                                            fieldLabel: 'Tipo comprobante',
                                            lastQuery: '',
                                            name:'cbc_ctipocbte',
                                            itemId:'cbc_ctipocbte',
                                            displayField : 'Name',
                                        	valueField : 'Id',
                                        },
                                        {
                                            xtype:'fieldset',
                                            title:'N Comprobante',
                                            layout:'hbox',
                                            items:[
                                                    {
                                                        xtype:'textfield',
                                                        fieldLabel:'',
                                                        itemId:'prefijo',
                                                        width:50,                                                                            
                                                        enforceMaxLength : true,
                                                        maxLength : 4
                                                    },{
                                                        xtype:'displayfield',
                                                        fieldLabel:'',
                                                        value:'-'
                                                    },{
                                                        xtype:'textfield',
                                                        fieldLabel:'',
                                                        itemId:'numerocomprobante'
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
                }
                
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
        this.addDocked(pagingtoolbar);
    } 
});