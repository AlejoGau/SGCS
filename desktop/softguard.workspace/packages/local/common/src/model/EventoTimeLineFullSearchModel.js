//MIGRADO2024
Ext.define('Common.model.EventoTimeLineFullSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int',
        mapping: 'etl_idKey'
    },
    {
        name: 'Name',
        type: 'string'
    },
    {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 3075
    },
    {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'EventosPendientes'
    },
    { name: 'etl_iRecID', type: 'int' },
    { name: 'etl_iCuenta', type: 'int' },

    { name: 'etl_tFechaHora', type: 'date' },
    { name: 'etl_cAccion', type: 'string' },
    {
        name: 'etl_cObservacion', type: 'string',
        convert: function (v, r) {
            if (v) {
                var toLocale = v.match(/\%.*?\%\s?/g);

                var locale = v;

                if (toLocale) {
                    Ext.Array.each(toLocale, function (v, k) {
                        locale = locale.replace(v, getLocale(v));
                    })
                }


                return locale;
            }
        }
    },
    { name: 'etl_cOwner', type: 'string' },
    {
        name: '_etl_cOwner', type: 'string', convert: function (value, record) {
            return record.get('etl_cOwner')//getLocale(record.get('etl_cOwner'));
        }
    },
    { name: 'etl_iOperador', type: 'int' },
    { name: 'ope_clogin', type: 'string' },
    {
        name: 'iconClass', type: 'string', convert: function (value, record) {

            var accion = record.get('etl_cAccion').replaceAll('%', '');

            if (accion == 'Inicio') {
                return 'icon-house';
            } else if (accion == 'Audio') {
                return 'icon-house';
            } else if (accion == 'Imagen') {
                return 'icon-photo';
            } else if (accion.search("LlamadoTelefonico") >= 0) {
                return 'icon-telephone';
            } else if (accion.search("IngresoComentarios") >= 0) {
                return 'icon-book-open';
            } else if (accion == 'Logger') {
                return 'icon-page-white-text';
            } else if (accion == 'Escalamiento') {
                return 'icon-arrow-divider';
            } else if (accion.search("AsignacionDeMovil") >= 0) {
                return 'icon-car';
            } else if (accion == 'Procesamiento') {
                return 'icon-cog';
            } else if (accion == 'Email') {  // revisar
                return 'icon-email';
            } else if (accion == 'Video') {
                return 'icon-cctv-camera';
            } else if (accion == 'Shield') {  // revisar
                return 'icon-shield';
            } else if (accion == '%EventoEspera%') {  // revisar
                return 'icon-clock-stop';
            } else {
                return 'icon-bullet-black';
            }


        }
    }
        , { name: '_tfechahoraOffset', type: 'date', dateFormat: 'n/j/Y g:i:s A' }

    ],

    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/Rest/search/EventoTimeLineFull',
        appendId: true
    },


});