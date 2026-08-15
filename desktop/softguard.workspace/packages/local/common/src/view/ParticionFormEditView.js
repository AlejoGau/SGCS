//MIGRADO2024
Ext.define('Common.view.ParticionFormEditView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.particionesformeditview','widget.particionformeditview'],
    preventHeader: true,
    frame : true,
    fieldDefaults : {
        labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [
        {
            xtype: 'container',
            anchor: '100%',
            layout: 'hbox',
            items: [
                {
                    xtype : 'numberfield',
                    fieldLabel : 'Numero',
                    itemId: 'particion',
                	name : 'particion',
                    minValue: 1,
                    maxValue: 99,//basecamp.com/2249105/projects/9661053/todos/446687764
                    
                    margin: '0 5 5 0'
                }, {
                    xtype : 'displayfield',
                    fieldLabel : '',
                    itemId: 'validador',
                    margin: '0 0 5 5'
        		}
            ]
		},{
            xtype : 'textfield',
            fieldLabel : 'Descripción',
			name : 'zon_cdescripcion',
    		allowBlank : false
		},{
            xtype : 'textfield',
            fieldLabel : 'Observacion',
			name : 'zon_mobservacion',
    		allowBlank : true
		},
        {
            xtype : 'textfield',
        	fieldLabel : 'Código',
            itemId: 'codigo',
			name : 'zon_ccodigo',
			allowBlank : false,
            hidden: true
		},{   
            xtype: 'displayfield',
            name : '_cuenta',
            itemId: 'cuenta',
            fieldLabel : 'Cuenta'
           
        }
 
        
        ],
	buttons : [{
			text : 'Aceptar',
            action: 'save',
            itemId: 'save',
            disabled: true
		}, {
			text : 'Cancelar',
            action: 'cancel'
		}],
	initComponent : function() {

		this.callParent(arguments);
	} // cierro init
});