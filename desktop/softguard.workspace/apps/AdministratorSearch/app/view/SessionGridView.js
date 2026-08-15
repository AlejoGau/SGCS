Ext.define('AdministratorSearch.view.SessionGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.sessiongridview'],
    title : '',
    autoHeight : true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    features: [{
        ftype: 'grouping',
        //groupHeaderTpl: new Ext.XTemplate('<tpl for=".">', '{name} <input type="button" value="'+getLocale('Cerrar sesion')+'"></div>', '</tpl>'),
        groupHeaderTpl : '{name}',
        id: 'groupingMSTSession',
        enableGroupingMenu: false,
        hideGroupedHeader: true
   }],
    columns : [
        {
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-door-out',
                tooltip: 'Cerrar session',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('sessiongridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    Ext.MessageBox.confirm('Confirm', 'Estas seguro que quieres cerrar la sesion de '+rec.get('udw_nombre')+' '+rec.get('udw_apellido')+' ?', function (btn) {
                        if(btn == 'yes') {
                            view.fireEvent('closeSession',rec,view);
                        }
                    });
                    
                    
                    
                }
            }]
       },
       
       {
            xtype : 'gridcolumn',            
            header : 'Nombre',
    		dataIndex : 'udw_nombre',
            groupable:false,
            flex:1,
            renderer: function (v,obj, rec) {
               
                return rec.get('udw_nombre')+' '+rec.get('udw_apellido')+' ('+rec.get('udw_usuarios')+')'
            }
		}, 
        
        {
            xtype : 'gridcolumn',            
            header : 'Modulo',
            dataIndex : 'modulo',
            renderer: function(v){
                return getLocale(v);
            },
            groupable:false,
            flex:1
		}, 
        {
            xtype : 'gridcolumn',            
            header : 'Usuario',
            dataIndex : 'udw_usuarios',
            groupable:false,
            hidden:true,
            renderer: function(value, metadata, record, colIndex,store, view) {
                return record.get('udw_nombre')+' '+record.get('udw_apellido')
            },
            flex:1
    	}, 
        {
            xtype : 'gridcolumn',            
            header : 'Organización',
            dataIndex : 'OrganizationName',
            groupable:true,
            hidden:false,
            flex:1
        }
       
    ],
   
    initComponent: function () {
        var comboSearch =  [
                             ['udw_nombre',getLocale('Nombre')],
                             ['udw_apellido',getLocale('Apellido')]
                           ];
        
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="cerrar"]').setDisabled(selections.length == 0);
        };

        
        this.callParent(arguments);     
       /* var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);*/
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-door-out',
                    text: 'Cerrar session',
                    action: 'cerrar',                    
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
                                            xtype: 'combo',
                                            queryMode: 'local',
                                            itemId: 'fieldName',
                                            store: comboSearch,
                                            fieldLabel: 'Campo',
                                            labelWidth: 100           
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'query',
                                            fieldLabel: 'Valor',
                                            labelWidth: 100  
                                        }
                                    ]
                                 }
                             ]
            		    }
                    
    			},{
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    //action: 'search'
                    itemId: 'search'
                },{
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    //action: 'search'
                    itemId: 'all'
                },'-',
                /*,{
                    iconCls: 'x-tbar-loading',
                    text: 'Refresh',
                    scope: this,
                    action: 'refresh'
                }*/,"-",{
                    iconCls: 'icon-group',
                    text: 'Agrupar por modulo',
                    scope: this,
                    action: 'groupmodule',
                    toggleGroup: 'group',
                    enableToggle: true,
                    
                },{
                    iconCls: 'icon-group',
                    text: 'Agrupar por Usuario',
                    scope: this,
                    action: 'groupuser',
                    toggleGroup: 'group',
                    enableToggle: true,
                    pressed: true
                },{
                    iconCls: 'icon-group',
                    text: 'Agrupar por Organización',
                    scope: this,
                    action: 'grouporganization',
                    toggleGroup: 'group',
                    enableToggle: true,
                    pressed: false
                }/*
                {
                    xtype: 'displayfield',
                    text: 'Filtros',
                    scope: this,
                    itemId: 'filtros'
                }*/
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});