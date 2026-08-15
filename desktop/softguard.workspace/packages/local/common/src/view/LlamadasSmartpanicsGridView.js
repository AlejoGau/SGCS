//MIGRADO2024
Ext.define('Common.view.LlamadasSmartpanicsGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.llamadasmartpanicsgridview',
    title : 'Contactos SmartPanics',
    autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns : [
        {
            xtype:'actioncolumn',
            itemId:'llamar',
            width:30,
            items: [{
                iconCls: 'icon-telephone-go',
                tooltip: 'Llamar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('llamadasmartpanicsgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.up('llamadahelperview').fireEvent('llamar',view.caller, rec)
                }
            }]
        },{
            xtype:'actioncolumn',
            width:40,
            items: [{
                iconCls: 'icon-smartpanic',
                tooltip: getLocale('Smartpanics'),
                getClass: function(value,metadata,record,a,b,c,view){
                    var json;
                    if (record.get('Config') != ""){
                        json = Ext.JSON.decode(record.get('Config'));
                    }
                    
                    if(json && json.groupEnabled && json.groupEnabled == 1) {
                        return 'icon-smartpanic-master'; 
                    } else{
                        return 'icon-smartpanic';
                    }
                    
                }
            }]
        },{
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