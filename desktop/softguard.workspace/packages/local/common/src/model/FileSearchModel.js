Ext.define('Common.model.FileSearchModel', {
    extend: 'Ext.data.Model', // Updated for Ext JS 7.1
    idProperty: 'id',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'FileName', type: 'string',
            convert: function (v, record) {
                return record.get('Name').split('.')[0];
            }
        },
        { name: 'Path', type: 'string', defaultValue: '' },
        { name: 'Type', type: 'string' },
        { name: 'CreationTime', type: 'string' },
        { name: 'text', type: 'string', mapping: 'Name' },
        { name: 'children', type: 'int', mapping: 'Parent' },
        { name: 'parentId', type: 'int' },
        { name: 'leaf', type: 'boolean', defaultValue: false },
        { name: 'expanded', type: 'boolean', defaultValue: false },
        { name: 'ObjectTypeName', type: 'string', defaultValue: 'File' },
        { name: 'root', type: 'boolean', defaultValue: false },
        { name: 'Weight', type: 'int' },
        { name: 'VirtualPath', type: 'string' }
    ],

    proxy: {
        type: 'FileSearchProxy',
        url: '/Rest/Search/',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        }/*,
        buildUrl: function (request) {
            let url = this.getUrl();
            const params = [];
            const scope = request.getScope();

            if (scope) {
                if (scope.searchName) params.push('Type=' + scope.searchName);
                if (scope.path) params.push('Path=' + scope.path);
            }

            const node = request.getNode();
            if (node && node.get('Name')) {
                params.push('Path=' + node.get('Path') + '/' + node.get('Name'));
            }

            return Ext.String.urlAppend(url, params.join('&'));
        }*/
    }
});
