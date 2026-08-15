Ext.define('WeSafe.view.SpinBoxROView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.spinboxroview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100
    },
    items : [{
        	xtype : 'displayfield',
			name : 'DateCreatedText',
            fieldLabel: 'Fecha'
		},
        {
			xtype : 'displayfield',
			name : 'FromName',
            fieldLabel: 'De',
            hidden: true
		},{
    		xtype : 'displayfield',
			name : 'Name',
            fieldLabel: 'Asunto'
		},{
    		xtype : 'textareafield',
			name : 'Body',
            readOnly: true,
            fieldLabel: '',
            width:'100%'
		}

    ],
    initComponent : function() {
		this.callParent();
        
	},
})
