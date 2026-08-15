//MIGRADO2024
Ext.define('Common.view.ParticionFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.particionesformview','widget.particionformview'],
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
    		allowBlank : true,
            hidden: true
		},
        {
            xtype : 'textfield',
        	fieldLabel : 'Código',
            itemId: 'codigo',
			name : 'zon_ccodigo',
			allowBlank : false,
            hidden: true
		},{
            xtype : 'combo',
        	fieldLabel : 'Dealer',
            itemId: 'dealer',
			name : 'zon_cdealer',
			store : 'TablaLineasStore',
			displayField : 'lin_crazonsocial',
			valueField : 'lin_ccodigo',
            queryMode: 'local'
	    },{   
            xtype: 'textfield',
            name : 'zon_ccuenta',
            itemId: 'cuenta',
            fieldLabel : 'Cuenta',
            maxLength : 4,
            enforceMaxLength : 4,
            validator: function(value){
                var view = this.up('particionesformview');
                var form = view.getForm();
                var linea = form.findField('zon_cdealer').getValue();
                
                value = Ext.String.leftPad(value,4,'0');
                
                Ext.Ajax.request({
                  url: '/Rest/Search/CuentaByDealerValidate',
                  params: { linea: linea, cuenta: value},
                  method: 'GET',
                  scope: this,
                  success: function(response){
                    var errors = Ext.JSON.decode(response.responseText);
        
                    if (errors.total){
                        var error = errors.rows[0];
                        this.markInvalid(getLocale(error.Descripcion));
                        this.textValid = false;
                    } else {
                        this.clearInvalid();
                        this.textValid = true;
                    }                             
                  }
                });
                return this.textValid;
            },
        },
        {
        	xtype : 'combo',
			fieldLabel : 'Tipo',
            itemId: 'comboTipos',
			name : 'cue_ctipo',			
			displayField : 'tip_cdescripcion',
			valueField : 'tip_ccodigo',
            editable: false,
            forceSelection: true,
            queryMode: 'local',
            validator: function (value) {
                var form = this.up('form').getForm();
                var linea = form.findField('zon_cdealer').getValue();
                
                if(value == '' && linea != '_MP' ) {    
                    this.markInvalid("Debe seleccionar un tipo");
                    this.textValid = false;
                } else {
                    this.clearInvalid();
                    this.textValid = true;
                }                
                return this.textValid;
            }
	    },{
            xtype : 'combo',
            fieldLabel : 'Copiar de cuenta',
            itemId: 'cuentasparticiones',
			name : '_cuentacopy',
			store : 'TablaLineasStore',
			displayField : '_cuentacopy',
			valueField : 'cue_iid',
            queryMode: 'local'
	    },
         {
            xtype : 'combo',
        	fieldLabel : 'Consume licencia',
			store : 'SiNoStore',
            displayField : 'Name',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
            value: 2,
			valueField : 'Value',
			name : "cue_ilicenciapar",
            itemId: 'cue_ilicenciapar'
		},{
            xtype: 'fieldset',
            itemId: 'fieldsetCopy',
            title: getLocale('Datos a copiar de la cuenta principal'),
            collapsible: false,
            collapsed: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype : 'checkboxfield',
                    name : '',
                    fieldLabel: 'Datos de la cuenta',
                    margin: '0 5 5 0',
                    itemId: 'principal'
                },
                {
                    xtype : 'checkboxfield',
                    name : '',
                    fieldLabel: 'Usuarios',
                    margin: '0 5 5 0',
                    itemId: 'usuarios'
                },
                {
                    xtype : 'checkboxfield',
                    name : '',
                    fieldLabel: 'Contactos',
                    margin: '0 5 5 0',
                    itemId: 'contactos'
                },
                {
                    xtype : 'checkboxfield',
                    name : '',
                    fieldLabel: 'Zonas',
                    margin: '0 5 5 0',
                    itemId: 'zonas'
                },
                {
                    xtype : 'checkboxfield',
                    name : '',
                    fieldLabel: 'Información médica',
                    margin: '0 5 5 0',
                    itemId: 'medica'
                },
                {
                    xtype : 'checkboxfield',
                    name : '',
                    fieldLabel: 'notas',
                    margin: '0 5 5 0',
                    itemId: 'notas'
                },
                {
                    xtype : 'checkboxfield',
                    name : '',
                    fieldLabel: 'Horarios',
                    margin: '0 5 5 0',
                    itemId: 'horarios'
                },{
                    xtype : 'checkboxfield',
                    name : '',
                    fieldLabel: 'Schedule',
                    margin: '0 5 5 0',
                    itemId: 'schedule'
                },
                {
                    xtype : 'checkboxfield',
                    name : '',
                    fieldLabel: 'Notificaciones',
                    margin: '0 5 5 0',
                    itemId: 'notificaciones'
                },
                {
                    xtype : 'checkboxfield',
                    name : '',
                    fieldLabel: 'Video Link',
                    margin: '0 5 5 0',
                    itemId: 'videolink'
                }                
            ]
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