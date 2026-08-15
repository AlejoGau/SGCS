//MIGRADO2024
Ext.define('Common.view.HorarioExcepcionFormView', {
	extend : 'Ext.form.Panel',
    alias : 'widget.horarioexcepcionformview',
    preventHeader: true,
    frame : true,
    fieldDefaults : {
		labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [
		
		{
			xtype: 'combo',    
			fieldLabel: 'Feriado',
			store: 'TablaEventosFeriadosStore',
			name: 'exc_cevento',
			itemId: 'exc_cevento',
			allowBlank: false,
			forceSelection: true,
			displayField: 'Descripcion',
			valueField: 'Codigo'	
		},{
        	xtype : 'timefield',
			name : 'exc_cHoraApertura',
			itemId:'exc_cHoraApertura',
            fieldLabel: 'Hora desde',
            minValue: '00:00',
            maxValue: '23:59',
            increment: 30,
            inputWidth :200,
            format: 'H:i',
            submitFormat : 'H:i'
            
		},{
        	xtype : 'timefield',
			name : 'exc_cHoraCierre',
			itemId:'exc_cHoraCierre',
            fieldLabel: 'Hora hasta',
            minValue: '00:00',
            maxValue: '23:59',
            format: 'H:i',
            submitFormat : 'H:i',
            increment: 30,      
            inputWidth :200
		}
	],
	buttons : [{
			text : 'Aceptar',
            action: 'save'
		}, {
			text : 'Cancelar',
            action: 'cancel'
		}],

	initComponent : function() {
        //this.addEvents('objectchanged');
		this.callParent(arguments);
	} // cierro init

});
