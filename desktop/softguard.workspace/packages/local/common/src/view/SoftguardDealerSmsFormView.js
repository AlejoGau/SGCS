Ext.define('Common.view.SoftguardDealerSmsFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.smsdealerformview',
    preventHeader: true,
    frame : true,
    activeHelp: true,
    fieldDefaults : {
    	labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
    monitorValid:true,
    scrollable : true,
	items : [
        {
            xtype: 'checkboxgroup',
            columns: 2,
            items: [
                {
                    xtype:'checkbox',
                    fieldLabel : 'Notificar eventos de alerta',
                    itemId : 'tnd_iNotificarAlertas',
                    labelWidth : 200,
                    labelAlign:'Right',
                    name:'tnd_iNotificarAlertas',
                    inputValue:1
                },
                {
                    xtype:'checkbox',
                    fieldLabel : 'Notificar eventos SmartPanics',
                    itemId : 'tnd_iNotificarSP',
                    labelWidth : 200,
                    labelAlign:'Right',
                    name:'tnd_iNotificarSP',
                    inputValue:0
                }
            ]
        },
        {
            xtype: 'fieldset',
            margin: '10 0 0 0',
            title: 'Eventos',
            itemId:'eventosfieldset',
            items:[
                
                {
                	xtype : 'textarea',
        			fieldLabel : 'Seleccionados',
                    height:120,
        			name: '_eventos',
                    itemId:'eventos'
        		},
                {
        			xtype : 'textarea',
        			fieldLabel : 'Seleccionados',
        			name: 'tnd_cAlarmas',
                    itemId:'eventoshide',
                    hidden: true
        		},
                {
                    xtype:'button',
                    text:'Modificar',
                    itemId:'agregarevento'
                }
            ]
        },{
            xtype:'container',
            layout:'hbox',
            margin:'5 0 5 0',
            items:[{
                xtype: 'combo',
                itemId: 'grupos',
                fieldLabel: 'Grupo',
                displayField : 'gru_cdescripcion',
                valueField : 'gru_ccodigo',
                queryMode: 'local',
                width: '100%',
                name: 'tnd_iGrupoAlarmas',
                plugins : ['clearbutton']
            }]
            
        },{
            xtype:'container',
            layout:'hbox',
            margin:'5 0 5 0',
            items:[
                    {
                        xtype:'textfield',
                        fieldLabel: 'Descripcion',
                        name:'tnd_cDescripcion',
                        itemId:'descripcion',
                        flex: 1
                    },{
                        xtype:'button',                           
                        iconCls:'x-tbar-loading',
                        itemId:'refreshnombres'
                	}
                ]
		},{
            xtype: "fieldset",
            title: "SmartPanics",
            itemId : 'spfieldset',
            hidden : true,
            padding : 10,
            items: [
                ,{
                    xtype: 'radiogroup',
                    columns: 2,
                    items: [
                        {boxLabel: 'Todos', name: 'tnd_iAdmin', inputValue: 0,itemId : "todosChk", checked: true},
                        {boxLabel: 'Administradores de grupos', name: 'tnd_iAdmin', inputValue: 1,itemId:'adminChk'},
                        {boxLabel: 'Administradores de la cuenta', name: 'tnd_iAdmin', inputValue: 2,itemId:'adminCuentaChk'},
                        {boxLabel: 'Todos de la cuenta', name: 'tnd_iAdmin', inputValue: 3,itemId:'todosCuentaChk'}
                    ]
                }/*
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin : '0 0 10 0',
                    items:[{
                        xtype : "checkbox",
                        fieldLabel : "Todos",
                        itemId : "todosChk",
                        checked : true
                    },{
                        xtype : "checkbox",
                        fieldLabel : "Administradores de grupo",
                        labelWidth : 200,
                        itemId : "adminChk",
                        disabled : true,
                        margin:'0 0 0 15'
                    }]
                }*/,{
                    xtype: 'container',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'combo',			
                            displayField: 'pls_cdescripcion',
                            //store: 'TablaPlantillasSmsStore',								
                            valueField: 'pls_ccodigo',
                            fieldLabel: 'Plantilla Push',
                            name: 'tnd_cPlantillaPush',
                            itemId: 'tnd_cPlantillaPush',
                            flex: 1,
                            validator: function(value){
                
                                    var t = this;
                                    if(Ext.util.Format.trim(t.up('smsdealerformview').down('#destinomail').getValue()) != '' && value == '') {                                        
                                        t.markInvalid('Se debe seleccionar una plantilla.');
                                        t.textValid = 'Se debe seleccionar una plantilla.';
                                        
                                    } else {
                                        t.clearInvalid();
                                        t.textValid = true;
                                    }
                                
                                return this.textValid;
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Ver',
                            action: 'verPlantillaPush'
                        }
                    ]
                }
            ]                
        },{
            xtype: 'fieldset',
            margin: '10 0 0 0',
            title: 'Mail',
            itemId: 'fieldsetemail',
            items:[{
                xtype : 'textarea',
    			fieldLabel : 'Destino Mail',
                itemId: 'destinomail',
    			name : "tnd_cMail",
                validator: function(value){
                     
                        var reg = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/;
                        if(!value.match(reg) && value !='') {
                            this.markInvalid("El email esta mal formulado.");
                            this.textValid = "El email esta mal formulado.";
                        } else {
                            this.clearInvalid();
                            this.textValid = true;
                        }                             

                    return this.textValid;
                },
    
    		},{
                xtype: 'container',
                layout: 'hbox',
                items:[
                    {
                        xtype: 'combo',                                        
                		//store: 'TablaPlantillasSmsStore',					
            			displayField: 'pls_cdescripcion',								
            			valueField: 'pls_ccodigo',
                        fieldLabel: 'Plantilla Mail',
                        name: 'tnd_cPlantillaMail',
                        itemId: 'tnd_cPlantillaMail',
                        flex: 1,
                        validator: function(value){
               
                                var t = this;
                                if(Ext.util.Format.trim(t.up('smsdealerformview').down('#destinomail').getValue()) != '' && value == '') {                                        
                                    t.markInvalid('Se debe seleccionar una plantilla.');
                                    t.textValid = 'Se debe seleccionar una plantilla.';
                                    
                                } else {
                            		t.clearInvalid();
                                    t.textValid = true;
            					}
                             
                            return this.textValid;
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Ver',
                        action: 'verPlantillaMail'
                    }
                ]
            }
        ]}
    ],
	buttons : ['->',{
    		text : 'Aceptar',
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
            action: 'cancel'
		}],

	initComponent : function() {
        
		this.callParent(arguments);
                
	}
    // cierro init

});
