Ext.define('Cuenta.view.CuentaNumeroFormView', {
    extend : 'Ext.container.Container',
    alias : 'widget.cuentanumeroformview',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
	items : [
        {
            xtype: 'container',    
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
        			xtype : 'combo',
                    margin: '0 5 0 0',
        			fieldLabel : 'Dealer',
                    itemId: 'dealer',
        			name : 'cue_clinea',
        			store : 'TablaLineasStore',
        			displayField : 'lin_crazonsocial',
        			valueField : 'lin_ccodigo',
                    queryMode: 'local',
        			labelWidth : 90,
        			flex : 1,
                    forceSelection : true,
                    validateOnChange: true,
                    validator: function(value){
                        if(!this.findRecordByValue(this.getValue())) {
                            return getLocale("Debe completar el campo");
                        } else  {
                            return true;               
                        }
                    },
                    allowBlank : false
        	    },{
        			xtype : 'textfield',
                    itemId: 'cuenta',
                    margin: '0 5 0 0',
        			name : 'cue_ncuenta',
        			disabled : false,
        			labelWidth : 40,
                    maxLength : 4,
                    enforceMaxLength : true,
        			width : 90,
        			fieldLabel : 'Cuenta'
        	    }, {
        			xtype : 'textfield',
        			labelWidth : 45,
        			fieldLabel : 'Nombre',
        			name : 'cue_cnombre',
                    flex: 1
        	    }
            ]
        },{
                xtype: 'fieldset',
                itemId: 'cuentamadre',
                title: 'Es partición de:',
                layout: 'vbox',
                hidden:true,
                items: [
                    {
            			xtype : 'displayfield',
                        itemId: 'cuentam',
                        margin: '0 5 0 0',            		
            		
                        labelWidth : 45,
            			fieldLabel : ''
            	    },
        
                     {
                        xtype : 'combo',
                		fieldLabel : 'Consume licencia',
            			store : 'SiNoStore',
                        displayField : 'Name',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
            			valueField : 'Value',
            			name : "cue_ilicenciapar",
                        itemId: 'cue_ilicenciapar'
            		}
                    
                ]
    	    }          
                        
        
    ]
});