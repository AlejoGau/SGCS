//MIGRADO2024
Ext.define('Common.view.MapguardCuentaView', {
    extend : 'Ext.form.FormPanel',
    alias : 'widget.mapguardcuentaview',
	autoScroll: true,
    layout: {
        type: 'vbox',
        align: 'stretch',
        autoSize: true,
        shrinkToFit: false
    },
    
	items : [
        
        {
    		xtype : 'displayfield',
            itemId: 'dealer',
            fieldLabel : 'Cuenta',
			labelWidth:50,
            renderer: function(value, field){
                var view = field.up('mapguardcuentaview');
                var record = view.record;
                
                return record.get('cue_clinea')+"-"+record.get('cue_ncuenta')+" "+record.get('cue_cnombre')
            
            }
	    },
        
        {
    		xtype : 'container',
			collapsible : true,
			title : 'Dirección',
			layout : 'vbox',
			items : [{
						xtype : 'displayfield',
						fieldLabel : 'Calle',
						name : "cue_ccalle"
					}, {
						xtype : 'displayfield',
						fieldLabel : 'Ciudad',
						name : "cue_clocalidad"
					}
			]
		}, {
			xtype : 'displayfield',
			fieldLabel : 'Alarma',
			name : "cod_cdescripcion",
            itemId:'alarma'
		}
        
    ],
	// cierro items
    initComponent: function(){
        this.callParent();
        
    },
    
    setRecord: function(record){
        this.record = record;
        this.fireEvent('setrecord', this);
    }
});