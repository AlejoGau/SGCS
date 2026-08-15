Ext.define('AdministratorSearch.view.GrupoGridView', {
    extend:'Ext.grid.GridPanel',
    alias : 'widget.grupogridview', 
    autoHeight: true,
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
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
            dataIndex: 'tgc_cdescripcion',
            header: 'Nombre',
            sortable: true,
            editor: {
                xtype: 'textfield'
            },
            width: 150
        }
    ],


    initComponent: function () {
        this.onSelectChange = function (selModel, selections) {
            this.down('button[action=delete]').setDisabled(selections.length === 0);
        };

        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
           items: [
            {
                text: 'Guardar',
                iconCls: 'save',
                action: 'save'
            },
            {xtype: 'tbseparator'},
            {
                iconCls: 'icon-add',
                text: 'Agregar',
                action: 'add'
            }, {
                iconCls: 'icon-delete',
                text: 'Eliminar',
                disabled: true,
                action: 'delete'
            },'-',
            {
                xtype: 'textfield',
                itemId: 'query',
                fieldLabel: '',
                labelWidth: 50
            }, 
             {
                iconCls: '',
                text: 'Buscar',
                action: 'filterText'
            },
            {
                iconCls: 'icon-cuenta_filter_todas',
                text: 'Todos',
                action: 'removefilter'/*,
                //pressed: true,
                //toggleGroup: 'filter',
                //enableToggle: true*/
            }]
         }); 
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.callParent(arguments);
        this.addDocked(toolbar);
        this.addDocked(pagingtoolbar);
             

    } // cierro init
});