Ext.define( 'Trackguard.view.TrackGuardConfigView', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.trackguardconfigview',
    autoScroll: true,
    //layout: 'fit',
    padding: '10 10 10 10',
    bodyPadding: '0 0 0 0',
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        anchor : '100%'
	},
    items:[
            {
                xtype: 'radiogroup',
                columns: 1,
                padding: 10,
                itemId:'radiogroup',
                vertical: true,
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items:[
                            {
                                xtype: 'radio',
                                name: 'rb',
                                inputValue: '1'
                            },{
                                xtype: 'splitter'
                            },{
                                xtype:'numberfield',
                                fieldLabel: 'Velocidad',
                                labelWidth: 110,
                                name: 'dtg_parking_velocidad' ,
                                itemId: 'velocidad' ,
                                anchor: '40%'

                            }
                        ]
                    },{
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'radio',
                                name: 'rb',
                                inputValue: '2'
                            },{
                                xtype: 'splitter'
                            },{
                                    
                                        xtype: 'fieldset',
                                        title: 'Control Parking por eventos',
                                        items: [
                                                {
                                                    xtype : 'textarea',
                                                    fieldLabel : 'Seleccionados',
                                                    anchor: '100%',
                                                    readOnly: true,
                                                    name: 'dtg_parking_eventos',
                                                    itemId:'eventos'
                                                    
                                                },
                                                {
                                                    xtype : 'textarea',
                                                    fieldLabel : 'Seleccionados',
                                                    name: 'dtg_parking_eventos_hide',
                                                    itemId:'eventoshide',
                                                    hidden: true
                                                },
                                                {
                                                    xtype:'button',
                                                    text:'Modificar',
                                                    itemId:'agregarevento',
                                                    margin: '0 0 10 0',
                                                }
                                                    
                                            ]
                                    

                            }
                        ]
                    }
                ]
            }
        

    ],
    // cierro items
    initComponent: function() {
        this.callParent();

        // agrego la toolbar
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [ {
                    text: 'Guardar',
                    iconCls: 'save',
                    action: 'save'
                }
            ]
        });
        this.addDocked( toolbar );
    }    
});