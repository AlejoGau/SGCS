Ext.define( 'AdministratorSearch.view.parametro_ITOKIICONFIGview', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.parametro_ITOKIICONFIGview' ],
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
            xtype: 'fieldset',
            margin: '0 0 5 0',
            items: [
                {
                    xtype: 'textfield',
                    width: 380,
                    itemId: 'LicenseNumber',
                    name: 'LicenseNumber',
                    fieldLabel: 'Numero de licencia'
                },
                {
                    xtype: 'textfield',
                    width: 380,
                    itemId: 'TokenNumber',
                    name: 'TokenNumber',
                    inputType: 'password',
                    fieldLabel: getLocale( 'ItokiToken' ),
                },
                {
                    xtype: 'fieldset',
                    title: 'URLs',  // Agrega un título adecuado para el nuevo fieldset
                    margin: '2 0 5 0',
                    items: [
                        {
                            xtype: 'textfield',
                            width: 360,
                            itemId: 'Url_1',
                            name: 'Url_1',
                           
                            fieldLabel: 'URL 1'
                        },
                        {
                            xtype: 'textfield',
                            width: 360,
                            itemId: 'Url_2',
                            name: 'Url_2',
                            
                            fieldLabel: 'URL 2'
                        },
                        {
                            xtype: 'textfield',
                            width: 360,
                            itemId: 'Url_3',
                            name: 'Url_3',
                           
                            fieldLabel: 'URL 3'
                        },
                    ]
                }
            ]
        }, {
            xtype: 'textarea',
            name: 'par_cvalor',
            fieldLabel: 'Valor',
            anchor: '100%',
            //id: 'plantillatrackguard',
            itemId: 'jsonvalues',
            alowBlank: false,
            hidden: true
        }
    ],

    saveValues: function() {
        var json = '';

        var values = {};

        values.LicenseNumber = this.down( '#LicenseNumber' ).getValue();
        values.Token = this.down( '#TokenNumber' ).getValue();

        var urls = {
            Url_1: this.down( '#Url_1' ).getValue(),
            Url_2: this.down( '#Url_2' ).getValue(),
            Url_3: this.down( '#Url_3' ).getValue()
        };

        values.Urls = urls;

        this.down( '#jsonvalues' ).setValue( Ext.JSON.encode( values ) );
    },


    loadRecord: function( record ) {
        this.callParent( arguments );

        var par_cvalor = record.get( 'par_cvalor' );

        if( par_cvalor && par_cvalor !== '' ) {
            var values = Ext.JSON.decode( par_cvalor );
            console.log( values );
            this.down( '#LicenseNumber' ).setValue( values.LicenseNumber );
            this.down( '#TokenNumber' ).setValue( values.Token );

            if( values.Urls ) {
                this.down( '#Url_1' ).setValue( values.Urls.Url_1 );
                this.down( '#Url_2' ).setValue( values.Urls.Url_2 );
                this.down( '#Url_3' ).setValue( values.Urls.Url_3 );
            }
        }
    },



    initComponent: function() {
        this.callParent();

        var fields = [
            this.down( '#LicenseNumber' ),
            this.down( '#TokenNumber' ),
            this.down( '#Url_1' ),
            this.down( '#Url_2' ),
            this.down( '#Url_3' )
        ];

        Ext.each( fields, function( field ) {
            field.on( 'change', this.saveValues, this );
        }, this );
    }

});