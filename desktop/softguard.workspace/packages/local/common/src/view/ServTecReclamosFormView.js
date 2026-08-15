//MIGRADO2024
Ext.define('Common.view.ServTecReclamosFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.sertecreclamosformview'],
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
            		xtype: 'textarea',
                    blankText: getLocale('Ingrese el texto'),
        			name : '',
                    itemId: 'reclamos',
                    flex: 0.75,
                    margin : '3 10 0 0',
        		},{
                    xtype : 'fieldset',
            		collapsible : false,
                    collapsed: false,
        			title : 'Antecedentes',
        			layout : 'fit',        
                    flex: 1.25,
                    overflowY: 'scroll',
                    overflowX: false,    
                    margin : '0 0 1 0',
        			items : [
                        {
                            xtype : 'displayfield',                    			
                			itemId : "observaciones"
                		}                           
                    ]
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