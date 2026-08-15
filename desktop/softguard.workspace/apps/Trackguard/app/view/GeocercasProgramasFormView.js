Ext.define('Trackguard.view.GeocercasProgramasFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.geocercasprogramadasformview'],
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
			name: 'Name',
			fieldLabel: 'Nombre',
			flex: 1,
    		allowBlank : false
			
		},{
			xtype: 'datefield',
			name: 'datestart',
			fieldLabel: 'Fecha inicio',
			format: 'd/m/Y',
            flex:1,
    		allowBlank : false
		},{
    		xtype : 'combo',
			fieldLabel : 'Usuario',			
			displayField : 'usu_cnombre',
            queryMode: 'local',
			valueField : 'usu_iid',
            emptyText:'No se controla',
			name : "_userId",
            itemId: 'usuarios',
            flex:1,
            value:''
		},{
        	xtype : 'geocercasprogramadaspointsgridview',
            flex: 1,
            disabled:true,
            itemId:'pointsgrid'
		},{
            xtype : 'geocercasprogramadasprogramgridview',
            flex: 1,
            disabled:true,
            itemId:'programgrid'
		}
        
        
        
        
    ],

	initComponent : function() {
		this.callParent();
        this.down('geocercasprogramadaspointsgridview').record = this.record;
        this.down('geocercasprogramadasprogramgridview').record = this.record;
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save',
                    formBind: true
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});