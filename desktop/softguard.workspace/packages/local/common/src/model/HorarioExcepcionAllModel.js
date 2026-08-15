//MIGRADO2024
Ext.define( 'Common.model.HorarioExcepcionAllModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'exc_iidcuenta', type: 'int' },
        { name: 'exc_idKey', type: 'int' },
        { name: 'eve_cdescripcion', type: 'string' },
        {
            name: 'exc_cHoraApertura', type: 'string', convert: function( value, record ) {
                // 'value' es el valor original del campo
                if( value instanceof Date ) {
                    // El valor es una instancia válida de Date, puedes formatearlo
                    return Ext.Date.format( value, 'H:i' );
                } else if( typeof value === 'string' ) {
                    // Intenta convertir la cadena en un objeto Date
                    const dateValue = new Date( value );
                    if( !isNaN( dateValue.getTime() ) ) {
                        // La conversión fue exitosa, ahora puedes formatearla
                        return Ext.Date.format( dateValue, 'H:i' );
                    }
                }

                // Si no es una fecha válida, simplemente devuelve el valor original
                return value;

            }
        },
        {
            name: 'exc_cHoraCierre',
            type: 'string',
            convert: function( value, record ) {
                // 'value' es el valor original del campo
                if( value instanceof Date ) {
                    // El valor es una instancia válida de Date, puedes formatearlo
                    return Ext.Date.format( value, 'H:i' );
                } else if( typeof value === 'string' ) {
                    // Intenta convertir la cadena en un objeto Date
                    const dateValue = new Date( value );
                    if( !isNaN( dateValue.getTime() ) ) {
                        // La conversión fue exitosa, ahora puedes formatearla
                        if( dateValue.getHours() === 0 && dateValue.getMinutes() === 0 ) {
                            // Si la hora es 00:00, cambia la hora a 23:59
                            dateValue.setHours( 23 );
                            dateValue.setMinutes( 59 );
                        }
                        return Ext.Date.format( dateValue, 'H:i' );
                    }
                }

                // Si no es una fecha válida, simplemente devuelve el valor original
                return value;
            }
        },

        { name: 'exc_cevento', type: 'string', convert: function( v, record ) { return v.trim(); } }
    ],

    proxy: {
        type: 'rest',
        url: '/Rest/Search/HorarioExcepcionAll',
        appendId: true,
        reader: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total'
        }
    }
})