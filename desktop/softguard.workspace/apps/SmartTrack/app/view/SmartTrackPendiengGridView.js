Ext.define('SmartTrack.view.SmartTrackPendiengGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.smarttrackpendinggridview'],
    title : 'SmartTrack',
    autoHeight : true,
    selModel: Ext.create('Ext.selection.CheckboxModel',{
        showHeaderCheckbox: false,
        mode: 'SINGLE'
    }),
    columns : [{
            xtype : 'gridcolumn',
        	header : 'Nombre Dispositivo',
            dataIndex : 'Nombre',
            width : 300,
			sortable : true			
		},{
            xtype : 'gridcolumn',            
            header : 'Telefono',
    		dataIndex : 'Telefono',			
			flex:1          
		},{
    		xtype : 'gridcolumn',
			header : 'Id',
            dataIndex : 'Id',					
			hidden: true			
		},{
    		xtype : 'gridcolumn',
			header : 'Modelo',
			dataIndex : 'Modelo',
			sortable : true			
		},{
			xtype : 'gridcolumn',            
			header : 'Marca',
			dataIndex : 'Marca',
			sortable : true
		},{
			xtype : 'gridcolumn',            
			header : 'Version',
			dataIndex : 'Version',
			sortable : true,
			width : 100
		},{
            xtype : 'gridcolumn',            
    		header : 'Tipo',
			dataIndex : 'Tipo'
		},{
        	xtype : 'gridcolumn',
			header : 'Imei',
            dataIndex : 'Imei',
            width : 300,
			sortable : true			
		}
    ],
    
    initComponent: function () {  
        this.callParent(arguments); 

        this.onSelectChange = function (selModel, selections) {
            this.down('[action="asignarcuenta"]').setDisabled(selections.length == 0);
        };        
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype: 'combo',
                    store: [
                        ['telefono',getLocale('Telefono')],
                        ['nombre',getLocale('Nombre')],
                        ['cuenta',getLocale('Cuenta')],
                        ['imei',getLocale('Imei')]
                    ],
                    queryMode: 'local',
                    value: 'imei',
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
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search'
                },'-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                },'-',
                {
                    iconCls: 'icon-cuenta',
                    text: 'Asignar Cuenta',
                    scope: this,
                    action: 'asignarcuenta',
                     disabled: true
                },'-',
                {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete'
                },'->',
                {
                    iconCls: 'icon-cog',
                    text: 'Configurar servicio',
                    scope: this,
                    itemId: 'btnconfig',
                    action: 'configurar'
                },'-',
                {
                    xtype: 'displayfield',
                    value: '',
                    scope: this,
                    itemId: 'toolbardisplayfield',
                    margin: '0 10 0 10',
                }
                
            ]// cierro items
         }); 
        this.addDocked(toolbar);
    } 
});