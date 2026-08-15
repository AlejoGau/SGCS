//MIGRADO2024
Ext.define('Common.model.PortalPanelModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields : [{
                name : 'Id',
                type : 'int'
            }, {
                name : 'Name',
                type : 'string'
            }, {
                name : 'iconCls',
                type : 'string'
            }, {
                name : 'ColumnCount',
                type : 'int'
            }, {
                name : 'DashboardId',
                type : 'int'
            }, {
                name : 'Opened',
                type : 'bool'
            }],

    proxy : {
        type : 'portalpanelproxy',
        url : '/Rest/dashboard/{0}/dashboardpanel',
        replaceIdRegex : /\{0\}/,
        appendId : true,
    }
});
