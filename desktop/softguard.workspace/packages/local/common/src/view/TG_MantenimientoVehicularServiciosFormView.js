//MIGRADO2024
Ext.define('Common.view.TG_MantenimientoVehicularServiciosFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.mantvehicularserviciosformview',
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
            xtype : 'textfield',
			name : 'tgms_cnombre',
            fieldLabel: 'Nombre Servicio',
			allowBlank : false,
            maxLength: 40,
            anchor : '100%'
        },{
            xtype : 'textarea',
			name : 'tgms_cdescripcion',
            fieldLabel: 'Descripcion',
            anchor : '100%'
		},{
            xtype : 'textfield',
            name : 'tgms_kilometros',
            fieldLabel : 'Kilometros',
            allowBlank : false,
            maxLength: 7,
            anchor : '100%'
        },{
            xtype : 'combo',
            name : 'tgms_meses',
            queryMode: 'local',
            fieldLabel : 'Meses',
            store : [
                [0,0],
                [1,1],
                [2,2],
                [3,3],
                [4,4],
                [5,5],
                [6,6],
                [7,7],
                [8,8],
                [9,9],
                [10,10],
                [11,11],
                [12,12]
            ]
        },{
            xtype : 'combo',
            name : 'tgms_iestado',
            queryMode: 'local',
            fieldLabel : 'Estado',
            store : [
                [0, getLocale('Inactivo')],
                [1, getLocale('Activo')]
            ]
		},{
    	    xtype : 'textfield',
            name : 'tgms_iorganizacion',
            itemId : 'organizacion',
            hidden : true
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
                    action: 'save',
                    formBind : true
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});