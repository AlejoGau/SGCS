Ext.define( 'AdministratorSearch.view.TablasPanelesFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.tablaspanelesformview' ],
    preventHeader: true,
    frame: true,
    border: 0,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 100,
        enforceMaxLength: true
    },
    items: [
        {
            xtype: 'textfield',
            name: 'pan_ccodigo',
            fieldLabel: 'Codigo',
            allowBlank: false,
            maxLength: 3,
            inputWidth: 40,
            validator: function( value ) {

                var t = this;
                var button = t.up( 'tablaspanelesformview' ).down( '#guardar' );
                if( Ext.util.Format.trim( t.up( 'tablaspanelesformview' ).record.get( 'pan_ccodigo' ) ) != Ext.util.Format.trim( value ) ) {


                    var filters = [ {
                        property: 'pan_ccodigo',
                        value: value
                    }];

                    var model = 'AdministratorSearch.model.TablasPanelesSearchModel';

                    var store = Ext.create( 'Ext.data.Store', {
                        model: model,
                        pageSize: 50,
                        remoteSort: true,
                        remoteFilter: true,
                        filters: filters,
                        autoload: false
                    })

                    store.load( {
                        callback: function( records, operation, success ) {

                            if( records.length <= 0 ) {

                                t.clearInvalid();
                                t.textValid = true;


                            } else {
                                t.markInvalid( 'El codigo ya esta siendo utilizado.' );
                                t.textValid = 'El codigo ya esta siendo utilizado.';
                            }

                        }
                    });


                } else {
                    t.clearInvalid();
                    t.textValid = true;
                }

                return this.textValid;
            }

        }, {
            xtype: 'textfield',
            name: 'pan_cdescripcion',
            fieldLabel: 'Descripcion',
            allowBlank: false,
            maxLength: 40,
            anchor: '100%'
        }, {
            xtype: 'combo',
            fieldLabel: 'GPRS',
            store: 'SiNoGPSStore',
            displayField: 'Name',
            editable: false,
            valueField: 'Value',
            name: 'pan_nesgprs',
            queryMode: 'local',
            remoteFilter: true,
            itemId: 'esgprs',
            listeners: {

                select: function( combo, records, eOpts ) {
                    if( combo.getValue() == 3 ) {
                        combo.up( 'tablaspanelesformview' ).down( '#comboModelo' ).hide();
                        combo.up( 'tablaspanelesformview' ).down( '#comboModelo' ).clearValue();
                    } else
                        combo.up( 'tablaspanelesformview' ).down( '#comboModelo' ).show();
                }
            }
        }, {
            xtype: 'combo',
            itemId: 'comboModelo',
            fieldLabel: 'Modelo',
            name: 'pan_iModelo',
            valueField: 'pam_idKey',
            displayField: 'Descripcion',
           // plugins: [ 'clearbutton' ],
            forceSelection: true,
            anchor: '100%'
        }, {
            xtype: 'textarea',
            name: 'pan_mobservacion',
            fieldLabel: 'Observacion',
            anchor: '100%'
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
                    action: 'save',
                    formBind: true
                }
            ]// cierro items
        });
        this.addDocked( toolbar );
    } // cierro init
});