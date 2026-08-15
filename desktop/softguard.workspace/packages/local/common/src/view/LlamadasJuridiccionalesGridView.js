//MIGRADO2024
Ext.define('Common.view.LlamadasJuridiccionalesGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.llamadacontactarjuridiccionalesgridview',
    title : 'Llamadas contactar',
    autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns : [
        {
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-telephone-go',
                tooltip: 'Llamar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('llamadacontactarjuridiccionalesgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.up('llamadahelperview').fireEvent('llamar',view.caller, rec)
                }
            }]
        },
        {
        	xtype : 'gridcolumn',
			header : 'Nombre',
			sortable : false,
			dataIndex : 'tel_cnombre',
    		flex : 1
		},{
        	xtype : 'gridcolumn',
			header : 'Telefono',
			sortable : false,
			dataIndex : 'tel_ctelefono',
    		flex : 1,
            renderer : function(value, object, record) {
                
                
                if(record.get('_usado') == 'true') {
                    object.style = "background-color:#42983D;";
                }
                
        		return value;
			}
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        
      
         
    } // cierro init
});