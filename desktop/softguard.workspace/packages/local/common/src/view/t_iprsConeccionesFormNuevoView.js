//MIGRADO2024
Ext.define( 'Common.view.t_iprsConeccionesFormNuevoView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.t_iprsconeccionesformnuevaview' ],
    preventHeader: true,
    frame: true,
    border: 0,
    autoScroll: true,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 120,
        anchor: '100%',
        enforceMaxLength: true
    },
    items: [
        // dedalo 06/09/2023, dejo campo hdden para guardar los valores
        {
            xtype: 'hidden',
            itemId: 'ipc_ireceptor'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            itemId: 'ipc_cdescripcion'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Puerto',
            itemId: 'ipc_nport',
            validator: function( value ) {
                var t = this;
                var view = t.up( 't_iprsconeccionesformnuevaview' )
                var record = this.up( 't_iprsconeccionesformnuevaview' ).record;
                var connectionMethod = view.down( '[name="connectionMethod"]' );
                var connectionMethodValue = connectionMethod ? connectionMethod.value : null;
                if( connectionMethodValue == "UDP" || connectionMethodValue == "TCP" ) {
                    if( value > 32767 ) {
                        return getLocale( 'El valor no debe superar 32767' );
                    }
                    if( value < 1025 ) {
                        return getLocale( 'El valor no debe ser inferior a 1025' );
                    }
                }
                else if( connectionMethodValue == "SERIAL" ) {
                    if( value > 999 ) {
                        return getLocale( 'El valor debe estar entre 1 y 999' );
                    }
                }
                if( ( value != this.originalValue || record.get( 'Id' ) == 0 ) ) {
                    if( this.originalValue != undefined ) {
                        var filters = [ {
                            property: 'ipc_nport',
                            value: value
                        }, {
                                property: 'iprsc_iprsiid',
                                value: view.record.get( 'iprsc_iprsiid' )
                            }];
var model = 'AdministratorSearch.model.IprsConeccionSearchModel';
var storeSP = Ext.create( 'Ext.data.Store', {
    model: model,
    pageSize: 50,
    remoteFilter: true,
    filters: filters
})
storeSP.load( {
    callback: function( records, operation, success ) {
        if( records.length > 0 ) {
            var receptorField = view.down( '#receptores' );
            if( receptorField.valueModels && receptorField.valueModels[ 0 ]
                && ( receptorField.valueModels[ 0 ].get( 'rec_cConfig' ).includes( 'TCPCLIENT' )
                    || receptorField.valueModels[ 0 ].get( 'rpm_cConfig' ).includes( 'TCPCLIENT' ) ) ) {
                var isValid = true
                Ext.Array.each( records, function( r, k ) {
                    if( !r.get( 'iprsc_config' ).includes( 'TCPCLIENT' ) ) {
                        isValid = false;
                    }
                })
                if( !isValid ) {
                    t.markInvalid( 'El puerto ya esta en uso' );
                    t.textValid = false;
                } else {
                    t.clearInvalid();
                    t.textValid = true;
                }
            } else {
                t.markInvalid( 'El puerto ya esta en uso' );
                t.textValid = false;
            }
        } else {
            t.clearInvalid();
            t.textValid = true;
            this.originalValue = value;
        }
        return t.textValid;
    }
})
						
                	} else {
    //console.log('valor original undefined');
    this.originalValue = value
}
					
                } else {
    t.clearInvalid();
    t.textValid = true;
    return true;
}
return !t.hasActiveError()
            }
        },{
    xtype: 'combo',
        fieldLabel : 'Marcas',
            itemId: 'marcas',
                queryMode: 'local',
                    displayField: 'rpm_cMarca',
                        valueField: 'rpm_cMarca',
                            emptyText: 'Seleccione una marca',
                                allowBlank: false,
                                    hidden: true,
                                        anchor: '100%'
}, 
{
    xtype: 'selecterfield',
        itemId:'receptores',
            simpleSelect: true,
                config: {
        disponible: {
            title: 'Receptores',
                field:'_nombreCompleto',
                    searchField:'[_nombreCompleto]'
        },
        selecionado: {
            title: 'Receptores',
                field:'_nombreCompleto'
        },
        valueField: 'rpm_idKey',
            modelItems: 'AdministratorSearch.model.m_receptores_cabSearchModel'
    },
    filter: [ { "property": "rec_iEsIRS", "value": 1 }],
        title:'Receptores'
},
{
    xtype: 'combo',
        name: 'iprsc_status',
            store:[ [ 'A', getLocale( 'Habilitada' ) ], [ 'I', getLocale( 'Deshabilitada' ) ] ],
                value: 'I',
                    fieldLabel: 'Estado',
                        anchor: '100%'
},{
    xtype: 'combo',
        itemId:'duplicado',
            name: 'iprsc_iduplicado',
                store:[
                    [ 0, getLocale( 'No' ) ],
                    [ 1, getLocale( 'Sí' ) ],
                ],
                    valueField:'iprsc_iduplicado',
                        fieldLabel: 'Rechaza duplicado',
                            anchor: '100%'
},{
    xtype: 'fieldset',
        itemId: 'cconfig',
            title: getLocale( 'Configuración' ),
                margin: '20,0,0,0',
                    translate: false,
                        padding: '5,0,0,0',
                            anchor: '100%'
},{
    xtype: 'numberfield',
        name : 'ipc_itiempoinactividad',
            itemId : 'ipc_itiempoinactividad',
                fieldLabel: 'Tiempo de inactividad'
},{
    xtype: 'combo',
        fieldLabel : 'Resetea por HB',
            name : 'ipc_cresetxhb',
                itemId : 'ipc_cresetxhb',
                    store: [
                        [ 1, getLocale( 'Si' ) ],
                        [ 0, getLocale( 'No' ) ],
                    ]
},{
    xtype: 'combo',
        hidden:true,
            fieldLabel : 'Modem SMS',
                itemId: 'modemsms',
                    queryMode: 'local',
                        displayField: 'sms_cdescripcion',
                            valueField: 'sms_icodigo',
                                emptyText: 'Seleccione un modem sms',
                                    anchor: '100%'
},{
    xtype: 'selecterfield',
        itemId:'dealer',
            simpleSelect: false,
                config: {
        disponible: {
            title: 'Dealer',
                field:'lin_ccodigo',
                    searchField:'o.[lin_ccodigo]'
        },
        selecionado: {
            title: 'Dealer',
                field:'lin_ccodigo'
        },
        valueField: 'lin_ccodigo',
            //prefijoParaFiltro:'o',
            valueFieldFilter:':IN',
                modelItems: 'AdministratorSearch.model.TablasLineasSearchModel'
    },
    title: 'Asginacion dealer'
},
        
    ],
initComponent: function() {
    this.callParent();
    var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
        items: [
            {
                iconCls: 'icon-table-save',
                text: 'Guardar',
                scope: this,
                action: 'save'
            }
        ]// cierro items
    });
    this.addDocked( toolbar );
} // cierro init
});