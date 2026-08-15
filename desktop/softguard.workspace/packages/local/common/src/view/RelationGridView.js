//MIGRADO2024
Ext.define('Common.view.RelationGridView',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.relationgridview',
    title : 'Relaciones',
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns: [{
            text: 'Relación',
            width: 50,
            sortable: true,
            dataIndex: 'RelationObjectId',
            field: {
                xtype: 'textfield'
            }
        }, {
            header: 'Tipo',
            sortable: true,
            dataIndex: 'ObjectTypeName',
            width: 50
        }, {
            text: 'Nombre',
            flex: 1,
            sortable: true,
            dataIndex: 'ObjectName',
            field: {
                xtype: 'textfield'
            }
    }],
    initComponent: function () {
        this.callParent(arguments);
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="relationdelete"]').setDisabled(selections.length == 0);
        };
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-add',
                    text: 'Agregar',
                    scope: this,
                    action: 'add'
                }, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    disabled: true,
                    action: 'relationdelete',
                    scope: this
            },{
                    text : 'Actualizar',
                    iconCls: 'x-tbar-loading',
                    action: 'refresh'
                }]// cierro items
         }); 
         
         this.addDocked(toolbar);
    } // cierro init
});  // cierro define