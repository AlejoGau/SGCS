// SofIA Route Program search model
Ext.define('Common.model.SVRouteProgramSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'srp_iid',
    fields: [
        { name: 'srp_iid', type: 'int' },
        { name: 'srp_iRouteId', type: 'int' },
        { name: 'srp_cProgramType', type: 'string' },
        { name: 'srp_iStartHour', type: 'int' },
        { name: 'srp_iStartMinutes', type: 'int' },
        { name: 'srp_iDayOfWeek', type: 'int' },
        { name: 'srp_iDayOfMonth', type: 'int' },
        {
            name: 'Summary',
            type: 'string',
            convert: function(value, record) {
                if (!record) {
                    return '';
                }
                var type = record.get('srp_cProgramType');
                var hour = Ext.util.Format.leftPad(record.get('srp_iStartHour') || 0, 2, '0');
                var minutes = Ext.util.Format.leftPad(record.get('srp_iStartMinutes') || 0, 2, '0');
                var timeText = hour + ':' + minutes;
                var programText = '';
                var typeInt = parseInt(type, 10);
                if (typeInt === 1) {
                    programText = 'Todos los días a las ' + timeText;
                                } else if (typeInt === 2) {
                    programText = 'Lunes a viernes a las ' + timeText;
                                } else if (typeInt === 3) {
                    var map = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                    var dow = record.get('srp_iDayOfWeek');
                    var dowText = map[dow] || 'Día';
                    programText = 'El ' + dowText + ' a las ' + timeText;
                                } else if (typeInt === 4) {
                    var dom = record.get('srp_iDayOfMonth');
                    programText = 'El día ' + dom + ' de cada mes a las ' + timeText;
                } else {
                    programText = timeText;
                }
                return programText;
            }
        }
    ],

    proxy: {
        type: 'rest',
        url: '/Rest/SV_Route_Programs/',
        appendId: true,
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        }
    }
});

