Ext.define('AdministratorSearch.view.AdministratorSearchToolbarView', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.moduletoolbar',
    id: 'north',
    itemId: 'north',
    border: 0,
    items: [
        {
			text : 'Crear Usuario',
			iconCls : 'icon-usuarios',
			action: 'crearUsuario',
            itemId:'crearUsuarios'
		}, {
            text : 'Clientes',
    		iconCls : 'icon-report-user',
            viewConfig: {
               // editorView: 'organizationclientformview',
                hideStatusGroup:true,
                forceStatusCreation: 7,
                hideCuentaCorriente: true,
                hideEmail: true,
                forceType: 'CLI',
                forceStatus : '7,8,9',
                hideLeftNav:true
            },
			view : 'organizationclientgridview',
            closeAction: 'destroy',
            
            closable: true
		}, {
            text : 'Centrales',
    		iconCls : 'icon-server',
            viewConfig: {
               // editorView: 'organizationclientformview',
                hideStatusGroup:true,
                forceStatusCreation: 7,
                hideCuentaCorriente: true,
                hideEmail: true,
                forceType: 'CENTRAL',
                hideWallpaper: false,
                hideLeftNav:true
            },
			view : 'organizationclientgridview',
            closeAction: 'destroy',
            
            closable: true
		}, {
            text : 'Auditoría',
        	iconCls : 'database-key',
			view : 'auditgridview',
            closeAction: 'destroy',
            itemId: 'audit',
            hidden: true,
            closable: true
        },
       
        {
            xtype: 'button',
            text : 'Eliminar cuentas',
            iconCls : 'icon-page-delete',
            action: 'eliminarcuenta',
            margin: '0 0 5 0',
            itemId: 'eliminarcuenta',
            view: 'eliminarcuentaview',
            closable: true,
            hidden: true
        },{
            text : 'Sistema',    
            hidden: true,
            itemId: 'btnsistema',
            iconCls : 'icon-monitor-window-flow',
            menu: {
                xtype: 'menu',
                itemId: 'modulemenu',
                width: 220,
                items: [
                    {
                        text : '{Aplicaciones}',
                    	iconCls : 'icon-application-cascade',
            			view : 'uiapplicationgridview',
                        closeAction: 'destroy',
                        itemId: 'aplicaciones',
                        hidden: true,
                        closable: true
                    },
                    {
                        text : '{Actualizaciones}',
                    	iconCls : 'x-tbar-loading',
            			view : 'updategridview',
                        closeAction: 'destroy',
                        itemId: 'actualizaciones',
                        hidden: true,
                        closable: true
                    },
                    {
                        //xtype: 'button',
                        text : 'Configuración',
                        iconCls : 'icon-cog',
                        itemId: 'configuracion',
                        view : 'systemconfigurationview',
                        closeAction: 'destroy',
                        hidden: true,
                        closable: true
                    },
                    {
                        //xtype: 'button',
                        text : 'Licencia',
                        iconCls : 'icon-door-in',
                        itemId: 'licencia',
                        view : 'licenciaview',
                        closeAction: 'destroy',
                        closable: true
                    },
                    {
                        //xtype: 'button',
                        text : 'Administración base de datos',
                        iconCls : 'icon-script-gear',
                        itemId: 'scripts',
                        view : 'scriptsview',
                        closeAction: 'destroy',
                        closable: true,
                        hidden: true
                    },
                    {
                        //xtype: 'button',
                        text : 'Perfiles de usuario',
                        iconCls : 'icon-user-gray',                        
                        //view : 'administratorsearchgridview',
                        itemId:'perfilesusuario',
                        closeAction: 'destroy',
                        closable: true,
                        hidden:true
                    },
                    {
                        text : 'Viewer timer',
                        iconCls : 'icon-eye',                        
                        view : 'viewertimer',                        
                        closeAction: 'destroy',
                        closable: true
                    }
                    /**
                     * BC 388630458 : Agregado de Logs gateway
                     */
                    ,{
                        text : 'Log gateway',
                        iconCls : 'icon-script-gear',                        
                        view : 'loggateway',                        
                        closeAction: 'destroy',
                        closable: true
                    }
                    
                ]
            }
        },
        {
            //xtype: 'button',
            text : 'Restaurar Fallo AC',
            iconCls : 'icon-cuenta_filter_fallotest ',
            margin: '0 0 5 0',
            itemId: 'cuentafallo',
            view : 'cuentaenfalloacgridview',
            closeAction: 'destroy',
            closable: true
        },
        {
            //xtype: 'button',
            text : 'Restaurar Fallo Test',
            iconCls : 'icon-cuenta_filter_fallotest ',
            margin: '0 0 5 0',
            itemId: 'cuentafallotst',
            view : 'cuentaenfallotstgridview',
            closeAction: 'destroy',
            closable: true
        },{
            iconCls: 'icon-accept',
            text: 'Proceso masivo',
            action: 'procesarlotes',
            itemId: 'procesarlotes',
            hidden: true
        }
    ]
})