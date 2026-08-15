//MIGRADO2024
Ext.define('Common.view.AwccMailFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.awccmailformview'],
    preventHeader: true,
    frame: false,
    border : 0,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    emptyText: getLocale('No hay archivos adjuntos.'),
    fieldDefaults : {
        labelAlign : 'left',
    	labelWidth : 80,
		anchor : '100%'
	},
	items : [
        {
        	xtype : 'textfield',
			name : 'From',
            itemId: 'from',
            fieldLabel: 'De',
			allowBlank : false,
            hidden:true,
            //emptyText: getLocale('Completar'),            
            // vtype:'email',
            // vtypeText: getLocale('Debe ingresar un email válido')
		}
        , {
        	xtype : 'combo',
    		fieldLabel : 'Para',
            queryMode: 'local',
    		name : 'Query',
            itemId: 'to',
    		displayField : 'destino',
    		valueField : 'email_destino',
            emptyText: getLocale('Seleccionar'),
            validator: function(value){
                 if(value == '') {
                        this.up('form').down('#send').setDisabled(true)
                    } else {
                        this.up('form').down('#send').setDisabled(false)                 
                    }
                    return true;
                 
             },
    	},{
        	xtype : 'textfield',
			name : 'CC',
            itemId: 'cc',
            fieldLabel: 'CC',
			allowBlank : true,
            hidden: true,
            emptyText: getLocale('Completar')
		},{
        	xtype : 'textfield',
			name : 'CCO',
            itemId: 'cco',
            fieldLabel: 'CCO',
            hidden: true,
			allowBlank : true,
            emptyText: getLocale('Completar')
		},{
			xtype : 'textfield',
			name : 'Name',
            itemId: 'asunto',
            fieldLabel: 'Asunto',
			allowBlank : false,
            emptyText: getLocale('Asunto')
		},{
            xtype : 'htmleditor',
            shrinkWrap: false,
            flex: 1,
            itemId: 'body',
			name : 'Body',
			allowBlank : false,
            translate:false
		}
    ],
	initComponent : function() {
		this.callParent();
        
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-email-go',
                    text: 'Enviar',
                    scope: this,
                    action: 'send',
                    itemId: 'send',
                    disabled:true
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});