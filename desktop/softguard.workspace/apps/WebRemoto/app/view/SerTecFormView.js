Ext.define('WebRemoto.view.SerTecFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.sertecformview'],
    preventHeader: true,
    frame : true,
    fieldDefaults : {
        labelAlign : 'left',
    	labelWidth : 120,
		anchor : '100%'
	},
	items : [
        {
            xtype: 'container',
            layout: 'hbox',
            margin : '0 0 5 0',
            items: [
                {
                   
                    xtype : 'combo',
                    fieldLabel : 'Tipo de servicio',                    
                    queryMode: 'local',
                    forceSelection: true,
                    allowBlank: true,
                    editable: false,
                    store: 'tip_ntipoStore',                            
                    itemId: "tiposervicio",
                  //  width:'49%',
                  flex:1,
                    valueField : 'Value',
                    displayField : 'Name',
                    name : "tip_ntipo"
            	},{
                   
                    xtype : 'combo',
            		fieldLabel : 'Servicio',
                    displayField : 'tip_cdescripcion',
                    queryMode: 'local',
                    forceSelection: true,
                    allowBlank: false,
                    editable: false,
                    labelAlign: 'right',
        			valueField : 'tip_ccodigo',
        			name : "stc_ctipo_servicio",
                    itemId: "servicio",
                    //  width:'49%',
                  flex:1,
                    margin: '0 0 0 10'
        		}
            ]
        },{
                               
            xtype : 'combo',
            fieldLabel : 'Contacto',
            displayField : 'tel_cnombre',
            queryMode: 'local',
            forceSelection: false,
            allowBlank: true,
            editable: true,
            valueField : 'tel_cnombre',
    		name : "stc_ccontacto",
            itemId: "contacto",
            width:'33%'
		}
       /* {
           
            xtype : 'combo',
    		fieldLabel : 'Tipo servicio',
            displayField : 'tip_cdescripcion',
            queryMode: 'local',
            forceSelection: true,
            allowBlank: false,
            editable: false,
			valueField : 'tip_ccodigo',
			name : "stc_ctipo_servicio",
            itemId: "tiposervicio"
		}*/,{

			xtype: 'textarea',
			fieldLabel: 'Observaciones',
			name : 'stc_mobservaciones',
		}
 
        
        ],
	buttons : [{
			text : 'Guardar',
            action: 'save',
            itemId: 'save',
            disabled: false
		}],

	initComponent : function() {
		this.callParent(arguments);
	} // cierro init

});
