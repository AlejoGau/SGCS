Ext.define('Desktop.view.DesktopMessageFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.message6desktopview'],
    preventHeader: true,
    frame: false,
    //scrollable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        anchor: '100%',
        margin: '0 0 0 5'
    },
    items : [{
    		xtype : 'displayfield',
			name : 'DateCreatedText',
            fieldLabel: 'Fecha'
		},
        {
			xtype : 'displayfield',
			name : 'FromName',
            itemId: 'fromfield',
            fieldLabel: 'De'
		},{
    		xtype : 'displayfield',
			name : 'Name',
            fieldLabel: 'Asunto'
		},
        {
    		xtype : 'container',
            scrollable: true,
            scroolY: true,
            style: {
                'border-top': '1px solid',
                'background': 'white'
            },
            layout: 'fit',
            margin: '10 0 0 0',
            items:[
                {
                    xtype : 'displayfield',
                    name : 'Body',
                    readOnly: true,
                    
                    fieldLabel: '',
                    style: {
                        'background': 'white'
                    },
                    margin: '5 5 5 5'
                }
            ],
            flex: 1
		}
    ],

	initComponent : function() {
		this.callParent();
        
        this.on({
            afterrender : this.initView
        });
	},
    
    initView : function(view) {
        view.loadRecord(view.record);
	}
});




