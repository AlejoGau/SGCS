Ext.define('AdministratorSearch.view.parametro_REPAUTFIRMADEALER', {
    extend : 'Ext.form.Panel',
    alias : 'widget.parametro_REPAUTFIRMADEALER',
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    items : [
       {    
            xtype:'combobox', 
            name:'par_ivalor',
            itemId:'valor', 
            fieldLabel:'Valor',
            store:[[0,getLocale('No')],[1,getLocale('Sí')],[2,getLocale('Seleccionar dealer')],], 
            value:0,
            listeners:{
                change: function (combo, value) {
                    var view = combo.up('parametro_REPAUTFIRMADEALER')

                    view.calculateValues();

                    if(value == 2) {
                        view.down('#dealer').show()
                    } else {
                        view.down('#dealer').hide()
                    }
                    
                    // De ser 1, despliego el combo correspondiente a Logo
                    if (value == 1) {
                        view.down('#logoDealer').show();
                    } else {
                        view.down('#logoDealer').hide();
                    }
                                        
                }
            }
        },{
        	xtype : 'combo',
			fieldLabel : 'Dealer',
            itemId: 'dealer',
			name : 'cue_clinea',
			//store : 'TablaLineasStore',
			displayField : 'lin_crazonsocial',
			valueField : 'lin_ccodigo',
            queryMode: 'local',
			flex : 1,
            hidden:true,
            listeners:{
                change: function (combo, value) {
                    var view = combo.up('parametro_REPAUTFIRMADEALER')

                    view.calculateValues()

                }
            }
	    },{
            xtype: 'textarea',
            name: 'par_cvalor',
            fieldLabel:'Valor',
            anchor:'100%',
            itemId:'jsonvalues',
            alowBlank: false,
            hidden:true
        },
        /* Nuevo para el agregado de Logo y Texto */
        {
            xtype : 'combo',
            fieldLabel : 'Logo',
            itemId : 'logoDealer',
            hidden : true,
            store:[[0,getLocale('Logo dealer')],[1,getLocale('Logo personalizado')]],
            listeners:{
                change: function (combo, value) {
                    var view = combo.up('parametro_REPAUTFIRMADEALER')
                    
                    /* Si es 1, despliego la foto */
                    if ( value == 1 ) {
                        view.down('#photo').show()
                    } else {
                        view.down('#photo').hide()
                    }
                    
                    view.calculateValues();
                }
            }
        },{
            xtype: 'container',
            layout: 'hbox',
            margin:'0 0 5 0',
            itemId : 'photo',
            hidden : true,
            items:[
                {
                    xtype : 'displayfield',
                	name : 'lin_cimagen',
                    fieldLabel: 'Imagen',
                    maxLength: 60,
                    itemId : 'imagenNombre',
                    listeners : {
                        change : function (button, value) {
                            var view = button.up('parametro_REPAUTFIRMADEALER')
                            view.calculateValues();
                        }
                    }
        		},{
                	xtype : 'button',
        			text : 'Selecciona logo',
        			iconCls : 'icon-photo',
        			action: 'photo',
                    margin:'0 0 0 5'
        		}
                ]
        },{
            xtype : 'textareafield',
            itemId: 'textoDealer',
            fieldLabel : 'Texto',
            height : 60,
            anchor: '100%',
            enableKeyEvents : true,
            listeners : {
                change : function (textareafield, value, e, eOpts) {
                    var view = textareafield.up('parametro_REPAUTFIRMADEALER');
                    view.calculateValues();
                }                
            },
            maxLength : 300
        }/*,{
            xtype : 'htmleditor',
            shrinkWrap: false,
            flex: 1,
            itemId: 'body',
            name : 'Body'
            
        }*/
    ],

    calculateValues : function () {
    
        var logoSelect = this.down('#logoDealer').getValue();
        var logo = '';
        var logoPers = '';
        var textoDealer = '';
        
        /* Declaro y asigno en base al valor del combo de "logo" */
        if ( logoSelect == 0 ) {
            logo = logoSelect;
            logoPers = null;
        } else if ( logoSelect == 1 ) {
            logo = logoSelect;
            logoPers = this.down('#imagenNombre').getValue();
        } 
        
        textoDealer = this.down('#textoDealer').getValue();
        if ( textoDealer == "") {
            textoDealer = null;
        } 
        
        
        var obj = {
            valor:this.down('#valor').getValue(),
            dealer: this.down('#valor').getValue() == 2 ? this.down('#dealer').getValue():null,

            logo : logo,
            logoPers : logoPers,
            textoDealer : textoDealer
            
        }

        this.down('#jsonvalues').setValue(Ext.encode(obj))
        
    },
	initComponent : function() {
		this.callParent();
        var view = this;
        
        Ext.Function.defer(function(){
            var jsonvalues = view.down('#jsonvalues').getValue();
            var obj = Ext.JSON.decode(jsonvalues)

            view.down('#valor').setValue(obj.valor)
            view.down('#dealer').setValue(obj.dealer)
            
            /* Le agrego los valores que vienen del JSON guardado */
            view.down('#logoDealer').setValue(obj.logo)
            view.down('#textoDealer').setValue(obj.textoDealer)
            view.down('#imagenNombre').setValue(obj.logoPers)

        }, 100);
                
        
	} // cierro init
});