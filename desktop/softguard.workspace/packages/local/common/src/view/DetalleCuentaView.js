//MIGRADO2024
Ext.define( 'Common.view.DetalleCuentaView', {
    extend: 'Ext.panel.Panel',
    alias: [ 'widget.detallecuentaview' ],
    preventHeader: true,
    layout: 'hbox',
    items: [
        {
            xtype: 'image',
            src: '/gallery/usernophoto.png',
            maxWidth: 200,
            width: 200,
            margin: 10
        },
        {
            xtype: 'container',
            layout: 'vbox',
            flex: 0.5,
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Nombre',
                    itemId: 'nombre'
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Observacion',
                    itemId: 'observacion'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Tipo',
                    itemId: 'tipo',
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Id Extendido',
                    itemId: 'idExtendido'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Identificador',
                    itemId: 'identificador'
                }
            ]
        },
    ],
    initComponent: function() {
        this.callParent();
        if( this.imagen ) {
            this.down( 'image' ).setSrc( this.imagen )
        }
        this.down( '#nombre' ).setValue( this.record.get( 'usu_cnombre' ) );
        var tipo = this.down( '#tipo' );
        switch( this.usuario.get( 'usu_ntipo' ) ) {
            case 0:
                tipo.setValue( 'Seleccione' )
                break;
            case 1:
                tipo.setValue( 'Superior' )
                break;
            case 2:
                tipo.setValue( 'Normal' )
                break;
            case 3:
                tipo.setValue( 'Bajo' )
                break;
            default:
                console.log( "Seleccione" );
                break;
        }
        
        this.down( '#observacion' ).setValue( this.usuario.get( 'usu_mobservacion' ) );
        this.down( '#idExtendido' ).setValue( this.usuario.get( 'usu_cIdExtendido' ) );
        if (this.organization && this.organization.StateTax !== undefined) {
            var stateTax = this.organization.StateTax;
            this.down( '#identificador' ).setValue( stateTax );
        }
        //this.down( '#identificador' ).setValue( this.organization?.StateTax );
    } // cierro init
});