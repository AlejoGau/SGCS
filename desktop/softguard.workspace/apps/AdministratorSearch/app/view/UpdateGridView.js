Ext.define('AdministratorSearch.view.UpdateGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.updategridview',
    title : 'Versiones',
    viewConfig: {
        getRowClass: function (record, index) {    
            // disabled-row - custom css class for disabled (you must declare it)
            if (!record.get('CSupdated')) return 'disabled-row';
            return '';
        }        
    },

    selModel: Ext.create('Ext.selection.CheckboxModel'),
    autoHeight : true,
    columns : [
        {
        	xtype : 'gridcolumn',
			header : 'Nombre',
			sortable : true,
			dataIndex : 'Name',
			width : 200
		}, {
			xtype : 'gridcolumn',
			header : 'Versión Actual',
			dataIndex : 'Version',
			sortable : true,
			width : 100
		}, {
    		xtype : 'gridcolumn',
			header : 'Versión Disponible',
			dataIndex : 'NewVersion',
			sortable : true,
			width : 100
		}, {
        	xtype : 'gridcolumn',
			header : 'Versión del Sistema requerida',
			dataIndex : 'RemoteCSVersion',
			sortable : true,
			flex: 1
		}, {
        	xtype : 'gridcolumn',
			header : 'Descripción',
			dataIndex : 'Description',
			flex: 2
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        
        this.onSelectChange = function (selModel, selections) {
            //this.down('button [action="update"]').setDisabled(selections.length == 0);
            if (selections.length > 0) {
                Ext.Array.each(selections, function (record) {
                    if (!record.get('CSupdated')) {
                        // deselect
                        selModel.deselect(record, true);
                    }
                });
            }
        };
        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
        items: [              
             {
                iconCls: 'icon-package-go',
                text: 'Actualizar Seleccionados',
                action: 'update'
            },{
                xtype: 'button',
                text: 'Establecer version actualizada',
                itemId: 'forceVersionBtn',
                enableToggle: true
            }]// cierro items
        }); 
        this.addDocked(toolbar);
    } // cierro init
});