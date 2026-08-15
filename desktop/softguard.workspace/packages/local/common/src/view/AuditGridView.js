//MIGRADO2024
Ext.define('Common.view.AuditGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.auditgridview',
    preventHeader : true,
    autoHeight : true,
    /*       
    features : [
        {
    		ftype : 'grouping',
            groupByText : getLocale('Agrupar'),
            showGroupsText : getLocale('Mostrar en grupos')
		}
    ],
    */
	columns : [
        {
            xtype : 'gridcolumn',
			header : 'Acción',
			dataIndex : 'f.Name',
            renderer: function(value, metadata,record){
                return getLocale(record.get('FunctionName'));
            },
			sortable : true,
			groupable : false,
			width : 100
		},{
			xtype : 'gridcolumn',
			header : 'Tabla',
			dataIndex : 'oj.Name',
            sortable:true,
            renderer: function(value, metadata,record){
                return record.get('ObjectTypeName');
            },
			groupable : false,
            
			width : 150
		},{
    		xtype : 'gridcolumn',
			header : 'Aplicación',
			dataIndex : 'ImpersonateUser',
            hidden: true,
			sortable : true,
			groupable : true,
			width : 100
		},{
        	xtype : 'gridcolumn',
			header : 'Cuenta',
			dataIndex : 'ParentDescription',
            itemId: 'cuenta',
			sortable : true,
			groupable : true,
			width : 150
		},{
        	xtype : 'gridcolumn',
			header : 'Id',
			dataIndex : 'ObjectId',
            hidden: true,
			sortable : true,
			groupable : true,
			width : 50
		},
        {
    		xtype : 'gridcolumn',
			header : 'Usuario',
			dataIndex : 'UserName',
			sortable : true,
			groupable : true,
            hidden: false,
			width : 250
		},
        {
    		xtype : 'datecolumn',
            hidden: false,
			header : 'Fecha',
			dataIndex : 'AuditDate',
            format:'d/m/Y H:i:s',
			sortable : true,
			width : 200
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.addDocked(pagingtoolbar);
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            itemId: 'auditToolbar',
            items: [
                {
                    iconCls: 'icon-cuenta_filter_nohabilitadas',
                    text: 'Eliminados',
                    action: 'filterEliminados',
                    toggleGroup: 'filter',
                    enableToggle: true
                }, {
                    iconCls: 'icon-cuenta_filter_habilitadas',
                    text: 'Altas',
                    action: 'filterAltas',
                    toggleGroup: 'filter',
                    enableToggle: true
                }, 
                 {
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'Modificaciones',
                    action: 'filterModificaciones',
                    toggleGroup: 'filter',
                    enableToggle: true
                },
                {
                    iconCls: 'icon-cuenta_filter_todas',
                    text: 'Todas',
                    itemId: 'todas',
                    action: 'removefilter',
                    pressed: true,
                    toggleGroup: 'filter',
                    enableToggle: true
                },{ xtype: 'tbseparator' }
                ,{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 400,
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
                                        xtype: 'datefield',
                                        itemId: 'fechaDesde',
                                        fieldLabel: 'Desde',
                                        value: new Date(),
                                        maxValue: new Date()  // limited to the current date or prior
                                    },{
                                        xtype: 'datefield',
                                        itemId: 'fechaHasta',
                                        fieldLabel: 'Hasta',
                                        value: new Date(),
                                        maxValue: new Date()  // limited to the current date or prior
                                    },
                                    {
                                        xtype: 'combo',
                                        reference: 'queryTabla',
                                        valueField: 'Name',
                                        displayField: 'NameLocale',
                                        queryMode: 'local',
                                        typeAhead: true,
                                        forceSelection: true,
                                        selectOnFocus: true,
                                        itemId: 'queryTabla',
                                        fieldLabel: 'Tabla',
                                        //listeners: {
                                        //    beforequery: 'onBeforeQuery'
                                        //}
                                    }/*,
                                    {
                                        xtype: 'combo',
                                        store: [
                                            ['oj.[Name]:LIKE',getLocale('Tabla')],
                                            ['UserName:LIKE',getLocale('Usuario')],
                                            ['ParentDescription:LIKE',getLocale('Dealer-Cuenta')]],
                                        queryMode: 'local',
                                        value: 'UserName:LIKE',
                                        itemId: 'queryType',
                                        fieldLabel: ''
                                    }*/,
                                    {
                                        xtype: 'textfield',
                                        itemId: 'queryUsername',
                                        fieldLabel: 'Usuario'
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'queryCuenta',
                                        fieldLabel: 'Dealer-Cuenta'
                                    }, 
                                    {
                                        xtype: 'button',
                                        text: 'Buscar',
                                        iconCls: 'icon-find',
                                        itemId: 'search',
                                        action: 'filterText'
                                    }
                                ]
                            }
                        ]
                    }
    			},'->',{
                    iconCls: 'icon-page-excel',
                    text: 'Exportar',
                    itemId: 'export',
                    action: 'export'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
    } // cierro init
});