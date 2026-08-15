Ext.define('SmartTrack.model.SGSP_GetDateTimeOffSetSearchModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'iCta', type: 'int' },
        { name: 'FechaOffSet', type: 'date', dateFormat: 'c' } // ? usa ISO 8601
    ],
    proxy: {
        type: 'rest',
        url: '/Rest/Search/SGSP_GetDateTimeOffSet',
        reader: {
            type: 'json',
            root: 'rows'
        }
    }
});