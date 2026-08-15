Ext.define('SmartTrack.view.RestriccionesFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.restriccionesformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    autoScroll: true,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    items : [
        {
    		xtype: 'textfield',
			name: 'vcr_name',
			fieldLabel: 'Nombre',
			flex: 1	,
            allowBlank : false		
		},{
    	    xtype:'container',
            layout:'hbox',
    		flex: 1,
            margin:'0 0 5 0',
            items:[{
                xtype: 'textfield',
    			name: 'vcr_distance',
    			fieldLabel: 'Distancia',
                allowBlank : false
    		},{
                xtype:'box',
                html:getLocale('mts')
    		}]
		},{
            xtype: 'combo',    
            itemId:'vcr_status',    	
            fieldLabel: 'Estado',            
            flex: 1,
            store:[[0,getLocale('Desactivados')], [1,getLocale('Activo')]],
            
            
        },{
            xtype:'selecterfield',
            itemId:'smarttrack',
            config: {
                disponible: {
                    title:'Vigicontrol',
                    field:'Nombre',
                    searchField: 'Nombre'
                },
                selecionado: {
                    title:'Vigicontrol',
                    field:'Nombre'
                },
                valueField:'Id',
                valueFieldFilter:':ININT',
                modelItems: 'SmartTrack.model.SmartTrackSearchModel'
                    
            },
            title:'Vigicontrol'
        
        },
        
        
        
        
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
                    itemId: 'save',
                    formBind: true
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});