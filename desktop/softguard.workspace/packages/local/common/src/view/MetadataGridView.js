//MIGRADO2024
Ext.define('Common.view.MetadataGridView',
{ extend: 'Ext.grid.property.Grid',
    alias: 'widget.metadatagridview',
    title : 'Metadata',
    source: {},
    initComponent: function () {
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'toolbar-tablesave',
                    text: 'Guardar',
                    scope: this,
                    action: 'metasave'
                },
                {
                    iconCls: 'icon-add',
                    text: 'Agregar',
                    scope: this,
                    action: 'metaadd'
                }, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    disabled: false,
                    action: 'metadelete',
                    scope: this
            }]// cierro items
         }); 
         this.callParent(arguments);
        
         this.addDocked(toolbar);
    } // cierro init
});  // cierro define