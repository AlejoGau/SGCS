Ext.define('Trackguard.view.GeocercasProgramadasGeocercasHelperView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.geocercasprogramadasgeocercashelperview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    items : [
        {
            xtype: 'gridpanel',
            itemId:'gridcheckpoints',
            selModel: Ext.create('Ext.selection.CheckboxModel'), 
            height: 350,
            columns: [
                {
                    xtype : 'gridcolumn',            
                    header : 'Nombre',
                    dataIndex : 'Name',
                    flex: 1
            	},{
                    xtype : 'gridcolumn',            
                    header : 'Razon social',
            		dataIndex : 'lin_crazonsocial',
                    flex: 1
        		}
            ],
            margin:'0 0 10 0'
            
        },{
        	xtype : 'numberfield',
			name : '',
            fieldLabel: 'Tolerancia previa',
            itemId: 'toleranciapre',			            
            anchor: '100%'
		},{
        	xtype : 'numberfield',
			name : '',
            fieldLabel: 'Tolerancia posterior',
            itemId: 'toleranciapost',			            
            anchor: '100%'
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