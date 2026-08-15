Ext.define('Administrator.view.WebRemotoFiltrosView', {
    extend : 'Ext.form.Panel',
    title: 'Configuracion de Filtros',
    alias : 'widget.WebRemotoFiltros',
    autoScroll:true,
    itemId: 'filtros',
    items: [
        {
          xtype:'container',
          items:[
                {
                    xtype:'combo',
                    itemId:'mostrar',
                    store:[
                        ['todos', getLocale('Todos')],
                        ['solo', getLocale('Solo mostrar:')]
                    ]
                }
            ]
        },
        {
            xtype:'fieldset',
            title: 'Filtros',
            itemId:'checks',
            items: [
            ]
        },
        {
            xtype:'fieldset',
            title: 'Códigos de alarma',
            itemId:'filtroAlarmas',
            items: [
                {
                	xtype : 'textarea',
        			fieldLabel : 'Seleccionados',
                    height:120,
        			name: '_eventos',
                    editable: false,
                    itemId:'eventos'
        		},
                {
        			xtype : 'textarea',
        			fieldLabel : 'Seleccionados',
        			name: 'filtroAlarmas',
                    itemId:'eventoshide',
                    hidden: true
        		},
                {
                    xtype:'button',
                    text:'Modificar',
                    margin: '5 0 5 0',
                    itemId:'agregarevento'
                }
            ]
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
                },{
                    iconCls: 'save',
                    text: 'Seleccionar todo',
                    scope: this,
                    action: 'selectall'
                }]// cierro items
         }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
    } // cierro init
});