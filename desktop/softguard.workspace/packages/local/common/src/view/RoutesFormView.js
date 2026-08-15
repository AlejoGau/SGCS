//MIGRADO2024
Ext.define('Common.view.RoutesFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.routesformview'],
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
            itemId: 'Name',
			fieldLabel: 'Nombre',
			flex: 1,
    		allowBlank : false
			
		},{
			xtype: 'datefield',
			name: 'datestart',
            itemId: 'datestart',
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
        	xtype : 'routespointsgridview',
            flex: 1,
            disabled:true,
            itemId:'pointsgrid'
		},{
            xtype : 'routesprogramgridview',
            flex: 1,
            disabled:true,
            itemId:'programgrid'
		}
        
        
        
        
    ],
	initComponent : function() {
        
        //this.addEvents('objectchanged');
		this.callParent();
        
        this.down('routespointsgridview').record = this.record;
        this.down('routesprogramgridview').record = this.record;
        
        this.down('routespointsgridview').readOnly = this.readOnly;
        this.down('routesprogramgridview').readOnly = this.readOnly;
        
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