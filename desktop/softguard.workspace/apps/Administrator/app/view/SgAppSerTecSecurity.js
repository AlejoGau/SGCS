Ext.define( 'Administrator.view.SgAppSerTecSecurity', {
    extend: 'Ext.form.Panel',
    title: 'Seguridad',
    alias: [ 'widget.SgAppSerTecSecurity', 'widget.SerTecSecurity' ],

    items: [
        {
            xtype: 'combobox',
            fieldLabel: 'Modo',
            itemId: 'supervisor',
            //multiselect: false,
            editable: false,
            queryMode: 'local',
            forceSelection: true,
            typeAhead: false,
            store: [
                [ false, getLocale( 'Tecnico' ) ],
                [ true, getLocale( 'Supervisor' ) ]
            ]
        },
        {
            xtype: 'container',
            itemId: 'tecnicocontainer',
            hidden: true,
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Técnico',
                    itemId: 'instaladorCombo',
                    //multiselect: false,
                    editable: false,
                    queryMode: 'local',
                    forceSelection: true,
                    typeAhead: false,
                    displayField: 'ins_cnombre',
                    valueField: 'ins_ccodigo',
                    plugins: [ 'clearbutton' ]
                },/*{
                        xtype: 'checkboxfield',
                        boxLabelAlign: 'before',
                        boxLabel  : 'Es supervisor',
                        itemId        : 'supervisor'
                    },*/{
                    xtype: 'checkboxfield',
                    boxLabelAlign: 'before',
                    hidden: true,
                    boxLabel: 'Cambiar estado de cuenta en AWDM',
                    itemId: 'cambiocuentaAWDM'
                }
            ]

        }, {
            xtype: 'combobox',
            forceSelection: true,
            multiSelect: false,
            editable: false,
            itemId: 'profile',
            fieldLabel: 'Perfil de permiso',
            store: [
                [ '1', getLocale( 'Lectura' ) ],
                [ '2', getLocale( 'Lectura y Escritura' ) ],
                [ '3', getLocale( 'Sin restricciones' ) ]
            ]
        }, {
            xtype: 'checkboxfield',
            boxLabelAlign: 'before',
            hidden: true,
            boxLabel: 'Cambiar estado de servico en DealerMobile',
            itemId: 'cambioestadoserviciodealermobile'
        }, {
            xtype: 'checkboxfield',
            boxLabelAlign: 'before',
            boxLabel: 'Mostrar depositos',
            itemId: 'depositos'
        }, {
            xtype: 'checkboxfield',
            boxLabelAlign: 'before',
            boxLabel: 'Denegar Nuevo Servicio Técnico',
            itemId: 'nuevoserviciotecnico'
        },{
            xtype: 'combo',
            fieldLabel: 'Empresa',
            valueField: 'Id',
            displayField: 'Name',
            hidden: true,
            itemId: 'empresa'            
        }, {
            /**
             * Daniel O. Medina 28/05/2023
             * field set agregado según tarea https://softguard.atlassian.net/browse/DS-711
             */
            xtype: 'fieldset',
            title: 'Seguimiento',
            items: [
                {
                    xtype: 'combo',
                    itemId: 'seguimientoDisponible',
                    fieldLabel: 'Disponible',
                    displayField: 'Name',
                    valueField: 'Id',
                    store: Ext.create( 'Ext.data.Store', {
                        fields: [ 'Id', 'Name' ],
                        data: [
                            { Id: 0, Name: getLocale( 'No Disponible' ) },
                            { Id: 1, Name: getLocale( 'Disponible' ) },

                        ]
                    })
                }, {
                    xtype: 'combo',
                    itemId: 'seguimientoFrecuencia',
                    fieldLabel: 'Frecuencia de reporte',
                    displayField: 'Name',
                    valueField: 'Id',
                    store: Ext.create( 'Ext.data.Store', {
                        fields: [ 'Id', 'Name' ],
                        data: [
                            { Id: 1, Name: getLocale( 'Frecuencia Baja' ) },
                            { Id: 2, Name: getLocale( 'Media' ) },
                            { Id: 3, Name: getLocale( 'Alta' ) },

                        ]
                    })
                }
            ]
        }

    ],

    initComponent: function() {

        // agrego la toolbar
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'saveSecurity'
                }]// cierro items
        });
        this.callParent( arguments );
        this.addDocked( toolbar );
    } // cierro init

});