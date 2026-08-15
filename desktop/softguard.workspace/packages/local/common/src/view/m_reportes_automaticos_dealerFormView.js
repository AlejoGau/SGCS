//MIGRADO2024
Ext.define( 'Common.view.m_reportes_automaticos_dealerFormView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.mreportesautomaticosdealerformview',
    autoScroll: true,
    autoHeight: true,
    bodyPadding: 5,
    layout: 'anchor',
    trackResetOnLoad: true,
    itemId: 'mreportesautomaticosdealerformview',
    fieldDefaults: {
        anchor: '100%'
    },
    dockedItems: [ {
        xtype: 'toolbar',
        items: [
            {
                text: 'Guardar',
                iconCls: 'save',
                action: 'savereporte'
            },{
                text: 'Limpiar formulario',
                iconCls: 'delete',
                action: 'deletereporte'
            }
        ]
        // cierro items
    }] // cierro dockeditems
    ,
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            anchor: '100%',
            labelAlign: 'right',
            defaults: {
                margin: '0 5 5 0'
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Frecuencia',
                    //	store: 'CuentaReporteFrecuenciaStore',
                    displayField: 'Name',
                    queryMode: 'local',
                    value: 3,
                    valueField: 'Value',
                    flex: 1,
                    name: 'rad_nfrecuencia',
                    itemId: 'rad_nfrecuencia'
                }, {
                    xtype: 'datefield',
                    fieldLabel: 'Proximo Envío',
                    //minValue: new Date(),
                    value: Ext.Date.add( new Date(), Ext.Date.MONTH, 1 ),
                    flex: 1,
                    margin: '0 5 0 5',
                    name: 'rad_tproximoenvio',
                    itemId: 'rad_tproximoenvio'
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Tipo',
                    //store: 'CuentaReporteTipoStore',
                    queryMode: 'local',
                    displayField: 'Name',
                    valueField: 'Value',
                    labelWidth: 50,
                    value: 3,
                    flex: 1,
                    name: 'rad_ntipo',
                    itemId: 'rad_ntipo'
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Grupos',
                    itemId: 'grupos',
                    queryMode: 'local',
                    displayField: 'gru_cdescripcion',
                    valueField: 'Id',
                    labelWidth: 50,
                    flex: 1,
                    name: 'rad_idGrupo',
                    hidden: true
                }
            ]
        }, {
            xtype: 'textareafield',
            fieldLabel: 'Alarmas del grupo',
            itemId: 'alarmasgrupo',
            labelWidth: 150,
            //hidden: true,
            readOnly: true,
            //disabled: true,
            width: '100%',
            grow: true,
            value: 'Cargando...'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Dirección de Mail',
            labelWidth: 150,
            anchor: '100%',
            name: 'rad_cmail',
            itemId: 'rad_cmail',
            validator: function( value ) {
                var reg = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/;
                if( !value.match( reg ) && value != '' ) {
                    this.markInvalid( "El email esta mal formulado." );
                    this.textValid = "El email esta mal formulado.";
                } else {
                    this.clearInvalid();
                    this.textValid = true;
                }
                return this.textValid;
            }
        }, {
            xtype: 'checkbox',
            queryMode: 'local',
            itemId: 'rad_nAlerta',
            name: 'rad_nAlerta',
            value: 'rad_nAlerta',
            fieldLabel: 'Incluir solo cuentas con eventos de alarmas',
            checked: false
        }
    ]
});