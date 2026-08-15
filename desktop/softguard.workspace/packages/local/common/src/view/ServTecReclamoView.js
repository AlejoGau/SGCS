Ext.define('Common.view.ServTecReclamoView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.sertecreclamoview'],
    preventHeader: true,
    frame : true,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 200,
    	anchor : '100%'
	},
    autoScroll: true,
	items : [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin : '0 0 5 0',
            height: 250,
            width:'100%',
            items: [                
                {
                    xtype:'textarea',
                    name:'stl_cObservacion' ,
                    itemId:'msg'

        		}
            ]
        }
    ],
	buttons : [{
			text : 'Guardar',
            action: 'save',
            itemId: 'save',
            disabled: false
		}],
	initComponent : function() {
		this.callParent(arguments);
	} // cierro init
});