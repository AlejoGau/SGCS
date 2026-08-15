//MIGRADO2024
Ext.define('Common.view.NotificacionesDealerGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.notificacionesdealergridview'],
    title : 'Templates',
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
    //plugins: [{ptype : '//pagingselectpersist'}],   
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    autoScroll : true,
    columns : [
       {
            xtype:'actioncolumn',
            width:60,
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: 'Editar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('notificacionesdealergridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype: 'gridcolumn',
            dataIndex: 'tnd_cAlarmas',
            header: 'Eventos',
            sortable: true,
            flex: 2
        },{
            xtype: 'gridcolumn',
            dataIndex: 'tnd_cMail',
            header: 'Destino mail',
            sortable: true,
            flex: 2
        }/*,{
            xtype: 'gridcolumn',
            dataIndex: 'sms_cDescripcion',
            header: 'Nombre',
            sortable: true,
            flex: 2
            
        }*/,{
            xtype: 'gridcolumn',
            dataIndex: 'tnd_cPlantillaMail',
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
        }
        /*,{
            xtype: 'gridcolumn',
            dataIndex: 'sms_csmsparaeventos',
            header: 'Destino sms',
            sortable: true,
            flex: 1
        },{
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
        },{
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
        },{
            xtype: 'gridcolumn',
            dataIndex: 'sms_cPlantillaPush',
            header: 'Plantilla push',
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
        },{
            xtype: 'gridcolumn',
            dataIndex: 'smartpanicsNombres',
            header: 'Smartpanics',            				
			
            flex: 1
        }*/
    ],
    
    initComponent: function () {
       
        this.callParent(arguments);  
        
        //this.onSelectChange = function (selModel, selections) {
        //    this.down('[action="delete"]').setDisabled(selections.length == 0);
        //};
        
         
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-add',
                    text: 'Agregar sms',
                    action: 'addsms',
                    itemId:'addsms',
                    hidden:true
                }, {
                    iconCls: 'icon-add',
                    text: 'Agregar email',
                    action: 'addemail',
                    itemId:'addemail',
                    hidden:true
                }, {
                    iconCls: 'icon-add',
                    text: 'Agregar Push',
                    action: 'addpush',
                    itemId:'addpush',
                    hidden:true
                }, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    disabled: true,
                    action: 'delete',
                    itemId:'delete'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});