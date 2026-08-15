Ext.define('Common.view.PersonNorthView', {
    extend : 'Ext.panel.Panel',
	alias : 'widget.personnorthview',
    region: 'north',
    id: 'app-header',
    height: 40,
    collapsible: false,
    tbar : [{
		xtype : 'box',
		html : 'WebMG',
		id : 'crudTitle'
	}, '->',{
		text : '',
        text: 'Nueva Persona',
        tooltip: 'Nueva Persona',
		iconCls : 'icon-add',
		action : 'createperson'
	}]
});