Ext.define('SmartTrack.view.CheckPointsFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.checkpointsformview'],
    preventHeader: true,
    autoScroll: true,
    //frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
	},
	items : [
        {
            xtype: 'combo',
            itemId: 'chktipo',
            fieldLabel: 'Tipo',
            name : '_chp_nTipoCombo',
            store: [
                ['0',getLocale('Qr code')],
                ['1',getLocale('Bluetooth')],
                ['2',getLocale('Manual')],
                ['3',getLocale('NFC')],
                ['4',getLocale('Tag')]
            ],
            queryMode: 'local',
            value: ''
        },
        {
			xtype : 'textfield',
			name : 'chp_cReference',
            fieldLabel: 'Referencia',
            itemId: 'referencia',
			//allowBlank : false, no puede ser requerida
            maxLength: 100,
            anchor: '100%',
            hidden:true
		},{
            xtype: 'button',
            action: 'Qr code',
            text: 'Abrir Qr code',
            itemId: 'btnqr',
            hidden:true
        },{
    		xtype : 'textfield',
			name : 'chp_cZona',
            fieldLabel: 'Zona',
            hidden:true
		},{
            xtype: 'fieldset',
            collapsed: false,
            collapsible: false,
            title: getLocale('Posicion'),
            layout: 'fit',
            items: [
                {
                    xtype: 'button',
                    action: 'map',
                    text: 'Abrir mapa',
                    margin: '0 0 5 0'
                },{
                    xtype : 'textfield',
        			name : 'chp_rLatitud',
                    validator: function(value){
                        var valor = parseInt(value);
                        if (valor > 90 || valor < -90){
                            return getLocale('Latitud inválida');
                        } else {
                            return true;
                        }
                    },
                    fieldLabel: 'Latitud',
                    itemId: 'latitud'
        		},{
                	xtype : 'textfield',
        			name : 'chp_rLongitud',
                    validator: function(value){
                        var valor = parseInt(value);
                        if (valor > 180 || valor < -180){
                            return getLocale('Longitud inválida');
                        } else {
                            return true;
                        }
                    },
                    fieldLabel: 'Longitud',
                    itemId: 'longitud'
        		},{
                    xtype: 'numberfield',
                    name: 'chp_iTolerancia',
                    itemId: 'chp_iTolerancia',
                    fieldLabel: 'Tolerancia (mts)',
                    //value: 10,
                    //maxValue: 99,
                    //minValue: 10,
                    validator: function(value){
                        var checkbox = this.up('form').down('#novalidadposicion');
                        if(checkbox.getValue()==false){
                            if(value<10)
                                return getLocale('El minimo valor de tolerancia es 10');
                            if(value>99)
                                return getLocale('El maximo valor de tolerancia es 99');
                        }
                        return true;
                    }
                },{
                    xtype:'checkboxfield',
                    boxLabel  : 'No validar posición de arribo',
                    itemId:'novalidadposicion'
                }
     
            ]
        },{
            xtype : 'textfield',
    		name : 'chp_rLongitud',
            fieldLabel: 'Nombre',
            itemId: 'descripcion',
            allowBlank: false,
            anchor: '100%'
		},{
            xtype : 'textarea',
			name : 'chp_rLongitud',
            fieldLabel: 'Observacion',
            itemId: 'observacion',
            anchor: '100%'
		},{
            xtype : 'textfield',
            name : 'chp_cURL',
            fieldLabel : 'Formulario',
            itemId : 'chp_cURL',
            anchor : '100%'
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
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});