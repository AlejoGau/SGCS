//MIGRADO2024
Ext.define('Common.view.MulticuentaZonasGridView', {
    extend:'Ext.grid.GridPanel',
    alias : 'widget.multicuentazonasgridview', 

    title: 'Zonas del panel',
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
    itemId: 'gridzone',
    autoHeight: true,
    forceClose: false,
    layout: 'fit',
    columns: [{
                xtype:'actioncolumn', 
                width:30,
                items: [{
                    iconCls: 'icon-zonasEdit',
                    tooltip: getLocale('Modificar datos'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('multicuentazonasgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit',rec,view);
                    }
                }]
            },{
                xtype:'actioncolumn', 
                width:30,
                items: [{
                    iconCls: 'icon-cuentaEdit',
                    tooltip: getLocale('Cambiar partición'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('multicuentazonasgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('particionedit',rec,view);
                    }
                }]
            },
            {
                xtype:'actioncolumn', 
                header: 'Foto',
                width:50,
                renderer: function(value, metadata,record){
                    if ( record.get('zon_cimagen'))
                        return '<img src="/gallery/' + record.get('zon_cimagen') + '" width="32" heigth="32" style="float:right" >';
                },
                itemId: 'uploadPhoto',
                iconCls: 'icon-photo',  // Use a URL in the icon config
                tooltip: 'Ver imagen',
                
            },
            {
                xtype: 'gridcolumn',
                dataIndex: '_codigo',
                header: 'Código',
                sortable: true,
                width: 50
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'zon_cdescripcion',
                header: 'Descripción',
                sortable: true,
                width: 180
            },{
                xtype: 'gridcolumn',
                dataIndex: 'zon_iidcuenta',
                header: 'Particion',
                renderer: function(v, metadata,record){
                    // nombre de la particion
                    var view = this;
                    var store = view.particionesStore;
                    var particion = store.findRecord('cue_iid', v);
                    if (particion)
                        return particion.get('cue_cnombre');
                        else
                        return v;
                },
                sortable: true,
                flex:1
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'zon_codigoalarma',
                header: 'Código alarma',
                sortable: true,
    			renderer: function(value){										
					var store = Ext.data.StoreManager.get('TablaCodigosAlarmasStore');
					var record = store.findRecord('Codigo', value);							
					if(record == undefined)
						return '';
					else					
						return record.data.Descripcion;										
				},
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'zon_clistaemergencia',
                header: 'Lista emergencia',
                sortable: true,
				renderer: function(value){										
					var store = Ext.data.StoreManager.get('TablaListasEmergenciaStore');
					var record = store.findRecord('Codigo', value);							
					if(record == undefined)
						return '';
					else					
						return record.data.Descripcion;										
				},
                width: 130
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'zon_ccodigorestauracion',
                header: 'Código restauracion',
                sortable: true,
				renderer: function(value){										
					var store = Ext.data.StoreManager.get('TablaCodigosAlarmasStore');
					var record = store.findRecord('Codigo', value);							
					if(record == undefined)
						return '';
					else					
						return record.data.Descripcion;										
				},
                width: 180
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'zon_nminutosrestauracion',
                header: 'Minutos restauración',
                sortable: true,
                editor: {
                    xtype: 'numberfield'
                },
                width: 110
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'zon_nmostrar',
                header: 'Mostrar',
                sortable: true,
                renderer: function(value){        								
					var store = Ext.data.StoreManager.get('SiNoStore');
					var record = store.findRecord('Value', value);							
					if(record == undefined)
						return '';
					else					
						return record.get('Name');										
				},
                width: 50
            }
        ],
    initComponent: function () {
        this.callParent(arguments);
        this.onSelectChange = function (selModel, selections) {
            var button = this.down('button[action=delete]');
            if (button)
                button.setDisabled(selections.length === 0);
        };
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
               items: [
                {
                    text: 'Guardar',
                    hidden: true,
                    iconCls: 'save',
                    action: 'save',
                    
                    itemId: 'save'
                },"-",{
                    text: 'Actualizar',
                    hidden: true,
                    iconCls: 'x-tbar-loading',
                    action: 'actualizar'
                }
                ]
             }); 
         
         this.addDocked(toolbar);
         
         
        /* var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        */
        
    } // cierro init
});