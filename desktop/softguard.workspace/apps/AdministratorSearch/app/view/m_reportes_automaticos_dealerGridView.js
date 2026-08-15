Ext.define('AdministratorSearch.view.m_reportes_automaticos_dealerGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.m_reportes_automaticos_dealergridview'],
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
                    var view = grid.up('m_reportes_automaticos_dealergridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype: 'gridcolumn',
            dataIndex: 'rad_nfrecuencia',
            header: 'Frecuencia',
            sortable: true,
            flex: 2,
            renderer: function(value){
                if(value==0)
                    return getLocale('Diario');
                if(value==1)    
                    return getLocale('Semanal');
                if(value==2)    
                    return getLocale('Quincenal');
                if(value==3)    
                    return getLocale('Mensual');
                if(value==4)    
                    return getLocale('Cuatrimestral');
                if(value==5)    
                    return getLocale('Anual');
                if(value==6)    
                    return getLocale('Nunca');                
            }
        },{
            xtype: 'datecolumn',
            dataIndex: 'rad_tproximoenvio',
            
            header: 'Próximo Envío',
            format:'d/m/Y',
            autoSizeColumn: true,
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
            dataIndex: 'rad_ntipo',
            header: 'Tipo',
            sortable: true,        
			renderer: function(value){
                if(value==0)
                    return getLocale('Apertura / Cierre');
                if(value==1)    
                    return getLocale('Emergencias');
                if(value==2)    
                    return getLocale('No emergencias');
                if(value==3)    
                    return getLocale('Todos');
                if(value==4)    
                    return getLocale('Grupos'); 
                if(value==5)
                    return getLocale('Sumario');        										
                return value;					
			},
            width: 140
        }
        ,{
            xtype: 'gridcolumn',
            dataIndex: 'rad_cmail',
            header: 'Dirección del Mail',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'rad_nAlerta',
            header: 'Incluir solo cuentas con Alarmas',
			renderer: function(value){										
				/*var store = Ext.data.StoreManager.get('TablaPlantillasSmsStore');
				var record = store.findRecord('pls_ccodigo', value);							
				if(record == undefined)
					return value;
				else					
					return record.get('pls_cdescripcion');	*/		
                if(value==0)
                    return 'No';
                else    
                    return 'Si';   		
                					
			},
            width: 140
        }/*,{
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
        
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="delete"]').setDisabled(selections.length == 0);
        };

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
                    text: 'Agregar reporte',
                    action: 'addreport',
                    itemId:'addreport'
                    //hidden:true

                }, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    //disabled: true,
                    action: 'delete',
                    itemId:'delete'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});