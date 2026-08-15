//MIGRADO2024
Ext.define('Common.view.HorarioAlternativoGridView', {
	extend: 'Ext.grid.Panel',
    alias : 'widget.horarioalternativogridview', 
    autoScroll: true,
    autoHeight: true,
    minHeight: 100,
    title: 'Alternativos',
	collapsible: true,
	itemId:'horarioalternativogridview',
	selType: 'checkboxmodel',
	multiSelect: true,
	//layout: 'anchor',
    minHeight: 200,
    columns: [
		{
			xtype: 'gridcolumn',
			dataIndex: 'alt_ndiaapertura',
			header: 'Dia Apertura',
            renderer: function(value){										
				var store = Ext.data.StoreManager.get('TablaDiasStore');
				var record = store.findRecord('Value', value);							
				if(record == undefined)
					return value;
				else					
					return record.get('Name');										
			},
			editor: {
				xtype: 'combo',                                        
				store: 'TablaDiasStore',					
				name: 'alt_ndiaapertura',
				displayField: 'Name',								
				valueField: 'Value'	
			},
			sortable: true,
			width: 100
		},
		{
			xtype: 'gridcolumn',
			dataIndex: 'alt_choraapertura',
			header: 'Hora Apertura',
			editor: {
				xtype: 'textfield',
				name: 'alt_choraapertura'
			},
			sortable: true,
			width: 100
		},
		{
			xtype: 'gridcolumn',
			dataIndex: 'alt_ndiacierre',
			header: 'Dia Cierre',
            renderer:  function(value){										
				var store = Ext.data.StoreManager.get('TablaDiasStore');
				var record = store.findRecord('Value', value);							
				if(record == undefined)
					return value;
				else					
					return record.data.Name;										
			},
			sortable: true,
			editor: {
				xtype: 'combo',                                        
				store: 'TablaDiasStore',					
				name: 'alt_ndiacierre',
				displayField: 'Name',								
				valueField: 'Value'	
			},
			width: 100
		},
		{
			xtype: 'gridcolumn',
			dataIndex: 'alt_choracierre',
			header: 'Hora Cierre',
			editor: {
				xtype: 'textfield',
				name: 'alt_choracierre'
			},
			sortable: true,
			width: 100
		}
	],
    
    initComponent: function () {
       
        this.onSelectChange = function (selModel, selections) {
            this.down('button[action=delete]').setDisabled(selections.length === 0);
        };

       // this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
               items: [
              /*  {
                    text: 'Guardar',
                    iconCls: 'save',
                    action: 'save'
                },
                {xtype: 'tbseparator'},*/
                {
                    iconCls: 'icon-add',
                    text: 'Agregar',
                    action: 'add'
                }, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    disabled: true,
                    action: 'delete'
                },"->",{
                    xtype:'container',
                    itemId:'timezone'
                }]
             }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
    }
    });