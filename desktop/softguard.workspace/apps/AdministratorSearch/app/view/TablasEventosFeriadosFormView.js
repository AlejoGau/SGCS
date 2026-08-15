Ext.define('AdministratorSearch.view.TablasEventosFeriadosFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablaseventosferiadosformview'],
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
			name : 'eve_cdescripcion',
            fieldLabel: 'Descripcion',
			allowBlank : false,
            maxLength: 40,
            anchor:'100%'
		},{
    		xtype : 'datefield',
			name : 'eve_dfechadesdes',
            fieldLabel: 'Fecha',
            format: 'd/m/Y',
			allowBlank : false,
            inputWidth :200,
            validator: function(value){
                var t = this;
                var view = t.up('tablaseventosferiadosformview');
                if(Ext.Date.format(view.record.get('eve_dfechadesdes'), 'd/m/Y') != Ext.util.Format.trim(value)) {
                    var fecha = value.split(/\//);
                    fecha = [ fecha[1], fecha[0], fecha[2] ].join('/');
                    var filters = [{
                            property : 'eve_dfechadesdes',
                            value : value
                        },{
                            property : 'eve_ccodigo:NOT',
                            value : view.record.get('Id')
                        }
                    ];            
            
                    var model = 'AdministratorSearch.model.TablasEventosFeriadosSearchModel';
                    var store =Ext.create('Ext.data.Store',{
                        model: model,
                        pageSize: 50,
                        remoteSort: true,
                        remoteFilter: true,
                        filters: filters,
                        autoload: false
                    })
                    
                    store.load({callback: function (records, operation, success) {
                        if (records.length <= 0){
                            t.clearInvalid();
                            t.textValid = true;
                        } else {
                            t.markInvalid(getLocale('La fecha de este feriado ya existe.'));
                            t.textValid = getLocale('La fecha de este feriado ya existe.');
                        }
                    }});
                } else {
                    t.clearInvalid();
                    t.textValid = true;
                }
                return this.textValid;
            }
		},{
        	xtype : 'timefield',
			name : '_choradesde',
            fieldLabel: 'Hora desde',
            minValue: '00:00',
            maxValue: '23:59',
            increment: 30,
            inputWidth :200,
            format: 'H:i',
            submitFormat : 'H:i'
            
		}/*
        // saco fecha hasta BC 403029369
        ,{
        	xtype : 'datefield',
			name : 'eve_dfechahasta',
            fieldLabel: 'Fecha hasta',
            dateFormat: 'Y-m-d',
			allowBlank : false,
            inputWidth :200
		}*/,{
        	xtype : 'timefield',
			name : '_chorahasta',
            fieldLabel: 'Hora hasta',
            minValue: '00:00',
            maxValue: '23:59',
            format: 'H:i',
            submitFormat : 'H:i',
            increment: 30,      
            inputWidth :200
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