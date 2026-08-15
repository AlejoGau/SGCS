//MIGRADO2024
Ext.define('Common.view.SoftguardMedicoFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.medicoformview',
    preventHeader: true,
    frame : true,
	fieldDefaults : {
		labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [{
			xtype : 'textfield',
			fieldLabel : 'Protegido',
			name : 'mnf_cprotegido',
            allowBlank: false
		},{
            xtype : 'textfield',
            fieldLabel : 'Asociado',
			name : 'mnf_casociado'
		},{
            xtype : 'combo',
    		fieldLabel : 'Médico',
			store : 'ComboMedicosStore',
			displayField : 'med_cnombre',
			valueField : 'med_ccodigo',
            editable : false,
			name : 'mnf_cdoctor',
            queryMode: 'local'
		},{
            xtype : 'combo',
        	fieldLabel : 'Seguro medico',
			store : 'ComboObrasSocialesStore',
			displayField : 'med_cnombre',
			valueField : 'med_ccodigo',
            editable : false,
			name : 'mnf_cobrasocial',
            queryMode: 'local'
		},{
            xtype : 'combobox',
			fieldLabel: 'Género',
            store: 'Common.store.SoftguardGeneroStore',  
            editable : false,
            emptyText : 'M ó F',
			displayField: 'Name',								
			valueField: 'Value',
            name: 'mnf_nsexo',
            queryMode: 'local'
		}, {
			xtype : 'combo',
			fieldLabel : 'Discapacitado',
			store : 'SiNoStore',
			displayField : 'Name',
            editable : false,
			valueField : 'Value',
			name : 'mnf_ndiscapacitado',
            queryMode: 'local'
		}, {
    		xtype : 'combo',
			fieldLabel : 'Ambulacia',
			store : 'SiNoStore',
			displayField : 'Name',
            editable : false,
			valueField : 'Value',
			name : 'mnf_nambulancia',
            queryMode: 'local'
		}, {
        	xtype : 'combo',
			fieldLabel : 'Vive solo',
			store : 'SiNoStore',
            editable : false,
			displayField : 'Name',
			valueField : 'Value',
			name : 'mnf_nvivesolo',
            queryMode: 'local'
		},
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                	xtype : 'datefield',
        			fieldLabel : 'Fecha nacimiento',
                    itemId: 'fechaAlta',
        			name : "mnf_dfechanacimiento",
                    flex: 2
        		},{
                    xtype : 'displayfield',
                	fieldLabel : 'Edad',
                    labelWidth: 50,
        			name : 'mnf_nedad',
                    margin: '0 0 0 5',
                    flex: 1
        		}
            ]
        },{
            xtype : 'textareafield',
    		fieldLabel : 'Observaciones',
			name : 'mnf_tobservaciones'
		}],
	buttons : [{
			text : 'Guardar',
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