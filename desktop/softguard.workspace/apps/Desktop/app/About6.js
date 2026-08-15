Ext.define('Desktop.About6', {
    extend: 'Ext.window.Window',
    uses: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.Panel',
        'Ext.form.field.Checkbox',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Border'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    //title: getLocale('Información del Sistema'),
    modal: true,
    width: 640,
    height: 480,
     //maxWidth: 500,
	 //minWidth:500,
	 //maxHeight: 500,
	 //minHeight:450,
    border: false,

    initComponent: function () {
        this.title = getLocale('Información del Sistema');
        var me = this;

        me.formu = me.createForm();
        me.grid = me.createGrid();

        me.items = [
			me.formu,
			me.grid
		];
        
        me.callParent();
    },

	createForm : function(){

		var me = this;
		
		Ext.define('infoUser', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'Company', type: 'string'},
				{name: 'FirstName', type: 'string'},
				{name: 'LastName', type: 'string'},
				{name: 'UserId', type: 'string'},
				{name: 'language', type: 'string'}
			]
		});

		var user = Ext.create('infoUser', {
			Company : this.infoUser.Company,
			FirstName : this.infoUser.FirstName,
			LastName : this.infoUser.LastName,
			UserId : this.infoUser.IdDesktop,
			language : this.infoUser.language
		});

		var formu = new Ext.panel.Panel({
		   border: false,
		   padding: 10,
		   cls:'x-panel-body-default',
		    layout:'anchor',
            width:'100%',
			defaults:{
						anchor: '100%',
						labelWidth: 70,
						style: 'margin:5px; font-size:11px;font-weight:bold;'
			},
		   items: [{
						xtype: 'container',
						layout: 'hbox',
						margin: '0 0 10',
						items: [{
									xtype: 'container',
									flex: 1,
									layout: 'anchor',
									defaults: {
										anchor: '100%'
									},
									items: [{
												xtype: 'container',
												flex: 1,
												layout: 'anchor',
												items:[{
															xtype : 'image',
															src : '/desktop/images/logo_softguard_blanco.jpg',
															width : 140,
															height : 111,
															resizable : false
														}]
											}]
								},{
									xtype: 'component',
									width: 10
								},{
									xtype:'container',
									flex:2,
									layout:'anchor',
									defaults: {
										anchor: '100%'
									},
									items	:[{
												xtype: 'container',
												flex: 1,
												layout: 'hbox',
												items:[{
															xtype: 'displayfield',
															name: 'Serial',
															margin: '0 0 0 0',
															fieldLabel: getLocale('Serial'),
															value: this.KeyCustomerInfo.Serial
														},
                                                        {
    														xtype: 'button',
															margin: '0 0 0 90',
                                                            iconCls: 'icon-license',
															text:'Términos y condiciones',
                                                            handler: function(){                                             
                                                                /*
                                                                    lic-br.html
                                                                    lic-en.html
                                                                    lic-es.html
                                                                    lic-fr.html
                                                                    lic-it.html
                                                                    lic-pol.html
                                                                    lic-por.html
                                                                */
                                                                var a = me
                                                                var htmlTerm = 'lic-en.html'
																var _lang = user.get('language');
																
                                                                if( _lang == 'es') {
                                                                    htmlTerm = 'lic-es.html'
                                                                } else if (_lang == 'br') {
                                                                    htmlTerm = 'lic-br.html'
                                                                } else if (_lang == 'fr') {
                                                                    htmlTerm = 'lic-fr.html'
                                                                } else if (_lang == 'it') {
                                                                    htmlTerm = 'lic-it.html'
                                                                } else if (_lang == 'pl') {
                                                                    htmlTerm = 'lic-pol.html'
                                                                } else if (_lang == 'pr') {
                                                                    htmlTerm = 'lic-por.html'
                                                                }
                                                                
                                                                Ext.widget('window',{
                                                                    title: 'Términos y condiciones',
                                                                    width: 640,
                                                                    height: 480,
                                                                    layout: 'fit',
                                                                    html: "<iframe id='webdealerFrame' style='overflow:auto;width:100%;height:100%;' frameborder='0'  src='/license/"+htmlTerm+"'></iframe>"
                                                                }).show();
                                                            }
														}]
											},{
												xtype: 'container',
												flex: 1,
												layout: 'anchor',
												items:[{
													xtype: 'displayfield',
													fieldLabel: getLocale('Version del Sistema'),
													name: 'Version',
													value: this.KeyCustomerInfo._VERSIONUPDATE			
												}]
											},{
												xtype: 'container',
												flex: 1,
												layout: 'anchor',
												items:[{
													xtype: 'displayfield',
													fieldLabel: getLocale('Empresa'),
													name: 'Company',
													value: this.KeyCustomerInfo.Name			
												}]
											},{
    											xtype: 'container',
												flex: 1,
												layout: 'anchor',
												items:[{
															xtype: 'displayfield',
															fieldLabel: getLocale('Cuentas'),
															name: 'QtyAccounts',
															value: this.KeyCustomerInfo.QtyAccounts==0?getLocale('Ilimitadas'):this.KeyCustomerInfo.QtyAccounts
												}]
											},{
												xtype: 'container',
												flex: 1,
												layout: 'anchor',
												items:[{
															xtype: 'displayfield',
															layout: 'hbox',
															fieldLabel: getLocale('Nombre'),
															name: 'FirstName',
															value : this.infoUser.FirstName
												}]
											},{
												xtype: 'container',
												flex: 1,
												layout: 'anchor',
												items:[{
															xtype: 'displayfield',
															name: 'LastName',
															value : this.infoUser.LastName,
															fieldLabel: getLocale('Apellido')
												}]
											},{
												xtype: 'container',
												flex: 1,
												layout: 'anchor',
												items:[{
															xtype: 'displayfield',
															name: 'UserId',
															value : this.infoUser.Email,
															fieldLabel: 'Email'
												}]
											}] 
								}]
					}]
      });
 
		


//      formu.getForm().loadRecord(record);
		
		return formu;
	
	},

	createGrid : function (){

		Ext.define('Abouts', {
			 extend: 'Ext.data.Model',
			 fields: [
						{name: 'DueDate', type: 'date',dateFormat: 'MS'}, 
						{name: 'Module'}, 
                        {name: 'IsPerpetual', type: 'boolean'}, 
						{name: 'QuantityOfUsers'},
                        {name: 'ConcurrentInstances', type: 'int'}
                        
			]
		});

		var store = Ext.create('Ext.data.Store', {
        model: 'Abouts',
        proxy: {
            type: 'rest',
            url: '/Rest/Security/KeyModules',
				batchActions: false,
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        },
		autoLoad: true
    	});

		//Escondo modulos que no tienen que verse en las licencias
		store.addFilter({
			filterFn: function(record){
				return record.get('Module') !== 'Desktop'; 
			},
		});

		store.addFilter({
			filterFn: function(record){
				return record.get('Module') !== 'AWCCBP'; 
			}
		});

		store.addFilter({
			filterFn: function(record){
				return record.get('Module') !== 'CantidadDealers'; 
			},
		});

		store.addFilter({
			filterFn: function(record){
				return record.get('Module') !== 'Situator'; 
			}
		});

		var parseDueDate = function(value) {
			if (!value) {
				return null;
			}

			if (Ext.isDate(value)) {
				return Ext.Date.add(value, Ext.Date.MINUTE, value.getTimezoneOffset());
			}

			if (Ext.isString(value)) {
				var msMatch = value.match(/\/Date\((\d+)(?:[+-]\d+)?\)\//);
				if (msMatch) {
					var msDate = new Date(parseInt(msMatch[1], 10));
					return Ext.Date.add(msDate, Ext.Date.MINUTE, msDate.getTimezoneOffset());
				}

				var parts = value.split(/\D/).filter(Boolean);
				if (parts.length === 3) {
					var first = parseInt(parts[0], 10);
					var second = parseInt(parts[1], 10);
					var third = parseInt(parts[2], 10);

					if (parts[0].length === 4) {
						return new Date(first, second - 1, third);
					}

					return new Date(third, second - 1, first);
				}
			}

			var parsedDate = new Date(value);
			if (!isNaN(parsedDate.getTime())) {
				return parsedDate;
			}

			return null;
		};


		var grid = new Ext.grid.Panel ({
			title: getLocale('Lista de Modulos'),
			store: store,
            setLoading: getLocale('Cargando...'),
			width: 490,
			height:155,
            flex:1,
			autoScroll:true,			
			columns: [{
							header: getLocale('Módulo'),
							dataIndex: 'Module',
                            renderer: function(value){
                                return getLocale(value);
                            },
							flex: 1
						},{
							header: getLocale('Cantidad de Usuarios'),
							dataIndex: 'QuantityOfUsers',
                            renderer: function(value, metadata, record){
								console.log(value)
                                if (record.get('ConcurrentInstances')){
                                    return record.get('ConcurrentInstances')
                                }
                                if (value === 0) {
                                    return '';
                                }
                                return value;
                            },
							flex: 1
						},{
    						header: getLocale('Fecha de Vencimiento'),
							dataIndex: 'DueDate',
							flex: 1,
							renderer: function(value, metadata, record) {
								if (record.get('IsPerpetual')) {
									return getLocale('Liberado');
								} else {
									if (!value) return '';

									var dueDate = parseDueDate(value);
									if (!dueDate) return '';

									return Ext.Date.format(dueDate, 'd/m/Y');
								}
							}
						}]
		});

		return grid;
	}
	
});
