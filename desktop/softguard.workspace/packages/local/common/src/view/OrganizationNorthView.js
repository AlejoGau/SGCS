//MIGRADO2024
Ext.define('Common.view.OrganizationNorthView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.organizationnorthview',
    region: 'north',
    id: 'app-header',
    height: 40,
    collapsible: false,
    tbar : [{
		xtype : 'box',
		html : 'DealerSearch',
		id : 'crudTitle'
	}, '->',{
		text : '',
        text: 'Nueva Organización',
        tooltip: 'Nueva Organización',
		iconCls : 'icon-add',
		action : 'createorganization'
	}]
});