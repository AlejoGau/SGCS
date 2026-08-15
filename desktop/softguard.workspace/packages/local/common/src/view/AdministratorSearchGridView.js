//MIGRADO2024
Ext.define('Common.view.AdministratorSearchGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.administratorsearchgridview',
	autoHeight : true,
    /*features : [
        {
        	ftype : 'grouping',
            
            
            groupHeaderTpl: [
                '{children:this.getHeader} ({rows.length})</input>',
                {
                    getHeader: function(c) {
                        if(c[0].get('OrganizationName') != '') {
                            return c[0].get('OrganizationName');
                        } else {
                            return getLocale('Organizacion no encontrada')+' '+c[0].get('udw_empresa');
                        }
                    }
                }
            ],
            groupByText : getLocale('Agrupar'),
          //  id: 'groupingFeature',
          //  startCollapsed: true,
            showGroupsText : getLocale('Mostrar en grupos')
		}
    ],*/
	columns : [{
        xtype:'actioncolumn',
        width:30,
        items: [{
            iconCls: 'icon-user-edit',
            tooltip: getLocale('Modificar usuario'),
            handler: function(grid, rowIndex, colIndex,item, event) {
                var view = grid.up('administratorsearchgridview');
                var rec = grid.getStore().getAt(rowIndex);
                view.fireEvent('objectedit',rec,view);
            }
        }]}, {
        xtype:'actioncolumn',
        itemId:'copycol',
        tooltip: getLocale('Copiar usuario'),
        width:30,
        items: [{
            tooltip: getLocale('Copiar'),
            iconCls: 'icon-user-add',
            
            handler: function(grid, rowIndex, colIndex,item, event){
                var record = grid.getStore().getAt(rowIndex);
                var usuario = record.get('udw_usuario') + '-' + record.get('udw_nombre') + ' '+record.get('udw_apellido');
                Ext.create('Ext.Window', {
                    title: getLocale('Copiar usuario') + ': ' + usuario,
                    height: 160,
                    width: 400,
                    closeAction: 'hide',
                    border: false,
                    layout: 'fit',
                    modal: true,
                    items: {
                            xtype:'admincopyview',
                            record: record
                        }
                }).show();
            }
        }]},       
        {
			xtype : 'gridcolumn',
			header : 'Usuario',
			sortable : true,
			dataIndex : 'udw_usuario',
			flex:1
		}, {
			xtype : 'gridcolumn',
			header : 'Nombre',
			dataIndex : 'udw_nombre',
			sortable : true,
    		flex:2
		},              
        {
			xtype : 'gridcolumn',            
			header : 'Apellido',
			dataIndex : 'udw_apellido',
			sortable : true,
        	flex:2
		}, 
        {
			xtype : 'gridcolumn',            
			header : 'Cliente',
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
            hidden: true,
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
		}, 
        {
    		xtype : 'gridcolumn',            
			header : 'Provincia',
            itemId: 'provincia',
			dataIndex : 'udw_metadata',
            renderer: function(value, metadata, record){
                var response = '';
                var m = record.get('udw_metadata');
                if (m && m !== ''){
                    var data = Ext.JSON.decode(m);
                    var provincia = data.provincia;
                    if (provincia && provincia !== ''){
                        response = provincia.nombre;
                    }
                }
                
                return response;
            },
			sortable : true,
            groupable : true,
			width : 150
		}, 
        {
        	xtype : 'gridcolumn',            
			header : 'Idioma',
            itemId : 'Idioma',
			dataIndex : 'udw_metadata',
            renderer: function(value, metadata, record){
                var response = '';
                var m = record.get('udw_metadata');
                if (m && m !== ''){
                    var data = Ext.JSON.decode(m);
                    var language = data.language
                    if (language && language !== '')
                    response = getLocale(language);
                }
                
                return response;
            },
			sortable : true,
            groupable : true,
			width : 150
		}  , 
        {
            xtype : 'gridcolumn',            
			header : 'Perfil',
            itemId : 'Perfil',
			dataIndex : 'nombrePerfil',
            renderer: function(value, metadata, record){
                
                if (!value){
                    return getLocale('Sin perfil')
                }
                
                return value;
            },
			sortable : true,
            groupable : true,
			width : 150
		}   
        
        
        
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [              
                {
                    iconCls: 'icon-add',
                    text: 'Nuevo perfil',
                    action: 'nuevoperfil',
                    itemId:'nuevoperfil',
                    hidden:true                    
                },{
                    iconCls: 'icon-cuenta_filter_todas',
                    text: 'Todas',
                    action: 'removefilter',
                    pressed: true,
                    toggleGroup: 'filter',
                    enableToggle: true
                },/*{
                    iconCls: 'icon-building',
                    text: 'Agrupar por cliente',
                    action: 'agrupar',
                    itemId:'agrupar',
                    enableToggle: true
                },*/
                { xtype: 'tbseparator' },
                
               {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 480,
                        items: [
                                 {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                            {
                                                xtype: 'textfield',
                                                fieldLabel : 'Usuario',
                                                itemId: 'query',
                                                labelWidth: 50,
                                                width:460
                                            },
                                            {
                                                xtype : 'combo',
                                    			fieldLabel : 'Modulos',			        			
                                                queryMode: 'local',        			
                                                itemId: 'combomodulos',
                                               // store: [],
                                                displayField: 'field1',
                                                valueField: 'field2',
                                                labelWidth: 50,
                                                width:460
                                    		},{
                                                xtype:'fieldset',
                                                title:'Rango de cuentas',
                                                layout:'hbox',
                                                itemId:'rangomenu',
                                                items: [
                                                        {
                                                            xtype: 'textfield',
                                                            fieldLabel : 'Dealer',
                                                            itemId: 'dealerfield',
                                                            labelWidth: 50
                                                        },{
                                                            xtype:'displayfield',
                                                            text:'-',
                                                            width:20
                                                        },{
                                                            xtype: 'textfield',
                                                            fieldLabel : 'Cuenta',
                                                            itemId: 'cuenta',
                                                            labelWidth: 50
                                                        }
                                                    ]
                                            },{
                                                xtype:'perfilfield',
                                                simpleSelect: true,
                                                itemId:'perfil'
                                                
                                            },{
                                                xtype:'button',
                                                iconCls: '',
                                                text: 'Buscar',
                                                action: 'filterText'
                                            }
                                    ]
                            }
                        ]
                    
                    }
				},
                
                
                
                
                
                
                ,"-",{
                    text:getLocale('Central'),
                    itemId:'central'
                },{
                    text:getLocale('Dealer'),
                    itemId:'dealer'
                },{
                    text:getLocale('Usuario final (AWCC)'),
                    itemId:'usuarioawcc'
                },"-",{
                    text:getLocale('Usuarios Bloqueados'),
                    itemId:'usuariosbloqueados',
                    pressed: false,
                    enableToggle: true
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