Ext.define('AdministratorSearch.model.SoundsSearchModel', {
    extend: 'Ext.data.Model',
    autoLoad: false,
    autoSync: false,
    idProperty: 'id',
    fields: [
        {
            name: 'id',
            type: 'int'
        },
        
        {name:"Name", type:"string"},
        {name:"CreationTime", type:"string"},
        {name:"Type", type:"string"},
        {name:"Path", type:"string"},
        {name:"Weight", type:"string"},
        {name:"VirtualPath", type:"string"}
        ],
        proxy: {
            type: 'SoundsSearchProxy',  
            reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
            },
            
            
        }
});

