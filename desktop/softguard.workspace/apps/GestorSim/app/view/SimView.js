Ext.define('GestorSim.view.SimView', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.simview',
    title: 'SIM',
    width: 300,
    height: 546,
    padding: '10',
    items: [

        {
            xtype: 'container',
            width: '50%',
            height: '100%',
            layout: 'hbox',
            autoHeight: true,
            layoutConfig: {
                defaultMargins: {
                    top: 0,
                    right: 10,
                    bottom: 0,
                    left: 0
                }
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Datos de la SIM',
                    flex: 1,
                    autoHeight: true,
                    items: [
                        {
                            xtype: 'fieldset',
                            layout: 'hbox',
                            title: 'Cuenta',
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'cuenta',
                                    text: 'Seleccione una cuenta',
                                    margin: '0 10 0 0'
                                }, {
                                    xtype: 'displayfield',
                                    itemId: 'nombrecuenta'
                                }, {
                                    xtype: 'displayfield',
                                    itemId: 'sim_cuenta',
                                    hidden: true
                                }
                            ]
                        },

                        {
                            xtype: 'textfield',
                            fieldLabel: 'Número de linea',
                            name: 'sim_codigo',
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'APN',
                            name: 'sim_apn',
                            anchor: '100%'
                        },

                        {
                            xtype: 'textfield',
                            fieldLabel: 'Abonado',
                            name: 'sim_abonado',
                            anchor: '100%'
                        },

                        {
                            xtype: 'textfield',
                            fieldLabel: 'CSID',
                            name: 'sim_csid',
                            anchor: '100%'
                        },

                        {
                            xtype: 'textfield',
                            fieldLabel: 'Fecha activación',
                            name: 'sim_fecha_activacion',
                            anchor: '100%'
                        },

                        {
                            xtype: 'textfield',
                            fieldLabel: 'ICCID',
                            name: 'sim_iccid',
                            anchor: '100%'
                        },

                        {
                            xtype: 'textfield',
                            fieldLabel: 'Marca',
                            name: 'sim_marca',
                            anchor: '100%'
                        },

                        {
                            xtype: 'textfield',
                            fieldLabel: 'Cliente',
                            name: 'sim_cliente',
                            anchor: '100%'
                        },

                        {
                            xtype: 'textfield',
                            fieldLabel: 'Agente',
                            name: 'sim_agente',
                            anchor: '100%'
                        },

                        {
                            xtype: 'textfield',
                            fieldLabel: 'Estado',
                            name: 'sim_estado',
                            anchor: '100%'
                        },


                        {
                            xtype: 'textfield',
                            fieldLabel: 'Observaciones',
                            name: 'sim_observaciones',
                            anchor: '100%'
                        },


                    ]
                }

            ]
        }
    ]// cierro items

});


