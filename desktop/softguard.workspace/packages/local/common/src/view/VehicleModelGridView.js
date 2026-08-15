//MIGRADO2024
Ext.define('Common.view.VehicleModelGridView', {
    extend:'Ext.grid.GridPanel',
    alias : 'widget.vehiclemodelgridview', 
    title: 'Modelos',
    autoHeight: true,
    columns: [
            {
                xtype: 'gridcolumn',
                dataIndex: 'Id',
                header: 'Id',
                sortable: true,
        		hidden:false,
                width: 40
            },{
                xtype: 'gridcolumn',
                dataIndex: 'Name',
                header: 'Modelo',
                sortable: true,
                editor: {
                    xtype: 'textfield'
                },
                flex: 1
            }
        ],
    initComponent: function () {
        this.editing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        this.plugins = [this.editing];
       
        this.onSelectChange = function (selModel, selections) {
            this.down('#vehiclemodeldelete').setDisabled(selections.length === 0);
        };
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-add',
                    text: 'Agregar',
                    action: 'add',
                    itemId: 'vehiclemodeladd'
                }, {
                    iconCls: 'icon-delete',
                    action: 'delete',
                    text: 'Eliminar',
                    disabled: true,
                    itemId: 'vehiclemodeldelete'
                }
            ]// cierro items
         }); 
                         
    
        this.callParent(arguments);
        this.addDocked(toolbar);
    } // cierro init
});