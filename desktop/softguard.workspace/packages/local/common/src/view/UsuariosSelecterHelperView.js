//MIGRADO2024
Ext.define('Common.view.UsuariosSelecterHelperView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.usuarioselecterhelperview',
    autoHeight : true,
   /* features : [
        {
            ftype : 'grouping',
            groupHeaderTpl: '<input class="grpCheckbox" type="checkbox"> {name} ({rows.length})</input>',
            groupByText : getLocale('Agrupar'),
            id: 'groupingFeature',
            startCollapsed: true,
            showGroupsText : getLocale('Mostrar en grupos')
		}
    ],*/
	columns : [
        {
			xtype : 'gridcolumn',
			header : 'Usuario',
			sortable : true,
			dataIndex : 'udw_usuario',
			flex:1
		}   
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [ 
                {
                    xtype:'textfield',                 
                    fieldLabel:'',
                    itemId:'searchtext',
                    flex:1
                },{
                    text:'Buscar',
                    itemId:'search'
                }
                ]// cierro items
         }); 
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.addDocked(toolbar);
        
                
    } // cierro init
});