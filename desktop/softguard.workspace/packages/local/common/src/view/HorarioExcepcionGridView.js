//MIGRADO2024
Ext.define('Common.view.HorarioExcepcionGridView', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.horarioexcepciongridview', 
    autoScroll: true,
    viewConfig: {height: 90},
    title: 'Dias Feriados',
	collapsible: true,
	itemId:'horarioexcepciongridview',
    selType: 'checkboxmodel',
	layout: 'anchor',
    minHeight: 200,

    columns: [
		{
			xtype: 'gridcolumn',
			dataIndex: 'eve_cdescripcion',
			header: 'Evento',
			sortable: true,
			flex: 1
		},
        {
			xtype: 'gridcolumn',
			dataIndex: 'exc_cHoraApertura',
			header: 'Hora desde'
		},
        {
			xtype: 'gridcolumn',
			dataIndex: 'exc_cHoraCierre',
			header: 'Hora hasta'
		}
	],
    
    initComponent: function () {
        this.onSelectChange = function (selModel, selections) {
            this.down('button[action=delete]').setDisabled(selections.length === 0);
        };

        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
               items: [
               /* {
                    text: 'Guardar',
                    iconCls: 'save',
                    action: 'save'
                },
                {xtype: 'tbseparator'},*/
                {
                    iconCls: 'icon-add',
                    text: 'Agregar',
                    action: 'add'
                }, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    disabled: true,
                    action: 'delete'
                },
                {
                    iconCls: 'icon-add',
                    text: 'Todos los Feriados',
                    action: 'getall'
                },"->",{
                    xtype:'container',
                    itemId:'timezone'
                }]
             }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
    }
});