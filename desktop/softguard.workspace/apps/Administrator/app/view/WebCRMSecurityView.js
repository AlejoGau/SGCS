Ext.define('Administrator.view.WebCRMSecurityView', {
    extend : 'Ext.form.Panel',
    title: 'Seguridad',
    alias : 'widget.WebCRMSecurity',    
    autoScroll: true,
    items: [
        {
            xtype: 'checkboxfield',
            boxLabel  : getLocale('Eliminar todo'),
            checked   : false,
            itemId : 'eliminarTodo'
        },{
            xtype:'fieldset',
            title:'Permisos header',
            items:[{
                        xtype: 'checkboxfield',
                        boxLabel  : getLocale('Organizaciones'),
                        checked   : false,
                        itemId : 'organizaciones',
                        iconCls:'icon-Organization'
                    },{
                        xtype:'container',
                        itemId:'organizacionesitems',
                        margin:'0 0 0 10',
                        hidden:true,
                        items:[{
                            xtype: 'checkboxfield',
                            boxLabel  : getLocale('Contactos'),
                            checked   : false,
                            itemId : 'contactos',
                            iconCls: 'icon-Person'
                        },{
                            xtype: 'checkboxfield',
                            boxLabel  : getLocale('Productos'),
                            checked   : false,
                            itemId : 'productos',
                            iconCls:'icon-Product'
                        },{
                            xtype: 'checkboxfield',
                            boxLabel  : getLocale('Calenadario'),
                            checked   : false,
                            itemId : 'calendario',
                            iconCls:'icon-date'
                        },{
                            xtype: 'checkboxfield',
                            boxLabel  : getLocale('Cotizaciones'),
                            checked   : false,
                            itemId : 'cotizaciones',
                            iconCls:'icon-money-dollar'
                        },{
                            xtype: 'checkboxfield',
                            boxLabel  : getLocale('Contratos'),
                            checked   : false,
                            itemId : 'contratos',
                            iconCls:'icon-money-dollar'
                        },{
                            xtype: 'checkboxfield',
                            boxLabel  : getLocale('SmartMail'),
                            checked   : false,
                            itemId : 'smartmail',
                            iconCls:'icon-email'
                        },{
                            xtype: 'checkboxfield',
                            boxLabel  : getLocale('grupos'),
                            checked   : false,
                            itemId : 'grupos',
                            iconCls:'icon-Taxonomy'
                        }]
            },{
                xtype: 'checkboxfield',
                boxLabel : getLocale('Encuesta'),
                checked : false,
                itemId : 'encuesta',
                iconCls : 'icon-textfield'
            },{
                xtype: 'checkboxfield',
                boxLabel  : getLocale('Smartpanics'),
                checked   : false,
                itemId : 'smartpanics',
                iconCls : 'icon-smartpanic'
            },{
                xtype: 'checkboxfield',
                boxLabel  : getLocale('Calendario: Ver registros de todos los usuarios'),
                checked   : false,
                itemId : 'calendarioVerTodos',
                iconCls : 'icon-date'
            }]
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
                }]
         }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
    }

});
