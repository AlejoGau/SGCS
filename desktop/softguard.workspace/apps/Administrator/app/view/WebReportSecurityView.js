Ext.define('Administrator.view.WebReportSecurityView', {
    extend : 'Ext.grid.Panel',
    title: 'Seguridad',
    alias : 'widget.SgAppWebReportSecurity',
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
        	header : 'Carpeta Contenedora',
			sortable : false,
            renderer: function(value, metadata,record){
                return getLocale(value);
            },
			dataIndex : 'folder',
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
                    
                    default:
                    text = getLocale('Mostrar');
                    break;
                        
                }
                
                return text;
            },
            editor:{
                xtype: 'combobox',
                forceSelection: true,
                multiSelect: false,
                editable: false,
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
         // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'saveSecurity'
                },'-',
                {
                    iconCls: 'x-tbar-loading',
                    text: 'Reset',
                    scope: this,
                    action: 'refreshModules'
                },{
                    xtype: 'combobox',
                    forceSelection: true,
                    multiSelect: false,
                    editable: false,
                    itemId : 'comboPerfil',
                    store: [
                        ['0',getLocale('Ocultar')],
                        ['1',getLocale('Mostrar')]/*,
                        ['2',getLocale('Mas datos')]*/
                    ]
                },{
                    iconCls: 'icon-table-edit',
                    text: 'Aplicar perfil',
                    action: 'applyPerfil'
                }
            ]// cierro items
         }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
	} // cierro init

});
