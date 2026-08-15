//MIGRADO2024
Ext.define('Common.view.SoftguardHorarioFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.horarioformview',
    preventHeader: true,
    frame : true,
	fieldDefaults : {
		labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [{
            xtype : 'combobox',
			fieldLabel: 'Dia Apertura',
            store: 'TablaDiasStore',     
			displayField: 'Name',	
            emptyText: getLocale('Seleccione'),
			valueField: 'Value',
            name: 'diaApertura',
            allowBlank : false,
            queryMode: 'local',
            itemId:'diaapertura'
		},{
            xtype : 'timefield',
    		fieldLabel : 'Hora Apertura',
			name : 'tiempoApertura',
            format: 'H:i',
			allowBlank : false
		},{
            xtype : 'combobox',
    		fieldLabel: 'Dia Cierre',
            store: 'TablaDiasStore',     
			displayField: 'Name',	
            emptyText: getLocale('Seleccione'),
			valueField: 'Value',
            allowBlank : false,
            name: 'diaCierre',
            queryMode: 'local',
            itemId:'diacierre'
		},{
            xtype : 'timefield',
        	fieldLabel : 'Hora Cierre',
            format: 'H:i',
			name : 'tiempoCierre',
			allowBlank : false
		}],
	buttons : [{
			text : 'Aceptar',
            action: 'save',
            itemId: 'save'
		}, {
			text : 'Cancelar',
            action: 'cancel'
		}],
	initComponent : function() {
		this.callParent(arguments);
	} // cierro init
});