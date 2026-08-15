//MIGRADO2024
Ext.define('Common.view.VictimariosCuentasView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.victimarioscuentasview'],
    title : 'Cuentas asociadas',
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
    selType:'checkboxmodel',
    selModel: {
        checkOnly: true,
        mode: "MULTI"
    },

    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
        {
            xtype : 'gridcolumn',            
            header : 'Cuenta',
			dataIndex : 'cue_clinea',
            flex: 1,
            renderer: function(value, p, record){
                
                return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Nombre Cuenta',
    		dataIndex : 'cue_cnombre',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Teléfono',
            dataIndex : 'cue_ctelefono',
            flex: 1
		}
    ],
    
    initComponent: function () {
       
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-add',
                    text: 'Agregar Cuenta',
                    scope: this,
                    action: 'addcuenta',
                    itemId:'addcuenta'
                },{       
                    iconCls: 'icon-table-delete',
                    text: 'Eliminar',
                    scope: this,
                    action: 'deletecuenta',
                    itemId:'deletecuenta'                                 
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});