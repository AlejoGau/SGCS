Ext.define('SmartPanics.view.LandingNewView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.cuentanewview',
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
            forceSelection: true,
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
                var linea = form.findField('cue_clinea').getValue();
                
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
            xtype:'displayfield',
            fieldLabel : 'Tipo',
            value:'Cuenta Vigicontrol',
            itemId:'vigicontrol',
            hidden:true,
            margin:'0 0 5 0'
	    },{
			xtype : 'textfield',
            itemId: 'cuenta',
			name : 'cue_ncuenta',
			disabled : false,
            maxLength : 4,
            enforceMaxLength : true,
            regex: /^[A-Za-z0-9]*$/,
            regexText: getLocale('Debe ingresar números o letras'),
            /*validator: function(value){
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
                return this.textValid;
            },*/
			fieldLabel : 'Cuenta'
	    }, {
			xtype : 'textfield',
			fieldLabel : 'Nombre',
			name : 'cue_cnombre',
            allowBlank: false,
	    },{
            xtype:'combo',
            fieldLabel:'Copiar de cuenta',
            itemId:'cuentasFence',
            displayField : 'name',
    		valueField : 'name',
            hidden:true
	    }
        ],
	buttons : [{
			text : 'Crear',
            action: 'create',
          //  formBind: true
		}, {
			text : 'Cancelar',
            action: 'cancel'
		}],
	initComponent : function() {
		this.callParent(arguments);
	} // cierro init

});
