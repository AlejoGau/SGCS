Ext.define('Common.view.NotificacionesPushDealerGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.notificacionespushdealergridview'],
    title : 'Templates',
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
       
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
                    var view = grid.up('notificacionespushdealergridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit', rec, grid);
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
            dataIndex: 'tnd_iAdmin',
            header: 'Destinatarios',
            sortable: true,
            flex: 2,
            renderer : function(v) {
                var r = '';

                if (v==0){
                    r = getLocale('Todos');
                }else if (v==1){
                    r = getLocale('Administradores de grupo');
                }else if (v==2){
                    r = getLocale('Administradores de la cuenta');
                }
                return r;
            }
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

        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
         
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
                    text: 'Agregar',
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