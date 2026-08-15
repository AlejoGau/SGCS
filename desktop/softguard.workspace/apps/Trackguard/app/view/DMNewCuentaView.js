Ext.define('Trackguard.view.DMNewCuentaView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.dmnewcuentaview',
    preventHeader: true,
    frame : true,
    fieldDefaults : {
    	labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [        
       /*{
    		xtype : 'combo',
			fieldLabel : 'Dealer',
            itemId: 'dealer',
			name : 'cue_clinea',
			store : 'TablaLineasStore',
			displayField : 'lin_crazonsocial',
			valueField : 'lin_ccodigo',
            editable: false,
            //forceSelection: true,
            allowBlank: false,
            queryMode: 'local'
	    },*/
        {
            xtype:'fieldset',
            title:getLocale('Dealer'),
            layout:'hbox',
            items: [
                    {
                        xtype:'button',
                        text:'Seleccione un dealer',
                        itemId:'selectDealer',
                        margin:'0 5 0 0'
                    },{
                        xtype:'displayfield',
                        itemId:'dealer',
    		            name : 'cue_clinea'
                    }
                ]
        },
        {
			xtype : 'textfield',
            itemId: 'cuenta',
			name : 'cue_ncuenta',
			disabled : false,
            maxLength : 4,
            enforceMaxLength : true,
            validator: function(value){
                
                if(!this.up('dmnewcuentaview').recordCuenta) {
                    var form = this.up('form').getForm();
                    var linea = form.findField('cue_clinea').getValue();
                    
                    value = Ext.String.leftPad(value,4,'0');
                    
                    Ext.Ajax.request({
                      url: '/rest/Search/CuentaByDealerValidate',
                      params: { linea: linea, cuenta: value},
                      method: 'GET',
                      scope: this,
                      success: function(response){
                        var errors = Ext.JSON.decode(response.responseText);
            
                        if (errors.total){
                            var error = errors.rows[0];
                            this.markInvalid(error.Descripcion + ' cuenta: ' + value);
                            this.textValid = false;
                        } else {
                            this.clearInvalid();
                            this.textValid = true;
                        }                             
                      }
                    });
                   
                } else {
                    this.clearInvalid();
                    this.textValid = true;
                }
                 return this.textValid;
            },
			fieldLabel : 'Cuenta'
	    }, {
    		xtype : 'displayfield',
			fieldLabel : 'Cuenta',
			itemId:'dealerceunta',
            hidden:true
	    },{
			xtype : 'textfield',
			fieldLabel : 'Nombre',
			name : 'cue_cnombre',
            allowBlank: false,
	    }, {
    		xtype : 'textfield',
			fieldLabel : 'Imei',
			name : 'cue_cIMEI',
            allowBlank: false,
	    },{
            xtype: 'combobox',
            fieldLabel: 'Tipo',
            itemId: 'tipoCombo',
            //multiselect : false,
            editable : false,
            queryMode: 'local',
            typeAhead: false,
            displayField: 'tip_cdescripcion',
            valueField: 'tip_ccodigo',
            //store: 'VehicleTipoSearchStore',
            name: 'cue_ctipo',
            flex: 1,
            margin: 0,            
            allowBlank: false,
        }
        ],
	buttons : [{
			text : 'Crear',
            action: 'create'
		}, {
			text : 'Cancelar',
            action: 'cancel'
		}],

	initComponent : function() {
		this.callParent(arguments);
	} // cierro init

});
