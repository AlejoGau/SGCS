Ext.define('Common.view.FormularioSerTecHTMLEditorFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.formulariosertechtmleditorformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    autoScroll:true,
    layout: 'fit',
    items: {
        xtype: 'htmleditor',
        name: 'html',
        itemId: 'html',
    },
    initComponent : function() {
        this.callParent();
        var toolbar = Ext.create('Ext.toolbar.Toolbar',{
            items: [
                    {
                                iconCls: 'icon-table-save',
                                text: 'Guardar',
                                scope: this,
                                itemId: 'save',
                                action: 'save'
                }
            ]
        });
        this.addDocked(toolbar);

    }

});