Ext.define( 'AdministratorSearch.view.t_controlAcceso_puertaFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.t_controlaccesopuertaformview' ],
    border: 0,
    bodyPadding: 0,
    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            itemId: 'nombre',
            name: 'cap_nombre',
            allowBlank: false
        },
        {
            xtype: 'button',
            text: 'Seleccione una cuenta',
            iconCls: 'icon-find',
            itemId: 'seleccionarcuenta',
            margin: '0 10 0 0',
            action: 'seleccionarCuenta'
        },
        {
            xtype: 'button',
            text: '',
            iconCls: 'icon-cancel',
            itemId: 'sacarcuenta',
            hidden: true,
            margin: '0 5 0 0',
            listeners: {
                click: function( button ) {
                    button.up( 't_controlaccesopuertaformview' ).down( '#idcuenta' ).setValue( '' )
                    button.up( 't_controlaccesopuertaformview' ).down( '#nombrecuenta' ).setValue( '' )
                    button.hide()
                }
            }
        },
        {
            xtype: 'displayfield',
            itemId: 'nombrecuenta',
            name: 'nombrecuenta'
        },
        {
            xtype: 'displayfield',
            hidden: true,
            itemId: 'idcuenta',
            name: 'cap_idCta',
        },
        {
            xtype: 'container',
            itemId: 'container',
            layout: 'vbox',
            iconCls: 'icon-cancel',
        }],

    initComponent: function() {
        this.callParent();
        const record = this.record;
        const displayText = `${ record.get( 'cue_clinea' ) }-${ record.get( 'cue_ncuenta' ) ? record.get( 'cue_ncuenta' ).trim() : '' }-${ record.get( 'cue_cnombre' ) }`;
        const container = this.down( '#container' );
        //  this.down('p_controlacceso_ioview').record = this.record
        var displayField = this.down( '#nombrecuenta' );
        displayField.setValue( displayText );

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
    } // cierro initComponent
});