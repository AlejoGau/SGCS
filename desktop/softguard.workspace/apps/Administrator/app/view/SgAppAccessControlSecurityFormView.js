Ext.define("Administrator.view.SgAppAccessControlSecurityFormView", {
        extend: "Ext.form.Panel",
        title: "Permisos",
        alias: "widget.SgAppAccessControlSecurityFormView",
        autoScroll: true,
        items: [
            {
                xtype: 'checkbox',
                fieldLabel  : getLocale('Nuevo usuario'),
                checked   : false,
                itemId : 'chkNuevoUsuario'
            },
            {
                xtype: 'checkbox',
                fieldLabel  : getLocale('Nuevo proveedor'),
                checked   : false,
                itemId : 'chkNuevoProveedor'
            },            
            /**
             * Daniel Orlando Medina
             * 03/12/2020
             * https://basecamp.com/2249105/projects/17543484/todos/424647755
             * 
             */
            {
                xtype: 'fieldset',
                title: 'Pestañas principales',
                collapsed: false,
                collapsible: false,
                items:[
                    {
                        xtype: 'checkbox',
                        fieldLabel : getLocale('Bienvenido'),
                        checked : false,
                        itemId: 'chkTabBienvenido' 
                    },{
                        xtype: 'checkbox',
                        fieldLabel : getLocale('Integrantes/Usuarios'),
                        checked: false,
                        itemId: 'chkTabIntegrantesUsuarios',
                    },{
                        xtype: 'checkbox',
                        fieldLabel : getLocale('Accesos IO'),
                        checked: false,
                        itemId: 'chkTabAccesosIO',
                    },{
                        xtype: 'checkbox',
                        fieldLabel : getLocale('Unidades Funcionales'),
                        checked: false,
                        itemId: 'chkTabUnidadesFuncionales',
                    },{
                        xtype: 'checkbox',
                        fieldLabel : getLocale('Proveedores'),
                        checked: false,
                        itemId: 'chkTabProveedores',                        
                    }               
                             
                ]                

            }
                /***************************************************************************/

        ],
        initComponent: function() {
            var n = Ext.create("Ext.toolbar.Toolbar", {
                items: [{
                    iconCls: "save",
                    text: "Guardar",
                    scope: this,
                    action: "saveSecurity",
                    itemId: "acssave"
                }]
            });
            this.callParent(arguments);
            this.addDocked(n)
        }
    })