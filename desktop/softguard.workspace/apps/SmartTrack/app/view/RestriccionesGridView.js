Ext.define('SmartTrack.view.RestriccionesGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.restriccionesgridview'],
    title : 'Organizaciones',
    autoHeight : true,
    selType:'checkboxmodel',
    selModel: {
        checkOnly: true,
        mode: "MULTI"
    },
    activeHelp:true,//trae el help
    columns : [{
            xtype:'actioncolumn',
            header: '',
            width: 70,
            items: [
                {
                    iconCls: 'icon-lock-edit',
                    tooltip: 'Modificar restriccion',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('restriccionesgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit',rec,view);
                    }
                }, {
                    iconCls: 'icon-vc-actualizado',
                    tooltip: 'Ver dispositivos',
                    
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('restriccionesgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('versmarttrack',rec,view);
                    }
                }
            ]
        },{
        	xtype : 'gridcolumn',
			header : 'Nombre',
            dataIndex : 'vcr_name',
            minWidth : 200,
            flex: 1,
			sortable : true
		},{
			xtype : 'gridcolumn',
			header : 'Distancia',
            dataIndex : 'vcr_distance',
            minWidth : 200,
            flex: 1,
			sortable : true,
            renderer: function(value, metadata, record){
                return record.get('vcr_distance')+getLocale('mts')
            }
		},{
    		xtype : 'gridcolumn',
			header : 'Organizacion',
            dataIndex : 'org.Name',
            minWidth : 200,
            flex: 1,
			sortable : true,
            hidden:true,
            renderer: function(value, metadata, record){
                return record.get('nameOrganization')
            }
		},{
    		xtype : 'gridcolumn',
			header : 'estado',
            dataIndex : 'vcr_status',
            minWidth : 200,
            flex: 1,
			sortable : true,
            renderer: function(value, metadata, record){
                return record.get('_vcr_status')
            }
		}
    ],
    
    initComponent: function () {
                
        this.callParent(arguments);   
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            /*layout: {
                overflowHandler: 'Menu'
            },*/
            enableOverflow:true,
            items: [
                
                {
                    iconCls: 'icon-lock-add',
                    text: 'Nueva restriccion',
                    action: 'add',
                    itemId:'add'
                },'-',{
                    text : 'Filtros',
                    itemId: 'filtro',
                	menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                            {
                                xtype: 'form',
                                bodyPadding: 5,
                                defaultButton: 'restriccionesgridview #search',
                                items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'Name',
                                            fieldLabel: 'Nombre',
                                            labelWidth: 80
                                        },{
                                            xtype:'selecterfield',
                                            itemId:'smarttrack',
                                            simpleSelect: true,
                                            config: {
                                                disponible: {
                                                    title:'Vigicontrol',
                                                    field:'Nombre',
                                                    searchField: 'o.Nombre'
                                                },
                                                selecionado: {
                                                    title:'Vigicontrol',
                                                    field:'Nombre'
                                                },
                                                valueField:'Id',
                                                modelItems: 'SmartTrack.model.SmartTrackSearchModel'
                                                    
                                            },
                                            title:'Vigicontrol'
                                        
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'telefono',
                                            fieldLabel: 'telefono',
                                            labelWidth: 80
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'Imei',
                                            fieldLabel: 'Imei',
                                            labelWidth: 80
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'cue_clinea',
                                            fieldLabel: 'Dealer',
                                            labelWidth: 80
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'cue_ncuenta',
                                            fieldLabel: 'Cuenta',
                                            labelWidth: 80
                                        },{
                                            xtype:'selecterfield',
                                            itemId:'organizacion',
                                            simpleSelect: true,
                                            hidden:true,
                                            config: {
                                                disponible: {
                                                    title:'Organizacion',
                                                    field:'Name',
                                                    searchField: 'o.[Name]'
                                                },
                                                selecionado: {
                                                    title:'Organizacion',
                                                    field:'Name'
                                                },
                                                valueField:'Id',
                                                modelItems: 'SmartTrack.model.OrganizationSearchModel'
                                                    
                                            },
                                            title:'Organizacion'
                                        
                                        },{
                                            xtype:'button',
                                            iconCls: 'icon-find',
                                            text: 'Buscar',
                                            scope: this,
                                            action: 'search',
                                            itemId: 'search'
                                        }
                                    ]
                                 }
                             ]
                	    }
                    
    			},{
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                },{
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',
                    itemId:'delete'
                },
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});
