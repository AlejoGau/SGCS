Ext.define('WebRemoto.view.NotaTemporalROView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.notatemporalroview',
    title: 'Notas',
    autoScroll: true,
    overflowY: 'scroll',
    /*layout : {
        type :'vbox',
        align : 'stretch'
    },*/
     dockedItems: [{
        xtype: 'toolbar',
        items: [
         {
            text: 'Guardar',
            iconCls: 'save',
            action: 'save'
        }
    ]
    }], // cierro dockeditems
    items: [
            
            {
                xtype: 'fieldset',
                title: 'Fechas',
                //height: 87,
                region: 'center',
				margin: '4px 2px 4px 4px',
                items: [
                    {
                        xtype: 'displayfield',
                        name: 'not_dtemporaldesde',
                        fieldLabel: 'Desde',
                        labelWidth: 100,
                        validator: function(value){
                            var form = this.up('form').getForm();
                            var desde = form.findField('not_dtemporaldesde');
                            var hasta = form.findField('not_dtemporalhasta');
                            var diferencia = desde.getValue()-hasta.getValue();
                            if (diferencia>0){
                                return 'La fecha Desde debe ser anterior a Fecha Hasta';
                            }
                            else {
                                hasta.clearInvalid();
                                return true;
                            }
                        },
                        anchor: '100%',
                        renderer: function(value,metadata,record){
                            
                                return Ext.Date.format(new Date(value), 'd/m/Y H:i:s');
                            
                        }
                    },{
                        xtype: 'displayfield',
                        name: 'not_dtemporalhasta',
                        fieldLabel: 'Hasta',
                        labelWidth: 100,
                        validator: function(value){
                            var form = this.up('form').getForm();
                            var desde = form.findField('not_dtemporaldesde');
                            var hasta = form.findField('not_dtemporalhasta');
                            var diferencia = desde.getValue()-hasta.getValue();
                            if (diferencia>0){
                                return 'La fecha Desde debe ser anterior a Fecha Hasta';
                            }
                            else {
                                desde.clearInvalid();
                                return true;
                            }
                        },
                        anchor: '100%',
                        renderer: function(value,metadata,record){
                            
                                return Ext.Date.format(new Date(value), 'd/m/Y H:i:s');
                            
                        }
                    }
                ]
            },{
                xtype: 'displayfield',
                name: 'not_mnotatemporal',
                margin: '5 5 5 5',
                renderer: function(value){
                  return value.replace(/\n/g, '<br>');
                },
                flex:1
            }

        ]
    //Dealer.view.FormNote.superclass.initComponent.call(this);
    //}
});