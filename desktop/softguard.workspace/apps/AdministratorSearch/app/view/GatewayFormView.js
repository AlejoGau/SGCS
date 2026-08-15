Ext.define('AdministratorSearch.view.GatewayFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.gatewayformview'],
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 150,
        anchor : '100%'
	},
	items : [
        {
    		xtype : 'textfield',
			name : 'tgm_cdescripcion',
            fieldLabel: 'Descripcion',
            regex: /^[A-Za-z0-9 \.\,\-\_\/]*$/,
            regexText:getLocale('Los caracteres válidos son<br/>- Números<br/>- Letras mayúsculas y minúsculas<br>- Espacios y caracteres .,-_/')          
		},
       {                                            
            xtype: 'combo',
            queryMode: 'local',
            name : 'tgm_ntipo',
            itemId: 'tgm_ntipo',
            fieldLabel: 'Tipo',       
            anchor:'100%',
            store: [
                [0,'Modem'],
                [1,'SMPP'],
                [2,'HTTP'],
                [3,'API MAIL'],
                [4,'SMARTSMS'],
                [5,'OPENVOX'],
                [7,'Broadcaster'],
                [8,'C3NTRO'],
                [9,'Nomination']
            ]
        },
        {
            xtype:'fieldset',
            itemId:'tgm_ntipo2',
            hidden:true,
            items:[
                    {
                        xtype : 'textfield',
                		name : 'tgm_chttpurl',
                        fieldLabel: 'Url',
                      /*  validator: function(value){
                                var form = this.up('form').getForm();
                                this.textValid = true;
                                if(form._record.get('tgm_ntipo') == 2) {
                                    if(value != '') {
                                        this.clearInvalid();
                                        this.textValid = true;
                                    } else {
                                        this.markInvalid('No puede estar vacio.');
                                        this.textValid = false;
                                    }
                                    
                                }
                                 return this.textValid;
                        }*/
            		}
                
                ]
        },
        {
            xtype:'fieldset',
            itemId:'tgm_ntipo3',
            hidden:true,
            items:[
                    {
                        xtype : 'textfield',
                		name : 'tgm_capimail',
                        fieldLabel: 'Api Mail',
                       /* validator: function(value){
                                var form = this.up('form').getForm();
                                this.textValid = true;
                                if(form._record.get('tgm_ntipo') == 3) {
                                    if(value != '') {
                                        this.clearInvalid();
                                        this.textValid = true;
                                    } else {
                                        this.markInvalid('No puede estar vacio.');
                                        this.textValid = false;
                                    }
                                    
                                }
                                 return this.textValid;
                        }*/
            		},{
                	    xtype:'container',
                        layout:'hbox',
                        items:[
                                {
                                    xtype : 'textfield',
                            		name : 'tgm_cuser',
                                    fieldLabel: 'Usuario',
                                    margin:'0 15 0 0',
                                   /* validator: function(value){
                                            var form = this.up('form').getForm();
                                            this.textValid = true;
                                            if(form._record.get('tgm_ntipo') == 3) {
                                                if(value != '') {
                                                    this.clearInvalid();
                                                    this.textValid = true;
                                                } else {
                                                    this.markInvalid('No puede estar vacio.');
                                                    this.textValid = false;
                                                }
                                                
                                            }
                                             return this.textValid;
                                    }*/
                        		},{
                                    xtype : 'textfield',
                        			name : 'tgm_cpassword',                                    
                                    inputType: 'password',
                                    fieldLabel: 'Clave',
                                    labelWidth:100,
                                   /* validator: function(value){
                                            var form = this.up('form').getForm();
                                            this.textValid = true;
                                            if(form._record.get('tgm_ntipo') == 3) {
                                                if(value != '') {
                                                    this.clearInvalid();
                                                    this.textValid = true;
                                                } else {
                                                    this.markInvalid('No puede estar vacio.');
                                                    this.textValid = false;
                                                }
                                                
                                            }
                                             return this.textValid;
                                    }*/
                        		}
                            ]
            		}
                
                ]
        },{
            xtype:'fieldset',
            itemId:'tgm_ntipo1',
            hidden:true,
            items:[
                    {
                        xtype : 'textfield',
            			name : 'tgm_csmppsystemid',
                        fieldLabel: 'System Id (Usuario)',
                        /*validator: function(value){
                                var form = this.up('form').getForm();
                                this.textValid = true;
                                if(form._record.get('tgm_ntipo') == 1) {
                                    if(value != '' && value != 0) {
                                        this.clearInvalid();
                                        this.textValid = true;
                                    } else {
                                        this.markInvalid('No puede estar vacio.');
                                        this.textValid = false;
                                    }
                                    
                                }
                                 return this.textValid;
                        }*/
            		},{
                    	xtype : 'textfield',
            			name : 'tgm_csmpppassword',
                        inputType: 'password',
                        fieldLabel: 'Clave',
                       /* validator: function(value){
                                var form = this.up('form').getForm();
                                this.textValid = true;
                                if(form._record.get('tgm_ntipo') == 1) {
                                    if(value != '' && value != 0) {
                                        this.clearInvalid();
                                        this.textValid = true;
                                    } else {
                                        this.markInvalid('No puede estar vacio.');
                                        this.textValid = false;
                                    }
                                    
                                }
                                 return this.textValid;
                        }*/
            		},{
                    	xtype : 'textfield',
            			name : 'tgm_csmpphostname',
                        fieldLabel: 'Hostname (IP)',
                       /* validator: function(value){
                                var form = this.up('form').getForm();
                                this.textValid = true;
                                if(form._record.get('tgm_ntipo') == 1) {
                                    if(value != '' && value != 0) {
                                        this.clearInvalid();
                                        this.textValid = true;
                                    } else {
                                        this.markInvalid('No puede estar vacio.');
                                        this.textValid = false;
                                    }
                                    
                                }
                                 return this.textValid;
                        }*/
            		},
                        {
                            xtype : 'numberfield',
                			name : 'tgm_nsmppport',
                            fieldLabel: 'Puerto',
                         /*   validator: function(value){
                                    var form = this.up('form').getForm();
                                    this.textValid = true;
                                    if(form._record.get('tgm_ntipo') == 1) {
                                        if(value != '' && value != 0) {
                                            this.clearInvalid();
                                            this.textValid = true;
                                        } else {
                                            this.markInvalid('No puede estar vacio.');
                                            this.textValid = false;
                                        }
                                        
                                    }
                                     return this.textValid;
                            }*/
                		},{
                        	xtype : 'textfield',
                			name : 'tgm_nsmpsourceadd',
                            maxLength: 20,
                            enforceMaxLength: true,
                            fieldLabel: 'Source address (id cliente)'
                		}
                ]
        }/*,{
            xtype : 'textfield',
			name : 'tgm_cdll',
            fieldLabel: 'Dll'
		}*//*,{
            xtype: 'gridpanel',
            title: 'Modems',
            itemId:'grid',
            columns: [
                {
                    xtype : 'gridcolumn',            
                    header : 'Descripcion',
            		dataIndex : 'sms_cdescripcion',
                    flex: 1
        		},{
                    xtype : 'gridcolumn',            
                    header : 'Estado',
                    dataIndex : 'estado_string',
                    flex: 1
                }
            ]
        }*/
        ,{
            xtype:'fieldset',
            itemId:'tgm_configcontainer',
            padding: '5 5 5 5',
            hidden:true,
            items:[]
            
        }
    ],

	initComponent : function() {
		
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            itemId: 'paging',
            displayInfo: true
        });
        
       
        this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save',
                    formBind: true
                }
            ]// cierro items
         }); 
         //this.down('#grid').addDocked(pagingtoolbar);
         
         this.addDocked(toolbar);
	} // cierro init
});