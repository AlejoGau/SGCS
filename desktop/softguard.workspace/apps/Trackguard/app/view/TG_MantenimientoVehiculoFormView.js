Ext.define('Trackguard.view.TG_MantenimientoVehiculoFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.mantvehiculoformview',
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    items : [
        /*{
            xtype : 'combo',
            itemId : "serviciosActivos",
            fieldLabel : "Tipo de Servicio",
            queryMode: 'local',
            displayField: 'tgms_cnombre',
            valueField: 'tgms_idkey',
            name : 'tgms_idkey',
            emptyText: getLocale('Seleccione el tipo de Servicio'),
            allowBlank: false,
            anchor: '100%'          
        },*/
        {
          xtype: 'label',
          text: '',
          itemId : 'serviceLabel',
          padding : '20 0'
        },{
            xtype : 'datefield',
        	name : 'tgmh_dfecha',
            fieldLabel : 'Fecha Servicio',
            labelWidth: 150,
            format : 'd/m/Y',
            allowBlank : false,
            anchor: '100%'
        },{
            xtype : 'numberfield',
        	name : 'tgmh_iodometro',
            itemId : 'tgmh_iodometro',
            fieldLabel : 'Kilometraje',
            labelWidth: 150,
            allowBlank : false,
            maxLength : 7,
            anchor: '100%',
            renderer : function (value) {
                console.log(value);
            }
        },{
            xtype : 'textarea',
        	name : 'tgmh_cdescripcion',
            fieldLabel : 'Comentario',
            labelWidth: 150,
            margin : '5 0 0 0',
            height : 80,
            maxLength : 499,
            anchor: '100%'
        },{
            xtype : 'textfield',
            name : 'tgmh_idservicio',
            itemId : 'tgmh_idservicio',
            hidden : true
        },{ 
            xtype : 'textfield',
            name : 'tgmh_idispositivomovil',
            itemId : 'tgmh_idispositivomovil',
            hidden : true
        }
        /*   xtype : 'textfield',
            name : 'tgmh_iorganizacion',
            valueField: 'tgms_iorganizacion',
            displayField : 'tgms_iorganizacion',
            hidden : true
        },{
            xtype : 'checkbox',
        	name : 'finalizado',
            fieldLabel: 'Realizado',
            flex : 1
        }*/                
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