//MIGRADO2024
Ext.define('Common.view.ComprobanteGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.comprobantegridview'],
    autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    features : [
        {
            ftype : 'groupingsummary',
        // id: 'groupingsummary',
            groupByText : getLocale('Agrupar'),
            startCollapsed: false,
            enableGroupingMenu: true,
            showGroupsText : getLocale('Mostrar en grupos')
        }
    ],
    activeHelp:true,
    columns : [{
            xtype:'actioncolumn',
            header: '',
            width: 30,
            items: [
                {
                    iconCls: 'icon-money',
                    tooltip: 'Modificar',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('comprobantegridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit',rec,view);
                    }
                }
            ]
        },{
            xtype:'actioncolumn',
            header: '',
            width: 30,
            items: [
                {
                    iconCls: 'icon-page-white-acrobat',
                    tooltip: 'Modificar',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('comprobantegridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('openPdf',rec,view);
                    }
                    /**
                     * 13/05 : Todo comprobante debe mostrar el icono de PDF,
                    getClass: function(v, meta, rec) {          
                        if(rec.data.cbc_cestado != 1) {                                                                      
                            return 'x-hide-display';
                        } else {
                            return 'icon-page-white-acrobat';
                        }
                    }
                    */
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
        },
        {
            xtype : 'gridcolumn',
            header : 'Cliente',
            dataIndex : 'nombreOrganizacion',                	
            flex:1
        },{
            xtype : 'gridcolumn',
            header : 'Tipo',
            dataIndex : 'cbt_cdescripcion',					
            flex:1
            
        },{
            xtype : 'datecolumn',
            header : 'Fecha',
            dataIndex : 'cbc_dfecha',
            width: 60,
            hidden: false,    				
            flex:1,
            sortable : true,
            renderer: function (v,metadata,r) {
                return  Ext.Date.format(new Date(r.get('cbc_dfecha')),'d/m/Y') ;
            }
        }
        /*,{
            xtype : 'gridcolumn',
            header : 'Description',
            dataIndex : 'name',                	
            renderer: function(value){
                var name=value
                //var name = this.M_comprobantes_item_fc.findRecord('m_comprobantes_item_fc',value);
                if(name==''){
                    return 'SIN DESCRIPCION';
                }else{
                    return 'DESCRIPCION Name:'+name;
                }
            }
        }*/
        ,{
            xtype : 'gridcolumn',
            header : 'Subtotal',
            dataIndex : 'cbc_ysubtotal',
            width: 100,
            renderer: function (value, metadata, record){
                if(record) {
                    return Ext.util.Format.currency(value,record.get('mon_csymbol')+' ')
                } else {
                    return value
                }
            },
            sortable : true
        },{
            xtype : 'gridcolumn',
            header : 'Total',
            dataIndex : 'cbc_ytotal',
            width: 100,
            renderer: function (value, metadata, record){
                if(record) {
                    return Ext.util.Format.currency(value,record.get('mon_csymbol')+' ')
                } else {
                    return value
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
        ,{
            xtype : 'gridcolumn',
            header : 'Empresa Facturadora',
            dataIndex : 'orgfac_org_cnombre',
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
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls : 'icon-money',
                    text    : 'Nuevo comprobante',
                    itemId: 'new',
                    action  : 'new',
                // hidden:true
                },"-",{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 450,
                        items: [
                            {
                                xtype: 'form',
                                bodyPadding: 5,
                                defaultButton: 'comprobantegridview #search',
                                layout: 'anchor',
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
                                        itemId:'estado',
                                        labelWidth: 120,
                                        anchor: '100%'
                                    },{
                                        xtype: 'combo',
                                        editable: false,
                                        queryMode: 'local',
                                        fieldLabel: 'Tipo comprobante',
                                        lastQuery: '',
                                        name:'cbc_ctipocbte',
                                        itemId:'cbc_ctipocbte',
                                        displayField : '_cbt_cdescripcion',
                                        valueField : 'cbt_ccodigo',
                                        labelWidth: 120,
                                        anchor: '100%'
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
                    itemId: 'search',
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