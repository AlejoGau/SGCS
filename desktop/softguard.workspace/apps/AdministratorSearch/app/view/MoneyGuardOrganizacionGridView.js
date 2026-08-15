Ext.define('AdministratorSearch.view.MoneyGuardOrganizacionGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.moneyguardorganizaciongridview'],
    title : '',
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
       
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    activeHelp:true,
    columns : [
       {
            xtype:'actioncolumn',
            width:60,
            items: [{
                    iconCls: 'icon-table-edit',
                    tooltip: 'Editar',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('moneyguardorganizaciongridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit',rec,grid);
                    },
                   
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Nombre',
            dataIndex : 'org_cnombre',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Inicio actividades',
            dataIndex : 'org_cinicioactividades',
            flex: 1,
            renderer : function(value, metadata, record, colIndex,store, view) {
                
                if(record.get('org_cinicioactividades') != '') {
                    return Ext.Date.format( new Date(record.get('org_cinicioactividades')),'d/m/Y')
                } else {
                    return '';
                }
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Moneda',
            dataIndex : 'org_csymbol',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Tipo facturacion',
            dataIndex : 'org_factelect',
            flex: 1,
            renderer : function(value, metadata, record, colIndex,store, view) {
                
                if(value == '') {
                    return getLocale('Sin integracion')
                } else {
                    return value;
                }
            }
        }
        
    ],
    
    initComponent: function () {
       
        
    
        
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="delete"]').setDisabled(selections.length == 0);
        };

        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add'
                },"-", {
                    iconCls: 'icon-delete',
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
                                            xtype:'textfield',
                                            fieldLabel:'Nombre',
                                            itemId:'nombre'
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