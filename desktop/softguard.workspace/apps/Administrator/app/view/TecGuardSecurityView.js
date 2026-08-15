Ext.define('Administrator.view.TecGuardSecurityView', {
    extend : 'Ext.grid.Panel',
    title: 'TecGuard',
    alias : 'widget.TecGuardSecurityView',
    selType:'checkboxmodel',
    selModel: {
        checkOnly: true,
        mode: "MULTI"
    },
    ignoreDirty: true,
    viewConfig:{
        markDirty:false
    },
    store: 'TecGuardSecurityModulesStore',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    columns : [{
            xtype : 'gridcolumn',
    		sortable : false,
			dataIndex : 'iconCls',
			width : 25,
            renderer: function(value, metadata,record){
                if (value){
                    return '<span style="position:absolute; width:16px;height:16px;" class="'+value+'" />';
                }
            },
        },
        {
            xtype : 'gridcolumn',
    		header : 'Función',
            renderer: function(value, metadata,record){
                return getLocale(value);
            },
			sortable : false,
			dataIndex : 'text',
			width : 150
		}, 
        {
            xtype : 'gridcolumn',
			header : 'Perfil',
			sortable : false,
			dataIndex : 'profile',
            
            renderer: function(value){
                var text = '';
                switch (value)
                {
                    case "0":
                    text =getLocale('Denegado');
                    break;
                    case "1":
                    text = getLocale('Lectura');
                    break;
                    case "2":
                    text = getLocale('Lectura y escritura');
                    break;
                }
                return text;
            },
            editor:{
                xtype: 'combobox',
                forceSelection: true,
                multiSelect: false,
                
                store: [
                    [0,getLocale('Denegado')],
                    [1,getLocale('Lectura')],
                    [2,getLocale('Lectura y Escritura')]
                ]
            },
			width : 200
		} 
    ],
    
	initComponent : function() {
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'saveSecurity'
                },'-',{
                    iconCls: 'x-tbar-loading',
                    text: 'Reset',
                    scope: this,
                    action: 'refreshModules'
                },'-',{
                    xtype: 'combobox',
                    forceSelection: true,
                    multiSelect: false,
                    editable: false,
                    itemId : 'comboPerfilTecGuard',
                    store: [
                        [0,getLocale('Denegado')],
                        [1,getLocale('Lectura')],
                        [2,getLocale('Lectura y Escritura')]
                    ]
                },{
                    iconCls: 'icon-table-edit',
                    text: 'Aplicar perfil',
                    action: 'applyPerfilTecGuard',
                    itemId: 'applyPerfilTecGuard'
                }
            ]// cierro items
         }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
	} // cierro init
});
