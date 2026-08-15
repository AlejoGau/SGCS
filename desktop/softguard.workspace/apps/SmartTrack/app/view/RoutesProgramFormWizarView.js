Ext.define('SmartTrack.view.RoutesProgramFormWizarView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.routesprogramformwizarview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 70,
        enforceMaxLength: true,
        width: 200
    },
    items : [
       {
        	xtype: 'container',
			layout: 'vbox',
			items:[
                    {
                        xtype: 'checkboxgroup',
                        fieldLabel: 'Dia de la semana',
                        itemId: 'semana',
                        items: [
                                {
                                    boxLabel: 'Domingo',
                                    name: 'dayofweek',
                                    inputValue: 1,
                                    uncheckedValue: 0
                                },{
                                    boxLabel: 'Lunes',
                                    name: 'dayofweek',
                                    inputValue: 1,
                                    uncheckedValue: 0
                                },{
                                    boxLabel: 'Martes',
                                    name: 'dayofweek',
                                    inputValue: 2,
                                    uncheckedValue: 0
                                },{
                                    boxLabel: 'Miercoles',
                                    name: 'dayofweek',
                                    inputValue: 3,
                                    uncheckedValue: 0
                                },{
                                    boxLabel: 'Jueves',
                                    name: 'dayofweek',
                                    inputValue: 4,
                                    uncheckedValue: 0
                                },{
                                    boxLabel: 'Viernes',
                                    name: 'dayofweek',
                                    inputValue: 5,
                                    uncheckedValue: 0
                                },{
                                    boxLabel: 'Sabado',
                                    name: 'dayofweek',
                                    inputValue: 6,
                                    uncheckedValue: 0
                                }
                            ]
                    }
                ,{
        			xtype: 'fieldset',
            		layout: 'hbox',
                    titel: 'En el horario',
        			items:[{
                            xtype: 'numberfield',
                			name: 'starthour',
                			fieldLabel: 'Hora',
                            minValue: 0,
                            maxValue: 23,
                			flex: 1,
                            itemId:'hours',
                            labelWidth: 70,
                            margin: '0 10 0 0',
                            width: 150
                			
                		},{
                        	xtype: 'numberfield',
                			name: 'startminutes',
                			fieldLabel: 'Minutos',
                            minValue: 0,
                            maxValue: 59,
                			flex: 1,
                            itemId:'minutes',
                            labelWidth: 70,
                            width: 150
                			
                		}
                    ]
                }
            ]
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