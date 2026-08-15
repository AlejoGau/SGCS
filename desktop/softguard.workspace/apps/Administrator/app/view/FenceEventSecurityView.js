Ext.define('Administrator.view.FenceEventSecurityView', {
    extend : 'Ext.grid.Panel',
    title: 'Procesos',
    alias : ['widget.FenceEventSecurityView'],
    selType:'checkboxmodel',
    selModel: {
        checkOnly: true,
        mode: "MULTI"
    },
    ignoreDirty: true,
    viewConfig:{
        markDirty:false
    },
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })],
    
    columns : [{
            xtype : 'gridcolumn',
        	sortable : false,
			dataIndex : 'iconCls',
			width : 25,
            renderer: function(value, metadata,record){
                    if (value)
                        return '<span style="position:absolute; width:16px;height:16px;" class="'+value+'" />';
                },
        },
        {
            xtype : 'gridcolumn',
    		header : 'Función',
			sortable : false,
            renderer: function(value, metadata,record){
                return getLocale(value);
            },
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
                    text =getLocale('Ocultar');
                    break;
                    
                    case "1":
                    text = getLocale('Mostrar');
                    break;
                    
                    case "2":
                    text = getLocale('Mostrar');
                    break;
                    
                    default:
                    text = getLocale('Ocultar');
                    break;
                        
                }
                
                return text;
            },
            editor:{
                xtype: 'combobox',
                forceSelection: true,
                multiSelect: false,
                
                store: [
                    ['0',getLocale('Ocultar')],
                    ['1',getLocale('Mostrar')]/*,
                    ['2',getLocale('Mas datos')]*/
                ]
            },
			width : 200
		} 
    ],
    
	initComponent : function() {
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'saveEvent'
                },{
                    iconCls: 'x-tbar-loading',
                    text: 'Reset',
                    scope: this,
                    action: 'refreshModulesEvent'
                },'-',{
                    xtype: 'combobox',
                    forceSelection: true,
                    multiSelect: false,
                    editable: false,
                    itemId : 'comboPerfilEventos',
                    store: [
                        ['0',getLocale('Ocultar')],
                        ['1',getLocale('Mostrar')]
                    ]
                },{
                    iconCls: 'icon-table-edit',
                    text: 'Aplicar perfil',
                    action: 'applyPerfilEventos'
                }
                
                
            ]// cierro items
         }); 
         this.callParent(arguments);
         this.addDocked(toolbar);

	} // cierro init

});
