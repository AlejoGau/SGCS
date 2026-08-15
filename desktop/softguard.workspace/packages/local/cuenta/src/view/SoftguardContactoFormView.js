Ext.define('Cuenta.view.SoftguardContactoFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.contactoformview',
  //  preventHeader: true,
    //frame : true,
	fieldDefaults : {
		labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [{
            xtype : 'textfield',
    		fieldLabel : 'Nombre',
			name : 'tel_cnombre',
			allowBlank : false,
            itemId : 'tel_cnombre'
		},{
            xtype : 'textareafield',
    		fieldLabel : 'Observacion',
            maxLength: 300,
            enforceMaxLength: true,
			name : 'tel_cobservacion',
            itemId : 'tel_cobservacion'
		},{
            xtype : 'combobox',
    		fieldLabel: 'Lista',
           // store: 'TablaListasEmergenciaStore',     
			displayField: 'Descripcion',								
			valueField: 'Codigo',
            //plugins: ['clearbutton'],
            name: 'tel_clista',
            queryMode: 'local',
            allowBlank : false,
            itemId:'lista'
		},{
            xtype : 'combobox',
			fieldLabel: 'Discado',
          // store: 'TelefonoDiscadoStore',     
			displayField: 'Name',								
			valueField: 'Value',
            name: 'tel_ndiscado',
            itemId: 'tel_ndiscado',
            queryMode: 'local'
		},{
            xtype : 'combobox',
        	fieldLabel: 'Tipo contacto',  
            store: [
                    [0, getLocale('Seleccione')],
                    [1, getLocale('Contacto Smartpanics')],
                    [2, getLocale('Contacto Comun')],
                    [3, getLocale('Contacto Ambos')],
                    [4, getLocale('Oculto')]
                ],
		    displayField: 'Name',    							
    		valueField: 'Value',
            name: 'tel_nsp',
            queryMode: 'local',
            allowBlank : false,
            itemId: 'tel_nsp'
		},{
            xtype : 'textfield',
    		fieldLabel : 'Teléfono',
			name : 'tel_ctelefono',
			allowBlank : false,
            itemId: 'tel_ctelefono'
		},{
            xtype : 'numberfield',
        	fieldLabel : 'Orden',
            minValue: 0,
			name : 'tel_norden',
			allowBlank : false,
            itemId: 'tel_norden'
		},{
    	    xtype: 'fieldset',
            title: getLocale('Dígitos'),
            layout: 'hbox',
            items: [{
                    xtype : 'textfield',
                	fieldLabel : getLocale('Pre'),
                    labelWidth : 60,
                    flex: 1,
        			name : 'tel_cpredigito',
                    itemId: 'tel_cpredigito'
        		},{
                    xtype : 'textfield',
            		fieldLabel : getLocale('Post'),
                    labelWidth : 60,
                    margin: '0 0 0 5',
                    flex: 1,
        			name : 'tel_cpostdigito',
                    itemId: 'tel_cpostdigito'
        		} 
            ]
		},{
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [{
                xtype : 'combobox',
                fieldLabel: getLocale('T Remota'),   
    			displayField: 'Name',								
    			valueField: 'Value',
                name: 'tel_ntr',
                itemId: 'tel_ntr',
                labelWidth : 60,
                flex: 1,
                queryMode: 'local'
    		},{
                xtype : 'combobox',
            	fieldLabel: getLocale('Sms'),    
    			displayField: 'Name',								
    			valueField: 'Value',
                name: 'tel_nsms',
                itemId: 'tel_nsms',
                labelWidth : 100,
                margin: '0 0 0 5',
                flex: 1,
                queryMode: 'local'
    		}
            ]
		},{
            xtype : 'hiddenfield',
        	fieldLabel : 'Orden',
			name : 'tel_norden'
        },
        {
            xtype : 'textfield',
            fieldLabel : 'Permiso',
            //inputType : 'password',
            itemId: 'permiso',
            flex: 1,
			name : 'tel_cpermiso'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            hidden:true,
            itemId : 'clavebox',
            items: [
                /*{
                    xtype : 'textfield',
                	fieldLabel : 'Clave',
        			name : 'tel_cclave',
                   
                    flex: 1,
                   // inputType : 'password'
        		},*/
                
                
                {
                    xtype : 'textfield',
                    fieldLabel : 'Clave',
                	name : 'tel_cclave',
                    itemId: 'clave',
                   // disabled: true,
                   
                    readOnly:true,
                    hidden: true,
                    flex: 1,
                    inputType : 'password'
        		},{
                    xtype : 'textfield',
                    fieldLabel : 'Clave',
                    itemId: 'claveTxt',
                   //disabled: true,
                   
                    readOnly:true,
                    hidden: true,
                    flex: 1
            	},{
                    xtype: 'button',
                    text: 'Cambiar',
                    action: 'passChange'
                }
            ]
        }
        ],
	buttons : [{
			text : 'Guardar',
            action: 'save',
            itemId: 'save'
		},{
            text : 'Solicitar cambio',
    		iconCls : 'save',
            itemId: 'solitarcambio',
			action : 'solitarcambio',
            hidden:true
	    }, {
			text : 'Cancelar',
            action: 'cancel',
            itemId: 'cancel'
		}],

	initComponent : function() {
        //this.addEvents('objectchanged');
        //this.addEvents('passwordchanged');
		this.callParent(arguments);
	} // cierro init

});
