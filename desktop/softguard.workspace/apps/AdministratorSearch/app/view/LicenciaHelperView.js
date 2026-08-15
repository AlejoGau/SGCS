Ext.define('AdministratorSearch.view.LicenciaHelperView', {
    extend : 'Ext.panel.Panel',
    alias : ['widget.licenciaview'],
    title : 'Order',  
    autoScroll:false,
    bodyPadding : 5,  
    layout: 'vbox',
    items : [
        {
            xtype:'container',
            layout:'hbox',
            width:'100%',
            height:300,
            items: [
                    {
                        xtype:'container',
                        layout:'vbox',
                        width:'50%',
                        items:[
                                {
									xtype : 'image',
									src : '/desktop/images/logo_softguard_blanco.jpg',
									width : 140,
									height : 111,
									resizable : false
								},{
									xtype: 'displayfield',
									//margins: '10 0 0 0',
									fieldLabel: 'Serial',
                                    itemId:'serial'
									//value: KeyCustomerInfo.Serial
								},{
    									xtype: 'displayfield',
										fieldLabel: 'Empresa',
                                        itemId:'company',
									//	value: KeyCustomerInfo.Name	
										
							    },{
        								xtype: 'displayfield',
										fieldLabel: 'Cuentas',
                                        itemId:'QtyAccounts'
										//value: KeyCustomerInfo.QtyAccounts
							    },{
										xtype: 'displayfield',
										layout: 'hbox',
										fieldLabel: 'Nombre',
										name: 'FirstName',
                                        itemId:'nombre'
									//	value : this.application.UserData.FirstName
							    },{
    									xtype: 'displayfield',
										name: 'LastName',
									//	value : this.application.UserData.LastName,
										fieldLabel: 'Apellido',
                                        itemId:'apellido'
							    },{
    									xtype: 'displayfield',
										name: 'UserId',
									//	value : this.application.UserData.UserId,
										fieldLabel: 'Email',
                                        itemId:'Email'
							    }
                            
                            ]
                    },{
                        xtype:'container',
                        layout:'vbox',
                        
                        width:500,
                        items:[
                               {
									xtype: 'button',
                                    iconCls: 'icon-license',
									text:'Términos y condiciones',
                                    handler: function(){
                                        var Language = 'en_en';
                                        if (myQueryString.Language){
                                            Language = myQueryString.Language;
                                        } else if (_UserData && _UserData.metadata && _UserData.metadata.language){
                                            Language=_UserData.metadata.language;
                                        }
                                        
                                        var _lang = Language.substr(0,2);

                                        var htmlTerm = 'lic-en.html'
                                        
                                        if(_lang == 'es') {
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
								},{
    							    xtype:'fieldset',
                                    title:'Licencia',
                                    margin:'10 0 0 0',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            itemId:'ultimafechadelicencia',
                                            labelWidth: 140,
                                            fieldLabel:'Ultima actualizacion'
                                        },{
                                            xtype: 'displayfield',
                                            itemId:'FingerPrint',
                                            labelWidth: 140,
                                            fieldLabel:'FingerPrint'
                                        },
                                        {
                                            xtype: 'filefield',
                                            fieldLabel: 'Archivo de licencia',
                                            labelWidth: 140,
                                            allowBlank: false,
                                            itemId:'inputfile',
                                            buttonText: 'Browse...'
                                    
                                        }
                                    ]
								}                                
								   
                            ]
                    }
                ]
        },{
                xtype:'grid',
        		title: getLocale('Lista de Modulos'),
    		//	store: store,
                itemId:'modulegrid',
                setLoading: getLocale('Cargando...'),
    			flex:1,
                width:'100%',
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
    							renderer : function(value, metadata,record){
                                    if (record.get('IsPerpetual')){
                                        return getLocale('Liberado');
                                    }else 
        						        return Ext.util.Format.date(value,'d/m/Y');
    							}
    						}]
    		}
        
    ],
    
	initComponent : function() {
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
               items: [
                {
                    text: 'Actualizar',
                    iconCls: 'x-tbar-loading',
                    action: 'actualizar'
                }
                ]
             }); 
         
         this.addDocked(toolbar);
	} 

});