//MIGRADO2024
Ext.define('Common.view.MGClientHelperView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.mgclienthelperview',
    autoHeight : true,
	columns : [
        {
			xtype : 'gridcolumn',
			header : 'Id',
			sortable : true,
			dataIndex : 'cli_icodigo_ID',
			width : 30
		}, {
			xtype : 'gridcolumn',
			header : 'Nombre',
			dataIndex : 'cli_cnombre',
			sortable : true,
			flex:1
		}
    ],
    
    initComponent: function () {
        var items= [        
            {
                xtype: 'combo',
                store: [['cue_cnombre','Nombre'],['cue_ncuenta','Cuenta'],['cue_clinea','Dealer'],['Dealer-Cuenta','Dealer-Cuenta']],
                queryMode: 'local',
                value: 'cue_cnombre',
                itemId: 'queryType',
                fieldLabel: '',
                labelWidth: 50
            },
            {
                xtype: 'textfield',
                itemId: 'query',
                fieldLabel: '',
                labelWidth: 50
            }, 
             {
                iconCls: '',
                text: 'Buscar',
                action: 'filterText'
            },{ xtype: 'tbseparator' },
            {
                iconCls: 'icon-cuenta_filter_todas',
                text: 'Todas',
                action: 'removefilter',
                pressed: true,
                toggleGroup: 'filter',
                enableToggle: true
            }
        ];// cierro items
        
        
        // si la seleccion es multiple agrego los checkbox
        if (this.multiSelect){
            this.selModel = Ext.create('Ext.selection.CheckboxModel');
            items.unshift({
                    iconCls: '',
                    text: 'Enviar Selección',
                    action: 'selected'
            });
        }
        
        
        
        this.callParent(arguments);
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: items
         }); 
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.addDocked(toolbar);
        this.addDocked(pagingtoolbar);
    } // cierro init
});