Ext.define('Cuenta.view.SoftguardNotaFormView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.formnote',
    bodyPadding: 0,
    autoWidth: true,
    autoScroll: true,
    autoHeight: true,
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
            xtype: 'panel',
            collapsible: true,
            title: 'Nota principal',
            layout: 'anchor',
            items: [
                {
                    xtype: 'textarea',
                    grow: true,
                    anchor: '100%',
                    name: 'not_mnotaprincipal',
                    margin: '8px 8px 8px 8px'
                } // cierro textarea
            ]//cierro items panel
        }, //cierro panel
            {
            xtype: 'panel',
            collapsible: true,
            title: 'Nota temporal',
            layout: 'anchor',				
            items: [
                {
                    xtype: 'textarea',
                    anchor: '100%',
                    name: 'not_mnotatemporal',
                    itemId: 'not_mnotatemporal',
                    margin: '8px 8px 0px 8px'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    autoHeight: true,
                    autoWidth: true,
                    activeItem: 0,
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Fecha Desde',
                            height: 95,
                            autoHeight: true,
                            flex: 1,
                            autoWidth: true,
                            region: 'center',
                            margin: '4px 2px 4px 4px',
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'not_dtemporaldesde',
                                    fieldLabel: 'Fecha',
                                    itemId:'fechadesde',
                                    // minValue: new Date(),
                                    validator: function(value){
                                        var view = this.up('formnote');

                                        var fechaDesdeField = view.down('#fechadesde');
                                        var fechaHastaField = view.down('#fechahasta');

                                        var fechaDesde = fechaDesdeField.getValue();
                                        var fechaHasta = fechaHastaField.getValue();

                                        var desdeTime = view.down('#desdeTime').getValue();
                                        var hastaTime = view.down('#hastaTime').getValue();

                                        desdeTime = desdeTime?desdeTime:'00:00';
                                        hastaTime = hastaTime?hastaTime:'00:00';

                                        var dateDesde = new Date(Ext.Date.format(new Date(fechaDesde),'Y-m-d')+" "+ desdeTime + ':00');
                                        var dateHasta = new Date(Ext.Date.format(new Date(fechaHasta),'Y-m-d')+" "+ hastaTime + ':00');

                                        
                                        if(Ext.util.Format.trim(view.down('#not_mnotatemporal').getValue())) {
                                            // se elimina control de fecha menor a hoy
                                            // sino cuando se vuelve a ingresar obliga a limpiar fecha temporal para poder guardar otra cosa.
                                            var diferencia = dateDesde-dateHasta;
                                            if (diferencia>0){
                                                return getLocale('La fecha Desde debe ser anterior a Fecha Hasta');
                                            }
                                            else {
                                                fechaHastaField.clearInvalid();
                                                fechaDesdeField.clearInvalid();
                                                return true;
                                            }
                                        } else {
                                                fechaDesdeField.clearInvalid();
                                                fechaHastaField.clearInvalid();
                                                return true;
                                        }
                                        
                                    },
                                    labelWidth: 50,
                                    allowBlank : true
                                },
                                {
                                    xtype: 'timefield',
                                    fieldLabel: 'Hora',
                                    itemId: 'desdeTime',
                                    validator: function(value){
                                        var view = this.up('formnote');
                                        var form = this.up('form').getForm();
                                        var desde = view.down('#desdeTime');
                                        var hasta = view.down('#hastaTime');
                                        var desdef = form.findField('not_dtemporaldesde');
                                        var hastaf = form.findField('not_dtemporalhasta');
                                        if(Ext.util.Format.trim(form.findField('not_mnotatemporal').getValue())) {
                                            var diferencia = desde.getValue()-hasta.getValue();
                                            var diferenciaf = desdef.getValue()-hastaf.getValue();
                                            if (diferenciaf == 0 && diferencia>0){
                                                return 'La hora Desde debe ser anterior a hora Hasta';
                                            }
                                            else {
                                                this.clearInvalid();
                                                return true;
                                            }
                                        } else {
                                                this.clearInvalid();
                                                return true;
                                        }
                                    },
                                    labelWidth: 50,
                                    format: 'H:i',
                                    allowBlank : true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Fecha Hasta',
                            height: 95,
                            autoHeight: true,
                            flex: 1,
                            autoWidth: true,
                            region: 'west',
                            margin: '4px 4px 4px 2px',
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'not_dtemporalhasta',
                                    fieldLabel: 'Fecha',
                                    itemId:'fechahasta',
                                    validator: function(value){
                                        var view = this.up('formnote');

                                        var fechaDesdeField = view.down('#fechadesde');
                                        var fechaHastaField = view.down('#fechahasta');

                                        var fechaDesde = fechaDesdeField.getValue();
                                        var fechaHasta = fechaHastaField.getValue();

                                        var desdeTime = view.down('#desdeTime').getValue();
                                        var hastaTime = view.down('#hastaTime').getValue();

                                        desdeTime = desdeTime?desdeTime:'00:00';
                                        hastaTime = hastaTime?hastaTime:'00:00';

                                        var dateDesde = new Date(Ext.Date.format(new Date(fechaDesde),'Y-m-d')+" "+ desdeTime + ':00');
                                        var dateHasta = new Date(Ext.Date.format(new Date(fechaHasta),'Y-m-d')+" "+ hastaTime + ':00');

                                        
                                        if(Ext.util.Format.trim(view.down('#not_mnotatemporal').getValue())) {
                                            // se elimina control de fecha menor a hoy
                                            // sino cuando se vuelve a ingresar obliga a limpiar fecha temporal para poder guardar otra cosa.
                                            var diferencia = dateDesde-dateHasta;
                                            if (diferencia>0){
                                                return getLocale('La fecha Desde debe ser anterior a Fecha Hasta');
                                            }
                                            else {
                                                fechaHastaField.clearInvalid();
                                                fechaDesdeField.clearInvalid();
                                                return true;
                                            }
                                        } else {
                                                fechaDesdeField.clearInvalid();
                                                fechaHastaField.clearInvalid();
                                                return true;
                                        }
                                    },
                                    labelWidth: 50,
                                    allowBlank : true
                                },
                                {
                                    xtype: 'timefield',
                                    itemId: 'hastaTime',
                                    fieldLabel: 'Hora',                                           
                                    autoWidth: true,
                                    labelWidth: 50,
                                    format: 'H:i',
                                    allowBlank : true,
                                    validator: function(value){
                                        
                                        var fechaHasta = this.up('formnote').down('#fechahasta').getValue()
                                        var fechadesde = this.up('formnote').down('#fechadesde').getValue()
                                        var desdeTime = this.up('formnote').down('#desdeTime').rawValue

                                        
                                        var dateDesde = Ext.Date.format(new Date(fechadesde),'Y-m-d')+" "+ desdeTime + ':00'
                                        var dateHasta = Ext.Date.format(new Date(fechaHasta),'Y-m-d')+" "+ value + ':00'
                                        
                                        
                                        if(dateDesde > dateHasta) {
                                            return 'La fecha Desde debe ser anterior a Fecha Hasta';
                                        } else {
                                            this.clearInvalid();
                                            return true;
                                        }
                                        
                                    }
                                }
                            ]
                        }
                    ]
                } // cierro container
            ] // cierro items panel
        }//cierro panel
    ],
    validateDates: function(field){

    }

});