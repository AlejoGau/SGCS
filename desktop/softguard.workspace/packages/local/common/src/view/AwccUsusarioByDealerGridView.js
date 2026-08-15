//MIGRADO2024
Ext.define('Common.view.AwccUsusarioByDealerGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.awccUsuariobydealergridview',
    autoHeight : true,
	columns : [{
        xtype:'actioncolumn',
        itemId: 'actioncolumn',
        width:40,
        items: [{
            iconCls: 'icon-user-edit',
            tooltip: 'Modificar usuario',
            handler: function(grid, rowIndex, colIndex,item, event) {
                var view = grid.up('awccUsuariobydealergridview');
                var rec = grid.getStore().getAt(rowIndex);
                view.fireEvent('objectedit',rec,view);
            }
        }]},        
        {
			xtype : 'gridcolumn',
			header : 'Usuario',
			sortable : true,
			dataIndex : 'udw_usuario',
			width : 200
		}, {
			xtype : 'gridcolumn',
			header : 'Nombre',
			dataIndex : 'udw_nombre',
			sortable : true,
			width : 125
		},              
        {
			xtype : 'gridcolumn',            
			header : 'Apellido',
			dataIndex : 'udw_apellido',
			sortable : true,
			width : 125
		}, 
        {
			xtype : 'gridcolumn',            
			header : 'Organización',
			dataIndex : 'udw_empresa',
            renderer: function(value, metadata, record){
                return record.get('OrganizationName');
            },
			sortable : true,
            groupable : true,
			width : 150
		},              
        {
    		xtype : 'gridcolumn',            
			header : 'Tipo',
			dataIndex : 'udw_tipo',
			sortable : true,
			renderer: function(value, metadata, record, colIndex,store, view) {
                if(value == 0) {
                    return getLocale('Central')
                } else if(value == 1) {
                    return getLocale('Dealer')
                } else if(value == 2) {
                    return getLocale('Usuario final (AWCC)')
                }
			}
		}      
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [ 
                {
                    iconCls: 'icon-usuarios',
                    text: 'Nuevo usuario Awcc',
                    action: 'nuevousaurio',
                    itemId:'nuevousuario'
                },{
                    iconCls: 'icon-usuarios',
                    text: 'Asignar usuario existente',
                    action: 'asignarusaurio',
                    itemId:'asignarusaurio'
                },
                /*{
                    iconCls: 'icon-cuenta_filter_todas',
                    text: 'Todas',
                    action: 'removefilter',
                    pressed: true,
                    toggleGroup: 'filter',
                    enableToggle: true
                },{
                    iconCls: 'icon-building',
                    text: 'Agrupar por cliente',
                    action: 'agrupar',
                    enableToggle: true
                },*/
                { xtype: 'tbseparator' },
                
                {
                    xtype: 'textfield',
                    fieldLabel : 'Nombre',
                    itemId: 'query',
                    labelWidth: 50
                },
              /*  {
                	xtype : 'combo',
        			fieldLabel : 'Modulos',			        			
                    queryMode: 'local',        			
                    itemId: 'combomodulos',
                    store: [],
                    displayField: 'field1',
                    valueField: 'field2',
                    labelWidth: 50
        		},*/{
                    iconCls: '',
                    text: 'Buscar',
                    action: 'filterText'
                },"-",{
                    text:getLocale('Central'),
                    itemId:'central'
                },{
                    text:getLocale('Dealer'),
                    itemId:'dealer'
                },{
                    text:getLocale('Usuario final (AWCC)'),
                    itemId:'usuarioawcc'
                }
                ]// cierro items
         }); 
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.addDocked(toolbar);
        this.addDocked(pagingtoolbar);
                
    } // cierro init
});