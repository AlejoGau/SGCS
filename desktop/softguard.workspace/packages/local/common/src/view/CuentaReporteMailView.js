//MIGRADO2024
Ext.define('Common.view.CuentaReporteMailView', {
    extend : 'Ext.panel.Panel',
	alias : 'widget.reportemailview',
	autoScroll : true,
	autoHeight : true,
    bodyPadding: 5,
    margin: 0,
	layout : 'anchor',
	itemId : 'reportemailview',
	fieldDefaults : {
		anchor : '100%'
	},
	title : 'Envio De Mails Por Eventos',
	collapsible : true,
	items : [
        {
            xtype: 'combo',
            fieldLabel: 'Selector Eventos',
		   // store: 'SoftguardAlarmasMailStore',
			name: 'eventos',
		    displayField: 'Descripcion',
            queryMode: 'local',
            forceSelection: true,
            multiSelect: true,
            editable: false,
		    valueField: 'Codigo',
            itemId:'eventos'
        },
        {
			xtype : 'textarea',
			fieldLabel : 'Eventos',
			name: 'rep_meventos'
		},
        {
            xtype: 'container',
            margin: '0 0 5 0',
            layout: 'hbox',
            items:[
                {
                    xtype: 'button',
                    text: 'Agregar email',
                    width: 95,
                    handler: function() {
                        var form = this.up('form');
                        var store = form.down('grid').getStore();
                        var field = form.getForm().findField('_mail')
                        var value = field.getRawValue();
                        if (value != '' && field.isValid()){
                            store.add({email: value});
                            field.setValue('');
                        }
                    }
                },{
                    xtype: 'textfield',
                    vtype: 'email',
                    name: '_mail',
                    flex: 1
                }
            ]
        },
        
        {
          xtype: 'grid',
          columns:[{
                    xtype: 'actioncolumn',
                    width: 20,
                    items: [{
                        iconCls: 'icon-delete',
                        tooltip: 'Eliminar',
                        handler: function(grid, rowIndex){
                            grid.getStore().removeAt(rowIndex);
                        }
                    }]
                },
                {dataIndex:'email', flex:1}
            ],
          title: 'Listado de emails',
          emptyText: 'No hay emails en la lista',
          hideHeaders: true
          //preventHeader: true
        },
        {
			xtype : 'hiddenfield',
			fieldLabel : 'Dirección de Mail',
			name: 'rep_cmailparaeventos'
	}],
    
    initComponent: function(){
        this.callParent(arguments);
    }
});