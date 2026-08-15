Ext.define('AdministratorSearch.view.TablasMovilesPatrullaFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasmovilespatrullaformview'],
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
			xtype : 'textfield',
			name : 'tmp_cnombre',
            fieldLabel: 'Nombre',
			allowBlank : false,
            maxLength: 50,
            anchor:'100%',
            itemId:'nombrepatrulla'
		},{
    		xtype : 'checkbox',
			name : '_sertec',
            itemId: 'sertec',
            fieldLabel: 'Servicio técnico',
            anchor:'100%',
            hidden:true
		},{
            xtype : 'displayfield',
			name : 'tmp_cnumero',
            itemId: 'cnumero',
            fieldLabel: 'Número'
		}/*,{
        	xtype : 'hiddenfield',
			name : 'tmp_cnumero',
            fieldLabel: 'Numero',
            maxLength: 50,
            inputWidth:100
		}*/,{
    		xtype : 'textfield',
			name : 'tmp_clicencia',
            fieldLabel: 'Matrícula',
            maxLength: 50,
            anchor:'100%'
		},{
        	xtype : 'textfield',
			name : 'tmp_cmarca',
            fieldLabel: 'Marca',
            maxLength: 50,
            anchor:'100%'
		},{
        	xtype : 'textfield',
			name : 'tmp_cmodelo',
            fieldLabel: 'Modelo',
            maxLength: 50,
            anchor:'100%'
		},{
        	xtype : 'textfield',
			name : 'tmp_cpathfoto',
            fieldLabel: 'Foto',
            hidden: true,
            maxLength: 60,
		},{
            xtype : 'combo',
            fieldLabel : 'Flota',
            itemId: 'comboflota',
    		name : 'tmp_cflota',
            emptyText: getLocale('Seleccione una flota'),
            forceSelection: true,
        	allowBlank : false,
            displayField : 'flo_cdescripcion',
    		valueField : 'flo_ccodigo',
            
            anchor:'100%',
            lastQuery: ''
		},{
            xtype : 'combo',
            fieldLabel : 'Estado',
            itemId: 'estadoSertec',
			name : 'tmp_nestado',
            emptyText: getLocale('Seleccione un estado'),
            forceSelection: true,
            store: [
                [1,getLocale('Disponible listado')],
                [2,getLocale('Fuera de servicio')]
            ],
            anchor:'100%'
		},{
            xtype : 'displayfield',
            fieldLabel: 'Estado',
            itemId: 'estadodisplay',
            hidden: true,
		},
        {
            xtype: 'fieldset',
            layout: 'vbox',
            title: 'Cuenta',
            layout: {
                 type: 'vbox',
                align: 'stretch',
                flex:1
            },
            items: [
                {
            
                    xtype : 'combo',
                	fieldLabel : '',
                    itemId: 'cuenta',
        			name : 'tmp_icuenta',
        			displayField : '_fullname',
        			valueField : 'Id',
                    anchor:'100%',
                    emptyText: getLocale('Seleccione una cuenta'),
                    forceSelection: true,
            		allowBlank : false,
                    lastQuery: ''
        			
        		},{
                    xtype: 'container',
                    layout:'hbox',
                    margin:'0 0 5 0',
                    items:[
                        {
                            xtype : 'textfield',
                        	name : 'cuenta',
                            itemId:'cuentanumero',
                            fieldLabel: 'Cuenta',
                            hidden: true,
                            maxLength: 4,
                            
                            margin:'0 5 0 0',
                            validator: function(value){
                                var view = this.up('tablasmovilespatrullaformview');
                                var form = this.up('form').getForm();
                                var cuenta = form.findField('tmp_icuenta');
                                var t = this;
                                if(cuenta.getValue() == -1) {                            
                                    
                                    if (!value){
                                        return 'Debe ingresar un numero de cuenta.';
                                    } else {
                                        
                                        var filters = [{
                                            property : 'cue_clinea',
                                            value : '_MP'
                                        },{
                                            property : 'cue_ncuenta',
                                            value : value
                                        }];      
                                
                                        var model = 'AdministratorSearch.model.CuentaSearchModel';
                                
                                        var store =Ext.create('Ext.data.Store',{
                                            model: model,
                                            pageSize: 50,
                                            remoteSort: true,
                                            remoteFilter: true,
                                            filters: filters,
                                            autoload: false
                                        })
                                        
                                        if(!view.validandoCuenta || view.validandoCuenta < 0) {
                                            view.validandoCuenta = 0;
                                        }
                                        
                                        view.validandoCuenta++
                                        if(view.down('#evaluando')) {
                                            view.down('#evaluando').show()
                                        }
                                        
                                        store.load({callback: function (records, operation, success) {
                                        
                                        if (records.length > 0){
                                                
                                                t.markInvalid('El codigo ya existe');
                                                t.textValid = false;
                                                view.down('#save').setDisabled(true);
                                            } else {
                                                t.clearInvalid();
                                                t.textValid = true;
                                            }   
                                            view.validandoCuenta--
                                            
                                            if(view.validandoCuenta <= 0) {
                                                if(view.down('#evaluando')) {
                                                    view.down('#evaluando').hide()
                                                }
                                            }
                                            
                                        }})
                                        
                                        t.clearInvalid();
                                        return true;
                                    }
                                } else {
                                     t.clearInvalid();
                                     return true;
                                }
                            }
                		},{
                    	    xtype:'displayfield',
                            itemId:'evaluando',
                            value:getLocale('Evaluando cuenta'),
                            hidden:true
                		}
                        ]
        		},
                {
                    xtype : 'textfield',
        			name : '',
                    fieldLabel: 'Telefono',
                    itemId: 'telefonocuenta'
        		},{
                    xtype : 'textfield',
            		name : '',
                    fieldLabel: 'cue_cIMEI',
                    itemId: 'cue_cIMEI'
        		},{
                    xtype : 'textfield',
            		name : '',
                    fieldLabel: 'Email',
                    itemId: 'emailcuenta',
                    vtype: 'email'
        		}
            ]
        }
    
    ],

	initComponent : function() {
        
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save',
                    itemId:'save',
                    formBind: true
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});