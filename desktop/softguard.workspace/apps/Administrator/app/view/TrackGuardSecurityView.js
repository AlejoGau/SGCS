Ext.define('Administrator.view.TrackGuardSecurityView', {
    extend : 'Ext.grid.Panel',
    title: 'Seguridad',
    alias : 'widget.TrackGuardSecurity',
    selModel: Ext.create('Ext.selection.CheckboxModel'),
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
                    text =getLocale('Denegado');
                    break;
                    
                    case "1":
                    text = getLocale('Lectura');
                    break;
                    
                    case "2":
                    text = getLocale('Lectura y escritura');
                    break;
                    
                    case "3":
                    text = getLocale('Sin restricciones');
                    break;
                    
                    default:                    
                    text =getLocale('Denegado');
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
                    ['0',getLocale('Denegado')],
                    ['1',getLocale('Lectura')],
                    ['2',getLocale('Lectura y Escritura')],
                    ['3',getLocale('Sin restricciones')]
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
            		text : 'Permisos Especiales',
                    itemId:'permisosespeciales',
					menu: {
                        items: [
                            {
                                xtype: 'menucheckitem',
                                text  : getLocale('Ver claves'),
                                checked   : false,
                                itemId : 'chkClaves'
                            },{
                                xtype: 'menucheckitem',
                                text  : getLocale('Crear Mantenimiento'),
                                checked   : false,
                                itemId : 'chkCrearMantenimiento'
                            }
                        ]
            	    }
				},'-',{
                    iconCls: 'x-tbar-loading',
                    text: 'Reset',
                    scope: this,
                    action: 'refreshModulesTrackguard'
                },'-',{
                    xtype: 'combobox',
                    forceSelection: true,
                    multiSelect: false,
                    editable: false,
                    itemId : 'comboPerfil',
                    store: [
                        ['0',getLocale('Denegado')],
                        ['1',getLocale('Lectura')],
                        ['2',getLocale('Lectura y Escritura')],
                        ['3',getLocale('Sin restricciones')]
                    ]
                },'-',{
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