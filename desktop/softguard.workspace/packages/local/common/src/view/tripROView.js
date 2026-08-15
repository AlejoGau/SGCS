//MIGRADO2024
Ext.define('Common.view.tripROView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.triproview'],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    showtoolbar: true,
    autoScroll: true,    
    fieldDefaults : {
        labelWidth : 80,
        anchor : '100%',
    	labelAlign: 'left'					
	},
	items : [
        {
            xtype: 'fieldset',
            title: 'Datos del viaje',
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Identificador',
                    itemId: 'name',
                    name : 'tgv_nombre'
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Número',
                    itemId: 'codigoexterno',
                    name : 'tgv_codigoexterno'
                }
            ]
        },{
            xtype: 'fieldset',
            title: 'Inicio',
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel : 'Nombre',
                    itemId: 'geoFenceStart',
                    name : 'tgv_lugar_inicio'
                },{
                    
                    xtype : 'displayfield',
                    fieldLabel : 'Programa',
                    name : "tgv_fecha_prg_inicio",
                    itemId : 'fechaprgdesde',
                    renderer: function(value, field){
                        return Ext.Date.format(value, ' Y/m/d H:i:s');
                    }
                    
                }
            ]
        }
        ,{
            xtype: 'fieldset',
            title: 'Fin',
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel : 'Nombre',
                    itemId: 'geoFenceFin',
                    name : 'tgv_lugar_fin'
                },{
                    
                    xtype : 'displayfield',
                    fieldLabel : 'Programa',
                    name : "tgv_fecha_prg_fin",
                    renderer: function(value, field){
                        return Ext.Date.format(value, ' Y/m/d H:i:s');
                    },
                    itemId : 'fechaprghasta'
                }
            ]
        }
        ,{
            xtype: 'fieldset',
            title: 'Fechas',
            items: [ 
                {
                    xtype : 'displayfield',
                    fieldLabel : 'Inicio',
                    name : "tgv_fechainicio",
                    renderer: function(value, field){
                        return Ext.Date.format(value, ' Y/m/d H:i:s');
                    },
                    itemId : 'fechadesde'
                },{
                    xtype : 'displayfield',
                    fieldLabel : 'Fin',
                    itemId : 'fechahasta',
                    renderer: function(value, field){
                        return Ext.Date.format(value, ' Y/m/d H:i:s');
                    },
                    name : "tgv_fechafin"
                }
            ]
        },{
            xtype: 'displayfield',
            fieldLabel : 'Responsable',
            itemId: 'responsable',
            name : 'usu_cnombre',
            margin : '0 0 15 10',
            allowBlank : false
        }
    ],
	initComponent : function() {
		this.callParent();
	} // cierro init
});