Ext.define('WebRemoto.view.ServTecMRWFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.sertecmwrformview'],
    preventHeader: true,
    frame : true,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 150,
    	anchor : '100%'
	},
    autoScroll: true,
	items : [
         {
            xtype: 'container',
            layout: 'hbox',
            margin : '0 0 10 0',
            
            width:'100%',
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
                    width:'49%',
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
                    width:'49%',
                    margin: '0 0 0 10'
        		}
            ]
        },{
            xtype:'container',
            width:'100%',
            items: [
                {
                    xtype:'displayfield',
                    value: 'Observacion'
                },
                {
                    xtype:'textarea',
                    name: 'stc_mobservaciones',
            		fieldLabel: '',
        			 width:'100%',  
                    margin:'0 10 10 0',
                	allowBlank : false
                    
                },{
                    xtype:'datefield',
                    itemId:'fecha',
            		fieldLabel: 'Fecha',          
            		allowBlank : false
                    
                },{            
                    xtype : 'displayfield',
                    name : 'stc_yValor',
                    fieldLabel: 'Valor',
                    allowDecimals:true,
                    alwaysDisplayDecimals: true,
                    hideTrigger: true,
                    anchor:'100%',
                    itemId: 'precio'
            	}]
        }
        ],


	initComponent : function() {
		this.callParent(arguments);
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                 {
            		text : 'Guardar',
                    action: 'save',
                    itemId: 'save',
                    iconCls:'icon-disk',
                    disabled: false
        		}
            ]// cierro items
         }); 

         this.addDocked(toolbar);
         
	} // cierro init

});
