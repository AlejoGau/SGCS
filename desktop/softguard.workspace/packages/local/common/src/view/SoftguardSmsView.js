//MIGRADO2024
Ext.define('Common.view.SoftguardSmsView', {
    extend:'Ext.grid.GridPanel',
    alias : ['widget.softguardsmsgridview'],
    title: 'Sms',
    autoHeight: true,
    minHeight : 125,
    viewConfig: {
        emptyText: getLocale('No se encuentran notificaciones')
    },
    stateful: false,
    //stateId: 'smsgridview',
    columns: [
        {
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: 'Editar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('softguardsmsgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'sms_meventos',
            header: 'Eventos',
            sortable: true,
            flex: 2
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'sms_cmailparaeventos',
            header: 'Destino mail',
            sortable: true,
            flex: 2
        },{
            xtype: 'gridcolumn',
            dataIndex: 'sms_cplantillamail',
            header: 'Plantilla mail',
            sortable: true,                      		
			renderer: function(value){										
				var store = Ext.data.StoreManager.get('TablaPlantillasSmsStore');
				var record = store.findRecord('pls_ccodigo', value);							
				if(record == undefined)
					return value;
				else					
					return record.get('pls_cdescripcion');										
			},
            width: 140
        },
        
        {
            xtype: 'gridcolumn',
            dataIndex: 'sms_csmsparaeventos',
            header: 'Destino sms',
            sortable: true,
            flex: 1
        },
        
        {
            xtype: 'gridcolumn',
            dataIndex: 'sms_cplantillasms',
            header: 'Plantilla sms',
            sortable: true,              				
			renderer: function(value){										
				var store = Ext.data.StoreManager.get('TablaPlantillasSmsStore');
				var record = store.findRecord('pls_ccodigo', value);							
				if(record == undefined)
					return value;
				else					
					return record.get('pls_cdescripcion');										
			},
            width: 140
        },
        
        {
            xtype: 'gridcolumn',
            dataIndex: 'sms_imodemsms',
            header: 'Modem sms',
            sortable: true,               				
			renderer: function(value){										
				var store = Ext.data.StoreManager.get('TablaModemsSmsStore');
				var record = store.findRecord('sms_icodigo', value);							
				if(record == undefined)
					return 'Sin Modem';
				else					
					return record.get('sms_cdescripcion');										
			},
            flex: 1
        }
        
        
    ],
    initComponent: function () {
            this.onSelectChange = function (selModel, selections) {
                this.down('button[action=delete]').setDisabled(selections.length === 0);
            };
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
                   items: [
                    {
                        text: 'Guardar',
                        iconCls: 'save',
                        action: 'save'
                    },
                    {xtype: 'tbseparator'},
                    {
                        iconCls: 'icon-add',
                        text: 'Agregar sms',
                        action: 'addsms'
                    }, {
                        iconCls: 'icon-add',
                        text: 'Agregar email',
                        action: 'addemail'
                    }, {
                        iconCls: 'icon-delete',
                        text: 'Eliminar',
                        disabled: true,
                        action: 'delete'
                    }]
                 }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.addDocked(pagingtoolbar);
    } // cierro init
});