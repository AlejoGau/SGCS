//MIGRADO2024
Ext.define('Common.view.SoftguardZonaFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.zonaformview',
    preventHeader: true,
    frame : true,
    fieldDefaults : {
		labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [
        {
            xtype: 'fieldset',
            title: 'Configuración',
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Tipo',
                    itemId: '_tipo',
                    //store: 'SoftguardZonatipoStore',
                    displayField: 'Name',    							
                    valueField: 'Value',
                    multiSelect: false,
                    queryMode: 'local'
                },
                {
                    xtype : 'textfield',
                    fieldLabel : 'Código',
                    itemId: 'codigo',
                    name : 'zon_ccodigo',
                    allowBlank : false,
                    validator: function(value){
                        var field = this;
                        var view = this.up('zonaformview');
                        var record = view.record;
                        
                        //si es int lo vuelvo a setear por si tiene un 0 a la izq
                        //if(value % 1 === 0) {
                        //    if(parseInt(value)) {
                        //       this.setValue(parseInt(value))
                        //    }
                        //}
                        var mystore =Ext.create('Ext.data.Store',{
                            model: 'Common.model.ZonaSearchModel',
                            remoteFilter: true,
                            pageSize: 250,
                            remoteSort: true,
                            sorters:{
                                    property: 'zon_ccodigo',
                                    direction: 'ASC'
                                },
                            filters: [
                                {
                                    property: 'zon_ccodigo',
                                    value: value
                                },
                                {
                                    property: 'zon_iidcuenta',
                                    value: record.get('zon_iidcuenta')
                                }
                            ]
                        });
                        mystore.load({callback: function(records){
                            if(records) {
                                if (records.length>0 && records[0].get('Id')!=record.get('Id')){
                                    field.markInvalid(getLocale("El código de zona existe para la cuenta."))
                                }
                            }
                            mystore.destroy();                            
                        }});
                        
                        return true;
                    }
                },{
                    xtype : 'numberfield',
                    fieldLabel : 'LNK',
                    itemId: 'particion',
                    name : 'particion',           
                    minValue: 1,
                    maxValue: 9999,
                },{
                    xtype : 'textfield',
                    fieldLabel : 'Descripción',
                    name : 'zon_cdescripcion',
                    allowBlank : false
                },{
                    xtype : 'textarea',
                    fieldLabel : 'Observación',
                    name : 'zon_mobservacion',
                    allowBlank : true
                },{
                    xtype: 'container',
                    itemId: 'normal',
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'combo',                                        
                            store: 'TablaCodigosAlarmasStore',
                            itemId: 'codigoAlarma',
                            fieldLabel : 'Código alarma',
                            displayField: 'Descripcion',								
                            valueField: 'cod_ccodigo',
                            name: 'zon_codigoalarma',
                            anchor: '100%',
                            queryMode: 'local'
                        },{
                            xtype: 'combo',    
                            fieldLabel : 'Lista emergencia',
                        //	store: 'TablaListasEmergenciaStore',					
                            displayField: 'Descripcion',								
                            valueField: 'Codigo',
                            name: 'zon_clistaemergencia',
                            anchor: '100%',
                            queryMode: 'local',
                            itemId: 'listaEmergencia'
                        },/*{
                            xtype : 'numberfield',
                            fieldLabel : 'Alarma a generar',
                            anchor: '100%',
                            name : 'zon_nminutosrestauracion',
                            itemId: 'minutosRestauracion'
                        },*/
                        {
                            xtype : 'combo',
                            fieldLabel : 'Abrir foto',
                            store : 'SiNoStore',
                            displayField : 'Name',
                            queryMode: 'local',
                            forceSelection: true,
                            editable: false,
                            valueField : 'Value',
                            name : "zon_nmostrar",
                            itemId: 'mostrarfoto',
                            hidden: true
                        }
                    ]
                },{
                    xtype: 'container',
                    itemId: 'dealerBox',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype : 'combo',
                            fieldLabel : 'Dealer',
                            itemId: 'dealer',
                            name : 'zon_cdealer',
                            //store : 'TablaLineasStore',
                            displayField : 'lin_crazonsocial',
                            valueField : 'lin_ccodigo',
                            queryMode: 'local'
                        },{   
                            xtype: 'hiddenfield',
                            name : 'zon_ccuenta',
                            itemId: 'cuenta',
                            fieldLabel : 'Cuenta'
                        },{   
                            xtype: 'displayfield',
                            name : 'nombreCuenta',
                            itemId: 'cuentaNombre',
                            fieldLabel : 'Cuenta'
                        },
                        {
                            xtype: 'button',
                            action: 'cambiarCuenta',
                            text: 'Cambiar cuenta asociada',
                            margin: '0 0 5 0'
                        }/*,{
                            xtype: 'cuentahelperview',
                            flex: 1
                        }*/
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Control de Restauración',
            itemId: 'especial',
            items: [
                {
                    xtype: 'combo',                   
                    fieldLabel : 'Código restauración',
                    store: 'SoftguardAlarmasRestauracionStore',
                    itemId: 'codigoRestauracion',
                    displayField: 'Descripcion',								
                    valueField: 'cod_ccodigo',
                    anchor: '100%',
                    name: 'zon_ccodigorestauracion',
                    queryMode: 'local'
                },{
                    xtype : 'numberfield',
                    fieldLabel : 'Minutos restauración',
                    anchor: '100%',
                    name : 'zon_nminutosrestauracion',
                    itemId: 'minutosRestauracion'
                },{
                    xtype: 'combo',                                        
                    store: 'TablaCodigosAlarmasStore',
                    itemId: 'alarmageneral',
                    fieldLabel : 'Alarma Genera',
                    displayField: 'Descripcion',								
                    valueField: 'cod_ccodigo',
                    name: 'zon_cAlarmaAGenerar',
                    anchor: '100%',
                    queryMode: 'local'
                },{
                    xtype : 'combo',
                    fieldLabel : 'Autoprocesa',
                    store : 'SiNoStore',
                    displayField : 'Name',
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    valueField : 'Value',
                    name : 'zon_nautoprocesa',
                    itemId: 'autoprocesar',
                    hidden: true
                }
            ]
        }
    ],
	buttons : [{
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
	} // cierro init
});
/***
 *                             __     _ _                 _                     
 *      ______ _ _  __ _   __ /_/  __| (_)__ _ ___   __ _| |__ _ _ _ _ __  __ _ 
 *     |_ / _ \ ' \/ _` | / _/ _ \/ _` | / _` / _ \ / _` | / _` | '_| '  \/ _` |
 *     /__\___/_||_\__,_| \__\___/\__,_|_\__, \___/ \__,_|_\__,_|_| |_|_|_\__,_|
 *                                       |___/                                  
 */
Ext.define('Common'+'.view.ZonaCodigoAlarma', {
    extend : 'Common.view.SoftguardZonaFormView',
    alias : 'widget.zonacodigoalarma',
    preventHeader: true,
    frame : true,
    fieldDefaults : {
		labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [
        {
            xtype: 'fieldset',
            title: 'Configuración de la alarma',
            items: [
         {   
            xtype: 'combobox',
            fieldLabel: 'Tipo',
            itemId: '_tipo',
            //store: 'SoftguardZonatipoStore',
            displayField: 'Name',    							
			valueField: 'Value',
            multiSelect: false,
            queryMode: 'local',
            value: 'Normal',
            hidden: true
        },
        
        {
            xtype : 'textfield',
    		fieldLabel : 'Formato',
            itemId: 'codigo',
			name : 'zon_ccodigo',
			allowBlank : false,
            validator: function(value){
                var field = this;
                var view = this.up('zonaformview');
                var record = view.record;
                
                //si es int lo vuelvo a setear por si tiene un 0 a la izq
                if(value % 1 === 0) {
                    if(parseInt(value)) {
                        this.setValue(parseInt(value))
                	}
                }
                var mystore =Ext.create('Ext.data.Store',{
                    model: 'Common.model.ZonaSearchModel',
                    remoteFilter: true,
                    pageSize: 250,
                    remoteSort: true,
                    sorters:{
                            property: 'zon_ccodigo',
                            direction: 'ASC'
                        },
                    filters: [
                        {
                            property: 'zon_ccodigo',
                            value: value
                        },
                        {
                            property: 'zon_iidcuenta',
                            value: record.get('zon_iidcuenta')
                        }
                    ]
                });
                mystore.load({callback: function(records){
                    if(records) {
                        if (records.length>0 && records[0].get('Id')!=record.get('Id')){
                            field.markInvalid(getLocale("El código de zona existe para la cuenta."))
                        }
                    }
                    mystore.destroy();                    
                }});
                
                return true;
            }
		},{
            xtype : 'numberfield',
        	fieldLabel : 'LNK',
            itemId: 'particion',
			name : 'particion',           
            minValue: 1,
            maxValue: 9999,
            hidden: true
		},{
            xtype : 'textfield',
    		fieldLabel : 'Descripción',
			name : 'zon_cdescripcion',
    		allowBlank : false
		},{
            xtype : 'textarea',
        	fieldLabel : 'Observación',
			name : 'zon_mobservacion',
    		allowBlank : true
		},{
            xtype: 'container',
            itemId: 'normal',
            layout: 'anchor',
            items: [
                {
                    xtype: 'combo',                                        
            		store: 'TablaCodigosAlarmasStore',
                    itemId: 'codigoAlarma',
                    fieldLabel : 'Código alarma',
        			displayField: 'Descripcion',								
        			valueField: 'cod_ccodigo',
                    name: 'zon_codigoalarma',
                    anchor: '100%',
                    queryMode: 'local'
                },{
                    xtype: 'combo',    
                    fieldLabel : 'Lista emergencia',
        		//	store: 'TablaListasEmergenciaStore',					
        			displayField: 'Descripcion',								
        			valueField: 'Codigo',
                    name: 'zon_clistaemergencia',
                    anchor: '100%',
                    queryMode: 'local',
                    itemId: 'listaEmergencia',
                    hidden: true
                },/*{
                    xtype : 'numberfield',
                    fieldLabel : 'Alarma a generar',
                    anchor: '100%',
        			name : 'zon_nminutosrestauracion',
                    itemId: 'minutosRestauracion'
                },*/
                
                
            ]
        },{
            xtype: 'container',
            itemId: 'dealerBox',
            hidden: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                 {
                	xtype : 'combo',
        			fieldLabel : 'Dealer',
                    itemId: 'dealer',
        			name : 'zon_cdealer',
        			//store : 'TablaLineasStore',
        			displayField : 'lin_crazonsocial',
        			valueField : 'lin_ccodigo',
                    queryMode: 'local'
        	    },{   
                    xtype: 'hiddenfield',
                    name : 'zon_ccuenta',
                    itemId: 'cuenta',
                    fieldLabel : 'Cuenta'
                },{   
                    xtype: 'displayfield',
                    name : 'nombreCuenta',
                    itemId: 'cuentaNombre',
                    fieldLabel : 'Cuenta'
                },
                {
                    xtype: 'button',
                    action: 'cambiarCuenta',
                    text: 'Cambiar cuenta asociada',
                    margin: '0 0 5 0'
                }/*,{
                    xtype: 'cuentahelperview',
                    flex: 1
                }*/
                
            ]
        },
        // Input que muestra la opcion para elegir foto o no
        {
            xtype : 'combo',
            fieldLabel : 'Mostrar foto de zona',
            store : 'SiNoStore',
            displayField : 'Name',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
            valueField : 'Value',
            name : "zon_nmostrar",
            itemId: 'mostrarfoto',
            hidden: true
        }
            
        ]}
            /*
            ,{
                xtype: 'fieldset',
                title: 'Control de Restauración',
                hidden: true,
                itemId: 'especial',
                items: [
                    {
                        xtype: 'combo',                   
                        fieldLabel : 'Código restauración',
                        store: 'SoftguardAlarmasRestauracionStore',
                    	itemId: 'codigoRestauracion',
            			displayField: 'Descripcion',								
            			valueField: 'cod_ccodigo',
                        anchor: '100%',
                        name: 'zon_ccodigorestauracion',
                        queryMode: 'local'
                    },{
                        xtype : 'numberfield',
                        fieldLabel : 'Minutos restauración',
                        anchor: '100%',
            			name : 'zon_nminutosrestauracion',
                        itemId: 'minutosRestauracion'
                    },{
                        xtype: 'combo',                                        
                        store: 'TablaCodigosAlarmasStore',
                        itemId: 'alarmageneral',
                        fieldLabel : 'Alarma Genera',
            			displayField: 'Descripcion',								
            			valueField: 'cod_ccodigo',
                        name: 'zon_cAlarmaAGenerar',
                        anchor: '100%',
                        queryMode: 'local'
                    },{
                        xtype : 'combo',
                    	fieldLabel : 'Autoprocesa',
            			store : 'SiNoStore',
                        displayField : 'Name',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
            			valueField : 'Value',
            			name : 'zon_nautoprocesa',
                        itemId: 'autoprocesar',
                        hidden: true
            		}
            ]}
            */
    ],
	buttons : [{
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
	} // cierro init
});