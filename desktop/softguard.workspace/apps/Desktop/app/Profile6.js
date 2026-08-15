Ext.define('infoUser', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'Company',  type: 'string'},
		{name: 'FirstName',   type: 'string'},
		{name: 'LastName', type: 'string'},
		{name: 'UserId', type: 'string'}
		
	]
});

Ext.define('Desktop.Profile6', {
    extend: 'Ext.window.Window',

	uses: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.Panel',
        'Ext.form.field.Checkbox',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Border'
    ],

    layout: 'anchor',
	modal: true,
	width: 600,
	height:400,
	maxHeight:400,
	closeAction: 'destroy',
	border: false,
	autoScroll:true,

    initComponent: function () {
        this.title = getLocale('Perfil');
        var me = this;

        me.formu = me.createForm();
		me.buttons = [{ text: getLocale('Cancelar'), handler: me.close, scope: me }];
		me.items = [
            {
                layout: 'anchor',
                items: [
                    me.formu
                ]
            }
        ];
        
        me.callParent();
    },

	createForm : function(){
		var me = this;
		var pass = this;
		
		var formu = new Ext.form.Panel({
            border: false,
            padding:10,
            cls:'x-panel-body-default',
            buttonAlign: 'right',

            items: [{
                  autoEl: {
                     tag: 'div',
                     html: getLocale('Utilice esta ventana para cambiar su password'),
                     style: 'font-weight:bold; padding:0 0 20px 0;'
                  },
                  xtype: 'box'
               },{
						disabled:true,
                  anchor: '100%',
                  fieldLabel: getLocale('Empresa'),
                  listeners: {
                     'invalid': { buffer: 250, fn: this.onInValid, scope: this },
                     'valid': { buffer: 250, fn: this.onValid, scope: this }
                  },
                  name: 'Company',
                  xtype: 'textfield'
               },{
						disabled:true,
                  anchor: '100%',
                  fieldLabel: getLocale('Nombre'),
                  listeners: {
                     'invalid': { buffer: 250, fn: this.onInValid, scope: this },
                     'valid': { buffer: 250, fn: this.onValid, scope: this }
                  },
                  name: 'FirstName',
                  xtype: 'textfield'
               },{
						disabled:true,	
                  anchor: '100%',
                  fieldLabel: getLocale('Apellido'),
                  listeners: {
                     'invalid': { buffer: 250, fn: this.onInValid, scope: this },
                     'valid': { buffer: 250, fn: this.onValid, scope: this }
                  },
                  name: 'LastName',
                  xtype: 'textfield'
               },{
                  disabled:true,
						anchor: '100%',
                  fieldLabel: 'Email',
                  listeners: {
                     'invalid': { buffer: 250, fn: this.onInValid, scope: this },
                     'valid': { buffer: 250, fn: this.onValid, scope: this }
                  },
                  name: 'UserId',
                  vtype: 'email',
                  xtype: 'textfield'
               },{
					xtype: 'container',
					layout: 'hbox',
					items:[{
							readOnly:true,
							fieldLabel: 'Password',
							flex: 2,
							listeners: {
							'invalid': { buffer: 250, fn: this.onInValid, scope: this },
							'valid': { buffer: 250, fn: this.onValid, scope: this }
					},
							name: 'OldPassword',
							value:'AAAAAAAAA',
							xtype: 'textfield',
							inputType:'password'
						},{
							xtype: 'button',
							text : getLocale('Cambiar'),
							margins: '0 0 0 6',
							handler: function() {
							var win = Ext.create('Ext.window.Window', {
								border: false,
								padding:10,
								//cls:'x-panel-body-default',
								bodyStyle:'background:#fff',
								title: getLocale('Cambiar Contraseña'),
								width: 350,
								height: 200,
								layout: 'anchor',
								constrain: true,
								modal: true,
								items: {
									xtype: 'container',
									border: true,
									padding:10,
									layout: 'anchor',
									bodyStyle:'border:1px solid #000',
									//layout: 'hbox',
									items:[{
										//readOnly:true,
										anchor: '100%',
										fieldLabel: 'Clave actual',
										name: 'OldPassword',
										id: 'OldPassword',
										//value:'AAAAAAAAA',
										xtype: 'textfield',
										inputType:'password'
									},{
										anchor: '100%',
										fieldLabel: 'Nueva clave',
										listeners: {
											'invalid': { buffer: 250, fn: this.onInValid, scope: this },
											'valid': { buffer: 250, fn: this.onValid, scope: this }
										},
										name: 'NewPassword1',
										id: 'NewPassword1',
										xtype: 'textfield',
										regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/,
										regexText: getLocale('Mínimo 6 caracteres, una Mayúscula, una minúscula y un número'),
										inputType:'password'
									},{
										anchor: '100%',
										fieldLabel: 'Reingrese nueva clave',
										listeners: {
											'invalid': { buffer: 250, fn: this.onInValid, scope: this },
											'valid': { buffer: 250, fn: this.onValid, scope: this }
										},
										name: 'NewPassword2',
										id: 'NewPassword2',
										itemId: 'NewPassword2',
										regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/,
										regexText: getLocale('Mínimo 6 caracteres, una Mayúscula, una minúscula y un número'),
										xtype: 'textfield',
										inputType:'password'
									}]
								},

								dockedItems: [{
										xtype: 'toolbar',
										dock: 'bottom',
										ui: 'footer',
										layout: {
											pack: 'center'
										},
										items: [{
											minWidth: 80,
											text: getLocale('Guardar'),
											handler: doAjax
										},{
											minWidth: 80,
											text: getLocale('Cancelar'),
											handler: function(){
													var w = this.findParentByType('window');
													w.close();
												}
										}]
								}]
							});
							win.show();
							}
						}]
					}
            ],
            labelWidth: 110,
            //title: 'Titulo de tab',
            //url: '/Rest/Security/UserData'
         });

		function doAjax() {
            var pass1 = Ext.getCmp("NewPassword1");
            var pass2 = Ext.getCmp("NewPassword2");
            
            if (pass1.isValid() && pass2.isValid() && (pass1.getValue()==pass2.getValue())){
                oldPassword = Ext.getCmp("OldPassword").getValue();
        		newPassword = pass1.getValue();
    			Ext.Ajax.request({
    				url : '/Rest/Security/ChangePassword?OldPassword='+encodeURIComponent(oldPassword)+'&NewPassword='+encodeURIComponent(newPassword),
    				//url : '/Rest/Security/ChangePassword?dc='+new Date().getTime(),
					params : { 
    					//OldPassword: oldPassword,
						//NewPassword: newPassword
    				},
    				method: 'PUT',
    				failure: function(r,o){
    					Ext.Msg.alert('Error', getLocale('Hubo un error al cambiar su password, por favor, intente nuevamente'));
    					formu.getForm().reset();	
    				},
    				success: function(response, action){
    					if (response.responseText == "true")
    						Ext.Msg.alert('Perfil', getLocale('El cambio de clave fue exitoso'));
    					else
    						Ext.Msg.alert('Perfil', getLocale('Los datos ingresados no son correctos, por favor, intente nuevamente'));
    						

    				},
    			});
            } else {
                    Ext.Msg.alert('Clave', getLocale('Las claves deben ser iguales y cumplir con los valores mínimos'));
            }
            
			
		};
 
		/*

		Ext.define('infoUser', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'Company',  type: 'string'},
				{name: 'FirstName',   type: 'string'},
				{name: 'LastName', type: 'string'},
				{name: 'UserId', type: 'string'}
				
			]
		});
		
		*/

		var record = Ext.create('infoUser', {
			Company : this.infoUser.OrganizationName,
			FirstName : this.infoUser.FirstName,
			LastName : this.infoUser.LastName,
			UserId : this.infoUser.Email
		});

		formu.getForm().loadRecord(record);
		
		return formu;
	}, 
	
    onInValid : function(){
      //new1 = Ext.getCmp("NewPassword1");
      //new2 = Ext.getCmp("NewPassword2");
      
    },
	onValid : function(){
      //this.tabPanel.getActiveTab().buttons[0].enable();
      //this.statusbar.setStatus({iconCls: '', text: this.locale.ready});
    }

});

