//MIGRADO2024
Ext.define('Common.view.VCReadOnlyView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.vcreadonlyview'],
    title : 'Vigicontrol',
    preventHeader: true,
    layout: 'anchor',
    autoScroll: true,    
    fieldDefaults : {
        labelWidth : 120,
        anchor : '100%',
    	labelAlign: 'left'					
	},
    bodyPadding :0,
     
   
	items : [
        {
    			xtype: 'container',
    			title: '',
    			layout: {
                        
                    type: 'vbox',
                    align: 'stretch',
                    anchor: '100%'
                },
                defaults: {
                    labelStyle : "color:#FFFFFF;background-color:#003366;padding:3"
            	},
    			items: [
                    {
                        xtype : 'displayfield',
                        name : 'Telefono',
            			fieldLabel : 'Telefono',
                        width:100
            		},{
                        xtype : 'displayfield',
                        name : 'Imei',
                		fieldLabel : 'Imei',
                        width:100
            		},{
                        xtype : 'displayfield',
                        name : 'Modelo',
                		fieldLabel : 'Modelo',
                        width:100
            		},{
                        xtype : 'displayfield',
                        name : 'Marca',
                		fieldLabel : 'Marca',
                        width:100
            		},{
                        xtype : 'displayfield',
                        name : 'Version',
                		fieldLabel : 'Version',
                        width:100
            		},{
                        xtype : 'displayfield',
                        name : 'Tipo',
                		fieldLabel : 'Tipo',
                        width:100
            		},{
                        xtype : 'displayfield',
                        name : 'cue_cnombre',
                    	fieldLabel : 'Nombre de cuenta',
                        width:100
            		},{
                        xtype : 'displayfield',
                        name : 'Nombre',
                    	fieldLabel : 'Usuario',
                        width:100
            		}
                ]
        }
        
    ],
	initComponent : function() {
		this.callParent();
       
	} // cierro init
});